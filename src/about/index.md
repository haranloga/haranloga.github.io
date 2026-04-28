<%
    meta("../meta.json")
    meta()
    url = url + "/about/"
%>
<%= render("../_partials/header.html", { title, description, url }) %>

<article class="about-article">

# Who I am

I'm **Araharan Loganayagam**, a product builder, cybersecurity practitioner, and researcher working at the intersection of offensive security, application security, cloud-native infrastructure, and AI systems security. My work spans adversary emulation, application development, application security engineering, DevSecOps, cloud security architecture, and the fast-moving attack surface that autonomous AI agents are introducing into production environments.

Over the past few years I've watched agentic AI systems (LLM orchestrators, tool-using agents, RAG pipelines, and multi-agent frameworks) open up attack classes that traditional security tooling largely ignores. Prompt injection, indirect injection through retrieval, principal-hierarchy confusion, tool misuse, and data exfiltration via benign-looking function calls are not theoretical. I research these patterns, red-team deployed AI applications, and build detection and hardening playbooks that engineering teams can actually use.

On the classical side I work across application security architecture, cloud security architecture, SIEM engineering, threat hunting, and red-team operations against hybrid and containerised estates. I read and write production code in **Java, Python, Go, and TypeScript**, and I'm familiar with agentic AI frameworks including **LangChain, LangGraph**, and **MCP server** patterns, which shapes how I approach code review and architectural security assessments.

I hold an **MSc in Cyber Security (Distinction)** from the University of West London and a **BSc (Hons) in Information Technology** from the University of Moratuwa.

Outside paid work I compete on Hack The Box, contribute to CTF events, and mentor analysts breaking into the field. I'm pursuing OSCP and practical AI red-team certifications. This blog is where I publish reconnaissance guides, Linux hardening notes, AI/LLM security research, cloud attack-path analyses, application security findings, and incident-response walkthroughs.

---

## AI & Agentic Security

The agentic turn in AI, where models call tools, browse the web, write and execute code, and chain decisions across long context windows, has created a security discipline that barely existed three years ago. My focus areas:

- **Prompt injection & indirect injection:** attacker-controlled content reaching an agent through tool outputs, retrieved documents, email bodies, or web pages, hijacking its actions
- **Tool misuse & privilege escalation:** agents with over-permissioned tool access being manipulated into SSRF, data reads, or lateral movement through connected services
- **Principal hierarchy confusion:** multi-agent pipelines where a compromised or malicious sub-agent can escalate permissions or forge instructions to an orchestrator
- **RAG poisoning & retrieval manipulation:** corrupting knowledge bases so retrieved context steers model outputs toward attacker goals
- **Model supply-chain risks:** malicious weights, backdoored fine-tunes, unsafe serialisation formats (Pickle, SafeTensors boundary cases)
- **Data exfiltration via inference:** covert channels through token counts, timing, or benign-looking tool call parameters
- **MCP server security:** reviewing and hardening Model Context Protocol servers for tool-call abuse, scope creep, and authentication gaps

I map findings against the **OWASP Top 10 for LLM Applications** and the **MITRE ATLAS** framework, and build test harnesses that let teams continuously probe their pipelines as models and prompts change.

---

## Application Security & Secure SDLC

Security that lives only at the perimeter fails. My application security work is anchored in owning the full software development lifecycle so that security is designed in, not bolted on.

**Secure SDLC Ownership:** I help teams define lightweight, measurable SSDLC programmes: requirements gates, design checks, release criteria, and paved roads (reference architectures, secure templates, approved library lists). The goal is a security baseline engineers can actually follow rather than a checklist that gets skipped under deadline pressure.

**CI/CD Security Automation (Shift-left):** I own and operate AppSec toolchains integrated directly into pipelines: SAST (SonarQube, Semgrep, Checkmarx), DAST (OWASP ZAP, Burp Suite Enterprise), SCA/dependency scanning, secrets detection (Gitleaks, TruffleHog, Detect-Secrets), and IaC/container scanning. Risk-based gating with clear developer feedback, tuned rules, minimised false positives, and standardised triage with SLAs.

**Code Review & Secure Engineering Support:** Security-focused code reviews for critical areas: authentication and authorisation, session management, cryptography, data protection, input validation, and business logic. I write concise remediation guidance and secure-by-default code examples in Java, Python, Go, and TypeScript. I'm equally comfortable reviewing Spring Boot services, React frontends, and NPM supply-chain configurations.

**API & Service Security:** I lead API security programmes covering OAuth 2.0/OIDC flows, token lifecycle, rate limiting, schema validation, anti-abuse controls, secure error handling, and audit logging. I drive API testing through contract testing combined with targeted DAST and partner with platform teams on service-to-service authentication and mTLS.

**Secure Design Reviews & Threat Modelling:** Pragmatic threat modelling and design reviews for new features and major changes, producing actionable outputs: mitigations, prioritised backlog items, acceptance criteria, and test cases. I maintain running requirements for identity, sensitive data handling, and privacy-by-design across product areas.

**Supply Chain Security (SCA/SBOM):** I manage dependency risk through triage, upgrade strategies, deprecation guardrails, and automated policy enforcement. I establish SBOM generation pipelines, use SBOMs as evidence for assurance activities, and assess third-party components, SDKs, and provenance/attestation risks including NPM and PyPI supply-chain attack patterns.

**Vulnerability Lifecycle, SLAs & Metrics:** End-to-end ownership of findings from SAST, DAST, SCA, penetration tests, VDP/bug bounty programmes, and internal audits. I define remediation SLAs calibrated to severity, exploitability, and asset criticality; manage exceptions; verify fixes; and report metrics that matter: MTTD, MTTF, reopen rate, recurring vulnerability classes, coverage, and control effectiveness.

**Hands-on Testing:** Focused testing on high-risk areas: web applications, APIs, authentication flows, and mobile backends, to validate exploitability rather than rely solely on scanner output. I coordinate third-party penetration tests and ensure findings translate into prioritised engineering outcomes, not shelved reports.

---

## Cloud, DevOps & Site Reliability Security

Cloud-native and containerised estates require security that moves at the speed of deployment. I embed security across the entire delivery pipeline and infrastructure lifecycle.

**AWS** (primary): IAM hardening and least-privilege design at scale, GuardDuty, Security Hub, Config, CloudTrail analytics, EKS (Kubernetes) RBAC and network policies, container scanning with Trivy, Falco, and Aqua, Binary Authorization, and secure Terraform/Helm patterns. I provide technical guidance to development and platform teams on remediation and architecture improvements.

**Azure:** Sentinel playbooks and SIEM engineering, Defender for Cloud, Key Vault, Purview, Azure Pipelines security gates, Entra ID hardening.

**GCP:** Security Command Center, IAM, Cloud Armor, Binary Authorization, GKE security posture management.

**DevOps & Site Reliability Security:** Security integrated into GitOps workflows, deployment pipelines, and SRE practice, including observability for security signals (anomaly detection in SLO/SLI data), runbook security, chaos engineering guardrails, and blameless post-mortem processes that surface security findings. I understand the reliability-security tension and help teams make explicit, documented trade-offs rather than defaulting to one at the expense of the other.

**Secrets Management:** HashiCorp Vault, AWS Secrets Manager, Azure Key Vault, covering secret rotation, dynamic credentials, audit trails, and eliminating long-lived credentials from codebases and CI pipelines.

**IaC & Container Security:** Terraform and Helm security reviews, Kubernetes admission controllers, pod security standards, image signing (Cosign, Notary), and container registry policy enforcement.

---

## Technical Expertise

- **AI & Agentic Security:** LLM red-teaming, prompt injection (direct & indirect), agentic pipeline threat modelling, RAG security, MCP server security, tool-call security analysis, OWASP LLM Top 10, MITRE ATLAS, AI supply-chain risk, model behaviour auditing; familiar with LangChain, LangGraph, and common agentic orchestration patterns
- **Application Security:** SAST (SonarQube, Semgrep, Checkmarx), DAST (OWASP ZAP, Burp Suite), SCA/SBOM (Dependabot, Snyk, OWASP Dependency-Check, Syft, Grype), secrets scanning (Gitleaks, TruffleHog, Detect-Secrets), secure code review across Java/Spring Boot, Python, Go, TypeScript/React, NPM supply-chain hardening
- **Cloud & DevSecOps:** AWS IAM, GuardDuty, Security Hub, Config, CloudTrail; AWS EKS; Azure Sentinel, Defender for Cloud, Key Vault, Purview; GCP SCC, IAM, Cloud Armor, Binary Authorization; Kubernetes RBAC and network policies; Terraform, Helm, GitLab CI, Jenkins, GitHub Actions security gates
- **Secrets & Microservices Security:** HashiCorp Vault, AWS Secrets Manager, Azure Key Vault; service-mesh security (mTLS, Istio), API gateway hardening, microservice-to-microservice authorisation patterns
- **Container & Image Security:** Trivy, Falco, Aqua, Prowler, ScoutSuite; Cosign/Notary image signing; Kubernetes admission controllers and pod security standards
- **Threat Detection & Response:** SIEM engineering (Splunk, Sentinel, Elastic), threat hunting with MITRE ATT&CK, Sigma/YARA development, incident response, malware triage, timeline reconstruction
- **Offensive Toolkit:** Recon (Nmap, Amass, Subfinder, theHarvester, Shodan, Censys), web testing (Burp Suite, OWASP ZAP, SQLMap, Gobuster), exploitation (Metasploit, Cobalt Strike, BloodHound), cloud/container assessments (Prowler, ScoutSuite, Trivy, Falco, Aqua)
- **Programming & Automation:** Java and Spring Boot; Python for security automation and ML-based detection; Go for high-performance scanners and tooling; TypeScript/React with focus on frontend supply-chain and XSS patterns; Bash for hardening and log triage; PowerShell for AD and Windows defence
- **Frameworks & Standards:** MITRE ATT&CK, OWASP Testing Guide & LLM Top 10, PTES, NIST CSF, CIS Controls, ISO 27001/27002, GDPR, SOC 2, PCI DSS

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

## What I Offer

- **AI/LLM security assessments:** threat modelling, red-teaming, and hardening for agentic pipelines, RAG systems, MCP servers, and LLM-integrated applications
- **Application security programmes:** SAST/DAST/SCA toolchain setup and tuning, secure SDLC design, shift-left CI/CD security gates, and developer-facing remediation guidance
- **API & service security:** OAuth/OIDC reviews, token lifecycle hardening, API threat modelling, contract-based DAST, and service-to-service security design
- **Supply chain security:** SCA/SBOM programmes, dependency risk management, NPM/PyPI supply-chain hardening, and provenance/attestation controls
- **Penetration testing & adversary emulation** tailored to cloud-native and hybrid estates
- **DevSecOps & DevOps security transformations:** IaC reviews, CI/CD security gates, secrets management, container and image scanning, and pipeline hardening
- **Cloud security architecture:** AWS (EKS, IAM, GuardDuty, Security Hub), Azure, and GCP security posture reviews and remediation roadmaps
- **Threat detection uplift:** SIEM tuning, hunting runbooks, Sigma/YARA rule development, and incident-response playbooks
- **Site reliability security:** observability for security signals, runbook security, SLO/SLI anomaly detection design, and reliability/security trade-off frameworks
- **Workshops, talks, and mentorship** for teams entering cybersecurity, building secure AI systems, or integrating security into DevOps practices

Engagements are scoped collaboratively. Reach out to shape something that matches your risk profile.

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

Reach me on [LinkedIn](https://www.linkedin.com/in/dream4ip/) or [Twitter/X](https://twitter.com/haran_loga). I'm open to consulting engagements, conference talks, and collaborative research, particularly anything at the boundary of AI systems and offensive security.

</article>

<%= render("../_partials/footer.html") %>

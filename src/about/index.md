<%
    meta("../meta.json")
    meta()
    url = url + "/about/"
%>
<%= render("../_partials/header.html", { title, description, url }) %>

<article class="about-article">

# Who I am

I'm **Araharan Loganayagam**, a cybersecurity practitioner, researcher, and builder working at the intersection of offensive security, application security, cloud-native infrastructure, and AI systems security. My work spans adversary emulation, secure software development, DevSecOps, cloud security architecture, distributed systems hardening, and the emerging attack surface that autonomous AI agents are introducing into production environments.

I hold an **MSc in Cyber Security (Distinction)** from the University of West London and a **BSc (Hons) in Information Technology** from the University of Moratuwa. I read and write production code in **Java, Python, Go, and TypeScript**, and I work hands-on with agentic AI frameworks including **LangChain, LangGraph**, and **MCP server** patterns. This shapes how I approach code review, architectural threat modelling, and security assessments across the full stack. I am currently pursuing **OSCP** and **CAISP** certifications alongside practical AI red-team training.

Outside paid work I compete on Hack The Box, contribute to CTF events, and mentor analysts breaking into the field. This blog is where I publish reconnaissance guides, Linux hardening notes, AI/LLM security research, cloud attack-path analyses, application security findings, and incident-response walkthroughs.

---

<p class="about-label">THIS BLOG COVERS</p>

<div class="about-grid">
<div class="about-card about-card--icon"><span class="about-card__icon">🔬</span><div class="about-card__text"><p class="about-card__title">AI & LLM security research</p></div></div>
<div class="about-card about-card--icon"><span class="about-card__icon">🤖</span><div class="about-card__text"><p class="about-card__title">Agentic AI attack surfaces</p></div></div>
<div class="about-card about-card--icon"><span class="about-card__icon">🗡️</span><div class="about-card__text"><p class="about-card__title">Offensive security and adversary simulation</p></div></div>
<div class="about-card about-card--icon"><span class="about-card__icon">🔗</span><div class="about-card__text"><p class="about-card__title">Distributed systems and microservice security</p></div></div>
<div class="about-card about-card--icon"><span class="about-card__icon">🏗️</span><div class="about-card__text"><p class="about-card__title">Application security and secure SDLC</p></div></div>
<div class="about-card about-card--icon"><span class="about-card__icon">☁️</span><div class="about-card__text"><p class="about-card__title">Cloud and Kubernetes security</p></div></div>
<div class="about-card about-card--icon"><span class="about-card__icon">🐧</span><div class="about-card__text"><p class="about-card__title">Linux hardening and infrastructure defence</p></div></div>
<div class="about-card about-card--icon"><span class="about-card__icon">🔍</span><div class="about-card__text"><p class="about-card__title">Threat detection and incident response</p></div></div>
<div class="about-card about-card--icon"><span class="about-card__icon">⚙️</span><div class="about-card__text"><p class="about-card__title">DevSecOps engineering and automation</p></div></div>
<div class="about-card about-card--icon"><span class="about-card__icon">🗺️</span><div class="about-card__text"><p class="about-card__title">Reconnaissance methodologies and tooling</p></div></div>
<div class="about-card about-card--icon"><span class="about-card__icon">🏰</span><div class="about-card__text"><p class="about-card__title">Security architecture and real-world attack paths</p></div></div>
<div class="about-card about-card--icon"><span class="about-card__icon">🌐</span><div class="about-card__text"><p class="about-card__title">API gateway and service mesh security</p></div></div>
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

**Service-to-Service Authentication:** Implementing and auditing mTLS, SPIFFE/SPIRE identity frameworks, and certificate rotation strategies. I assess workload identity configurations to ensure services authenticate each other correctly and that compromised credentials cannot propagate laterally.

**API Gateway Security:** Hardening API gateways against bypass techniques, misconfigured routing, header injection, and authorisation enforcement gaps. I review rate limiting, schema validation, and anti-abuse controls at the gateway layer.

**Service Mesh Hardening:** Security reviews of Istio, Linkerd, and Envoy configurations including sidecar proxy policies, traffic encryption enforcement, access control lists, and observability for security signals within the mesh.

**Event-Driven Security:** Securing message brokers and event pipelines including Kafka ACL configurations, message queue poisoning prevention, schema registry integrity, and consumer group isolation. I assess event-driven architectures for replay attacks, message tampering, and unauthorised subscription risks.

**Lateral Movement and Confused Deputy:** Identifying lateral movement risks in microservice topologies including confused deputy attacks, internal SSRF chaining across services, and trust boundary violations where one service's permissions are exploited through another.

**gRPC and Async Protocol Attack Surfaces:** Reviewing gRPC service definitions, protobuf schema security, bidirectional streaming risks, and async protocol implementations for injection, deserialisation, and access control weaknesses.

**Secrets Sprawl in Distributed Manifests:** Detecting and remediating secrets embedded in Kubernetes manifests, Helm charts, environment variables, and configuration files across distributed deployments. I design centralised secrets management patterns using Vault injection, Sealed Secrets, and Mozilla SOPS.

**Zero-Trust Architecture:** Designing and reviewing zero-trust implementations where every service call is authenticated, authorised, and encrypted regardless of network position. I assess trust boundaries, identity propagation, and policy enforcement points across the service topology.

---

## Application Security & Secure SDLC

<p class="about-tagline">Building security into the development lifecycle, not bolting it on after.</p>

Security that lives only at the perimeter fails. My application security work is anchored in owning the full software development lifecycle so that security is designed in from the start.

**Secure SDLC Ownership:** I help teams define lightweight, measurable SSDLC programmes: requirements gates, design checks, release criteria, and paved roads including reference architectures, secure templates, and approved library lists. The goal is a security baseline engineers can actually follow rather than a checklist that gets skipped under deadline pressure.

**CI/CD Security Automation (Shift-Left):** I own and operate AppSec toolchains integrated directly into pipelines: SAST (SonarQube, Semgrep, Checkmarx), DAST (OWASP ZAP, Burp Suite Enterprise), SCA and dependency scanning, secrets detection (Gitleaks, TruffleHog, Detect-Secrets), and IaC/container scanning. This includes risk-based gating with clear developer feedback, tuned rules, minimised false positives, and standardised triage with SLAs.

**Code Review & Secure Engineering Support:** Security-focused code reviews for critical areas: authentication and authorisation, session management, cryptography, data protection, input validation, and business logic. I write concise remediation guidance and secure-by-default code examples in Java, Python, Go, and TypeScript.

**API & Service Security:** I lead API security programmes covering OAuth 2.0/OIDC flows, token lifecycle, rate limiting, schema validation, anti-abuse controls, secure error handling, and audit logging. I drive API testing through contract testing combined with targeted DAST and partner with platform teams on service-to-service authentication and mTLS.

**Secure Design Reviews & Threat Modelling:** Pragmatic threat modelling and design reviews for new features and major changes, producing actionable outputs: mitigations, prioritised backlog items, acceptance criteria, and test cases.

**Supply Chain Security (SCA/SBOM):** I manage dependency risk through triage, upgrade strategies, deprecation guardrails, and automated policy enforcement. I establish SBOM generation pipelines and assess third-party components, SDKs, and provenance/attestation risks including NPM and PyPI supply-chain attack patterns.

**Vulnerability Lifecycle, SLAs & Metrics:** End-to-end ownership of findings from SAST, DAST, SCA, penetration tests, VDP/bug bounty programmes, and internal audits. I define remediation SLAs calibrated to severity, exploitability, and asset criticality. I manage exceptions, verify fixes, and report metrics that matter: MTTD, MTTF, reopen rate, recurring vulnerability classes, coverage, and control effectiveness.

**Hands-on Testing:** Focused testing on high-risk areas: web applications, APIs, authentication flows, and mobile backends. The purpose is to validate exploitability rather than rely solely on scanner output. I coordinate third-party penetration tests and ensure findings translate into prioritised engineering outcomes.

---

## Cloud, DevOps & Site Reliability Security

<p class="about-tagline">Embedding security across the 4C model: Cloud, Cluster, Container, Code.</p>

Cloud-native and containerised estates require security that moves at the speed of deployment. I embed security across the entire delivery pipeline and infrastructure lifecycle.

**AWS** (primary): IAM hardening and least-privilege design at scale, GuardDuty, Security Hub, Config, CloudTrail analytics, EKS (Kubernetes) RBAC and network policies, container scanning with Trivy, Falco, and Aqua, Binary Authorization, and secure Terraform/Helm patterns.

**Azure:** Sentinel playbooks and SIEM engineering, Defender for Cloud, Key Vault, Purview, Azure Pipelines security gates, and Entra ID hardening.

**GCP:** Security Command Center, IAM, Cloud Armor, Binary Authorization, and GKE security posture management.

**Kubernetes & Container Security:** Deep expertise across the Kubernetes security lifecycle. Container fundamentals including namespaces, cgroups, capabilities, Seccomp profiles, and distroless image hardening. Kubernetes-specific assessments covering Kubelet API exploitation, privileged container abuse, dashboard attack vectors, kube-hunter reconnaissance, secret extraction, and network sniffing. RBAC auditing with KubiScan and Krane, admission controller enforcement via OPA Gatekeeper, Kube-mgmt, Pod Security Admission, and LimitRanger. Data protection through Vault injection, Sealed Secrets, Mozilla SOPS, and KMS-backed secrets at rest encryption. Network segmentation using Calico, Istio mTLS, Linkerd, Consul Connect zero-trust, and NGINX ingress policies. Runtime security and compliance monitoring with Falco, gVisor, Wazuh, CIS benchmarks via Kubebench, and audit log threat hunting.

**DevOps & Site Reliability Security:** Security integrated into GitOps workflows, deployment pipelines, and SRE practice. This includes observability for security signals (anomaly detection in SLO/SLI data), runbook security, chaos engineering guardrails, and blameless post-mortem processes that surface security findings.

**Secrets Management:** HashiCorp Vault, AWS Secrets Manager, and Azure Key Vault, covering secret rotation, dynamic credentials, audit trails, and eliminating long-lived credentials from codebases and CI pipelines.

**IaC & Container Security:** Terraform and Helm security reviews, Kubernetes admission controllers, pod security standards, image signing (Cosign, Notary), and container registry policy enforcement.

---

## Technical Expertise

<div class="about-grid">
<div class="about-card"><p class="about-card__title">AI & Agentic Security</p><p class="about-card__desc">LLM red-teaming, prompt injection, agentic pipeline threat modelling, RAG security, MCP server security, tool-call analysis, OWASP LLM Top 10, MITRE ATLAS, AI supply chain, model behaviour auditing, LangChain, LangGraph</p></div>
<div class="about-card"><p class="about-card__title">AI Governance</p><p class="about-card__desc">NIST AI RMF, ISO/IEC 42001, SLSA, SCVS, EU AI Act, US AI legislation</p></div>
<div class="about-card"><p class="about-card__title">Distributed Systems Security</p><p class="about-card__desc">mTLS, SPIFFE/SPIRE, Istio, Linkerd, Envoy, API gateway hardening, Kafka ACLs, gRPC security, zero-trust architecture</p></div>
<div class="about-card"><p class="about-card__title">Application Security</p><p class="about-card__desc">SAST (SonarQube, Semgrep, Checkmarx), DAST (ZAP, Burp Suite), SCA/SBOM (Dependabot, Snyk, Syft, Grype), secrets scanning, secure code review across Java, Python, Go, TypeScript</p></div>
<div class="about-card"><p class="about-card__title">Cloud & DevSecOps</p><p class="about-card__desc">AWS IAM, GuardDuty, Security Hub, CloudTrail, EKS; Azure Sentinel, Defender, Key Vault; GCP SCC, Cloud Armor; Terraform, Helm, GitHub Actions security gates</p></div>
<div class="about-card"><p class="about-card__title">Kubernetes & Container Security</p><p class="about-card__desc">Kubelet exploitation, kube-hunter, KubiScan, OPA Gatekeeper, Pod Security Admission, Trivy, Falco, gVisor, Aqua, Cosign/Notary, Calico, CIS benchmarks, Kubebench</p></div>
<div class="about-card"><p class="about-card__title">Threat Detection & Response</p><p class="about-card__desc">SIEM engineering (Splunk, Sentinel, Elastic), MITRE ATT&CK, Sigma/YARA development, incident response, malware triage, timeline reconstruction</p></div>
<div class="about-card"><p class="about-card__title">Offensive Toolkit</p><p class="about-card__desc">Nmap, Amass, Subfinder, Shodan, Censys, Burp Suite, SQLMap, Gobuster, Metasploit, Cobalt Strike, BloodHound, Prowler, ScoutSuite</p></div>
<div class="about-card"><p class="about-card__title">Programming & Automation</p><p class="about-card__desc">Java/Spring Boot, Python, Go, TypeScript/React, Bash, PowerShell</p></div>
<div class="about-card"><p class="about-card__title">Frameworks & Standards</p><p class="about-card__desc">MITRE ATT&CK, MITRE ATLAS, OWASP Testing Guide, OWASP LLM Top 10, PTES, NIST CSF, NIST AI RMF, CIS Controls, ISO 27001/27002, ISO/IEC 42001, SLSA, SCVS, GDPR, SOC 2, PCI DSS</p></div>
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

## What I Offer

<div class="about-grid">
<div class="about-card"><p class="about-card__title">AI/LLM security assessments</p><p class="about-card__desc">Threat modelling, red-teaming, and hardening for agentic pipelines, RAG systems, MCP servers, and LLM-integrated applications</p></div>
<div class="about-card"><p class="about-card__title">Application security programmes</p><p class="about-card__desc">SAST/DAST/SCA toolchain setup, secure SDLC design, shift-left CI/CD gates, and developer-facing remediation guidance</p></div>
<div class="about-card"><p class="about-card__title">API and service security</p><p class="about-card__desc">OAuth/OIDC reviews, token lifecycle hardening, API threat modelling, and service-to-service security design</p></div>
<div class="about-card"><p class="about-card__title">Distributed system reviews</p><p class="about-card__desc">mTLS and identity framework audits, service mesh hardening, event-driven pipeline security, zero-trust assessments</p></div>
<div class="about-card"><p class="about-card__title">Supply chain security</p><p class="about-card__desc">SCA/SBOM programmes, MLBOM for AI models, dependency risk management, provenance and attestation controls</p></div>
<div class="about-card"><p class="about-card__title">Penetration testing</p><p class="about-card__desc">Adversary emulation tailored to cloud-native, containerised, and hybrid estates</p></div>
<div class="about-card"><p class="about-card__title">DevSecOps transformations</p><p class="about-card__desc">IaC reviews, CI/CD security gates, secrets management, container and image scanning, pipeline hardening</p></div>
<div class="about-card"><p class="about-card__title">Cloud and Kubernetes security</p><p class="about-card__desc">AWS, Azure, and GCP posture reviews, Kubernetes hardening, and remediation roadmaps</p></div>
<div class="about-card"><p class="about-card__title">Threat detection uplift</p><p class="about-card__desc">SIEM tuning, hunting runbooks, Sigma/YARA rule development, and incident-response playbooks</p></div>
<div class="about-card"><p class="about-card__title">Site reliability security</p><p class="about-card__desc">Observability for security signals, runbook security, SLO/SLI anomaly detection, reliability/security trade-offs</p></div>
<div class="about-card"><p class="about-card__title">Workshops and mentorship</p><p class="about-card__desc">For teams entering cybersecurity, building secure AI systems, or integrating security into DevOps practices</p></div>
</div>

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

Reach me on [LinkedIn](https://www.linkedin.com/in/dream4ip/) or [Twitter/X](https://twitter.com/haran_loga). I'm open to consulting engagements, conference talks, and collaborative research, particularly anything at the boundary of AI systems, distributed infrastructure, and offensive security.

</article>

<%= render("../_partials/footer.html") %>

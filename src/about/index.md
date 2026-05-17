<%
    meta("../meta.json")
    meta()
    url = url + "/about/"
%>
<%= render("../_partials/header.html", { title, description, url }) %>

<article class="about-article">

# Who I am

I'm **Araharan Loganayagam**, a cybersecurity practitioner, researcher, and builder working at the intersection of offensive security, application security, cloud-native infrastructure, and AI systems security. My work spans adversary emulation, secure software development, DevSecOps, cloud security architecture, distributed systems hardening, and the fast-moving attack surface that autonomous AI agents are introducing into production environments.

I hold an **MSc in Cyber Security (Distinction)** from the University of West London and a **BSc (Hons) in Information Technology** from the University of Moratuwa. I read and write production code in **Java, Python, Go, and TypeScript**, and I work hands-on with agentic AI frameworks including **LangChain, LangGraph**, and **MCP server** patterns. This shapes how I approach code review, architectural threat modelling, and security assessments across the full stack. I am currently pursuing **OSCP** and **CAISP** certifications alongside practical AI red-team training.

Outside paid work I compete on Hack The Box, contribute to CTF events, and mentor analysts breaking into the field. This blog is where I publish reconnaissance guides, Linux hardening notes, AI/LLM security research, cloud attack-path analyses, application security findings, and incident-response walkthroughs.

---

## AI & Agentic Security

*Securing intelligent systems from prompt to production.*

Agentic AI systems, where models call tools, browse the web, write and execute code, and chain decisions across long context windows, have created a security discipline that barely existed three years ago. I research, red-team, and build hardening playbooks for these systems across the following focus areas.

**Prompt Injection and Indirect Injection:** Attacker-controlled content reaching an agent through tool outputs, retrieved documents, email bodies, or web pages to hijack its actions. I distinguish between direct prompt injection (user-facing input manipulation) and indirect injection (content embedded in data sources the model retrieves at runtime), and build detection and mitigation strategies for both.

**Tool Misuse and Privilege Escalation:** Agents with over-permissioned tool access being manipulated into SSRF, unauthorised data reads, or lateral movement through connected services. I assess tool-call boundaries, scope creep risks, and sandbox escape vectors in agentic pipelines.

**Principal Hierarchy Confusion:** Multi-agent pipelines where a compromised or malicious sub-agent escalates permissions, forges instructions to an orchestrator, or exploits confused deputy relationships between agents with different trust levels.

**RAG Poisoning and Retrieval Manipulation:** Corrupting knowledge bases so that retrieved context steers model outputs toward attacker goals. I test retrieval pipelines for poisoning resilience and design filtering and provenance controls for ingested content.

**Inference-Time Data Exfiltration:** Covert channels through token counts, timing side-channels, steganographic encoding in outputs, or benign-looking tool-call parameters that leak sensitive data from the model's context window.

**AI Supply Chain Security:** Malicious weights, backdoored fine-tunes, unsafe serialisation formats (Pickle, SafeTensors boundary cases), trojanised model research (BackdoorBox, ROME techniques), package masquerading via generative AI, and MLBOM (Machine Learning Bill of Materials) for model provenance. I assess model signing with Cosign and verify supply chain integrity across dataset, model, and infrastructure layers.

**MCP Server Security:** Reviewing and hardening Model Context Protocol servers for tool-call abuse, scope creep, authentication gaps, and unintended capability exposure.

**AI Threat Modelling:** Applying STRIDE to LLM data flow diagrams, leveraging the BIML Risk Framework, AI Risk Repository, and AI Incident Database to identify and prioritise threats specific to AI-integrated systems.

**AI Firewalls and Guardrails:** Implementing and evaluating LLM Guard, prompt sanitisation layers, and input/output filtering to reduce attack surface at the application boundary.

**Emerging Threats:** Tracking self-propagating model worms, AI-assisted firmware attacks, autonomous agent abuse paths, models distributed without provenance, and backdoors introduced during fine-tuning.

I map findings against the **OWASP Top 10 for LLM Applications** (covering prompt injection, insecure output handling, training data poisoning, model denial of service, supply chain vulnerabilities, sensitive information disclosure, insecure plugin design, excessive agency, overreliance, and model theft) and all 14 **MITRE ATLAS** tactics (from reconnaissance and resource development through ML model access, ML attack staging, and impact). I build test harnesses that let teams continuously probe their pipelines as models and prompts evolve.

**AI Governance and Compliance:** Familiar with NIST AI RMF, ISO/IEC 42001, SLSA, SCVS, the EU AI Act, and emerging US AI legislation. I help teams align AI security practices with regulatory and standards requirements.

---

## Distributed Systems & Microservice Security

*Securing the communication fabric between services.*

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

*Building security into the development lifecycle, not bolting it on after.*

Security that lives only at the perimeter fails. My application security work is anchored in owning the full software development lifecycle so that security is designed in from the start.

**Secure SDLC Ownership:** I help teams define lightweight, measurable SSDLC programmes: requirements gates, design checks, release criteria, and paved roads including reference architectures, secure templates, and approved library lists. The goal is a security baseline engineers can actually follow rather than a checklist that gets skipped under deadline pressure.

**CI/CD Security Automation (Shift-Left):** I own and operate AppSec toolchains integrated directly into pipelines: SAST (SonarQube, Semgrep, Checkmarx), DAST (OWASP ZAP, Burp Suite Enterprise), SCA and dependency scanning, secrets detection (Gitleaks, TruffleHog, Detect-Secrets), and IaC/container scanning. This includes risk-based gating with clear developer feedback, tuned rules, minimised false positives, and standardised triage with SLAs.

**Code Review & Secure Engineering Support:** Security-focused code reviews for critical areas: authentication and authorisation, session management, cryptography, data protection, input validation, and business logic. I write concise remediation guidance and secure-by-default code examples in Java, Python, Go, and TypeScript. I am equally comfortable reviewing Spring Boot services, React frontends, and NPM supply-chain configurations.

**API & Service Security:** I lead API security programmes covering OAuth 2.0/OIDC flows, token lifecycle, rate limiting, schema validation, anti-abuse controls, secure error handling, and audit logging. I drive API testing through contract testing combined with targeted DAST and partner with platform teams on service-to-service authentication and mTLS.

**Secure Design Reviews & Threat Modelling:** Pragmatic threat modelling and design reviews for new features and major changes, producing actionable outputs: mitigations, prioritised backlog items, acceptance criteria, and test cases. I maintain running requirements for identity, sensitive data handling, and privacy-by-design across product areas.

**Supply Chain Security (SCA/SBOM):** I manage dependency risk through triage, upgrade strategies, deprecation guardrails, and automated policy enforcement. I establish SBOM generation pipelines, use SBOMs as evidence for assurance activities, and assess third-party components, SDKs, and provenance/attestation risks including NPM and PyPI supply-chain attack patterns.

**Vulnerability Lifecycle, SLAs & Metrics:** End-to-end ownership of findings from SAST, DAST, SCA, penetration tests, VDP/bug bounty programmes, and internal audits. I define remediation SLAs calibrated to severity, exploitability, and asset criticality. I manage exceptions, verify fixes, and report metrics that matter: MTTD, MTTF, reopen rate, recurring vulnerability classes, coverage, and control effectiveness.

**Hands-on Testing:** Focused testing on high-risk areas: web applications, APIs, authentication flows, and mobile backends. The purpose is to validate exploitability rather than rely solely on scanner output. I coordinate third-party penetration tests and ensure findings translate into prioritised engineering outcomes, not shelved reports.

---

## Cloud, DevOps & Site Reliability Security

*Embedding security across the 4C model: Cloud, Cluster, Container, Code.*

Cloud-native and containerised estates require security that moves at the speed of deployment. I embed security across the entire delivery pipeline and infrastructure lifecycle.

**AWS** (primary): IAM hardening and least-privilege design at scale, GuardDuty, Security Hub, Config, CloudTrail analytics, EKS (Kubernetes) RBAC and network policies, container scanning with Trivy, Falco, and Aqua, Binary Authorization, and secure Terraform/Helm patterns. I provide technical guidance to development and platform teams on remediation and architecture improvements.

**Azure:** Sentinel playbooks and SIEM engineering, Defender for Cloud, Key Vault, Purview, Azure Pipelines security gates, and Entra ID hardening.

**GCP:** Security Command Center, IAM, Cloud Armor, Binary Authorization, and GKE security posture management.

**Kubernetes & Container Security:** Deep expertise across the Kubernetes security lifecycle. Container fundamentals including namespaces, cgroups, capabilities, Seccomp profiles, and distroless image hardening. Kubernetes-specific assessments covering Kubelet API exploitation, privileged container abuse, dashboard attack vectors, kube-hunter reconnaissance, secret extraction, and network sniffing. RBAC auditing with KubiScan and Krane, admission controller enforcement via OPA Gatekeeper, Kube-mgmt, Pod Security Admission, and LimitRanger. Data protection through Vault injection, Sealed Secrets, Mozilla SOPS, and KMS-backed secrets at rest encryption. Network segmentation using Calico, Istio mTLS, Linkerd, Consul Connect zero-trust, and NGINX ingress policies. Runtime security and compliance monitoring with Falco, gVisor, Wazuh, CIS benchmarks via Kubebench, and audit log threat hunting. Supply chain hardening against poisoned image and Helm chart attacks using Binary Authorization and image signing.

**DevOps & Site Reliability Security:** Security integrated into GitOps workflows, deployment pipelines, and SRE practice. This includes observability for security signals (anomaly detection in SLO/SLI data), runbook security, chaos engineering guardrails, and blameless post-mortem processes that surface security findings. I understand the reliability-security tension and help teams make explicit, documented trade-offs rather than defaulting to one at the expense of the other.

**Secrets Management:** HashiCorp Vault, AWS Secrets Manager, and Azure Key Vault, covering secret rotation, dynamic credentials, audit trails, and eliminating long-lived credentials from codebases and CI pipelines.

**IaC & Container Security:** Terraform and Helm security reviews, Kubernetes admission controllers, pod security standards, image signing (Cosign, Notary), and container registry policy enforcement.

---

## Technical Expertise

- **AI & Agentic Security:** LLM red-teaming, prompt injection (direct and indirect), agentic pipeline threat modelling, RAG security, MCP server security, tool-call security analysis, inference-time exfiltration, sandbox escapes, AI firewalls (LLM Guard, prompt sanitisation), OWASP LLM Top 10, MITRE ATLAS (all 14 tactics), AI supply-chain risk (MLBOM, model signing, trojanised models), AI threat modelling (STRIDE for LLMs, BIML Risk Framework), model behaviour auditing; familiar with LangChain, LangGraph, and common agentic orchestration patterns
- **AI Governance:** NIST AI RMF, ISO/IEC 42001, SLSA, SCVS, EU AI Act, US AI legislation
- **Distributed Systems Security:** mTLS, SPIFFE/SPIRE, service mesh hardening (Istio, Linkerd, Envoy), API gateway security, event-driven security (Kafka ACLs, message queue integrity), gRPC and async protocol security, zero-trust architecture, confused deputy and lateral movement assessment
- **Application Security:** SAST (SonarQube, Semgrep, Checkmarx), DAST (OWASP ZAP, Burp Suite), SCA/SBOM (Dependabot, Snyk, OWASP Dependency-Check, Syft, Grype), secrets scanning (Gitleaks, TruffleHog, Detect-Secrets), secure code review across Java/Spring Boot, Python, Go, TypeScript/React, NPM supply-chain hardening
- **Cloud & DevSecOps:** AWS IAM, GuardDuty, Security Hub, Config, CloudTrail; AWS EKS; Azure Sentinel, Defender for Cloud, Key Vault, Purview; GCP SCC, IAM, Cloud Armor, Binary Authorization; Kubernetes RBAC and network policies; Terraform, Helm, GitLab CI, Jenkins, GitHub Actions security gates
- **Kubernetes & Container Security:** Container fundamentals (namespaces, cgroups, capabilities, Seccomp), Kubelet API exploitation, kube-hunter, KubiScan, Krane, OPA Gatekeeper, Pod Security Admission, Trivy, Falco, gVisor, Aqua, Prowler, ScoutSuite; Cosign/Notary image signing; Calico, Istio mTLS, Linkerd network policies; CIS benchmarks, Kubebench, Wazuh; Vault injection, Sealed Secrets, Mozilla SOPS
- **Secrets & Microservices Security:** HashiCorp Vault, AWS Secrets Manager, Azure Key Vault; service-mesh security (mTLS, Istio, SPIFFE/SPIRE), API gateway hardening, microservice-to-microservice authorisation patterns
- **Threat Detection & Response:** SIEM engineering (Splunk, Sentinel, Elastic), threat hunting with MITRE ATT&CK, Sigma/YARA development, incident response, malware triage, timeline reconstruction
- **Offensive Toolkit:** Recon (Nmap, Amass, Subfinder, theHarvester, Shodan, Censys), web testing (Burp Suite, OWASP ZAP, SQLMap, Gobuster), exploitation (Metasploit, Cobalt Strike, BloodHound), cloud/container assessments (Prowler, ScoutSuite, Trivy, Falco, Aqua, kube-hunter)
- **Programming & Automation:** Java and Spring Boot; Python for security automation and ML-based detection; Go for high-performance scanners and tooling; TypeScript/React with focus on frontend supply-chain and XSS patterns; Bash for hardening and log triage; PowerShell for AD and Windows defence
- **Frameworks & Standards:** MITRE ATT&CK, MITRE ATLAS, OWASP Testing Guide, OWASP LLM Top 10, PTES, NIST CSF, NIST AI RMF, CIS Controls, ISO 27001/27002, ISO/IEC 42001, SLSA, SCVS, GDPR, SOC 2, PCI DSS

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
- **API and service security:** OAuth/OIDC reviews, token lifecycle hardening, API threat modelling, contract-based DAST, and service-to-service security design
- **Distributed system and microservice security reviews:** mTLS and identity framework audits, service mesh hardening, event-driven pipeline security, and zero-trust architecture assessments
- **Supply chain security:** SCA/SBOM programmes, dependency risk management, NPM/PyPI supply-chain hardening, MLBOM for AI models, and provenance/attestation controls
- **Penetration testing and adversary emulation** tailored to cloud-native, containerised, and hybrid estates
- **DevSecOps and DevOps security transformations:** IaC reviews, CI/CD security gates, secrets management, container and image scanning, and pipeline hardening
- **Cloud and Kubernetes security architecture:** AWS (EKS, IAM, GuardDuty, Security Hub), Azure, and GCP security posture reviews, Kubernetes hardening, and remediation roadmaps
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

Reach me on [LinkedIn](https://www.linkedin.com/in/dream4ip/) or [Twitter/X](https://twitter.com/haran_loga). I'm open to consulting engagements, conference talks, and collaborative research, particularly anything at the boundary of AI systems, distributed infrastructure, and offensive security.

</article>

<%= render("../_partials/footer.html") %>

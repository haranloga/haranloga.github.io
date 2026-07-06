<%
    meta("../meta.json")
    meta()
    url = url + "/about/"
%>
<%= render("../_partials/header.html", { title, description, url }) %>

<article class="about-article">

# Who I am

I'm **Araharan Loganayagam** - a product builder, cybersecurity practitioner, and researcher working at the intersection of offensive security, application security, cloud-native infrastructure, and AI systems security. My work spans application development, application security engineering, adversary emulation, cloud security, DevSecOps, site reliability, and the rapidly evolving attack surface that autonomous AI agents are introducing into production environments.

Over the past few years, I've watched agentic AI systems - LLM orchestrators, tool-using agents, RAG pipelines, and multi-agent frameworks - open up attack classes that traditional security tooling largely ignores. Prompt injection, indirect injection through retrieval, principal-hierarchy confusion, tool misuse, and data exfiltration via benign-looking function calls are not theoretical concerns. I research these patterns, red-team deployed AI applications, and build detection and hardening playbooks that engineering teams can actually use.

On the classical security side, I work across application security architecture, cloud security architecture, SIEM engineering, threat hunting, and red-team operations against hybrid and containerised estates. I read and write code in **Java, Python, Go, and TypeScript**, and I'm comfortable auditing everything from Spring Boot microservices to React frontends and their NPM supply chains. I hold an **MSc in Cyber Security (Distinction)** from the University of West London and a **BSc (Hons) in Information Technology** from the University of Moratuwa.

Outside of paid work, I compete on Hack The Box, contribute to CTF events, and mentor analysts breaking into the field. I'm currently pursuing OSCP and practical AI red-team certifications. This blog is where I publish reconnaissance guides, application and distributed systems security research, Linux hardening notes, AI/LLM security findings, cloud attack-path analyses, and incident-response walkthroughs.

---

## AI & Agentic Security

The agentic turn in AI - where models call tools, browse the web, write and execute code, and chain decisions across long context windows - has created a security discipline that barely existed three years ago. I work hands-on with agentic frameworks such as **LangChain and LangGraph**, which gives me an engineer's view of the attack surface, not just an auditor's. My focus areas:

- **Prompt injection & indirect injection** - attacker-controlled content reaching an agent through tool outputs, retrieved documents, email bodies, or web pages, hijacking its actions
- **Tool misuse & privilege escalation** - agents with over-permissioned tool access being manipulated into SSRF, data reads, or lateral movement through connected services
- **Principal hierarchy confusion** - multi-agent pipelines where a compromised or malicious sub-agent can escalate permissions or forge instructions to an orchestrator
- **RAG poisoning & retrieval manipulation** - corrupting knowledge bases so retrieved context steers model outputs toward attacker goals
- **Model supply-chain risks** - malicious weights, backdoored fine-tunes, unsafe serialisation formats (Pickle, SafeTensors boundary cases)
- **Data exfiltration via inference** - covert channels through token counts, timing, or benign-looking tool call parameters

I map findings against the **OWASP Top 10 for LLM Applications** and the **MITRE ATLAS** framework, and build test harnesses that let teams continuously probe their pipelines as models and prompts change.

---

## Application Security Engineering

Beyond finding vulnerabilities, I build the systems and processes that stop them shipping in the first place:

- **Secure SDLC ownership** - defining lightweight, measurable SSDLC practices (requirements, design checks, guidance, release criteria) and establishing "paved roads": reference architectures, secure templates, and approved libraries and patterns
- **CI/CD security automation (shift-left)** - owning the AppSec toolchain across SAST, DAST, SCA, secrets detection, and IaC/container scanning; integrating risk-based gating with clear developer feedback; tuning rules, cutting false positives, and standardising triage with tickets, auto-routing, and SLAs
- **Security code review & secure engineering support** - reviewing critical areas (authentication, authorisation, sessions, crypto, data protection, input validation, business logic) and providing remediation guidance with concrete code and design examples
- **API & service security** - OAuth/OIDC, token handling, rate limiting, schema validation, anti-abuse, secure error handling, logging and monitoring; contract-based API testing plus targeted DAST; service-to-service security in microservice estates
- **Secure design reviews & threat modelling** - pragmatic threat models for new features and changes, producing actionable outputs: mitigations, backlog items, acceptance criteria, and test cases, with privacy-by-design requirements for identity and sensitive data
- **Supply chain security (SCA/SBOM)** - dependency risk management (triage, upgrade strategies, deprecations, guardrails), SBOM generation and use for assurance evidence, and assessment of third-party components, SDKs, and provenance/attestation risks
- **Vulnerability lifecycle, SLAs & metrics** - intake and triage across tools, pen tests, VDP/bug bounty, and internal findings; remediation SLAs by severity, exploitability, and asset criticality; meaningful metrics such as MTTD, MTTR, reopen rate, recurring vulnerability classes, and control effectiveness
- **Hands-on targeted testing** - focused, risk-based testing on high-risk areas (web, APIs, mobile and auth flows) to validate real exploitability, and coordinating third-party testing so findings translate into prioritised engineering outcomes

---

## Technical Expertise

- **AI & Agentic Security** - LLM red-teaming, prompt injection (direct & indirect), agentic pipeline threat modelling (LangChain, LangGraph, MCP), RAG security, tool-call security analysis, OWASP LLM Top 10, MITRE ATLAS, AI supply-chain risk, model behaviour auditing
- **Application Security** - SAST (Semgrep, SonarQube, CodeQL), DAST (Burp Suite, OWASP ZAP), SCA and SBOM tooling, secrets scanning and secrets management (Vault, cloud KMS/Key Vault), secure code review, API security (OAuth/OIDC), microservices and service-to-service security, frontend and NPM supply-chain security
- **Cloud & DevSecOps** - AWS IAM hardening and cloud identity at scale, GuardDuty, Security Hub, Config, CloudTrail analytics; Azure Sentinel playbooks, Defender for Cloud, Key Vault, Purview; GCP SCC, IAM, Cloud Armor, Binary Authorization; Kubernetes (EKS) RBAC and network policies, container image scanning; Terraform and Helm secure IaC; GitLab CI and Jenkins security gates; cloud-native observability and site reliability practices
- **Threat Detection & Response** - SIEM engineering (Splunk, Sentinel, Elastic), threat hunting with MITRE ATT&CK, Sigma/YARA development, incident response, malware triage, timeline reconstruction
- **Offensive Toolkit** - Recon (Nmap, Amass, Subfinder, theHarvester, Shodan, Censys), web testing (Burp Suite, OWASP ZAP, SQLMap, Gobuster), exploitation (Metasploit, Cobalt Strike, BloodHound), cloud/container assessments (Prowler, ScoutSuite, Trivy, Falco, Aqua)
- **Programming & Automation** - Java (Spring Boot) and TypeScript (React, Node) for application development and security review, Python for security automation and ML-based detection, Go for high-performance scanners and cloud-native tooling, Bash for hardening and log triage, PowerShell for AD and Windows defence
- **Frameworks & Standards** - MITRE ATT&CK, OWASP Testing Guide & LLM Top 10, PTES, NIST CSF, CIS Controls, ISO 27001/27002, GDPR, SOC 2, PCI DSS

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

- **AI/LLM security assessments** - threat modelling, red-teaming, and hardening for agentic pipelines, RAG systems, MCP servers, and LLM-integrated applications
- **Application security engineering** - secure SDLC design, CI/CD security automation (SAST, DAST, SCA, secrets, IaC), security code review, API security, threat modelling, and vulnerability lifecycle management
- **Penetration testing & adversary emulation** tailored to cloud-native and hybrid estates
- **DevSecOps & platform transformations** covering IaC reviews, CI/CD security gates, secrets management, container security, and supply-chain hardening (SCA/SBOM)
- **DevOps & site reliability engineering** - build and release pipelines, Kubernetes operations, infrastructure as code, observability, and reliability practices that keep secure systems running
- **Threat detection uplift** - SIEM tuning, hunting runbooks, Sigma/YARA rule development, and incident-response playbooks
- **Workshops, talks, and mentorship** for teams entering cybersecurity or integrating AI responsibly

Engagements are scoped collaboratively - reach out to shape something that matches your risk profile.

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

Reach me on [LinkedIn](https://www.linkedin.com/in/dream4ip/) or [Twitter/X](https://twitter.com/haran_loga). I'm open to consulting engagements, conference talks, and collaborative research - particularly anything at the boundary of AI systems and offensive security.

</article>

<%= render("../_partials/footer.html") %>

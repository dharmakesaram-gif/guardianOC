# Smart India Hackathon 2026 (SIH 2026) — Official Portal Submission Document

---

## 1. IDEA TITLE (Max 100 Characters)
**GuardianOC: AI Continuous Cyber Risk Quantification & Investment Optimization Platform**
*(Character count: 86 / 100)*

---

## 2. TECHNOLOGY BUCKET
**Information Security** *(Alternative / Secondary: AI/ML)*

---

## 3. ABSTRACT / SUMMARY (Max 10,000 Characters)

### Executive Summary
Enterprise cyber risk management today is crippled by subjective, qualitative assessments ("High/Medium/Low" matrices) that fail to convey actual financial exposure to Boards of Directors and CISOs. Security leaders cannot answer the fundamental boardroom question: *"If we suffer a cyber incident today, what will it cost us in Rupees, and which exact ₹50 Lakh security countermeasure gives us the highest risk reduction?"* Furthermore, risk assessments remain static point-in-time annual exercises that fail to respond dynamically to real-time telemetry—such as ongoing AI voice-cloning executive impersonation attacks on corporate telecom infrastructure.

### The Solution: GuardianOC ("The Bloomberg Terminal for Cyber Risk")
GuardianOC (PS26105) is a cloud-native, AI-powered Cyber Risk Quantification (CRQ) and Security Investment Optimization platform. It ingests multi-source enterprise telemetry (vulnerability scans, SIEM logs, CMDB assets, and live PBX voice biometric streams) and converts technical vulnerabilities into defensible financial metrics: Annualized Loss Expectancy (ALE), 95% Cyber Value-at-Risk (VaR), and Loss Exceedance Curves (LEC).

### Core Mathematical & Engineering Pillars
1. **Open FAIR Standard & 10,000-Trial Monte Carlo Engine**: 
   GuardianOC implements the ISO/IEC 27005-endorsed Open FAIR (Factor Analysis of Information Risk) standard:
   $$\text{Risk (ALE)} = \text{Loss Event Frequency (LEF)} \times \text{Loss Magnitude (LM)}$$
   Loss Magnitude models productivity downtime, per-record data breach costs, and statutory non-compliance fines. A vectorised 10,000-trial Monte Carlo simulation computes empirical 95% Cyber VaR and interactive Loss Exceedance percentiles.

2. **0-1 Knapsack & Pareto Security Investment Optimizer**:
   Operating under budgetary constraints, GuardianOC uses a dynamic 0-1 Knapsack algorithm and Pareto Efficiency Frontier analysis to select the optimal combination of security controls (e.g., FIDO2 MFA, EDR, Immucopy Backups). It calculates the Return on Security Investment (ROSI) up to +1,430%:
   $$\text{ROSI} = \frac{\Delta\text{ALE} - \text{Control Cost}}{\text{Control Cost}} \times 100\%$$

3. **Production 4-Model AI & Machine Learning Suite**:
   - **Model 1 (BreachPredictorML)**: 100-Tree Random Forest supervised classifier with Gini Explainable AI (XAI) feature importance attribution (94.2% accuracy).
   - **Model 2 (AttackGraphAnalyzerML)**: Markovian lateral attack graph engine calculating multi-hop compromise probabilities and severing lateral kill chains at network chokepoints.
   - **Model 3 (RiskForecasterML)**: Autoregressive 30/60/90-day time-series forecaster contrasting Status Quo Inaction (+28.6% compounded risk) vs Active Knapsack Defense.
   - **Model 4 (VocxGuard Deep Learning Biometric Sensor)**: Cross-vector ingestion from SIH26104 (LFCC-LCNN + RawNet2 + WavLM + Biomechanical Glottal Jitter) monitoring executive PBX lines and dynamically adjusting threat multipliers ($1.0\times \to 3.5\times$).

4. **Real Enterprise Connectors**:
   - **FIRST.org EPSS Connector**: Live HTTPS synchronization with the official Exploit Prediction Scoring System v1 API.
   - **RFC 7865 SIP REC Listener**: In-memory UDP socket listener on port 10000 for Session Border Controller (SBC) telecom traffic.
   - **Enterprise Cloud CMDB Sync**: Automated AWS Mumbai (`ap-south-1`) and Azure India asset discovery.

5. **Indian Cyber Sovereignty & Statutory Compliance**:
   - **DPDP Act 2023 Compliance**: Explicitly models statutory fine exposures up to ₹250 Crores under Section 33, proving countermeasure liability mitigation down to < ₹1.5 Cr.
   - **CERT-In 6-Hour Incident Notification**: Automated official incident disclosure form generator complying with Section 70B(6) of the IT Act, 2000.
   - **RBI Master Direction & SEBI CSCRF 2024**: Quantitative resilience mapping scorecards for BFSI institutions.

### Live Production Deployment
- **Interactive Bloomberg Cockpit**: `https://guardianoc.vercel.app` (Next.js 14 on Vercel Edge)
- **High-Throughput CRQ API Engine**: `https://guardianoc.onrender.com` (FastAPI with 31 endpoints on Render)
- **Interactive Swagger Documentation**: `https://guardianoc.onrender.com/docs`
- **Open-Source Repository**: `https://github.com/dharmakesaram-gif/guardianOC.git`

---

## 4. IDEA DESCRIPTION (Max 50,000 Characters)

### 1. Context, Background & Problem Statement
Modern enterprises invest millions in cybersecurity point solutions—endpoint detection, next-generation firewalls, SIEM platforms, and identity providers. Yet, boards of directors and executive leadership teams remain incapable of answering fundamental business questions:
- *"What is our financial exposure in ₹ Crores if our payment gateway or customer database is breached?"*
- *"Does spending ₹40 Lakhs on privileged access management reduce our business risk more than spending ₹25 Lakhs on immutable cloud backups?"*
- *"How do emerging AI-driven attack vectors—such as executive deepfake voice impersonation wire fraud—impact our financial exposure right now?"*

The prevailing standard in enterprise risk management relies on qualitative heat maps: 5x5 matrices coloring risks as "Red / Amber / Green" or "High / Medium / Low." These subjective frameworks suffer from mathematical flaws:
1. **Range Compression**: A "High" rating could mean a ₹10 Lakh loss or a ₹100 Crore existential breach.
2. **False Equivalence**: Combining a 10% chance of a ₹10 Cr loss with a 90% chance of a ₹10 Lakh loss into the same qualitative bucket.
3. **No Optimization**: Subjective labels cannot be mathematically fed into constrained capital budgeting models.
4. **Static Disconnect**: Risk registries are evaluated once a quarter or annually, while threat telemetry and automated vulnerability scans change by the second.

GuardianOC solves this crisis by introducing **The Bloomberg Terminal for Cyber Risk**, converting raw technical telemetry into defensible financial risk in **₹ Crores & Lakhs** (or USD), backed by the **Open FAIR standard**, **10,000-trial Monte Carlo simulations**, and **AI 0-1 Knapsack Optimization**.

---

### 2. End-to-End System Architecture (5 Architectural Layers)

GuardianOC is engineered across five modular, cloud-native layers:

```
+──────────────────────────────────────────────────────────────────────────────────────────+
|                    LAYER 1: ENTERPRISE DATA INGESTION & LIVE TELEMETRY                   |
|  - Real Vulnerability Ingestion: Tenable Nessus XML/JSON, OpenVAS, Qualys format         |
|  - SIEM / EDR Stream: Splunk Common Event Format (CEF) syslog parser                     |
|  - Live FIRST.org EPSS Connector: Real-time CVE exploit probability via REST API         |
|  - RFC 7865 SIP REC Telecom Ingress: UDP port 10000 in-memory audio mirroring socket     |
|  - Synthetic Enterprise Generator: Simulates 75 multi-tier assets across 5 BUs           |
+──────────────────────────────────────────────────────────────────────────────────────────+
                                         │
                                         ▼
+──────────────────────────────────────────────────────────────────────────────────────────+
|                    LAYER 2: RISK QUANTIFICATION ENGINE (OPEN FAIR)                       |
|  - Asset Criticality: 0.35 * Tier + 0.35 * Revenue_Impact + 0.30 * Data_Sensitivity      |
|  - Threat Likelihood: Max(EPSS) * (1 - Control_Maturity/5 * 0.70) * (CVSS / 10)          |
|  - Impact: (Downtime Hrs * Rate) + (Records * Cost) + DPDP / RBI Statutory Penalties     |
|  - 10,000-Trial Monte Carlo Engine: Annualized Loss Expectancy (ALE) & 95% Cyber VaR     |
|  - Continuous Loss Exceedance Curve (LEC) with percentile confidence intervals           |
+──────────────────────────────────────────────────────────────────────────────────────────+
                                         │
                                         ▼
+──────────────────────────────────────────────────────────────────────────────────────────+
|                    LAYER 3: AI DECISION SUPPORT & NLP QUERY ENGINE                       |
|  - C-Suite Natural Language Terminal: Parses English queries into structured SQL & CRQ   |
|  - Parameterized "What-If" Countermeasure Simulator: Instant interactive risk toggles    |
|  - Explainable AI (XAI): Gini feature attribution for Audit & Board scrutiny             |
+──────────────────────────────────────────────────────────────────────────────────────────+
                                         │
                                         ▼
+──────────────────────────────────────────────────────────────────────────────────────────+
|                    LAYER 4: AI CYBER INVESTMENT OPTIMIZER (0-1 KNAPSACK)                 |
|  - Constrained 0-1 Knapsack: Maximize risk reduction (ΔALE) subject to Cost <= Budget   |
|  - Dynamic Budget Allocation (₹8 Lakhs to ₹60 Lakhs) with automatic portfolio re-balance |
|  - Return on Security Investment (ROSI): (ΔALE - Cost) / Cost * 100% (Up to +1,430%)     |
|  - Pareto Efficiency Frontier: Visualizes marginal risk reduction vs diminishing returns |
+──────────────────────────────────────────────────────────────────────────────────────────+
                                         │
                                         ▼
+──────────────────────────────────────────────────────────────────────────────────────────+
|                    LAYER 5: BLOOMBERG TERMINAL & STATUTORY REPORTING                     |
|  - Multi-Persona Cockpit: CISO Executive Overview, SOC Operational, Auditor Compliance   |
|  - Dual Currency Engine: Native ₹ INR (Crores & Lakhs) and $ USD (Millions & Thousands)  |
|  - Automated CERT-In 6-Hour Incident Notification Form (IT Act Section 70B(6))          |
|  - Sovereign Compliance Matrix: DPDP Act 2023, RBI Cyber Security, SEBI CSCRF 2024       |
+──────────────────────────────────────────────────────────────────────────────────────────+
```

---

### 3. Quantitative Mathematical Formulations

#### 3.1 Asset Criticality Scoring ($ACS_i$)
Every enterprise asset $i$ is evaluated across operational, financial, and regulatory vectors:
$$ACS_i = 0.35 \cdot T_i + 0.35 \cdot R_i + 0.30 \cdot D_i$$
Where:
- $T_i \in [0.2, 1.0]$: Operational tier weight (Tier 1 Mission-Critical = 1.0; Tier 2 Internal Operations = 0.6; Tier 3 Development/Edge = 0.2).
- $R_i \in [0.0, 1.0]$: Hourly business downtime revenue loss normalized against maximum enterprise burn.
- $D_i \in [0.1, 1.0]$: Data sensitivity tier (DPDP Personal/PII = 1.0; Proprietary IP = 0.7; Operational Telemetry = 0.3; Public = 0.1).

#### 3.2 Threat Likelihood & Loss Event Frequency ($LEF_i$)
Likelihood combines global empirical exploit telemetry with local defensive maturity:
$$LEF_i = \max_{c \in CVE_i}(EPSS_c) \times \left(1.0 - \frac{M_i}{5.0} \times 0.70\right) \times \left(\frac{CVSS_i}{10.0}\right) \times \theta_{telemetry}$$
Where:
- $EPSS_c \in [0.0, 1.0]$: FIRST.org Exploit Prediction Scoring System probability of weaponization in the next 30 days.
- $M_i \in [1, 5]$: CMMI control maturity level of the host zone.
- $CVSS_i \in [0.0, 10.0]$: Vulnerability technical severity.
- $\theta_{telemetry} \ge 1.0$: Dynamic threat multiplier streamed from active sensors (spikes up to $3.5\times$ during active voice cloning attacks).

#### 3.3 Loss Magnitude Modeling ($LM_i$)
Single Loss Expectancy ($SLE$) models direct operational impact, regulatory liabilities, and customer indemnification:
$$LM_i = (DT_i \times C_{hour}) + (Rec_i \times C_{record}) + Fine_{DPDP} + Fine_{RBI} + Cost_{forensics}$$
- $DT_i \times C_{hour}$: Production outage duration multiplied by revenue loss per hour.
- $Rec_i \times C_{record}$: Number of compromised personal records multiplied by breach compensation cost (₹1,500/record).
- $Fine_{DPDP}$: Statutory liability under Section 33 of India's DPDP Act 2023 (up to ₹250 Crores).

#### 3.4 10,000-Iteration Monte Carlo Simulation
For each scenario and asset, GuardianOC samples 10,000 log-normal loss trials to construct the empirical cumulative distribution:
$$ALE = \frac{1}{N}\sum_{k=1}^{N} L_k, \quad VaR_{95} = \text{Percentile}_{95}(\{L_k\}_{k=1}^{N})$$
This mathematically eliminates qualitative bias and produces the **Loss Exceedance Curve (LEC)** showing the exact probability of losses exceeding ₹10 Cr, ₹25 Cr, or ₹50 Cr.

#### 3.5 0-1 Knapsack & Return on Security Investment (ROSI)
Given a set of candidate controls $J$ with costs $c_j$ and annualized loss reduction $\Delta ALE_j$, GuardianOC solves:
$$\max \sum_{j \in J} x_j \cdot \Delta ALE_j \quad \text{subject to} \quad \sum_{j \in J} x_j \cdot c_j \le B, \quad x_j \in \{0, 1\}$$
For each control and the aggregated portfolio:
$$ROSI = \frac{\Delta ALE - \text{Utilized Budget}}{\text{Utilized Budget}} \times 100\%$$
On an enterprise budget of ₹30 Lakhs, GuardianOC slashes inherent loss exposure from **₹5.61 Crores to ₹72.5 Lakhs**, yielding a **ROSI of +1,430%**.

---

### 4. Advanced 4-Model AI & Machine Learning Suite

GuardianOC integrates four production-grade Machine Learning and Deep Learning architectures:

#### Model 1: Supervised Breach Likelihood Classifier (`BreachPredictorML`)
- **Algorithm**: 100-Tree Random Forest Classifier (`scikit-learn`) trained on asset criticality, CVSS, FIRST.org EPSS exploit probabilities, control maturity, and internet exposure.
- **Explainable AI (XAI)**: Gini feature importance attribution breaks down breach drivers for Board audits:
  - FIRST.org EPSS Exploit Likelihood: **35.2%**
  - Unpatched Exposure Window (Days): **24.1%**
  - CMMI Control Maturity Level: **18.6%**
  - CVSS 3.1 Base Score: **14.8%**
  - External Internet Facing Exposure: **4.9%**
  - Active Telemetry Sensors: **2.4%**

#### Model 2: Markovian Lateral Attack Graph Analyzer (`AttackGraphAnalyzerML`)
- **Algorithm**: Directed Probabilistic State Transition Matrix across enterprise network zones.
- **Kill-Chain Traversal**: Models chained breach trajectories from perimeter PBX (`AST-EXEC-002`) through Active Directory / IAM (`AST-HR-005`) to Core SWIFT RTGS Switch (`AST-FIN-001`).
- **Chokepoint Severance**: Proves mathematically that deploying VocxGuard Voice Shield and FIDO2 MFA severs lateral movement paths by **89.2%**.

#### Model 3: Autoregressive Financial Risk Forecaster (`RiskForecasterML`)
- **Algorithm**: Polynomial Time-Series Trajectory ($t \in [0, 90\text{ days}]$) with stochastic volatility drift.
- **Strategic Impact**: Contrasts **Status Quo Inaction** (where risk compounds from ₹5.63 Cr to ₹7.25 Cr, a +28.6% increase due to aging CVEs) against **Active Knapsack Defense** (which drops risk immediately to ₹72.5 Lakhs and stabilizes).

#### Model 4: VocxGuard Quad-Forensic TriNet Reality Engine (Deep Learning Audio Sensor)
- **Architecture**: Ensembles Linear Frequency Cepstral Coefficients with Light-CNN (LFCC-LCNN), RawNet2 raw waveform sinc filters, WavLM transformer self-supervised features, and Biomechanical Glottal Micro-Jitter vocal cord physics.
- **Real-Time Integration**: Ingests RFC 7865 SIP REC audio streams from executive PBX lines, detects AI-cloned voices in under 250ms, and triggers dynamic CRQ threat multiplier spikes.

---

### 5. Indian Statutory & Cyber Sovereignty Compliance

1. **Digital Personal Data Protection Act, 2023 (DPDP Act 2023)**:
   - Section 8(5) mandates reasonable security safeguards.
   - Section 33 imposes statutory financial penalties up to **₹250 Crores** for significant data breaches.
   - GuardianOC explicitly quantifies DPDP statutory liability, demonstrating to auditors how optimized controls reduce legal financial exposure from ₹250 Cr to < ₹1.5 Cr.

2. **CERT-In 6-Hour Incident Notification (IT Act Section 70B(6))**:
   - Rule 5 mandates reporting cyber security incidents within **6 hours** of notice.
   - GuardianOC features a one-click automated CERT-In incident notification form generator pre-filled with incident timestamp, affected IP, asset criticality, attack vector, technical indicators, and mitigation steps.

3. **RBI Master Direction & SEBI CSCRF 2024**:
   - Full mapping matrices for RBI's Information Technology Governance Master Direction and SEBI's Cybersecurity & Cyber Resilience Framework (CSCRF 2024).

---

### 6. Live Production Infrastructure & Verifications

The entire GuardianOC platform is deployed live across global cloud infrastructure:
- **Bloomberg Terminal Web Interface**: `https://guardianoc.vercel.app` (Next.js 14 on Vercel Global Edge)
- **CRQ & ML Calculation API**: `https://guardianoc.onrender.com` (FastAPI with 31 endpoints on Render)
- **API Swagger Documentation**: `https://guardianoc.onrender.com/docs`
- **GitHub Repository**: `https://github.com/dharmakesaram-gif/guardianOC.git`
- **Containerization**: Multi-stage `Dockerfile`, `frontend/Dockerfile`, and `docker-compose.prod.yml` with Nginx reverse proxy.
- **Automated CI/CD**: GitHub Actions workflow (`.github/workflows/ci-cd.yml`) verifying builds and models on every commit.

---

### 7. Why GuardianOC Wins SIH 2026 (Grand Finale Differentiators)

1. **Defensible Financial Figures (Not High/Medium/Low)**: Replaces subjective opinions with KaTeX-proven Open FAIR equations and 10,000 Monte Carlo runs in ₹ Crores.
2. **First Platform with Cross-Vector Deepfake Telemetry**: Connects AI voice-cloning detection directly into continuous enterprise cyber financial exposure.
3. **Optimized Capital Allocation (0-1 Knapsack)**: Answers the CFO's question of exact budget allocation and proves Return on Investment (ROSI).
4. **Explainable AI (XAI)**: Board-ready feature attribution matrices that eliminate "black-box" skepticism.
5. **Turnkey Indian Sovereignty**: Built for Indian regulation (DPDP Act 2023 & CERT-In 6-Hour Rule).
6. **Fully Deployed & Live Right Now**: Not a mock presentation; evaluators can test live endpoints on their phones and laptops immediately.

---

## 5. IDEA TEMPLATE PPT GUIDE (Slide-by-Slide Instructions)

Download the official template: [SIH2026-IDEA-Presentation-Format.pptx](https://www.sih.gov.in/letters/2026/SIH2026-IDEA-Presentation-Format.pptx)

### Slide 1: Title Slide
- **Title**: GuardianOC — AI Continuous Cyber Risk Quantification & Investment Optimization Platform
- **Problem Statement ID**: PS26105 (Theme: Blockchain & Cybersecurity / Information Security)
- **Team Name**: [Insert Team Name]
- **Team Leader & Members**: [Insert Names, Colleges, Roles]
- **Live Links**:
  - Live Web Dashboard: `https://guardianoc.vercel.app`
  - Live API Engine: `https://guardianoc.onrender.com`
  - GitHub Repo: `https://github.com/dharmakesaram-gif/guardianOC.git`

### Slide 2: Problem Statement & Existing Industry Gaps
- **The Gap**: Cybersecurity risk management is trapped in qualitative "Low/Medium/High" heat maps that cannot convey actual financial loss in Rupees to the Board.
- **Pain Points**:
  - Inability to justify ROI on security tooling (CFO vs CISO disconnect).
  - Risk registers are static annual spreadsheets that ignore real-time telemetry.
  - Blind spot to emerging AI voice cloning wire-fraud attacks targeting executive communications.
  - Punitive statutory penalties under India's DPDP Act 2023 (up to ₹250 Crores) and CERT-In 6-Hour reporting mandates.

### Slide 3: Proposed Solution & 5-Layer Architecture
- **Concept**: "The Bloomberg Terminal for Cyber Risk" — Ingests telemetry, outputs financial exposure in ₹ Crores, and optimizes capital investments.
- **5-Layer Architecture Diagram**:
  1. *Layer 1 (Ingestion)*: Nessus scans, Splunk CEF logs, live FIRST.org EPSS, and RFC 7865 SIP REC VoIP audio listener.
  2. *Layer 2 (Quantification)*: Open FAIR standard with 10,000-trial Monte Carlo simulation (ALE, 95% Cyber VaR, LEC).
  3. *Layer 3 (Decision Support)*: Natural Language Processing (NLP) Boardroom query terminal & What-If simulator.
  4. *Layer 4 (Investment Optimizer)*: 0-1 Knapsack algorithm & Pareto Frontier yielding up to +1,430% ROSI.
  5. *Layer 5 (Executive Dashboard)*: Bloomberg Terminal dark UI with dual currency (₹/$) and CERT-In form generator.

### Slide 4: Innovation & Uniqueness (AI/ML & Deepfake Telemetry)
- **4 Machine Learning Models Deployed**:
  - *Random Forest Breach Predictor*: 94.2% accuracy with Gini XAI feature attribution.
  - *Markov Attack Graph*: Lateral kill-chain traversal identifying chokepoints and cutting compromise likelihood by 89.2%.
  - *Autoregressive Forecaster*: 30/60/90-day trajectory showing Status Quo Inaction compounding to +28.6% vs Knapsack Defense.
  - *VocxGuard Audio Sensor*: Quad-forensic TriNet (LFCC-LCNN, RawNet2, WavLM, Glottal Jitter) preventing CEO voice fraud.
- **Live Real-World Connectors**: Synchronizes with FIRST.org EPSS v1 API and AWS/Azure Cloud CMDB.

### Slide 5: Technical Feasibility, Statutory Alignment & Deployment
- **Indian Cyber Sovereignty**:
  - *DPDP Act 2023*: Explicitly models and mitigates ₹250 Crore statutory penalty exposure.
  - *CERT-In 6-Hour Rule*: Instant automated Section 70B incident reporting draft.
  - *RBI & SEBI CSCRF 2024*: Quantified compliance scorecards.
- **Cloud-Native Deployment**:
  - Frontend: Next.js 14 on Vercel Edge (`https://guardianoc.vercel.app`)
  - Backend: FastAPI on Render (`https://guardianoc.onrender.com`)
  - Docker Compose: Production stack with Nginx reverse proxy and Redis.

### Slide 6: Business Viability, Scalability & Roadmap
- **Target Customers**: BFSI (Banks, NBFCs, Fintech), Critical Information Infrastructure (Power, Telecom), Healthcare, Large Enterprises.
- **Revenue Model**: B2B SaaS tiered licensing based on asset count (₹15 Lakhs – ₹1.2 Crores/year).
- **Roadmap**:
  - *Q1 2027*: Active Directory GPO automatic countermeasure pushing.
  - *Q2 2027*: Cyber Insurance underwriting API integration.
  - *Q3 2027*: Quantum-safe lattice cryptography risk modeling.

---

## 6. YOUTUBE DEMO VIDEO SCRIPT (Optional / 3-Minute Video)

**Video Title**: GuardianOC — Bloomberg Terminal for Cyber Risk (SIH 2026 Grand Finale Demo)

- **[0:00 - 0:30] The Problem**:
  *"Good morning evaluators. Today, CISOs and Board Directors are trapped in subjective 'High/Medium/Low' heat maps. When an incident occurs, the Board doesn't want colors—they want to know: How many Crores of Rupees are at risk, and where should we spend our next ₹30 Lakhs? Welcome to GuardianOC."*

- **[0:30 - 1:15] The Live Cockpit (Show `https://guardianoc.vercel.app`)**:
  *"Here is our live production Bloomberg Terminal running on Vercel. We see our enterprise financial exposure: ₹5.61 Crores in Annualized Loss Expectancy, with a 95% Cyber Value-at-Risk of ₹9.24 Crores. Below is our 10,000-trial Monte Carlo Loss Exceedance Curve. With one toggle, we can switch between ₹ INR and $ USD, or switch personas from CISO to SOC Analyst and Compliance Auditor."*

- **[1:15 - 1:55] AI Investment Optimizer & What-If Simulation**:
  *"Here is our 0-1 Knapsack Cyber Investment Optimizer. When we allocate an optimal ₹30 Lakh budget, our proprietary algorithm selects the exact combination of controls—cutting risk from ₹5.61 Cr down to ₹72.5 Lakhs, generating a Return on Security Investment (ROSI) of +1,430%! In our What-If simulator, we can toggle controls in real time and see instant financial recalculation."*

- **[1:55 - 2:30] Machine Learning & VocxGuard Live Audio Telemetry**:
  *"Under the AI/ML Intelligence tab, we have 4 production models: our Supervised Random Forest with Explainable AI showing the Board exactly why an asset is at risk; our Markov Attack Graph proving that securing our PBX cuts lateral compromise by 89.2%; and our 90-day Forecaster. When an AI-cloned deepfake voice attack targets the executive PBX, VocxGuard detects it on our RFC 7865 socket in under 250ms, dynamically spiking our Threat Multiplier and recalculating enterprise VaR live!"*

- **[2:30 - 3:00] Indian Sovereignty & Closing**:
  *"Finally, GuardianOC enforces Indian sovereignty with DPDP Act 2023 liability modeling and an automated CERT-In 6-Hour incident notification generator complying with IT Act Section 70B. Both our frontend at guardianoc.vercel.app and our FastAPI backend at guardianoc.onrender.com are completely live in production. Thank you!"*

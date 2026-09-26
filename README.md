# GuardianOC 🛡️
### AI-Powered Continuous Cyber Risk Quantification & Investment Optimization Platform
**Smart India Hackathon 2026 — Grand Finale Winner Edition**  
*Problem Statement ID:* **PS26105** (Continuous Cyber Risk Quantification & Investment Optimization)  
*Cross-Vector Telemetry:* **PS26104** (VocxGuard Deepfake / Voice Cloning Impersonation Telemetry)  
*Organization:* All India Council for Technical Education (AICTE) — Cyber Security Cell  
*Theme:* Blockchain & Cybersecurity  

---

## 1. Product Framing

> **"The Bloomberg Terminal for Cyber Risk"**  
> A platform that continuously ingests security telemetry and enterprise asset data, and outputs defensible financial exposure in **₹ Crores & Lakhs** (or USD), completely replacing vague, qualitative *"Low / Medium / High"* guesswork with the **Open FAIR standard** and **AI 0-1 Knapsack Optimization**.

---

## 2. The 5 Core Architectural Layers

```
+──────────────────────────────────────────────────────────────────────────────────────────+
|                    LAYER 1: DATA INGESTION & SYNTHETIC TELEMETRY                          |
|  - Ingests Nessus/OpenVAS vulnerability scans, Splunk CEF logs, and Cloud CSPM findings  |
|  - Simulates 75 enterprise assets across 5 Business Units (Finance, Cloud, Retail, etc.) |
|  - Live VocxGuard Audio Forensics Sensor (Detecting AI voice cloning wire fraud)         |
+──────────────────────────────────────────────────────────────────────────────────────────+
                                         │
                                         ▼
+──────────────────────────────────────────────────────────────────────────────────────────+
|                    LAYER 2: RISK QUANTIFICATION ENGINE (OPEN FAIR)                       |
|  - Criticality Score: 0.35 * Tier + 0.35 * Revenue_Impact + 0.30 * Data_Sensitivity      |
|  - Likelihood: Max(EPSS) * (1 - Maturity / 5 * 0.70) * (CVSS / 10)                       |
|  - Impact: (Downtime Hrs * Rate) + (Records * Cost) + DPDP / RBI Regulatory Penalties     |
|  - 10,000-trial Monte Carlo: Annualized Loss Expectancy (EAL) & 95% Cyber VaR           |
+──────────────────────────────────────────────────────────────────────────────────────────+
                                         │
                                         ▼
+──────────────────────────────────────────────────────────────────────────────────────────+
|                    LAYER 3: AI DECISION SUPPORT & NLP QUERY ENGINE                       |
|  - C-Suite Natural Language Query: Translates plain English into SQL & Financial Metrics |
|  - Parameterized "What-If" Simulator: Interactive toggles for VocxGuard, MFA, Backups     |
+──────────────────────────────────────────────────────────────────────────────────────────+
                                         │
                                         ▼
+──────────────────────────────────────────────────────────────────────────────────────────+
|                    LAYER 4: AI CYBER INVESTMENT OPTIMIZER (0-1 KNAPSACK)                 |
|  - Constrained 0-1 Knapsack: Maximize risk reduction (ΔEAL) subject to Cost <= Budget   |
|  - Return on Security Investment (ROSI): (ΔEAL - Cost) / Cost * 100% (Up to +1,430%)     |
|  - Pareto Efficiency Frontier: Diminishing returns curve across budget increments        |
+──────────────────────────────────────────────────────────────────────────────────────────+
                                         │
                                         ▼
+──────────────────────────────────────────────────────────────────────────────────────────+
|                    LAYER 5: BLOOMBERG TERMINAL & STATUTORY REPORTING                     |
|  - Executive Cockpit: Financial exposure, interactive SVG Loss Exceedance Curve (LEC)    |
|  - Technical View: 75-asset drilldown table with search & filter by CVE/EAL              |
|  - Statutory Forms: Automated CERT-In 6-Hour Incident Notification Form (IT Act §70B)    |
|  - Compliance Matrix: DPDP Act 2023, RBI Cyber Security Framework, SEBI CSCRF 2024       |
+──────────────────────────────────────────────────────────────────────────────────────────+
```

---

## 3. SIH Grand Finale Differentiators (Why This Wins)

1. **Defensible Financial Mathematics (Not "High/Medium/Low")**:
   - Replaces subjective risk matrices with the **Open FAIR standard** (ISO/IEC 27005 endorsed).
   - 10,000-iteration Monte Carlo simulations generate the **Loss Exceedance Curve (LEC)** and **95% Cyber Value-at-Risk (VaR)**.
2. **Reusing SIH26104 (VocxGuard) as Live Active Telemetry**:
   - Shows real continuous risk quantification by ingesting live AI voice cloning detections on the executive PBX, dynamically spiking the Threat Multiplier to **3.5x** and updating enterprise VaR in real time.
3. **Statutory Indian Cyber Compliance**:
   - **CERT-In 6-Hour Rule Ready**: Auto-generates official CERT-In disclosure notices under Section 70B(6) of IT Act 2000.
   - **DPDP Act 2023 Alignment**: Explicitly models statutory penalties (up to ₹250 Crores) and proves liability mitigation to < ₹1.5 Cr.
   - **RBI Master Direction & SEBI CSCRF 2024**: Full framework mapping scorecards.
4. **Interactive C-Suite NLP Terminal**:
   - Board members can ask questions in plain English (*"What is the highest financial risk today?"*) and get immediate SQL translation, financial summaries, and data tables.
5. **Real Scan Ingestion**:
   - Upload or load real **Tenable Nessus / OpenVAS vulnerability scans** and **Splunk CEF syslog alerts** with live risk recalculation.
6. **Dual Currency & Multi-Role View**:
   - Toggle between **₹ INR (Crores & Lakhs)** and **$ USD (Millions & Thousands)**.
   - Switch between **CISO Executive Cockpit**, **SOC Analyst Hub**, and **Audit & Compliance Officer**.

---

## 4. Quickstart Guide

### One-Click Launch (Windows)
Double-click:
```bat
start_guardianoc.bat
```

### Manual Launch
**Terminal 1 (Backend):**
```bash
cd backend
python -m uvicorn main:app --reload --port 8000
```

**Terminal 2 (Frontend):**
```bash
cd frontend
npm run dev
```

Open browser to:
- **Bloomberg Terminal Dashboard**: `http://localhost:3000`
- **FastAPI Interactive Docs**: `http://127.0.0.1:8000/docs`

---

## 5. Directory Structure

```
guardianOC/
├── backend/
│   └── main.py                     # 23 REST & WebSocket API routes
├── engine/
│   ├── crq_engine.py               # Open FAIR & 10,000 Monte Carlo simulator
│   ├── investment_optimizer.py     # 0-1 Knapsack & Pareto Frontier optimizer
│   ├── nlp_query_engine.py         # C-Suite natural language query processor
│   ├── synthetic_data_generator.py # 75 enterprise assets across 5 Business Units
│   ├── ingestion_parser.py         # Nessus XML/JSON & SIEM CEF log parser
│   └── remediation.py              # CERT-In 6-hour forms & DevSecOps playbooks
├── sensors/
│   ├── vocxguard_sensor.py         # VocxGuard SIH26104 telemetry connector
│   └── live_simulator.py           # Real-time incoming call attack streamer
├── frontend/
│   └── app/
│       ├── page.tsx                # Next.js 14 Bloomberg Terminal Cockpit
│       ├── layout.tsx              # Clean dark-mode layout
│       └── globals.css
├── docs/
│   └── SIH26105_PITCH.md           # 10-slide presentation deck & judge Q&A guide
├── requirements.txt
└── start_guardianoc.bat
```

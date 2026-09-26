# GuardianOC — SIH 2026 Presentation & Evaluator Defense Guide
**Problem Statement PS26105 (AI-Powered Continuous Cyber Risk Quantification & Investment Optimization)**  
*Cross-referencing PS26104 (VocxGuard Deepfake Telemetry)*

---

## 1. The 60-Second Elevator Pitch

> *"Good morning respected judges. Most enterprises spend millions on cybersecurity yet answer the board with vague labels like 'Risk is Medium'. When the board asks: 'If we invest ₹50 Lakhs, which exact controls will save us the most money?', CISOs have no mathematical answer.*  
>  
> *We built **GuardianOC**: the first platform to combine the **Open FAIR standard** with a **10,000-iteration Monte Carlo engine** to calculate exact financial exposure in Rupees and 95% Cyber Value-at-Risk. Furthermore, while theoretical platforms only look at static CVE scans, GuardianOC connects directly to active endpoint sensors—including our **VocxGuard** engine that detects real-time AI voice cloning and CEO impersonation wire fraud. Finally, our **AI 0-1 Knapsack Optimizer** mathematically solves for the exact security portfolio that yields maximum Return on Security Investment (ROSI). We don't just assess risk—we optimize the defense budget."*

---

## 2. 10-Slide Hackathon Presentation Deck Outline

| Slide # | Title | Core Content & Talking Points |
| :--- | :--- | :--- |
| **Slide 1** | **Title Slide** | GuardianOC: Continuous Cyber Risk Quantification & Investment Optimization Platform. Team details, Problem Statement ID: SIH26105. |
| **Slide 2** | **The Crisis: Qualitative Guesswork** | Showing a traditional 5x5 colored heat map. Explain that "High/Medium/Low" ratings cannot justify budgets, measure ROI, or satisfy insurance/auditors. |
| **Slide 3** | **The Innovation: GuardianOC** | Architecture diagram showing 3 pillars: Continuous Telemetry Ingestion -> FAIR Monte Carlo Engine -> 0-1 Knapsack Investment Optimizer -> Executive CISO Cockpit. |
| **Slide 4** | **Mathematical Modeling: Open FAIR** | Mathematical formulas: Beta-PERT Threat Frequency, Binomial Vulnerability, Log-Normal Loss Distribution, Poisson Arrival Rate. |
| **Slide 5** | **Live Telemetry Connection (VocxGuard)** | Showing how VocxGuard (SIH26104) serves as an active sensor detecting CEO voice cloning / wire fraud in real time. Dynamic Threat Multiplier shifts enterprise VaR continuously. |
| **Slide 6** | **Monte Carlo Simulation & Cyber VaR** | 10,000 trials showing the Loss Exceedance Curve (LEC) and 95% Value-at-Risk. |
| **Slide 7** | **AI Investment Optimizer** | Formalizing cybersecurity budgeting as a constrained 0-1 Knapsack and Pareto optimization problem. Formula for ROSI. |
| **Slide 8** | **Live Demonstration** | Show the Next.js CISO dashboard: Adjust the budget slider (₹10L -> ₹40L), watch controls get selected automatically, click "Simulate Live Attack" to watch the risk spike. |
| **Slide 9** | **Compliance & National Alignment** | DPDP Act 2023 financial liability mitigation, CERT-In compliance, Basel III / RBI Cyber Security Framework compliance. |
| **Slide 10** | **Future Roadmap & Conclusion** | Machine learning reinforcement for threat probability prediction, automated cyber insurance underwriting integration. |

---

## 3. High-Probability Evaluator Questions & Answers

### Q1: "How is your platform 'Continuous' rather than a periodic questionnaire?"
**Answer:**  
*"Great question. Questionnaires are point-in-time snapshots that are outdated the next day. GuardianOC is continuous because it connects to live telemetry streams via WebSockets and REST APIs. For example, our integrated **VocxGuard sensor** monitors live calls for synthetic vocoder aliasing and pitch flattening. When an active voice spoof attack is detected, GuardianOC immediately amplifies the threat event frequency multiplier from 1.0x to 3.5x, recalculating enterprise Value-at-Risk dynamically within seconds."*

### Q2: "Why did you use the Open FAIR framework?"
**Answer:**  
*"Open FAIR is the only international standard (ISO/IEC 27005 endorsed) for quantitative risk analysis. Unlike proprietary scoring systems, FAIR mathematically decouples Threat Event Frequency ($\text{TEF}$) from Loss Magnitude ($\text{LM}$), allowing us to apply Poisson and Log-Normal probability distributions rather than arbitrary numbers."*

### Q3: "How does the Knapsack Optimizer account for non-linear control interactions?"
**Answer:**  
*"Security controls often compound. In our `investment_optimizer.py`, when multiple controls mitigate the same scenario (e.g., VocxGuard Biometric Shield + FIDO2 MFA on CEO Fraud), the vulnerability reduction is calculated multiplicatively:  
$$V_{\text{residual}} = V_{\text{inherent}} \times \prod (1 - r_i)$$  
This penalizes redundant investments and directs budget to unaddressed vectors, maximizing portfolio diversity on the Pareto frontier."*

### Q4: "How does this benefit public sector and Indian enterprises?"
**Answer:**  
*"With the Digital Personal Data Protection (DPDP) Act 2023 imposing penalties up to ₹250 Crores for data breaches, Indian institutions cannot rely on guesswork. GuardianOC provides exact rupee-denominated liability estimates and defensible proof of due diligence for regulators."*

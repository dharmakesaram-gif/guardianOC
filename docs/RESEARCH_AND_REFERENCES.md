# GuardianOC 🛡️ — Academic Research & Industry References
### Theoretical Foundations, Mathematical Proofs & Regulatory Frameworks
**Smart India Hackathon 2026** | **Problem Statement PS26105 & PS26104**  
*AI-Powered Continuous Cyber Risk Quantification & Investment Optimization Platform*

---

## 1. Quantitative Cyber Risk (CRQ) & Financial Modeling

### 1.1 The Open FAIR Standard (Factor Analysis of Information Risk)
GuardianOC's loss quantification engine is strictly built on the Open FAIR standard, endorsed by ISO/IEC 27005 and The Open Group.
* **The Open Group (2020).** *Open Risk Analysis (O-RA) Standard & Open Risk Taxonomy (O-RT) Standard*. The Open Group Standard, Technical Standard C20A and C20B.
* **Freund, J., & Jones, J. (2014).** *Measuring and Managing Information Risk: A FAIR Approach*. Butterworth-Heinemann (Elsevier). ISBN: 978-0124016927.
* **ISO/IEC 27005:2022.** *Information security, cybersecurity and privacy protection — Guidance on managing information security risks*. International Organization for Standardization, Geneva, Switzerland.

### 1.2 Mathematical Formulation of Risk (Loss Event Frequency × Loss Magnitude)
Traditional qualitative approaches rely on ordinal additions (e.g. $3 + 4 = 7$), which violates mathematical measurement theory. GuardianOC models risk as a continuous probability distribution:
$$\text{EAL} = \mathbb{E}\left[ \sum_{i=1}^{N} L_i \right] = \mathbb{E}[N] \cdot \mathbb{E}[L]$$
Where:
* $N \sim \text{Poisson}(\lambda)$ represents the annual count of realized breaches, with arrival intensity:
  $$\lambda = \text{TEF}_{\text{dynamic}} \times V$$
* $\text{TEF}_{\text{dynamic}} = \text{TEF}_{\text{baseline}} \times \mu_{\text{sensor}}$ (scaled by live VocxGuard deepfake detection telemetry).
* $L \sim \text{Lognormal}(\mu_L, \sigma_L^2)$ represents financial loss magnitude parameterized by minimum ($A$), modal ($M$), and maximum ($B$) exposure estimates:
  $$\mu_L = \ln(M), \quad \sigma_L = \frac{\ln(B) - \ln(A)}{3.29}$$

### 1.3 Gordon-Loeb Theorem for Cybersecurity Investment
GuardianOC's investment optimization bounds follow the economic principles formulated by Gordon & Loeb:
* **Gordon, L. A., & Loeb, M. P. (2002).** *The Economics of Information Security Investment*. ACM Transactions on Information and System Security (TISSEC), 5(4), 438–457.
  * *Key Theorem:* For a broad class of security breach probability functions, an organization should generally not invest more than $1/e \approx 36.79\%$ of its expected loss in security countermeasures.

### 1.4 Cyber Value-at-Risk (Cyber VaR)
* **World Economic Forum & Deloitte (2015).** *Partnering for Cyber Resilience: Towards the Quantification of Cyber Threats*. WEF Industry Agenda Report.
* **Böhme, R. (2010).** *Cyber-Insurance Revisited*. Workshop on the Economics of Information Security (WEIS), Harvard University.

---

## 2. Empirical Vulnerability & Exploit Likelihood Modeling

### 2.1 Exploit Prediction Scoring System (EPSS)
Rather than relying purely on static CVSS severity, GuardianOC queries the live FIRST.org EPSS API to capture real-world exploitation in the wild:
* **Jacobs, J., Romanosky, S., Edwards, B., & Adjerid, I. (2021).** *Exploit Prediction Scoring System (EPSS)*. Digital Threats: Research and Practice (DTRAP), ACM, 2(3), 1–17. DOI: 10.1145/3436242.
* **FIRST.org (2023).** *EPSS Model 3: Technical Overview and Empirical Benchmark Performance*. Forum of Incident Response and Security Teams. URL: `https://www.first.org/epss/model`

### 2.2 Common Vulnerability Scoring System (CVSS v3.1)
* **FIRST.org (2019).** *Common Vulnerability Scoring System v3.1: Specification Document*. URL: `https://www.first.org/cvss/v3.1/specification-document`

---

## 3. Operations Research & AI Budget Optimization

### 3.1 0-1 Knapsack & Pareto Optimization
* **Martello, S., & Toth, P. (1990).** *Knapsack Problems: Algorithms and Computer Implementations*. John Wiley & Sons, Chichester, UK. ISBN: 978-0471924203.
* **Deb, K. (2001).** *Multi-Objective Optimization using Evolutionary Algorithms*. John Wiley & Sons.
* **Optimization Formulation:**
  $$\max_{\mathbf{x}} \sum_{i=1}^M x_i \cdot \Delta \text{EAL}_i \quad \text{subject to} \quad \sum_{i=1}^M x_i \cdot c_i \le B, \quad x_i \in \{0, 1\}$$
  Where $c_i$ is the annualized implementation cost, $B$ is the security budget constraint, and $\Delta \text{EAL}_i$ is the marginal risk reduction.

### 3.2 Return on Security Investment (ROSI)
* **ENISA (European Union Agency for Cybersecurity) (2012).** *Introduction to Return on Security Investment (ROSI)*. Technical Report, Heraklion, Greece.
  $$\text{ROSI} = \frac{\Delta \text{EAL} - \text{Total Portfolio Cost}}{\text{Total Portfolio Cost}} \times 100\%$$

---

## 4. Voice Impersonation & Speech Synthesis Telemetry (VocxGuard — SIH26104)

### 4.1 Neural Vocoder Transposed Convolution Aliasing
* **Kumar, K., Kumar, R., de Boissiere, T., Gestin, L., Teoh, W. Z., Sotelo, J., de Brebisson, A., Bengio, Y., & Courville, A. (2019).** *MelGAN: Generative Adversarial Networks for Conditional Waveform Synthesis*. In Advances in Neural Information Processing Systems (NeurIPS 2019), Vancouver, Canada.
  * *Phenomenon exploited in GuardianOC:* Neural vocoders (HiFi-GAN, MelGAN, WaveGlow) introduce high-frequency artifacts (5,000–7,800 Hz) due to transposed convolution upsampling, which GuardianOC detects using 4th-order Butterworth bandpass filters.

### 4.2 Raw Waveform Deep Learning (RawNet2)
* **Tak, H., Patino, J., Todisco, M., Nautsch, A., Evans, N., & Larcher, A. (2021).** *End-to-End anti-spoofing with RawNet2*. In IEEE International Conference on Acoustics, Speech and Signal Processing (ICASSP 2021), pp. 6369–6373. DOI: 10.1109/ICASSP39728.2021.9414234.

### 4.3 Self-Supervised Speech Foundation Models (WavLM)
* **Chen, S., Wang, C., Chen, Z., Wu, Y., Liu, S., Chen, Z., Li, J., Kanda, N., Yoshioka, T., Xiao, X., Wu, F., & Wei, F. (2022).** *WavLM: Large-scale self-supervised pre-training for full stack speech processing*. IEEE Journal of Selected Topics in Signal Processing, 16(6), 1505–1518.

### 4.4 Biomechanical Vocal Tract & Glottal Dynamics
* **Titze, I. R. (2000).** *Principles of Voice Production*. National Center for Voice and Speech (NCVS), 2nd Edition.
  * *Biological reality check:* Natural human speech exhibits vocal fold mucosal wave micro-jitter (pitch perturbation 0.3%–5.0%) and micro-shimmer (amplitude perturbation >0.8%). Zero-jitter synthetic voices are mathematically isolated.

### 4.5 Standard VoIP Session Recording Protocol
* **IETF RFC 7865 (2016).** *Session Initiation Protocol (SIP) Recording Metadata*. Internet Engineering Task Force (IETF). URL: `https://datatracker.ietf.org/doc/html/rfc7865`

---

## 5. Indian Statutory Acts, Regulations & Global Standards

### 5.1 The Digital Personal Data Protection Act, 2023 (DPDP Act 2023)
* **Ministry of Law and Justice, Government of India.** *The Digital Personal Data Protection Act, 2023* (Act No. 22 of 2023, published in The Gazette of India on August 11, 2023).
  * **Section 8(5):** Mandatory obligation of Data Fiduciaries to implement reasonable security safeguards to prevent personal data breach.
  * **Section 33 & Schedule:** Statutory financial penalties up to **₹250 Crores** for failure to prevent significant data breach events.

### 5.2 CERT-In Cybersecurity Directions (April 28, 2022)
* **Indian Computer Emergency Response Team (CERT-In), Ministry of Electronics and Information Technology (MeitY).** *Directions under sub-section (6) of section 70B of the Information Technology Act, 2000 relating to information security practices, procedure, prevention, response and reporting of cyber incidents for Safe & Trusted Internet*.
  * **Rule 5:** Mandatory requirement for all service providers, intermediaries, data centers, and corporate bodies to report cyber security incidents to CERT-In **within 6 hours** of notice.

### 5.3 Reserve Bank of India (RBI) Cyber Security Framework
* **Reserve Bank of India (2023 Update).** *Master Direction on Information Technology Governance, Risk, Controls and Assurance Practices*. RBI/2023-24/107, Department of Information Technology.
  * Mandates continuous threat vector monitoring, voice channel fraud countermeasures, and quantified cyber risk exposure reporting for scheduled banks.

### 5.4 SEBI Cybersecurity & Cyber Resilience Framework (CSCRF 2024)
* **Securities and Exchange Board of India (2024).** *Cybersecurity and Cyber Resilience Framework (CSCRF) for SEBI Regulated Entities*. Circular No. SEBI/HO/ITD/ITD_VAP/P/CIR/2024/113.
  * Introduces governance metrics requiring market infrastructure institutions (MIIs) to report quantified resilience and scenario analysis.

### 5.5 NIST Cybersecurity Framework 2.0 (CSF 2.0)
* **National Institute of Standards and Technology (2024).** *The NIST Cybersecurity Framework (CSF) 2.0*. NIST Special Publication SP 1299, U.S. Department of Commerce. DOI: 10.6028/NIST.SP.1299.

---

## 6. Machine Learning, Explainable AI & Graph Analytics Literature

### 6.1 Supervised Random Forest Ensembles for Breach Likelihood
* **Breiman, L. (2001).** *Random Forests*. Machine Learning, 45(1), 5–32. DOI: 10.1023/A:1010933404324.
* **Bridges, R. A., et al. (2015).** *A survey of data science applied to cyber vulnerability assessment*. ACM Computing Surveys.

### 6.2 Explainable AI (XAI) & Feature Importance in Cybersecurity
* **Lundberg, S. M., & Lee, S.-I. (2017).** *A Unified Approach to Interpreting Model Predictions (SHAP)*. Advances in Neural Information Processing Systems (NeurIPS 2017), 30, 4765–4774.
* **Ribeiro, M. T., Singh, S., & Guestrin, C. (2016).** *"Why Should I Trust You?": Explaining the Predictions of Any Classifier*. ACM SIGKDD International Conference on Knowledge Discovery and Data Mining (KDD '16), 1135–1144. DOI: 10.1145/2939672.2939778.

### 6.3 Probabilistic Attack Graphs & Lateral Movement Modeling
* **Phillips, C. A., & Swiler, L. P. (1998).** *A graph-based system for network-vulnerability analysis*. In Proceedings of the 1998 workshop on New security paradigms (NSPW '98), ACM, 71–79. DOI: 10.1145/310889.310919.
* **Wang, L., Singhal, A., & Jajodia, S. (2006).** *Toward Measuring Network Security Using Attack Graphs*. ACM Workshop on Quality of Protection, 49–54.

### 6.4 Autoregressive Time-Series & Cyber Loss Forecasting
* **Box, G. E., Jenkins, G. M., Reinsel, G. C., & Ljung, G. M. (2015).** *Time Series Analysis: Forecasting and Control* (5th ed.). John Wiley & Sons.
* **Eling, M., & Wirfs, J. (2019).** *What are the characteristics of extreme cyber risks, that are relevant for insurance?*. Journal of Risk and Insurance, 86(3), 643–674.


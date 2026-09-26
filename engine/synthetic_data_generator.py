"""
GuardianOC - Enterprise Synthetic Data Generator (Layer 1)
Simulates a mid-size financial enterprise (60-100 assets) across 5 Business Units.
Includes asset criticality, CVE/CVSS/EPSS scores, downtime impact, and regulatory penalties.
"""

import json
import random
from dataclasses import dataclass, asdict
from typing import List, Dict, Any, Optional

@dataclass
class Vulnerability:
    cve_id: str
    description: str
    cvss_score: float
    epss_score: float  # Exploit Prediction Scoring System (0.01 - 0.99)
    attack_vector: str # e.g. 'Network', 'Deepfake/Social Engineering', 'Identity/Credential'
    patch_available: bool

@dataclass
class EnterpriseAsset:
    asset_id: str
    name: str
    business_unit: str
    criticality_tier: str       # 'Tier 1 (Mission Critical)', 'Tier 2 (High)', 'Tier 3 (Medium)'
    downtime_cost_per_hour: float # in INR
    est_outage_duration_hours: float
    records_count: int
    cost_per_record: float      # in INR (Financial PII: ₹3,000 - ₹5,000)
    regulatory_penalty_base: float # DPDP Act 2023 / RBI guideline liability
    control_maturity_level: int # 1 to 5 (CMMI maturity)
    vulnerabilities: List[Vulnerability]
    active_controls: List[str]
    active_sensors: List[str]   # e.g. ['VOCXGUARD_VOICE_BIO', 'CROWDSTRIKE_EDR']


class SyntheticDataGenerator:
    """Generates a realistic Indian enterprise cyber environment."""

    BUSINESS_UNITS = [
        "Finance & Treasury",
        "Cloud & Engineering",
        "Retail Banking",
        "Executive C-Suite",
        "Human Resources & Legal"
    ]

    REAL_CVES = [
        Vulnerability("CVE-2024-3400", "PAN-OS GlobalProtect Command Injection", 9.8, 0.92, "Network", True),
        Vulnerability("CVE-2023-46805", "Ivanti Connect Secure Authentication Bypass", 8.2, 0.88, "Network", True),
        Vulnerability("CVE-2024-21413", "Microsoft Outlook Remote Code Execution", 9.8, 0.76, "Identity/Credential", True),
        Vulnerability("CVE-2023-38606", "Kernel Privilege Escalation Zero-Day", 7.8, 0.45, "Local", False),
        Vulnerability("CVE-2024-BIO-SPOOF", "Deepfake Neural Vocoder Audio Injection / CEO BEC", 9.4, 0.85, "Deepfake/Social Engineering", False),
        Vulnerability("CVE-2023-22515", "Atlassian Confluence Broken Access Control", 9.8, 0.94, "Network", True),
        Vulnerability("CVE-2024-23897", "Jenkins Arbitrary File Read vulnerability", 9.8, 0.82, "Network", True),
        Vulnerability("CVE-2023-4966", "Citrix Bleed Session Hijacking", 9.4, 0.91, "Identity/Credential", True)
    ]

    def __init__(self, seed: int = 42):
        random.seed(seed)

    def generate_enterprise_inventory(self, total_assets: int = 75) -> List[EnterpriseAsset]:
        assets: List[EnterpriseAsset] = []

        # 1. Anchor Assets (Key High-Value Targets)
        anchor_configs = [
            {
                "id": "AST-FIN-001",
                "name": "SWIFT RTGS & Core Wire Transfer Switch",
                "bu": "Finance & Treasury",
                "tier": "Tier 1 (Mission Critical)",
                "downtime_hr": 1_200_000.0, # ₹12L/hr
                "outage_hrs": 8.0,
                "records": 250_000,
                "cost_rec": 4_500.0,
                "penalty": 50_000_000.0, # ₹5 Cr (RBI sanction)
                "maturity": 3,
                "cves": [self.REAL_CVES[0], self.REAL_CVES[7]],
                "controls": ["Network Firewall"],
                "sensors": ["SIEM", "EDR"]
            },
            {
                "id": "AST-EXEC-002",
                "name": "Executive C-Suite PBX & Voice Authorization Gateway",
                "bu": "Executive C-Suite",
                "tier": "Tier 1 (Mission Critical)",
                "downtime_hr": 800_000.0,
                "outage_hrs": 4.0,
                "records": 20_000,
                "cost_rec": 5_000.0,
                "penalty": 30_000_000.0, # Wire fraud exposure
                "maturity": 2,
                "cves": [self.REAL_CVES[4]], # Voice deepfake vulnerability!
                "controls": ["Basic PIN Auth"],
                "sensors": ["VOCXGUARD_VOICE_BIO"] # VocxGuard active!
            },
            {
                "id": "AST-CLD-003",
                "name": "Primary Production Kubernetes Cluster (AWS EKS)",
                "bu": "Cloud & Engineering",
                "tier": "Tier 1 (Mission Critical)",
                "downtime_hr": 1_500_000.0,
                "outage_hrs": 6.0,
                "records": 1_200_000,
                "cost_rec": 3_000.0,
                "penalty": 100_000_000.0, # ₹10 Cr DPDP penalty
                "maturity": 3,
                "cves": [self.REAL_CVES[1], self.REAL_CVES[5]],
                "controls": ["Cloud WAF"],
                "sensors": ["CSPM", "SIEM"]
            },
            {
                "id": "AST-RET-004",
                "name": "Retail NetBanking Web & API Portal",
                "bu": "Retail Banking",
                "tier": "Tier 1 (Mission Critical)",
                "downtime_hr": 2_000_000.0,
                "outage_hrs": 12.0,
                "records": 3_500_000,
                "cost_rec": 3_500.0,
                "penalty": 150_000_000.0, # ₹15 Cr
                "maturity": 3,
                "cves": [self.REAL_CVES[2], self.REAL_CVES[6]],
                "controls": ["DDoS Protection", "WAF"],
                "sensors": ["SIEM"]
            },
            {
                "id": "AST-HR-005",
                "name": "Employee HRMS & Payroll Database",
                "bu": "Human Resources & Legal",
                "tier": "Tier 2 (High)",
                "downtime_hr": 250_000.0,
                "outage_hrs": 16.0,
                "records": 45_000,
                "cost_rec": 2_000.0,
                "penalty": 15_000_000.0,
                "maturity": 2,
                "cves": [self.REAL_CVES[3]],
                "controls": ["Endpoint AV"],
                "sensors": ["EDR"]
            }
        ]

        for cfg in anchor_configs:
            assets.append(EnterpriseAsset(
                asset_id=cfg["id"],
                name=cfg["name"],
                business_unit=cfg["bu"],
                criticality_tier=cfg["tier"],
                downtime_cost_per_hour=cfg["downtime_hr"],
                est_outage_duration_hours=cfg["outage_hrs"],
                records_count=cfg["records"],
                cost_per_record=cfg["cost_rec"],
                regulatory_penalty_base=cfg["penalty"],
                control_maturity_level=cfg["maturity"],
                vulnerabilities=cfg["cves"],
                active_controls=cfg["controls"],
                active_sensors=cfg["sensors"]
            ))

        # Generate remaining assets to reach total_assets
        asset_templates = [
            ("Branch Router & VPN Gateway", "Retail Banking", "Tier 2 (High)", 150000, 8, 10000, 1500, 2000000),
            ("DevOps CI/CD Build Runner", "Cloud & Engineering", "Tier 3 (Medium)", 80000, 4, 5000, 1000, 500000),
            ("CFO Accounting Terminal", "Finance & Treasury", "Tier 2 (High)", 300000, 6, 15000, 4000, 5000000),
            ("Executive Secretary Laptop", "Executive C-Suite", "Tier 2 (High)", 200000, 4, 8000, 3000, 3000000),
            ("Customer Onboarding Microservice", "Retail Banking", "Tier 1 (Mission Critical)", 900000, 10, 450000, 2500, 25000000),
            ("Data Lake Analytics Node", "Cloud & Engineering", "Tier 2 (High)", 400000, 12, 800000, 1500, 10000000),
            ("Legal Document Vault", "Human Resources & Legal", "Tier 2 (High)", 180000, 14, 25000, 3500, 8000000),
            ("ATM Transaction Concentrator", "Retail Banking", "Tier 1 (Mission Critical)", 1100000, 6, 600000, 2800, 35000000),
        ]

        count = len(assets) + 1
        while len(assets) < total_assets:
            tmpl = random.choice(asset_templates)
            bu = tmpl[1]
            cves = random.sample(self.REAL_CVES, k=random.randint(1, 2))
            maturity = random.randint(1, 4)
            asset = EnterpriseAsset(
                asset_id=f"AST-{bu[:3].upper()}-{count:03d}",
                name=f"{tmpl[0]} #{count}",
                business_unit=bu,
                criticality_tier=tmpl[2],
                downtime_cost_per_hour=tmpl[3] * random.uniform(0.8, 1.2),
                est_outage_duration_hours=tmpl[4] * random.uniform(0.7, 1.5),
                records_count=int(tmpl[5] * random.uniform(0.5, 2.0)),
                cost_per_record=tmpl[6],
                regulatory_penalty_base=tmpl[7] * random.uniform(0.7, 1.3),
                control_maturity_level=maturity,
                vulnerabilities=cves,
                active_controls=["Basic Firewall"] if maturity < 3 else ["Firewall", "Endpoint EDR"],
                active_sensors=["SIEM"] if maturity >= 2 else []
            )
            assets.append(asset)
            count += 1

        return assets

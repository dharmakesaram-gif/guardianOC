"""
GuardianOC - Security Telemetry & Vulnerability Ingestion Parser
Parses Nessus/OpenVAS vulnerability scans, SIEM CEF logs, and CSPM audit reports.
Dynamically updates asset risk posture and triggers continuous re-quantification.
"""

import json
import csv
import io
from typing import List, Dict, Any, Tuple
from .synthetic_data_generator import EnterpriseAsset, Vulnerability

SAMPLE_NESSUS_SCAN = {
    "scan_name": "Quarterly_Perimeter_Internal_Scan_Q3",
    "scanner": "Tenable Nessus Professional / OpenVAS",
    "timestamp": "2026-09-26T14:30:00Z",
    "targets_scanned": 42,
    "findings": [
        {
            "host": "AST-FIN-001 (SWIFT Wire Switch)",
            "cve_id": "CVE-2024-3400",
            "plugin_name": "Palo Alto PAN-OS Command Injection",
            "cvss_score": 9.8,
            "epss_score": 0.94,
            "port": 443,
            "severity": "CRITICAL",
            "remediation": "Upgrade PAN-OS to 11.1.2-h3 immediately. Restrict management interface."
        },
        {
            "host": "AST-EXEC-002 (C-Suite PBX Voice Gateway)",
            "cve_id": "CVE-2024-BIO-SPOOF",
            "plugin_name": "SIP PBX Vulnerable to Neural Speech Synthesis Injection",
            "cvss_score": 9.4,
            "epss_score": 0.89,
            "port": 5060,
            "severity": "CRITICAL",
            "remediation": "Deploy VocxGuard Biomechanical Reality Verification proxy on SIP trunk."
        },
        {
            "host": "AST-CLD-003 (Kubernetes Production EKS)",
            "cve_id": "CVE-2023-4966",
            "plugin_name": "Citrix Bleed Ingress Gateway Session Hijacking",
            "cvss_score": 9.4,
            "epss_score": 0.92,
            "port": 443,
            "severity": "CRITICAL",
            "remediation": "Revoke active token sessions; apply vendor security hotfix."
        },
        {
            "host": "AST-RET-004 (Retail NetBanking Portal)",
            "cve_id": "CVE-2024-23897",
            "plugin_name": "Jenkins Core Remote Arbitrary File Read",
            "cvss_score": 9.8,
            "epss_score": 0.88,
            "port": 8080,
            "severity": "HIGH",
            "remediation": "Disable CLI argument parser; upgrade to 2.442."
        }
    ]
}

SAMPLE_SIEM_LOGS = [
    {
        "timestamp": "2026-09-26T16:45:12Z",
        "format": "CEF:0|VocxGuard|BiometricShield|1.0|1001|Voice Spoof Attempt|9",
        "src": "185.220.101.42",
        "dst": "10.0.12.5 (Executive PBX)",
        "msg": "Transposed convolution high-frequency aliasing detected. Caller spoofing CFO voice.",
        "action": "BLOCKED_CALL_ISOLATED_SESSION"
    },
    {
        "timestamp": "2026-09-26T16:51:04Z",
        "format": "CEF:0|CrowdStrike|FalconEDR|7.2|3002|Suspicious PowerShell EncodedCommand|8",
        "src": "10.0.15.88",
        "dst": "AST-FIN-001",
        "msg": "PowerShell invoking rundll32 with obfuscated memory payload. Lateral movement blocked.",
        "action": "PROCESS_TERMINATED"
    }
]


class IngestionParser:
    """Parses real scan payloads and returns structured findings and delta calculations."""

    @staticmethod
    def parse_nessus_payload(content_str: str) -> List[Dict[str, Any]]:
        """Parses JSON or CSV Nessus vulnerability output."""
        try:
            data = json.loads(content_str)
            if "findings" in data:
                return data["findings"]
            if isinstance(data, list):
                return data
        except Exception:
            # Fallback to CSV parser
            reader = csv.DictReader(io.StringIO(content_str))
            findings = []
            for row in reader:
                findings.append({
                    "host": row.get("Host", row.get("host", "Unknown")),
                    "cve_id": row.get("CVE", row.get("cve_id", "CVE-2024-GENERIC")),
                    "plugin_name": row.get("Name", row.get("plugin_name", "Vulnerability Finding")),
                    "cvss_score": float(row.get("CVSS", row.get("cvss_score", 7.5))),
                    "epss_score": float(row.get("EPSS", row.get("epss_score", 0.65))),
                    "severity": row.get("Risk", row.get("severity", "HIGH")),
                    "remediation": row.get("Solution", row.get("remediation", "Apply vendor security patch."))
                })
            return findings
        return []

    @staticmethod
    def get_sample_nessus() -> Dict[str, Any]:
        return SAMPLE_NESSUS_SCAN

    @staticmethod
    def get_sample_siem() -> List[Dict[str, Any]]:
        return SAMPLE_SIEM_LOGS

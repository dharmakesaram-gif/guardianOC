"""
GuardianOC - AI Decision Support & NLP Query Engine (Layer 3)
Converts natural language questions into structured queries against the risk database.
Handles queries like 'highest financial risk today', 'business unit exposure', and 'what-if' simulations.
"""

from typing import Dict, Any, List, Optional
import re
from .crq_engine import CRQEngine, AssetRiskAssessment


class NLPQueryEngine:
    """
    Translates C-suite natural language queries into quantitative risk analytics.
    Simulates a specialized Cyber Risk Bloomberg Terminal search.
    """

    def __init__(self, crq_engine: CRQEngine):
        self.crq = crq_engine

    def query(self, prompt: str) -> Dict[str, Any]:
        p = prompt.strip().lower()

        # 1. Highest Risk Assets
        if any(w in p for w in ["highest risk", "top risk", "most vulnerable", "biggest exposure", "top assets", "today"]):
            assets = self.crq.assess_all_assets()[:5]
            sql = "SELECT asset_id, name, business_unit, eal, var_95, top_cve FROM assets ORDER BY eal DESC LIMIT 5;"
            top_asset = assets[0]
            ans = (
                f"The highest financial risk today is **{top_asset.name}** ({top_asset.asset_id}) in the "
                f"**{top_asset.business_unit}** unit, with an Expected Annual Loss (EAL) of "
                f"**₹{(top_asset.expected_annual_loss / 10000000):.2f} Crores** and 95% Cyber VaR of "
                f"**₹{(top_asset.var_95 / 10000000):.2f} Crores**. "
                f"Primary vulnerability is {top_asset.top_cve}."
            )
            return {
                "query": prompt,
                "intent": "HIGHEST_FINANCIAL_RISK",
                "sql_query": sql,
                "answer": ans,
                "data": [
                    {
                        "Asset ID": a.asset_id,
                        "Name": a.name,
                        "Unit": a.business_unit,
                        "Criticality": f"{a.criticality_score}/100",
                        "EAL": f"₹{(a.expected_annual_loss / 100000):.2f} L",
                        "VaR 95%": f"₹{(a.var_95 / 100000):.2f} L",
                        "Top CVE": a.top_cve
                    }
                    for a in assets
                ]
            }

        # 2. Business Unit Breakdown
        if any(w in p for w in ["business unit", "department", "division", "units", "bu"]):
            bu_data = self.crq.get_business_unit_breakdown()
            sql = "SELECT business_unit, COUNT(asset_id) as assets, SUM(eal) as total_eal, SUM(var_95) as total_var FROM assets GROUP BY business_unit ORDER BY total_eal DESC;"
            highest_bu = bu_data[0]
            ans = (
                f"The **{highest_bu['business_unit']}** unit carries the largest financial cyber exposure at "
                f"**₹{(highest_bu['total_eal'] / 10000000):.2f} Crores**, followed by {bu_data[1]['business_unit']} "
                f"at ₹{(bu_data[1]['total_eal'] / 10000000):.2f} Crores."
            )
            return {
                "query": prompt,
                "intent": "BUSINESS_UNIT_BREAKDOWN",
                "sql_query": sql,
                "answer": ans,
                "data": [
                    {
                        "Business Unit": b["business_unit"],
                        "Assets": b["asset_count"],
                        "Total EAL": f"₹{(b['total_eal'] / 10000000):.2f} Cr",
                        "95% VaR": f"₹{(b['total_var_95'] / 10000000):.2f} Cr"
                    }
                    for b in bu_data
                ]
            }

        # 3. Voice Deepfake / VocxGuard Risk
        if any(w in p for w in ["voice", "deepfake", "vocxguard", "ceo fraud", "impersonation", "spoof"]):
            sc = self.crq.default_scenarios.get("TS-VOICE-01")
            sql = "SELECT * FROM threat_scenarios WHERE category = 'Social Engineering & Deepfakes';"
            multiplier = sc.telemetry_multiplier if sc else 1.0
            ans = (
                f"AI Voice Cloning & CEO Fraud represents **₹{(sc.loss_magnitude_mode / 100000):.1f} Lakhs** most likely loss per incident, "
                f"with a current live telemetry multiplier of **{multiplier}x**. "
                f"Real-time acoustic and biomechanical telemetry from VocxGuard is actively protecting executive PBX gateways."
            )
            return {
                "query": prompt,
                "intent": "VOICE_CLONING_EXPOSURE",
                "sql_query": sql,
                "answer": ans,
                "data": [
                    {
                        "Threat Scenario": sc.name if sc else "AI Voice Cloning",
                        "Min Loss": f"₹{sc.loss_magnitude_min / 100000:.1f} L",
                        "Most Likely": f"₹{sc.loss_magnitude_mode / 100000:.1f} L",
                        "Worst Case": f"₹{sc.loss_magnitude_max / 10000000:.1f} Cr",
                        "Active Telemetry Sensor": "VocxGuard Tri-Net + Biomechanical"
                    }
                ]
            }

        # 4. Compliance / DPDP Act / RBI
        if any(w in p for w in ["compliance", "dpdp", "rbi", "penalty", "regulation", "iso"]):
            dpdp = self.crq.FRAMEWORK_MAPPINGS["DPDP_ACT_2023"][0]
            sql = "SELECT * FROM regulatory_frameworks WHERE framework IN ('DPDP_2023', 'RBI_CSF', 'ISO_27001');"
            ans = (
                f"Under the **DPDP Act 2023**, maximum statutory penalties reach **{dpdp['fine_cap']}**. "
                f"GuardianOC's quantitative controls mitigate financial liability to **{dpdp['exposure_assessment']}**."
            )
            return {
                "query": prompt,
                "intent": "REGULATORY_COMPLIANCE",
                "sql_query": sql,
                "answer": ans,
                "data": self.crq.FRAMEWORK_MAPPINGS["ISO_27001"]
            }

        # 5. Default Fallback
        sql = "SELECT AVG(criticality_score), SUM(eal) FROM assets;"
        overview = self.crq.simulate_enterprise()
        ans = (
            f"Enterprise Financial Exposure summary: Total Inherent Annualized Loss Expectancy (ALE) is "
            f"**₹{(overview['total_annualized_loss_expectancy'] / 10000000):.2f} Crores**, with a 95% Cyber Value-at-Risk "
            f"of **₹{(overview['total_var_95'] / 10000000):.2f} Crores** across 75 active assets."
        )
        return {
            "query": prompt,
            "intent": "GENERAL_ENTERPRISE_RISK",
            "sql_query": sql,
            "answer": ans,
            "data": overview["business_units"]
        }

"""
GuardianOC - AI Cyber Investment Optimization Engine
Solves the constrained multi-choice Knapsack and Pareto Frontier optimization problem
to maximize Return on Security Investment (ROSI) and minimize residual enterprise risk.
"""

from dataclasses import dataclass
from typing import List, Dict, Any, Tuple
import copy
from .crq_engine import CRQEngine, ThreatScenario


@dataclass
class SecurityControl:
    """Represents an actionable cybersecurity control investment."""
    id: str
    name: str
    category: str
    annual_cost: float       # Cost in INR
    target_scenarios: List[str] # List of ThreatScenario IDs affected
    vulnerability_reduction: float # Percentage reduction in vuln (e.g. 0.85 = 85% drop)
    loss_reduction: float          # Percentage reduction in loss magnitude (e.g. 0.50 = 50% drop)
    implementation_time_weeks: int
    roi_score: float = 0.0


@dataclass
class OptimizationPlan:
    """Selected portfolio of investments for a given budget."""
    budget: float
    total_cost: float
    selected_controls: List[SecurityControl]
    unselected_controls: List[SecurityControl]
    inherent_ale: float
    residual_ale: float
    risk_reduced: float
    rosi_percentage: float
    residual_var_95: float


class InvestmentOptimizer:
    """
    Solves security budget allocation using Multi-Objective Knapsack & Pareto Optimization.
    """

    def __init__(self, crq_engine: CRQEngine):
        self.crq = crq_engine
        self.controls_catalog: List[SecurityControl] = self._load_default_controls()

    def _load_default_controls(self) -> List[SecurityControl]:
        """Candidate security investments with real-world cost and mitigation benchmarks."""
        return [
            SecurityControl(
                id="CTL-VOCX-01",
                name="VocxGuard Voice Biometric Shield",
                category="Identity & Deepfake Defense",
                annual_cost=800_000.0,  # ₹8 Lakhs
                target_scenarios=["TS-VOICE-01"],
                vulnerability_reduction=0.92, # 92% reduction in successful voice spoofing
                loss_reduction=0.70,
                implementation_time_weeks=2,
            ),
            SecurityControl(
                id="CTL-MFA-02",
                name="FIDO2 Phishing-Resistant MFA & SSO",
                category="Access Management",
                annual_cost=1_200_000.0, # ₹12 Lakhs
                target_scenarios=["TS-VOICE-01", "TS-CLOUD-03"],
                vulnerability_reduction=0.65,
                loss_reduction=0.20,
                implementation_time_weeks=4,
            ),
            SecurityControl(
                id="CTL-EDR-03",
                name="Autonomous AI XDR & Managed Detection",
                category="Endpoint & Network Defense",
                annual_cost=1_800_000.0, # ₹18 Lakhs
                target_scenarios=["TS-RANSOM-02", "TS-SUPPLY-04"],
                vulnerability_reduction=0.75,
                loss_reduction=0.50,
                implementation_time_weeks=6,
            ),
            SecurityControl(
                id="CTL-CSPM-04",
                name="Continuous Cloud Posture Management (CSPM)",
                category="Cloud Security",
                annual_cost=1_000_000.0, # ₹10 Lakhs
                target_scenarios=["TS-CLOUD-03"],
                vulnerability_reduction=0.80,
                loss_reduction=0.40,
                implementation_time_weeks=3,
            ),
            SecurityControl(
                id="CTL-BACKUP-05",
                name="Immutable Air-Gapped Ransomware Vaults",
                category="Disaster Recovery",
                annual_cost=1_500_000.0, # ₹15 Lakhs
                target_scenarios=["TS-RANSOM-02"],
                vulnerability_reduction=0.20,
                loss_reduction=0.85, # Drastically cuts business interruption & extortion losses
                implementation_time_weeks=5,
            ),
            SecurityControl(
                id="CTL-AWARE-06",
                name="Executive Deepfake & Social Engineering Drills",
                category="Human Layer Security",
                annual_cost=400_000.0,  # ₹4 Lakhs
                target_scenarios=["TS-VOICE-01"],
                vulnerability_reduction=0.40,
                loss_reduction=0.15,
                implementation_time_weeks=1,
            ),
            SecurityControl(
                id="CTL-ZTNA-07",
                name="Zero Trust Network Architecture (ZTNA)",
                category="Perimeter & Network",
                annual_cost=2_200_000.0, # ₹22 Lakhs
                target_scenarios=["TS-RANSOM-02", "TS-CLOUD-03", "TS-SUPPLY-04"],
                vulnerability_reduction=0.60,
                loss_reduction=0.45,
                implementation_time_weeks=8,
            )
        ]

    def _evaluate_residual_ale(self, selected_controls: List[SecurityControl]) -> Tuple[float, float]:
        """
        Calculates residual enterprise ALE and VaR if the specified controls are deployed.
        Applies mitigating factors to the FAIR threat scenarios.
        """
        modified_scenarios: Dict[str, ThreatScenario] = copy.deepcopy(self.crq.default_scenarios)

        for ctrl in selected_controls:
            for sc_id in ctrl.target_scenarios:
                if sc_id in modified_scenarios:
                    sc = modified_scenarios[sc_id]
                    # Compound vulnerability reduction
                    sc.vulnerability_prob *= (1.0 - ctrl.vulnerability_reduction)
                    # Compound loss reduction
                    sc.loss_magnitude_min *= (1.0 - ctrl.loss_reduction)
                    sc.loss_magnitude_mode *= (1.0 - ctrl.loss_reduction)
                    sc.loss_magnitude_max *= (1.0 - ctrl.loss_reduction)

        sim_result = self.crq.simulate_enterprise(list(modified_scenarios.values()))
        return sim_result["total_annualized_loss_expectancy"], sim_result["total_var_95"]

    def optimize(self, budget: float, mandatory_control_ids: List[str] = None) -> OptimizationPlan:
        """
        Solves budget allocation using 0-1 Knapsack branch search to find the portfolio
        that maximizes risk reduction (delta ALE) while respecting the budget constraint.
        """
        mandatory_control_ids = mandatory_control_ids or []
        baseline_sim = self.crq.simulate_enterprise()
        inherent_ale = baseline_sim["total_annualized_loss_expectancy"]

        candidates = self.controls_catalog
        best_selected = []
        best_risk_reduced = 0.0
        best_cost = 0.0
        best_residual_ale = inherent_ale
        best_residual_var = baseline_sim["total_var_95"]

        n = len(candidates)
        # 2^n is small (2^7 = 128 states), exhaustive search guarantees global optimal
        for i in range(1 << n):
            subset = [candidates[j] for j in range(n) if (i & (1 << j))]

            # Enforce mandatory controls
            subset_ids = [c.id for c in subset]
            if not all(m_id in subset_ids for m_id in mandatory_control_ids):
                continue

            cost = sum(c.annual_cost for c in subset)
            if cost > budget:
                continue

            res_ale, res_var = self._evaluate_residual_ale(subset)
            risk_reduced = inherent_ale - res_ale

            if risk_reduced > best_risk_reduced or (risk_reduced == best_risk_reduced and cost < best_cost):
                best_risk_reduced = risk_reduced
                best_cost = cost
                best_selected = subset
                best_residual_ale = res_ale
                best_residual_var = res_var

        # Calculate ROSI = (ΔALE - Total Cost) / Total Cost * 100
        rosi = 0.0
        if best_cost > 0:
            rosi = round(((best_risk_reduced - best_cost) / best_cost) * 100.0, 2)

        selected_ids = {c.id for c in best_selected}
        unselected = [c for c in candidates if c.id not in selected_ids]

        return OptimizationPlan(
            budget=budget,
            total_cost=round(best_cost, 2),
            selected_controls=best_selected,
            unselected_controls=unselected,
            inherent_ale=round(inherent_ale, 2),
            residual_ale=round(best_residual_ale, 2),
            risk_reduced=round(best_risk_reduced, 2),
            rosi_percentage=rosi,
            residual_var_95=round(best_residual_var, 2)
        )

    def generate_pareto_frontier(self, steps: int = 6) -> List[Dict[str, Any]]:
        """
        Generates the Pareto Efficiency Frontier mapping budget increments to risk reduction.
        Shows the CISO the 'diminishing returns' curve.
        """
        max_cost = sum(c.annual_cost for c in self.controls_catalog)
        budgets = [round(max_cost * (i / float(steps)), -4) for i in range(1, steps + 1)]
        frontier = []

        for b in budgets:
            plan = self.optimize(budget=b)
            frontier.append({
                "budget": plan.budget,
                "utilized_cost": plan.total_cost,
                "residual_ale": plan.residual_ale,
                "risk_reduced": plan.risk_reduced,
                "rosi_percentage": plan.rosi_percentage,
                "selected_control_names": [c.name for c in plan.selected_controls]
            })

        return frontier

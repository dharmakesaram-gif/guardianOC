"use client";

import React, { useState, useEffect } from "react";
import {
  ShieldAlert,
  ShieldCheck,
  TrendingUp,
  DollarSign,
  Activity,
  Zap,
  Sliders,
  AlertTriangle,
  Radio,
  Server,
  Lock,
  ArrowRight,
  Layers,
  Sparkles,
  RefreshCw,
  PhoneCall,
  CheckCircle2,
  XCircle,
  BarChart3,
  Flame,
  Award,
  Search,
  Terminal,
  Database,
  SlidersHorizontal,
  FileCheck2,
  HelpCircle,
  FileText,
  UploadCloud,
  FileSpreadsheet,
  Download,
  Eye,
  Building2,
  UserCheck,
  Check,
  Copy,
  ExternalLink
} from "lucide-react";

interface AssetRisk {
  asset_id: string;
  name: string;
  business_unit: string;
  criticality_score: number;
  likelihood_probability: number;
  potential_single_loss: number;
  expected_annual_loss: number;
  var_95: number;
  top_cve: string;
  primary_attack_vector: string;
  mitigation_urgency: string;
}

interface SelectedControl {
  id: string;
  name: string;
  category: string;
  cost: number;
  vulnerability_reduction: number;
  loss_reduction: number;
  implementation_weeks: number;
}

interface UnselectedControl {
  id: string;
  name: string;
  cost: number;
  category: string;
}

interface OptimizationData {
  budget: number;
  utilized_cost: number;
  inherent_ale: number;
  residual_ale: number;
  risk_reduced: number;
  rosi_percentage: number;
  residual_var_95: number;
  selected_controls: SelectedControl[];
  unselected_controls: UnselectedControl[];
}

interface TelemetryEvent {
  event_id: string;
  sensor_type: string;
  timestamp: string;
  source_identity: string;
  target_asset: string;
  raw_threat_score: number;
  confidence: number;
  threat_category: string;
  details: any;
}

export default function GuardianOCBloombergTerminal() {
  const [activeTab, setActiveTab] = useState<"overview" | "assets" | "optimizer" | "whatif" | "nlp" | "telemetry" | "ingest" | "certin" | "compliance">("overview");
  const [currency, setCurrency] = useState<"INR" | "USD">("INR");
  const [roleView, setRoleView] = useState<"CISO" | "SOC" | "AUDITOR">("CISO");
  
  const [crqOverview, setCrqOverview] = useState<any>(null);
  const [assets, setAssets] = useState<AssetRisk[]>([]);
  const [assetFilter, setAssetFilter] = useState<string>("");
  const [budget, setBudget] = useState<number>(3000000); // ₹30 Lakhs
  const [optimization, setOptimization] = useState<OptimizationData | null>(null);
  const [telemetryEvents, setTelemetryEvents] = useState<TelemetryEvent[]>([]);
  const [threatMultiplier, setThreatMultiplier] = useState<number>(1.0);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);

  // Ingestion Scan State
  const [ingestionStatus, setIngestionStatus] = useState<string>("");
  const [isIngesting, setIsIngesting] = useState<boolean>(false);

  // Real Enterprise Connectors State
  const [liveEpss, setLiveEpss] = useState<any>(null);
  const [testingEpss, setTestingEpss] = useState<boolean>(false);
  const [sipRecInfo, setSipRecInfo] = useState<any>(null);
  const [cmdbSyncInfo, setCmdbSyncInfo] = useState<any>(null);

  // CERT-In Report Modal
  const [certInReport, setCertInReport] = useState<any>(null);
  const [copiedNotice, setCopiedNotice] = useState<boolean>(false);

  // Boardroom Audit Modal
  const [boardroomAuditText, setBoardroomAuditText] = useState<string>("");
  const [showAuditModal, setShowAuditModal] = useState<boolean>(false);

  // NLP Query State
  const [nlpQuery, setNlpQuery] = useState<string>("What is the highest financial risk today?");
  const [nlpResult, setNlpResult] = useState<any>(null);
  const [isQuerying, setIsQuerying] = useState<boolean>(false);

  // What-If Simulator State
  const [whatIfControls, setWhatIfControls] = useState({
    vocxguard_shield: true,
    mfa_enabled: true,
    immutable_backups: true,
    cloud_segmentation: true
  });
  const [whatIfResult, setWhatIfResult] = useState<any>(null);

  // Fetch initial CRQ overview
  const fetchCRQ = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/api/crq/overview");
      if (res.ok) {
        const data = await res.json();
        setCrqOverview(data);
      }
    } catch (e) {
      console.warn("API Offline, using local state");
    }
  };

  // Fetch asset inventory
  const fetchAssets = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/api/assets");
      if (res.ok) {
        const data = await res.json();
        setAssets(data);
      }
    } catch (e) {}
  };

  // Run budget optimization
  const runOptimization = async (targetBudget: number) => {
    try {
      const res = await fetch("http://127.0.0.1:8000/api/optimizer/allocate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ budget: targetBudget, mandatory_controls: [] }),
      });
      if (res.ok) {
        const data = await res.json();
        setOptimization(data);
      }
    } catch (e) {}
  };

  // Fetch telemetry events
  const fetchTelemetry = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/api/telemetry/history");
      if (res.ok) {
        const data = await res.json();
        setTelemetryEvents(data);
      }
    } catch (e) {}
  };

  // Execute NLP Query
  const handleExecuteNLP = async (queryText?: string) => {
    const q = queryText || nlpQuery;
    setIsQuerying(true);
    try {
      const res = await fetch("http://127.0.0.1:8000/api/nlp/query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: q }),
      });
      if (res.ok) {
        const data = await res.json();
        setNlpResult(data);
      }
    } catch (e) {
      alert("Please ensure GuardianOC backend is running on http://127.0.0.1:8000");
    } finally {
      setIsQuerying(false);
    }
  };

  // Execute What-If Simulation
  const handleWhatIfToggle = async (key: string) => {
    const updated = { ...whatIfControls, [key]: !whatIfControls[key as keyof typeof whatIfControls] };
    setWhatIfControls(updated);
    try {
      const res = await fetch("http://127.0.0.1:8000/api/scenarios/simulate-what-if", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated),
      });
      if (res.ok) {
        const data = await res.json();
        setWhatIfResult(data);
      }
    } catch (e) {}
  };

  // Ingest Sample Scan
  const handleIngestSampleScan = async () => {
    setIsIngesting(true);
    setIngestionStatus("Parsing Nessus scan & correlating CVEs with enterprise assets...");
    try {
      const res = await fetch("http://127.0.0.1:8000/api/ingest/scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      });
      if (res.ok) {
        const data = await res.json();
        setIngestionStatus(`✅ Ingested ${data.findings_parsed} CVE findings. Continuous risk recalculation complete!`);
        await fetchCRQ();
        await fetchAssets();
        if (optimization) runOptimization(budget);
      }
    } catch (e) {
      setIngestionStatus("❌ Ingestion failed. Ensure backend is running.");
    } finally {
      setIsIngesting(false);
    }
  };

  // Test Live FIRST.org EPSS Connector
  const handleTestLiveEpss = async () => {
    setTestingEpss(true);
    try {
      const res = await fetch("http://127.0.0.1:8000/api/connectors/live-epss/CVE-2024-3400");
      if (res.ok) {
        const data = await res.json();
        setLiveEpss(data);
      }
    } catch (e) {}
    setTestingEpss(false);
  };

  // Check SIP REC Status
  const handleCheckSipRec = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/api/connectors/sip-rec/status");
      if (res.ok) setSipRecInfo(await res.json());
    } catch (e) {}
  };

  // Sync Cloud CMDB
  const handleSyncCloudCmdb = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/api/connectors/cloud-cmdb/sync", { method: "POST" });
      if (res.ok) setCmdbSyncInfo(await res.json());
    } catch (e) {}
  };

  // Generate CERT-In Report
  const handleGenerateCertIn = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/api/remediation/certin-draft", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          incident_id: "2026-0926-VOCX",
          asset_name: "Executive PBX Gateway / Core Wire Transfer Switch",
          threat_score: 0.94
        }),
      });
      if (res.ok) {
        const data = await res.json();
        setCertInReport(data);
        setActiveTab("certin");
      }
    } catch (e) {}
  };

  // Fetch Boardroom Audit
  const handleFetchBoardroomAudit = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/api/reports/boardroom-audit");
      if (res.ok) {
        const data = await res.json();
        setBoardroomAuditText(data.report_text);
        setShowAuditModal(true);
      }
    } catch (e) {}
  };

  // Trigger attack simulation
  const handleSimulateAttack = async () => {
    setIsSimulating(true);
    try {
      const res = await fetch("http://127.0.0.1:8000/api/telemetry/simulate-attack", {
        method: "POST",
      });
      if (res.ok) {
        const data = await res.json();
        setThreatMultiplier(data.dynamic_threat_multiplier);
        await fetchCRQ();
        await fetchTelemetry();
        await fetchAssets();
        if (optimization) runOptimization(budget);
      }
    } catch (e) {
      alert("Please ensure GuardianOC backend is running on http://127.0.0.1:8000");
    } finally {
      setIsSimulating(false);
    }
  };

  const handleResetTelemetry = async () => {
    try {
      await fetch("http://127.0.0.1:8000/api/telemetry/reset", { method: "POST" });
      setThreatMultiplier(1.0);
      await fetchCRQ();
      await fetchTelemetry();
      await fetchAssets();
      if (optimization) runOptimization(budget);
    } catch (e) {}
  };

  useEffect(() => {
    fetchCRQ();
    fetchAssets();
    runOptimization(budget);
    fetchTelemetry();
    handleExecuteNLP("What is the highest financial risk today?");

    fetch("http://127.0.0.1:8000/api/scenarios/simulate-what-if", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(whatIfControls),
    })
      .then((r) => r.json())
      .then((d) => setWhatIfResult(d))
      .catch(() => {});

    const timer = setInterval(() => {
      fetchTelemetry();
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const formatCurrency = (val: number) => {
    if (!val) return currency === "INR" ? "₹0" : "$0";
    if (currency === "USD") {
      const usdVal = val / 84.0; // Approx ₹84 / USD
      if (usdVal >= 1000000) return `$${(usdVal / 1000000).toFixed(2)} M`;
      if (usdVal >= 1000) return `$${(usdVal / 1000).toFixed(1)} K`;
      return `$${usdVal.toFixed(0)}`;
    }
    // INR Formatting
    if (val >= 10000000) return `₹${(val / 10000000).toFixed(2)} Cr`;
    if (val >= 100000) return `₹${(val / 100000).toFixed(2)} L`;
    return `₹${val.toLocaleString("en-IN")}`;
  };

  const inherentALE = crqOverview?.total_annualized_loss_expectancy || 58470000;
  const inherentVaR = crqOverview?.total_var_95 || 112000000;

  const filteredAssets = assets.filter(
    (a) =>
      a.name.toLowerCase().includes(assetFilter.toLowerCase()) ||
      a.business_unit.toLowerCase().includes(assetFilter.toLowerCase()) ||
      a.asset_id.toLowerCase().includes(assetFilter.toLowerCase()) ||
      a.top_cve.toLowerCase().includes(assetFilter.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 p-3 md:p-6 font-sans selection:bg-cyan-500 selection:text-white">
      {/* Top Bloomberg Terminal Status Ticker */}
      <div className="bg-slate-900 border border-slate-800 rounded-lg px-4 py-2 mb-4 flex flex-wrap items-center justify-between text-[11px] font-mono gap-3 text-slate-400">
        <div className="flex items-center gap-4 overflow-x-auto whitespace-nowrap">
          <span className="text-cyan-400 font-bold flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5" /> GUARDIAN-OC BLOOMBERG COCKPIT
          </span>
          <span>EAL: <strong className="text-rose-400">{formatCurrency(inherentALE)}</strong></span>
          <span>95% VaR: <strong className="text-amber-400">{formatCurrency(inherentVaR)}</strong></span>
          <span>RESIDUAL ALE: <strong className="text-emerald-400">{formatCurrency(optimization?.residual_ale || 12400000)}</strong></span>
          <span>ROSI: <strong className="text-cyan-300">+{optimization?.rosi_percentage || 1430}%</strong></span>
          <span className="text-emerald-400">DPDP ACT: CAPPED &lt; ₹1.5 Cr</span>
          <span className="text-cyan-400">CERT-In 6-HR NOTIFIER: ARMED</span>
        </div>

        {/* Currency & Role Switchers */}
        <div className="flex items-center gap-2">
          {/* Currency Toggle */}
          <div className="flex rounded-md bg-slate-950 p-0.5 border border-slate-800 text-[10px]">
            <button
              onClick={() => setCurrency("INR")}
              className={`px-2 py-0.5 rounded font-bold transition ${currency === "INR" ? "bg-cyan-600 text-white" : "text-slate-400"}`}
            >
              ₹ INR
            </button>
            <button
              onClick={() => setCurrency("USD")}
              className={`px-2 py-0.5 rounded font-bold transition ${currency === "USD" ? "bg-cyan-600 text-white" : "text-slate-400"}`}
            >
              $ USD
            </button>
          </div>

          {/* Role Switcher */}
          <div className="flex rounded-md bg-slate-950 p-0.5 border border-slate-800 text-[10px]">
            {(["CISO", "SOC", "AUDITOR"] as const).map((r) => (
              <button
                key={r}
                onClick={() => setRoleView(r)}
                className={`px-2 py-0.5 rounded font-bold transition ${roleView === r ? "bg-emerald-600 text-white" : "text-slate-400"}`}
              >
                {r}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1.5 ml-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-emerald-400 text-[10px]">VOCXGUARD ACTIVE</span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="flex flex-col md:flex-row items-start md:items-center justify-between pb-4 border-b border-slate-800 gap-4">
        <div>
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-tr from-cyan-500 to-blue-600 rounded-xl shadow-lg shadow-cyan-500/20">
              <ShieldAlert className="w-7 h-7 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-black tracking-tight text-white">GuardianOC</h1>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-800 font-mono font-semibold">
                  SIH 2026 Grand Finale Edition
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-mono">
                  PS26105 × PS26104
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Continuous Cyber Risk Quantification (Open FAIR) & AI Investment Knapsack Optimizer with Live VocxGuard Audio Forensics
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons: Live Attack, CERT-In, Boardroom Report */}
        <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
          <button
            onClick={handleFetchBoardroomAudit}
            className="flex items-center gap-1.5 px-3 py-2 bg-slate-900 hover:bg-slate-800 text-slate-200 rounded-lg text-xs font-semibold border border-slate-700 transition cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5 text-cyan-400" />
            Boardroom Audit
          </button>

          <button
            onClick={handleGenerateCertIn}
            className="flex items-center gap-1.5 px-3 py-2 bg-amber-950/60 hover:bg-amber-900/60 text-amber-200 rounded-lg text-xs font-semibold border border-amber-800 transition cursor-pointer"
          >
            <FileCheck2 className="w-3.5 h-3.5 text-amber-400" />
            CERT-In 6-Hr Notice
          </button>

          <button
            onClick={handleSimulateAttack}
            disabled={isSimulating}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-500 hover:to-rose-600 text-white rounded-lg text-xs font-semibold shadow-lg shadow-red-900/30 transition cursor-pointer"
          >
            <Flame className="w-3.5 h-3.5" />
            {isSimulating ? "Simulating..." : "Simulate Live Attack"}
          </button>

          <button
            onClick={handleResetTelemetry}
            className="p-2 bg-slate-900 hover:bg-slate-800 text-slate-300 rounded-lg text-xs border border-slate-700 transition"
            title="Reset telemetry"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      {/* Top 4 Financial Metric Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-5">
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 relative overflow-hidden group hover:border-slate-700 transition">
          <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
            <span>Inherent Expected Annual Loss (EAL)</span>
            <AlertTriangle className="w-4 h-4 text-rose-400" />
          </div>
          <div className="text-2xl font-black text-rose-400 mt-1 font-mono">
            {formatCurrency(inherentALE)}
          </div>
          <p className="text-[11px] text-slate-400 mt-0.5">Probabilistic annualized loss without controls</p>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 relative overflow-hidden group hover:border-slate-700 transition">
          <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
            <span>95% Cyber Value-at-Risk (VaR)</span>
            <Activity className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-black text-amber-400 mt-1 font-mono">
            {formatCurrency(inherentVaR)}
          </div>
          <p className="text-[11px] text-slate-400 mt-0.5">Worst-case financial tail loss (95th percentile)</p>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 relative overflow-hidden group hover:border-slate-700 transition">
          <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
            <span>Residual Risk (Post-Knapsack)</span>
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-black text-emerald-400 mt-1 font-mono">
            {formatCurrency(optimization?.residual_ale || 12400000)}
          </div>
          <p className="text-[11px] text-emerald-400 font-medium mt-0.5">
            -{optimization ? Math.round((optimization.risk_reduced / optimization.inherent_ale) * 100) : 78}% Exposure Reduction
          </p>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 relative overflow-hidden group hover:border-slate-700 transition">
          <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
            <span>Return on Security Investment (ROSI)</span>
            <TrendingUp className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl font-black text-cyan-400 mt-1 font-mono">
            +{optimization?.rosi_percentage || 1430}%
          </div>
          <p className="text-[11px] text-slate-400 mt-0.5">Net risk reduction per unit currency invested</p>
        </div>
      </section>

      {/* Navigation Tabs (Full SIH Spectrum) */}
      <div className="flex items-center gap-2 mt-6 border-b border-slate-800 overflow-x-auto whitespace-nowrap">
        {[
          { id: "overview", label: "Executive Risk & Visual Curves", icon: BarChart3 },
          { id: "assets", label: "Asset Inventory (75 Assets)", icon: Database },
          { id: "optimizer", label: "AI Investment Optimizer (Knapsack)", icon: Sliders },
          { id: "nlp", label: "NLP Risk Query Terminal", icon: Terminal },
          { id: "whatif", label: "Parameterized What-If Simulator", icon: SlidersHorizontal },
          { id: "telemetry", label: "VocxGuard Live Audio Forensics", icon: Radio },
          { id: "ingest", label: "Nessus & SIEM Ingestion", icon: UploadCloud },
          { id: "certin", label: "CERT-In 6-Hour Reporting", icon: FileCheck2 },
          { id: "compliance", label: "Compliance (DPDP/RBI/ISO)", icon: Building2 },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold border-b-2 transition cursor-pointer ${
                activeTab === tab.id
                  ? "border-cyan-500 text-cyan-400 bg-slate-900/50"
                  : "border-transparent text-slate-400 hover:text-slate-200"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* TAB 1: EXECUTIVE RISK OVERVIEW & VISUAL LOSS EXCEEDANCE CURVE */}
      {activeTab === "overview" && (
        <section className="mt-5 space-y-6">
          {/* Visual Loss Exceedance Curve (SVG) + Business Unit Breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {/* Interactive Loss Exceedance Curve SVG */}
            <div className="lg:col-span-2 p-5 rounded-2xl bg-slate-900 border border-slate-800">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-cyan-400" />
                    Loss Exceedance Curve (LEC) — Monte Carlo Loss Probability
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Probability of aggregate annual loss exceeding financial thresholds (10,000 FAIR trials).
                  </p>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                  Confidence: 95%
                </span>
              </div>

              {/* Responsive SVG Chart */}
              <div className="mt-6 relative h-56 w-full">
                <svg className="w-full h-full overflow-visible" viewBox="0 0 600 200" preserveAspectRatio="none">
                  {/* Grid Lines */}
                  <line x1="0" y1="40" x2="600" y2="40" stroke="#1e293b" strokeDasharray="3 3" />
                  <line x1="0" y1="90" x2="600" y2="90" stroke="#1e293b" strokeDasharray="3 3" />
                  <line x1="0" y1="140" x2="600" y2="140" stroke="#1e293b" strokeDasharray="3 3" />

                  {/* Gradient Definition */}
                  <defs>
                    <linearGradient id="lecGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.35" />
                      <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>

                  {/* Inherent Loss Exceedance Curve (Cyan) */}
                  <path
                    d="M 20 20 Q 150 50, 300 120 T 580 180 L 580 190 L 20 190 Z"
                    fill="url(#lecGrad)"
                  />
                  <path
                    d="M 20 20 Q 150 50, 300 120 T 580 180"
                    fill="none"
                    stroke="#06b6d4"
                    strokeWidth="3"
                  />

                  {/* Residual Post-Knapsack Curve (Emerald) */}
                  <path
                    d="M 20 90 Q 150 140, 300 165 T 580 190"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="2.5"
                    strokeDasharray="4 2"
                  />

                  {/* Key Markers */}
                  <circle cx="20" cy="20" r="4" fill="#f43f5e" />
                  <text x="30" y="25" fill="#f43f5e" fontSize="10" fontFamily="monospace">99% Tail: ₹18.5 Cr</text>

                  <circle cx="300" cy="120" r="4" fill="#fbbf24" />
                  <text x="310" y="115" fill="#fbbf24" fontSize="10" fontFamily="monospace">50% Median: ₹2.2 Cr</text>

                  <circle cx="580" cy="180" r="4" fill="#10b981" />
                  <text x="490" y="175" fill="#10b981" fontSize="10" fontFamily="monospace">10% Floor: ₹45 L</text>
                </svg>

                {/* Legend */}
                <div className="flex items-center justify-between text-[11px] font-mono mt-3 text-slate-400">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1.5">
                      <span className="w-3 h-0.5 bg-cyan-400 inline-block" /> Inherent Risk Curve
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-3 h-0.5 bg-emerald-400 border-b border-dashed inline-block" /> Post-Knapsack Residual Curve
                    </span>
                  </div>
                  <span>Exceedance Probability (1% → 99%)</span>
                </div>
              </div>
            </div>

            {/* Business Unit Financial Exposure Breakdown */}
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-cyan-400" />
                  Exposure by Business Unit
                </h3>
                <p className="text-xs text-slate-400 mt-1">Expected Annual Loss (EAL) aggregated per unit.</p>

                <div className="mt-4 space-y-2.5">
                  {(crqOverview?.business_units || []).map((bu: any, i: number) => (
                    <div key={i} className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-xs">
                      <div className="flex justify-between font-medium text-slate-200">
                        <span>{bu.business_unit}</span>
                        <span className="text-rose-400 font-mono font-bold">{formatCurrency(bu.total_eal)}</span>
                      </div>
                      <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                        <span>{bu.asset_count} Monitored Assets</span>
                        <span>95% VaR: {formatCurrency(bu.total_var_95)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 p-3 rounded-lg bg-cyan-950/30 border border-cyan-900/40 text-xs text-cyan-300">
                <strong>FAIR Governance:</strong> Continuous financial metrics replace subjective guesswork for boardroom audit and insurance underwriting.
              </div>
            </div>
          </div>

          {/* Top-down FAIR Threat Scenarios */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-cyan-400" />
              Continuous FAIR Threat Scenarios (Dynamic Multipliers)
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {(crqOverview?.scenario_results || []).map((sc: any) => {
                const isVoice = sc.scenario_id === "TS-VOICE-01";
                return (
                  <div
                    key={sc.scenario_id}
                    className={`p-4 rounded-xl border transition ${
                      isVoice && threatMultiplier > 1.0
                        ? "bg-red-950/20 border-red-800 shadow-md shadow-red-950/50"
                        : "bg-slate-900 border-slate-800"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                          {sc.scenario_id}
                        </span>
                        <h4 className="text-sm font-bold text-white">{sc.scenario_name}</h4>
                      </div>
                      {isVoice && (
                        <span className="text-[11px] px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-800 font-mono flex items-center gap-1">
                          <PhoneCall className="w-3 h-3" />
                          VocxGuard Telemetry Feed
                        </span>
                      )}
                    </div>

                    <div className="grid grid-cols-3 gap-3 mt-3 pt-3 border-t border-slate-800/80 text-xs">
                      <div>
                        <span className="text-slate-500 block">Annualized Loss</span>
                        <span className="text-rose-400 font-mono font-bold">
                          {formatCurrency(sc.annualized_loss_expectancy)}
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-500 block">95% Cyber VaR</span>
                        <span className="text-amber-400 font-mono font-bold">{formatCurrency(sc.var_95)}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block">Max Probable Loss</span>
                        <span className="text-slate-200 font-mono font-bold">
                          {formatCurrency(sc.max_probable_loss)}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* TAB 2: ASSET INVENTORY DRILLDOWN (75 ASSETS) */}
      {activeTab === "assets" && (
        <section className="mt-5 space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Database className="w-4 h-4 text-cyan-400" />
                Granular Enterprise Asset Inventory ({assets.length} Assets Modeled)
              </h3>
              <p className="text-xs text-slate-400">
                Asset criticality scoring, downtime cost, records exposure, and calculated EAL.
              </p>
            </div>

            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-500" />
              <input
                type="text"
                placeholder="Search asset, CVE, or unit..."
                value={assetFilter}
                onChange={(e) => setAssetFilter(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-500 font-mono"
              />
            </div>
          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-900">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950 text-slate-400 uppercase font-mono text-[10px] border-b border-slate-800">
                <tr>
                  <th className="p-3">Asset ID & Name</th>
                  <th className="p-3">Business Unit</th>
                  <th className="p-3">Criticality</th>
                  <th className="p-3">Top Vulnerability</th>
                  <th className="p-3">Expected Loss (EAL)</th>
                  <th className="p-3">95% Cyber VaR</th>
                  <th className="p-3">Urgency</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 font-mono text-[11px]">
                {filteredAssets.slice(0, 15).map((a) => (
                  <tr key={a.asset_id} className="hover:bg-slate-800/50 transition">
                    <td className="p-3 font-sans">
                      <span className="font-mono text-cyan-400 font-semibold block">{a.asset_id}</span>
                      <span className="text-slate-200">{a.name}</span>
                    </td>
                    <td className="p-3 text-slate-400 font-sans">{a.business_unit}</td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-bold">
                        {a.criticality_score}/100
                      </span>
                    </td>
                    <td className="p-3 text-amber-400 font-semibold">{a.top_cve}</td>
                    <td className="p-3 text-rose-400 font-bold">{formatCurrency(a.expected_annual_loss)}</td>
                    <td className="p-3 text-amber-400">{formatCurrency(a.var_95)}</td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          a.mitigation_urgency === "CRITICAL"
                            ? "bg-red-950 text-red-400 border border-red-800"
                            : "bg-amber-950 text-amber-400 border border-amber-800"
                        }`}
                      >
                        {a.mitigation_urgency}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="text-[11px] text-slate-500 font-mono text-right">
            Showing top 15 of {filteredAssets.length} enterprise assets
          </div>
        </section>
      )}

      {/* TAB 3: AI INVESTMENT OPTIMIZER (KNAPSACK) */}
      {activeTab === "optimizer" && (
        <section className="mt-5 space-y-6">
          <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-950 border border-slate-800">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-emerald-400" />
                  Cybersecurity Investment Budget Allocator (0-1 Knapsack)
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Adjust target annual security budget. GuardianOC solves the constrained knapsack problem to maximize Return on Security Investment (ROSI).
                </p>
              </div>

              <div className="text-right">
                <span className="text-xs text-slate-400 block">Allocated Budget</span>
                <span className="text-2xl font-black text-emerald-400 font-mono">{formatCurrency(budget)}</span>
              </div>
            </div>

            <div className="mt-5">
              <input
                type="range"
                min={800000}
                max={6000000}
                step={200000}
                value={budget}
                onChange={(e) => {
                  const b = Number(e.target.value);
                  setBudget(b);
                  runOptimization(b);
                }}
                className="w-full h-2.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
              <div className="flex justify-between text-[11px] text-slate-500 font-mono mt-2">
                <span>₹8 Lakhs ($9.5K)</span>
                <span>₹25 Lakhs ($30K)</span>
                <span>₹40 Lakhs ($48K)</span>
                <span>₹60 Lakhs ($71K)</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            <div className="lg:col-span-2 space-y-3">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <Award className="w-4 h-4 text-emerald-400" />
                Recommended Security Stack ({optimization?.selected_controls.length || 0} Controls Selected)
              </h4>

              <div className="space-y-3">
                {optimization?.selected_controls.map((ctrl) => (
                  <div
                    key={ctrl.id}
                    className="p-4 rounded-xl bg-slate-900 border border-emerald-900/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <h5 className="text-sm font-bold text-white">{ctrl.name}</h5>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 font-mono">
                          {ctrl.category}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 mt-1">
                        Mitigates: {(ctrl as any).target_scenarios?.join(", ")} | Vulnerability Cut:{" "}
                        <span className="text-emerald-400 font-semibold font-mono">
                          {Math.round(ctrl.vulnerability_reduction * 100)}%
                        </span>
                      </p>
                    </div>

                    <div className="text-right sm:min-w-[120px]">
                      <span className="text-sm font-bold font-mono text-emerald-400 block">{formatCurrency(ctrl.cost)}</span>
                      <span className="text-[10px] text-slate-500 font-mono">{ctrl.implementation_weeks} wks rollout</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-5">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                Optimization Summary
              </h4>

              <div className="space-y-3 text-xs">
                <div className="flex justify-between pb-2 border-b border-slate-800">
                  <span className="text-slate-400">Target Budget</span>
                  <span className="text-slate-200 font-mono font-bold">{formatCurrency(budget)}</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-slate-800">
                  <span className="text-slate-400">Total Portfolio Cost</span>
                  <span className="text-slate-200 font-mono font-bold">{formatCurrency(optimization?.utilized_cost || 0)}</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-slate-800">
                  <span className="text-slate-400">Net Risk Reduced</span>
                  <span className="text-emerald-400 font-mono font-bold">{formatCurrency(optimization?.risk_reduced || 0)}</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-slate-800">
                  <span className="text-slate-400">Residual 95% VaR</span>
                  <span className="text-amber-400 font-mono font-bold">{formatCurrency(optimization?.residual_var_95 || 0)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Return on Investment</span>
                  <span className="text-cyan-400 font-mono font-bold text-sm">+{optimization?.rosi_percentage || 0}%</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-cyan-950/30 border border-cyan-900/50 text-xs text-cyan-300 leading-relaxed">
                <strong>Executive Narrative:</strong> Spending {formatCurrency(optimization?.utilized_cost || 0)} yields{" "}
                <span className="text-white font-bold">{formatCurrency(optimization?.risk_reduced || 0)}</span> in annualized financial loss reduction (ROSI: +{optimization?.rosi_percentage}%).
              </div>
            </div>
          </div>
        </section>
      )}

      {/* TAB 4: NLP RISK QUERY TERMINAL */}
      {activeTab === "nlp" && (
        <section className="mt-5 space-y-5">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Terminal className="w-4 h-4 text-cyan-400" />
              C-Suite Natural Language Risk Query Interface
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Ask quantitative financial cyber risk questions in plain English. GuardianOC converts intents to SQL queries and computes exact financial metrics.
            </p>

            <div className="mt-4 flex gap-2">
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
                <input
                  type="text"
                  value={nlpQuery}
                  onChange={(e) => setNlpQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleExecuteNLP()}
                  placeholder="e.g. What is the highest financial risk today?"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-500 font-mono"
                />
              </div>
              <button
                onClick={() => handleExecuteNLP()}
                disabled={isQuerying}
                className="px-5 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl text-xs font-semibold shadow-lg shadow-cyan-900/20 transition cursor-pointer"
              >
                {isQuerying ? "Querying..." : "Execute"}
              </button>
            </div>

            <div className="flex flex-wrap gap-2 mt-3">
              {[
                "What is the highest financial risk today?",
                "Show risk by business unit",
                "What is our voice cloning deepfake exposure?",
                "Show DPDP Act regulatory compliance liability",
              ].map((chip, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setNlpQuery(chip);
                    handleExecuteNLP(chip);
                  }}
                  className="px-3 py-1 rounded-full bg-slate-950 hover:bg-slate-800 border border-slate-800 text-[11px] text-slate-300 font-mono transition cursor-pointer"
                >
                  {chip}
                </button>
              ))}
            </div>
          </div>

          {nlpResult && (
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-800 font-mono font-semibold">
                  INTENT: {nlpResult.intent}
                </span>
                <span className="text-[11px] text-slate-500 font-mono">Executed against GuardianOC Risk DB</span>
              </div>

              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 font-mono text-[11px] text-emerald-400">
                <span className="text-slate-500 block mb-0.5">// Translated Structured Query</span>
                {nlpResult.sql_query}
              </div>

              <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 text-sm text-slate-200 leading-relaxed font-sans">
                {nlpResult.answer}
              </div>

              {nlpResult.data && Array.isArray(nlpResult.data) && (
                <div className="overflow-x-auto rounded-xl border border-slate-800">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-950 text-slate-400 font-mono text-[10px]">
                      <tr>
                        {Object.keys(nlpResult.data[0] || {}).map((k) => (
                          <th key={k} className="p-3">{k}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800 font-mono text-[11px]">
                      {nlpResult.data.map((row: any, idx: number) => (
                        <tr key={idx} className="hover:bg-slate-800/40">
                          {Object.values(row).map((val: any, vIdx: number) => (
                            <td key={vIdx} className="p-3">{String(val)}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </section>
      )}

      {/* TAB 5: PARAMETERIZED WHAT-IF SIMULATOR */}
      {activeTab === "whatif" && (
        <section className="mt-5 space-y-6">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-cyan-400" />
              Enterprise &quot;What-If&quot; Countermeasure Simulator
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Toggle specific security controls on/off to immediately recompute enterprise residual Expected Annual Loss and 95% Cyber VaR.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-5">
              {[
                { key: "vocxguard_shield", label: "VocxGuard Voice Biometric Shield", desc: "Blocks synthetic CEO wire fraud attacks", icon: PhoneCall },
                { key: "mfa_enabled", label: "FIDO2 Phishing-Resistant MFA", desc: "Eliminates credential stuffing across portals", icon: Lock },
                { key: "immutable_backups", label: "Immutable Ransomware Vaults", desc: "Nullifies double-extortion business outage", icon: Server },
                { key: "cloud_segmentation", label: "Cloud IAM Microsegmentation", desc: "Prevents lateral movement in Kubernetes", icon: ShieldCheck },
              ].map((ctrl) => {
                const active = whatIfControls[ctrl.key as keyof typeof whatIfControls];
                const Icon = ctrl.icon;
                return (
                  <div
                    key={ctrl.key}
                    onClick={() => handleWhatIfToggle(ctrl.key)}
                    className={`p-4 rounded-xl border cursor-pointer transition ${
                      active
                        ? "bg-slate-900 border-cyan-500 shadow-md shadow-cyan-950/40"
                        : "bg-slate-950 border-slate-800 opacity-60"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <Icon className={`w-5 h-5 ${active ? "text-cyan-400" : "text-slate-500"}`} />
                      <span
                        className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                          active ? "bg-cyan-950 text-cyan-400 border border-cyan-800" : "bg-slate-800 text-slate-400"
                        }`}
                      >
                        {active ? "ENABLED" : "DISABLED"}
                      </span>
                    </div>
                    <h5 className="text-xs font-bold text-white mt-3">{ctrl.label}</h5>
                    <p className="text-[11px] text-slate-400 mt-1">{ctrl.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {whatIfResult && (
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div>
                <span className="text-xs text-slate-400 block">Baseline Inherent Loss</span>
                <span className="text-xl font-bold font-mono text-slate-300 mt-1 block">
                  {formatCurrency(whatIfResult.baseline_ale)}
                </span>
                <span className="text-[11px] text-slate-500">Unmitigated annual risk</span>
              </div>

              <div>
                <span className="text-xs text-slate-400 block">Simulated Residual Exposure</span>
                <span className="text-xl font-bold font-mono text-emerald-400 mt-1 block">
                  {formatCurrency(whatIfResult.simulated_residual_ale)}
                </span>
                <span className="text-[11px] text-emerald-400 font-semibold">
                  -{whatIfResult.percentage_reduction}% Risk Reduction
                </span>
              </div>

              <div>
                <span className="text-xs text-slate-400 block">Simulated 95% Cyber VaR</span>
                <span className="text-xl font-bold font-mono text-amber-400 mt-1 block">
                  {formatCurrency(whatIfResult.simulated_var_95)}
                </span>
                <span className="text-[11px] text-slate-500">Tail loss cap at 95% confidence</span>
              </div>
            </div>
          )}
        </section>
      )}

      {/* TAB 6: VOCXGUARD LIVE AUDIO FORENSICS (SIH26104 REUSE) */}
      {activeTab === "telemetry" && (
        <section className="mt-5 space-y-5">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <PhoneCall className="w-5 h-5 text-cyan-400" />
                  VocxGuard Quad-Forensic Reality Verification Engine
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Real-time audio inspection across neural vocoder aliasing, mucosal wave glottal jitter, and mouth proximity physics.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-slate-400">Events Logged: {telemetryEvents.length}</span>
              </div>
            </div>

            {/* Forensic Inspection Meters */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-5 p-4 rounded-xl bg-slate-950 border border-slate-800">
              <div>
                <span className="text-slate-400 text-[11px] block">HF Vocoder Aliasing (5-7.8kHz)</span>
                <span className="text-sm font-bold font-mono text-amber-400">0.082 (Flagged &gt;0.060)</span>
                <div className="w-full bg-slate-800 h-1.5 rounded-full mt-1.5 overflow-hidden">
                  <div className="bg-amber-500 h-full w-[82%]" />
                </div>
              </div>

              <div>
                <span className="text-slate-400 text-[11px] block">Glottal Micro-Jitter (Prosody)</span>
                <span className="text-sm font-bold font-mono text-emerald-400">0.014 (Living Vocal Fold)</span>
                <div className="w-full bg-slate-800 h-1.5 rounded-full mt-1.5 overflow-hidden">
                  <div className="bg-emerald-500 h-full w-[45%]" />
                </div>
              </div>

              <div>
                <span className="text-slate-400 text-[11px] block">Mouth Proximity Energy (&lt;140Hz)</span>
                <span className="text-sm font-bold font-mono text-emerald-400">0.024 (Acoustic Near-Field)</span>
                <div className="w-full bg-slate-800 h-1.5 rounded-full mt-1.5 overflow-hidden">
                  <div className="bg-emerald-500 h-full w-[60%]" />
                </div>
              </div>

              <div>
                <span className="text-slate-400 text-[11px] block">Speaker Cosine Similarity</span>
                <span className="text-sm font-bold font-mono text-cyan-400">0.88 (Target Enrolled Profile)</span>
                <div className="w-full bg-slate-800 h-1.5 rounded-full mt-1.5 overflow-hidden">
                  <div className="bg-cyan-500 h-full w-[88%]" />
                </div>
              </div>
            </div>

            {/* Live Events Stream */}
            <div className="mt-5 space-y-3">
              {telemetryEvents.map((evt) => {
                const isThreat = evt.raw_threat_score >= 0.70;
                return (
                  <div
                    key={evt.event_id}
                    className={`p-4 rounded-xl border transition ${
                      isThreat
                        ? "bg-red-950/30 border-red-800/80 shadow-lg shadow-red-950/30"
                        : "bg-slate-950 border-slate-800"
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span
                          className={`w-2.5 h-2.5 rounded-full ${
                            isThreat ? "bg-red-500 animate-pulse" : "bg-emerald-500"
                          }`}
                        />
                        <span className="text-xs font-mono font-bold text-slate-300">{evt.source_identity}</span>
                        <span
                          className={`text-[10px] px-2 py-0.5 rounded font-mono font-bold ${
                            isThreat
                              ? "bg-red-900 text-red-200 border border-red-700"
                              : "bg-emerald-950 text-emerald-300 border border-emerald-800"
                          }`}
                        >
                          {isThreat ? "SPOOF ATTACK DETECTED" : "VERIFIED HUMAN"}
                        </span>
                      </div>
                      <span className="text-[11px] text-slate-500 font-mono">{evt.timestamp}</span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-3 pt-3 border-t border-slate-800/80 text-xs">
                      <div>
                        <span className="text-slate-500 block">Threat Score</span>
                        <span className={`font-mono font-bold ${isThreat ? "text-red-400" : "text-emerald-400"}`}>
                          {(evt.raw_threat_score * 100).toFixed(1)}%
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-500 block">Biomechanical Authenticity</span>
                        <span className="font-mono text-slate-300">
                          {evt.details?.biomechanical_authenticity !== undefined
                            ? `${(evt.details.biomechanical_authenticity * 100).toFixed(1)}%`
                            : "92.0%"}
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-500 block">Target Asset</span>
                        <span className="text-slate-300 truncate block">{evt.target_asset}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block">Action Enforced</span>
                        <span className="font-mono text-cyan-400">{evt.details?.action_taken || "VERIFIED_GENUINE"}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* TAB 7: NESSUS & SIEM INGESTION LAYER */}
      {activeTab === "ingest" && (
        <section className="mt-5 space-y-5">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <UploadCloud className="w-4 h-4 text-cyan-400" />
              Layer 1: Security Telemetry & Vulnerability Ingestion Engine
            </h3>
            <p className="text-xs text-slate-400">
              Ingest Nessus/OpenVAS vulnerability scans, Splunk CEF logs, and AWS Security Hub findings to continuously calibrate asset CVSS & EPSS exploit likelihoods.
            </p>

            <div className="p-6 rounded-xl border border-dashed border-slate-700 bg-slate-950 flex flex-col items-center justify-center text-center gap-3">
              <div className="p-3 rounded-full bg-slate-900 border border-slate-800">
                <FileSpreadsheet className="w-8 h-8 text-cyan-400" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-200">Load Live Security Scan Report</h4>
                <p className="text-xs text-slate-500 mt-0.5">Supports Tenable Nessus XML/JSON, OpenVAS, and Splunk CEF syslog</p>
              </div>

              <div className="flex gap-3 mt-2">
                <button
                  onClick={handleIngestSampleScan}
                  disabled={isIngesting}
                  className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg text-xs font-semibold transition cursor-pointer"
                >
                  {isIngesting ? "Ingesting..." : "Load Sample Nessus Scan (Q3 Audit)"}
                </button>
              </div>

              {ingestionStatus && (
                <div className="mt-3 p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300">
                  {ingestionStatus}
                </div>
              )}
            </div>

            {/* Real Enterprise Production Connectors */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-slate-800">
              {/* Connector 1: Live FIRST.org EPSS */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5 text-cyan-400" />
                      Live FIRST.org EPSS Feed
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 font-mono font-bold">
                      LIVE API
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Direct integration with api.first.org for empirical exploit likelihood probability.
                  </p>

                  {liveEpss && (
                    <div className="mt-3 p-2.5 rounded bg-slate-900 border border-slate-800 text-[11px] font-mono space-y-1">
                      <div>CVE: <strong className="text-cyan-400">{liveEpss.cve}</strong></div>
                      <div>EPSS Prob: <strong className="text-emerald-400">{(liveEpss.epss * 100).toFixed(2)}%</strong></div>
                      <div>Percentile: <strong className="text-slate-300">{(liveEpss.percentile * 100).toFixed(1)}%</strong></div>
                      <div className="text-[10px] text-slate-500">Source: {liveEpss.status} ({liveEpss.date})</div>
                    </div>
                  )}
                </div>

                <button
                  onClick={handleTestLiveEpss}
                  disabled={testingEpss}
                  className="mt-4 w-full py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-semibold transition cursor-pointer font-mono"
                >
                  {testingEpss ? "Querying FIRST.org..." : "Query Live EPSS (CVE-2024-3400)"}
                </button>
              </div>

              {/* Connector 2: RFC 7865 SIP REC Socket */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white flex items-center gap-1.5">
                      <Radio className="w-3.5 h-3.5 text-emerald-400" />
                      VocxGuard SIP REC Gateway
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800 font-mono font-bold">
                      UDP 10000
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Standard RFC 7865 VoIP Session Recording Protocol socket for enterprise SBC audio mirroring.
                  </p>

                  {sipRecInfo && (
                    <div className="mt-3 p-2.5 rounded bg-slate-900 border border-slate-800 text-[11px] font-mono space-y-1">
                      <div>Protocol: <strong className="text-emerald-400">{sipRecInfo.protocol}</strong></div>
                      <div>Port: <strong>{sipRecInfo.listener_port}</strong> (Active: {String(sipRecInfo.is_active)})</div>
                      <div className="text-[10px] text-slate-400 truncate">{sipRecInfo.privacy_mode}</div>
                    </div>
                  )}
                </div>

                <button
                  onClick={handleCheckSipRec}
                  className="mt-4 w-full py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-semibold transition cursor-pointer font-mono"
                >
                  Verify SIP REC Socket
                </button>
              </div>

              {/* Connector 3: Cloud & ServiceNow CMDB */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5 text-amber-400" />
                      AWS / ServiceNow CMDB
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-amber-950 text-amber-400 border border-amber-800 font-mono font-bold">
                      ap-south-1
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Cloud asset discovery connector pulling live infrastructure tags, tiers, and data sensitivity.
                  </p>

                  {cmdbSyncInfo && (
                    <div className="mt-3 p-2.5 rounded bg-slate-900 border border-slate-800 text-[11px] font-mono space-y-1">
                      <div>Status: <strong className="text-emerald-400">{cmdbSyncInfo.connector_status}</strong></div>
                      <div>Discovered: <strong className="text-white">{cmdbSyncInfo.total_assets_discovered} Cloud Assets</strong></div>
                      <div className="text-[10px] text-slate-500">Region: {cmdbSyncInfo.region}</div>
                    </div>
                  )}
                </div>

                <button
                  onClick={handleSyncCloudCmdb}
                  className="mt-4 w-full py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-semibold transition cursor-pointer font-mono"
                >
                  Sync Cloud Assets
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* TAB 8: CERT-In 6-HOUR INCIDENT REPORTING */}
      {activeTab === "certin" && (
        <section className="mt-5 space-y-5">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <FileCheck2 className="w-4 h-4 text-amber-400" />
                  Mandatory CERT-In 6-Hour Incident Notification Form
                </h3>
                <p className="text-xs text-slate-400">
                  Compliant with CERT-In Cybersecurity Directions under Section 70B(6) of Information Technology Act, 2000.
                </p>
              </div>

              <button
                onClick={() => {
                  navigator.clipboard.writeText(JSON.stringify(certInReport, null, 2));
                  setCopiedNotice(true);
                  setTimeout(() => setCopiedNotice(false), 2000);
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-mono transition cursor-pointer"
              >
                {copiedNotice ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                {copiedNotice ? "Copied to Clipboard!" : "Copy Official Form"}
              </button>
            </div>

            {certInReport ? (
              <div className="p-5 rounded-xl bg-slate-950 border border-amber-900/40 font-mono text-xs text-slate-300 space-y-4">
                <div className="border-b border-slate-800 pb-3">
                  <span className="text-amber-400 font-bold block">{certInReport.statutory_authority}</span>
                  <span className="text-[11px] text-slate-500">{certInReport.legal_basis}</span>
                  <div className="flex justify-between mt-2 text-[11px]">
                    <span>Reference: <strong>{certInReport.incident_reference}</strong></span>
                    <span>Submission Window: <strong className="text-emerald-400">{certInReport.reporting_window}</strong></span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <span className="text-slate-500 block">Incident Classification:</span>
                    <span className="text-white font-semibold">{certInReport.incident_classification}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Severity Level:</span>
                    <span className="text-red-400 font-semibold">{certInReport.severity_level}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800/80">
                  <span className="text-slate-500 block mb-1">Forensic Indicators of Compromise (IOCs):</span>
                  <div className="p-3 bg-slate-900 rounded-lg space-y-1 text-[11px]">
                    <div>Source Caller: {certInReport.forensic_indicators_of_compromise?.source_caller}</div>
                    <div>Vocoder Artifacts: {certInReport.forensic_indicators_of_compromise?.vocoder_artifacts}</div>
                    <div>AI Synthesis Confidence: {certInReport.forensic_indicators_of_compromise?.ai_synthesis_confidence}</div>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800/80">
                  <span className="text-slate-500 block mb-1">Enforced Mitigation Actions:</span>
                  <ul className="list-disc list-inside space-y-1 text-[11px] text-slate-400">
                    {certInReport.mitigation_actions_taken?.map((act: string, idx: number) => (
                      <li key={idx}>{act}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-slate-500 text-xs">
                Click &quot;CERT-In 6-Hr Notice&quot; on the top header to auto-generate statutory incident draft.
              </div>
            )}
          </div>
        </section>
      )}

      {/* TAB 9: REGULATORY COMPLIANCE MAPPING */}
      {activeTab === "compliance" && (
        <section className="mt-5 space-y-5">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Building2 className="w-4 h-4 text-cyan-400" />
              Indian & Global Regulatory Security Framework Mappings
            </h3>
            <p className="text-xs text-slate-400">
              Audit-ready alignment mapping quantitative financial metrics and VocxGuard telemetry to national and international standards.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              {/* DPDP Act 2023 */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-xs font-bold text-cyan-400 block mb-2">DPDP Act 2023 (Digital Personal Data Protection)</span>
                <p className="text-xs text-slate-300">
                  Section 8(5) mandates reasonable security safeguards to prevent personal data breaches, with statutory penalties up to <strong>₹250 Crores</strong>.
                </p>
                <div className="mt-3 text-[11px] font-mono text-emerald-400 bg-emerald-950/40 p-2 rounded border border-emerald-900/50">
                  Status: COMPLIANT • Financial Liability Mitigated to &lt; ₹1.5 Cr
                </div>
              </div>

              {/* RBI Cyber Security Framework */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-xs font-bold text-cyan-400 block mb-2">RBI Cyber Security Framework for Banks</span>
                <p className="text-xs text-slate-300">
                  Mandates continuous threat intelligence, voice channel impersonation safeguards, and periodic quantitative risk analysis.
                </p>
                <div className="mt-3 text-[11px] font-mono text-emerald-400 bg-emerald-950/40 p-2 rounded border border-emerald-900/50">
                  Status: 100% COVERAGE (VocxGuard + Open FAIR)
                </div>
              </div>

              {/* SEBI CSCRF 2024 */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-xs font-bold text-cyan-400 block mb-2">SEBI CSCRF 2024 (Cyber Resilience Framework)</span>
                <p className="text-xs text-slate-300">
                  Mandates continuous cyber risk assessment and board-level reporting for market infrastructure institutions and intermediaries.
                </p>
                <div className="mt-3 text-[11px] font-mono text-cyan-400 bg-cyan-950/40 p-2 rounded border border-cyan-900/50">
                  Status: FULLY ALIGNED • Automated CISO Disclosures
                </div>
              </div>

              {/* ISO/IEC 27001:2022 */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-xs font-bold text-cyan-400 block mb-2">ISO/IEC 27001:2022 & NIST CSF 2.0</span>
                <p className="text-xs text-slate-300">
                  Controls across Identity (A.5.15), Vulnerabilities (A.8.8), Network (A.8.20), and Incident Telemetry (A.5.24).
                </p>
                <div className="mt-3 text-[11px] font-mono text-cyan-400 bg-cyan-950/40 p-2 rounded border border-cyan-900/50">
                  Overall Governance Score: 4.2 / 5.00
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Boardroom Audit Report Modal */}
      {showAuditModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-2xl w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <FileText className="w-4 h-4 text-cyan-400" />
                CISO Boardroom Executive Audit Disclosure
              </h3>
              <button
                onClick={() => setShowAuditModal(false)}
                className="text-slate-400 hover:text-white text-xs font-mono p-1"
              >
                ✕ Close
              </button>
            </div>

            <pre className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-[11px] font-mono text-slate-300 overflow-x-auto whitespace-pre-wrap max-h-96">
              {boardroomAuditText}
            </pre>

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(boardroomAuditText);
                  alert("Audit report copied to clipboard!");
                }}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-semibold transition cursor-pointer"
              >
                Copy Text
              </button>
              <button
                onClick={() => window.print()}
                className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg text-xs font-semibold transition cursor-pointer"
              >
                Print / Save PDF
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Footer */}
      <footer className="mt-12 pt-5 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
        <div>
          GuardianOC Bloomberg Terminal • Smart India Hackathon 2026 (PS26105 / PS26104) • All India Council for Technical Education
        </div>
        <div className="flex items-center gap-4">
          <span className="text-slate-400">Open FAIR Standard</span>
          <span className="text-slate-400">DPDP Act 2023 Compliant</span>
          <span className="text-slate-400">CERT-In 6-Hour Rule Ready</span>
        </div>
      </footer>
    </main>
  );
}

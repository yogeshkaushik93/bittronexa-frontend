import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  CheckCircle,
  Clock,
  Copy,
  Loader2,
  Sparkles,
  Shield,
  TrendingUp,
  TriangleAlert,
  Wallet,
  ArrowRight,
  Info,
} from "lucide-react";
import { backendConfig } from "../.././constants/content/MainContent";
import { useNavigate } from "react-router-dom";

const Deposit = () => {
  const [amount, setAmount] = useState("");
  const [depositData, setDepositData] = useState(null);
  const [timer, setTimer] = useState(900);
  const [status, setStatus] = useState("idle");
  const [copied, setCopied] = useState(false);

  const API = backendConfig.base + "/users";
  const navigate = useNavigate();

  const startDeposit = async () => {
    if (!amount || Number(amount) < 0) {
      alert("Minimum deposit 20 USDT");
      return;
    }

    try {
      const res = await axios.post(
        `${API}/deposit`,
        { amount },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
      setDepositData(res.data);
      setStatus("pending");
      setTimer(900);
    } catch (err) {
      alert(err.response?.data?.message || "Error creating deposit");
    }
  };

  useEffect(() => {
    if (status !== "pending" || timer <= 0) return;
    const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    return () => clearInterval(interval);
  }, [timer, status]);

  useEffect(() => {
    if (!depositData || status !== "pending") return;

    const interval = setInterval(async () => {
      try {
        const res = await axios.get(`${API}/deposit/${depositData.depositId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const newStatus = res.data?.data?.status;
        console.log("Checked status:", newStatus);
        if (newStatus === "confirmed") {
          setStatus("confirmed");
          clearInterval(interval);
        } else if (newStatus === "expired") {
          setStatus("expired");
          clearInterval(interval);
        }
      } catch {}
    }, 4000);

    return () => clearInterval(interval);
  }, [depositData, status]);

  const formatTime = (sec) => {
    const m = Math.floor(sec / 60)
      .toString()
      .padStart(2, "0");
    const s = (sec % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full   text-slate-200 font-sans selection:bg-emerald-500/30">
      {/* Dynamic Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-emerald-600/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[120px] animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 max-w-[1200px] mx-auto px-4 py-12 flex flex-col items-center">
        {/* Important Network Banner */}
        <div className="w-full max-w-2xl mb-8 flex  items-center gap-3 bg-amber-500/10 border border-amber-500/20 p-4 rounded-2xl animate-bounce-subtle">
          <TriangleAlert className="text-amber-500 flex-shrink-0" size={24} />
          <p className="text-amber-200 text-xl md:text-base font-medium">
            Attention: Send only{" "}
            <span className="text-amber-400 font-bold underline underline-offset-4">
              USDT (BEP20)
            </span>
            . Sending any other coin or network will result in permanent loss of
            funds.
          </p>
        </div>

        <div className="w-full max-w-2xl">
          {/* --- IDLE STATE --- */}
          {status === "idle" && (
            <div className="bg-slate-900/40 backdrop-blur-2xl border border-slate-700/50 rounded-[2.5rem] p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
              <div className="flex flex-col items-center text-center mb-10">
                <div className="w-20 h-20 bg-gradient-to-tr from-emerald-500 to-teal-400 rounded-3xl rotate-12 flex items-center justify-center shadow-lg shadow-emerald-500/20 mb-6">
                  <Wallet className="w-10 h-10 text-white -rotate-12" />
                </div>
                <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
                  Deposit <span className="text-emerald-400">USDT</span>
                </h1>
                <div className="px-4 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
                  <span className="text-emerald-400 font-bold tracking-widest text-sm uppercase">
                    BEP20 Network Only
                  </span>
                </div>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-slate-400 text-lg font-medium ml-1">
                    Deposit Amount
                  </label>
                  <div className="relative group">
                    <input
                      type="number"
                      placeholder="Min. 20 USDT"
                      className="w-full h-16 bg-slate-800/50 border-2 border-slate-700 rounded-2xl px-6 text-2xl font-bold text-white outline-none transition-all focus:border-emerald-500 focus:bg-slate-800"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                    />
                    <div className="absolute right-6 top-1/2 -translate-y-1/2 flex items-center gap-2 border-l border-slate-600 pl-4">
                      <span className="text-emerald-400 font-bold">USDT</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 py-4">
                  <div className="flex items-center gap-3 p-4 rounded-2xl bg-slate-800/30 border border-slate-700/30">
                    <Shield className="text-emerald-500" size={20} />
                    <span className="text-lg font-medium">Safe Escrow</span>
                  </div>
                  <div className="flex items-center gap-3 p-4 rounded-2xl bg-slate-800/30 border border-slate-700/30">
                    <Clock className="text-emerald-500" size={20} />
                    <span className="text-lg font-medium">~1-10 Mins</span>
                  </div>
                </div>

                <button
                  onClick={startDeposit}
                  className="w-full h-16 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xl rounded-2xl flex items-center justify-center gap-3 transition-all hover:scale-[1.01] active:scale-[0.98] shadow-xl shadow-emerald-900/20"
                >
                  Confirm & Generate <ArrowRight size={20} />
                </button>
              </div>
            </div>
          )}

          {/* --- PENDING STATE --- */}
          {status === "pending" && depositData && (
            <div className="bg-slate-900/60 backdrop-blur-2xl border border-slate-700/50 rounded-[2.5rem] overflow-hidden shadow-2xl">
              {/* Top Warning Strip */}
              <div className="bg-red-500/10 border-b border-red-500/20 py-3 px-6 flex justify-center items-center gap-2">
                <TriangleAlert
                  className="text-red-500 animate-pulse"
                  size={18}
                />
                <span className="text-red-400 text-xl md:text-sm font-bold uppercase tracking-wider">
                  Do Not Refresh or Close This Page
                </span>
              </div>

              <div className="p-8 md:p-10 space-y-8">
                {/* Timer & Amount Section */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                  <div className="text-center md:text-left">
                    <p className="text-yellow-400 text-xl font-bold font-medium uppercase tracking-widest mb-1">
                      Send Exact Amount
                    </p>
                    <div className="flex items-center gap-3">
                      <span className="text-4xl font-black text-white">
                        {depositData?.expectedAmount}
                      </span>
                      <span className="text-emerald-400 font-bold text-xl">
                        USDT
                      </span>
                    </div>
                  </div>
                  <div className="bg-slate-800/80 rounded-2xl p-4 border border-slate-700 flex flex-col items-center min-w-[120px]">
                    <span className="text-[10px] text-slate-500 font-bold uppercase mb-1">
                      Time Remaining
                    </span>
                    <span
                      className={`text-2xl font-mono font-bold ${timer < 300 ? "text-red-500" : "text-emerald-400"}`}
                    >
                      {formatTime(timer)}
                    </span>
                  </div>
                </div>

                {/* QR Code Container */}
                <div className="flex flex-col items-center bg-white p-6 rounded-[2rem] shadow-inner relative group">
                  <img
                    src={depositData.qrCode}
                    alt="QR Code"
                    className="w-56 h-56"
                  />
                  <div className="mt-4 px-4 py-1 bg-slate-100 rounded-full border border-slate-200">
                    <span className="text-slate-500 text-[10px] font-bold uppercase">
                      USDT BEP20 ONLY
                    </span>
                  </div>
                </div>

                {/* Address Section */}
                <div className="space-y-3">
                  <p className="text-slate-400 text-xl font-medium ml-1">
                    Wallet Address (BEP20)
                  </p>
                  <div
                    onClick={() => copyToClipboard(depositData.depositAddress)}
                    className="group cursor-pointer relative flex items-center justify-between bg-slate-800/50 hover:bg-slate-800 border border-slate-700 p-5 rounded-2xl transition-all"
                  >
                    <span className="text-white font-mono text-xl md:text-base break-all pr-10">
                      {depositData.depositAddress}
                    </span>
                    <div className="absolute right-4 p-2 bg-emerald-500/10 text-emerald-400 rounded-lg group-hover:bg-emerald-500 group-hover:text-white transition-all">
                      {copied ? <CheckCircle size={20} /> : <Copy size={20} />}
                    </div>
                  </div>
                </div>

                {/* Status Indicator */}
                <div className="flex items-center justify-center gap-4 pt-4">
                  <div className="flex items-center gap-3 px-6 py-3 bg-slate-800/50 border border-slate-700 rounded-full">
                    <Loader2
                      className="text-emerald-400 animate-spin"
                      size={20}
                    />
                    <span className="text-slate-300 text-xl font-medium">
                      Monitoring blockchain...
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* --- CONFIRMED STATE --- */}
          {status === "confirmed" && (
            <div className="bg-slate-900/60 backdrop-blur-2xl border border-emerald-500/30 rounded-[2.5rem] p-10 text-center space-y-8 shadow-[0_0_50px_rgba(16,185,129,0.1)]">
              <div className="relative inline-flex">
                <div className="absolute inset-0 bg-emerald-500 rounded-full blur-2xl opacity-20 animate-pulse"></div>
                <div className="relative w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/40">
                  <CheckCircle className="text-white" size={48} />
                </div>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-white mb-2">
                  Deposit Received!
                </h2>
                <p className="text-slate-400 text-xl">
                  Your funds have been successfully credited to your wallet.
                </p>
              </div>

              <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700 grid grid-cols-2 gap-4">
                <div className="text-left">
                  <p className="text-slate-500 text-lg font-bold uppercase">
                    Amount
                  </p>
                  <p className="text-xl font-bold text-emerald-400">
                    {depositData?.amount} USDT
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-slate-500 text-lg font-bold uppercase">
                    Network
                  </p>
                  <p className="text-xl font-bold text-white">BEP20</p>
                </div>
              </div>

              <button
                onClick={() => navigate("/dashboard")}
                className="w-full h-16 bg-white text-slate-900 font-black text-lg rounded-2xl hover:bg-slate-100 transition-all active:scale-95"
              >
                Go to Dashboard
              </button>
            </div>
          )}

          {/* --- EXPIRED STATE --- */}
          {status === "expired" && (
            <div className="bg-slate-900/60 backdrop-blur-2xl border border-red-500/30 rounded-[2.5rem] p-10 text-center space-y-6">
              <div className="w-20 h-20 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mx-auto">
                <Clock size={40} />
              </div>
              <h2 className="text-3xl font-bold text-white">Request Expired</h2>
              <p className="text-slate-400">
                The 15-minute window for this deposit has closed. No funds were
                detected.
              </p>
              <button
                onClick={() => {
                  setStatus("idle");
                  setAmount("");
                }}
                className="w-full h-16 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-2xl transition-all"
              >
                Try Again
              </button>
            </div>
          )}
        </div>

        {/* Support Link */}
        <p className="mt-10 text-slate-500 text-xl flex items-center gap-2">
          <Info size={16} /> Need help?{" "}
          <a href="#" className="text-emerald-400 text-xl hover:underline">
            Contact Support
          </a>
        </p>
      </div>

      {/* Custom Keyframes for Animation */}
      <style>{`
        @keyframes bounce-subtle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        .animate-bounce-subtle {
          animation: bounce-subtle 3s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default Deposit;

import React, { useState } from "react";
import ReusableForm from "../../../components/ui/ReusableForm";
import { BiMoney } from "react-icons/bi";
import Swal from "sweetalert2";
import {
  makeInvestmentByPackageWallet,
  sendOtptoUser,
} from "../../../api/user-api";
import {
  Coins,
  FileText,
  Zap,
  Wallet as WalletIcon,
  CheckCircle2,
} from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const MakeInvestment = () => {
  const [method, setMethod] = useState("QR"); // "QR" or "WALLET"
  const [amount, setAmount] = useState("");
  const [otp, setotp] = useState("");
  const [pass, setpass] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.userInfo?.userInfo);
  const user = userInfo?.user || {};

  // const handleAction = async () => {
  //   const value = parseFloat(amount);

  //   if (method === "QR") {
  //     // Direct Navigation for QR (No OTP/Pass needed)
  //     navigate("/deposit-usdt", { state: { amount: value } });
  //   } else {
  //     // Wallet Logic (OTP/Pass required)
  //     if (!otp || !pass) {
  //       return Swal.fire(
  //         "Required",
  //         "Transaction Password and OTP are mandatory for Wallet payments.",
  //         "error",
  //       );
  //     }

  //     try {
  //       setLoading(true);
  //       const payload = { amount: value, otp, tnxPass: pass };
  //       const response = await makeInvestmentByPackageWallet(payload);
  //       if (response?.success) {
  //         Swal.fire(
  //           "Success",
  //           "Investment successful from Package Wallet.",
  //           "success",
  //         );
  //         setAmount("");
  //         setotp("");
  //         setpass("");
  //         window.location.reload();
  //       }
  //     } catch (err) {
  //       Swal.fire(
  //         "Error",
  //         err?.response?.data?.message || "Something went wrong",
  //         "error",
  //       );
  //     } finally {
  //       setLoading(false);
  //     }
  //   }
  // };
  const handleAction = async () => {
    const value = parseFloat(amount);

    if (method === "QR") {
      navigate("/deposit-usdt", { state: { amount: value } });
    } else {
      if (!otp || !pass) {
        return Swal.fire(
          "Required",
          "Transaction Password and OTP are mandatory for Wallet payments.",
          "error",
        );
      }

      try {
        if (!value || value < 100) {
          return Swal.fire(
            "Invalid Amount",
            "Minimum investment amount is 100.",
            "error",
          );
        }
        setLoading(true);
        const payload = { amount: value, otp, tnxPass: pass };
        const response = await makeInvestmentByPackageWallet(payload);

        if (response?.success) {
          Swal.fire(
            "Success",
            "Investment successful from Package Wallet.",
            "success",
          );
          setAmount("");
          setotp("");
          setpass("");
          window.location.reload();
        }
      } catch (err) {
        Swal.fire(
          "Error",
          err?.response?.data?.message || "Something went wrong",
          "error",
        );
      } finally {
        setLoading(false);
      }
    }
  };
  const handleGetOtp = async () => {
    const res = await sendOtptoUser();
    if (res?.success) {
      Swal.fire("OTP Sent", "Please check your email/phone.", "success");
      return true;
    }
    return false;
  };

  const format6 = (val) => Number(val || 0).toFixed(2);

  return (
    <div className=" mx-auto px-4 py-8">
      {/* 1. Wallet Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-6 text-white shadow-lg">
          <p className="text-lg uppercase opacity-80 font-bold">Main Wallet</p>
          <p className="text-3xl font-black mt-2">
            ${format6(user?.currentEarnings)}
          </p>
        </div>
        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-6 text-white shadow-lg">
          <p className="text-lg uppercase opacity-80 font-bold">
            Package Wallet
          </p>
          <p className="text-3xl font-black mt-2">
            ${format6(user?.packageWallet)}
          </p>
        </div>
        <button
          onClick={() => navigate("/investment-invoice")}
          className="bg-slate-800 border border-slate-700 rounded-2xl w-full p-6 text-white flex items-center justify-center gap-3 hover:bg-slate-700 transition-all"
        >
          <FileText size={24} />{" "}
          <span className="font-bold text-xl">Invoices</span>
        </button>
      </div>

      {/* 2. Main Investment Box */}
      <div className=" border border-slate-800 rounded-[2.5rem] overflow-hidden shadow-2xl">
        {/* Tabs Header */}
        <div className="flex p-2 bg-slate-900/50 gap-2">
          <button
            onClick={() => setMethod("QR")}
            className={`flex-1 flex items-center justify-center gap-3 py-4 rounded-2xl font-bold transition-all ${
              method === "QR"
                ? "bg-emerald-500 text-white shadow-lg"
                : "text-slate-400 hover:bg-slate-800"
            }`}
          >
            <Zap size={20} /> <span className="text-lg">Pay with QR</span>
          </button>
          <button
            onClick={() => setMethod("WALLET")}
            className={`flex-1 flex items-center justify-center gap-3 py-4 rounded-2xl font-bold transition-all ${
              method === "WALLET"
                ? "bg-blue-600 text-white shadow-lg"
                : "text-slate-400 hover:bg-slate-800"
            }`}
          >
            <WalletIcon size={20} />{" "}
            <span className="text-lg">Package Wallet</span>
          </button>
        </div>

        <div className="p-8 md:p-12">
          <div className="max-w-lg mx-auto space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-black text-white">
                {method === "QR" ? " USDT Deposit" : "Wallet Investment"}
              </h2>
              <p className="text-slate-400 mt-2 text-lg">
                {method === "QR"
                  ? "Deposit via BEP20 QR Code. No OTP or Password required."
                  : "Use your internal package wallet balance. OTP required."}
              </p>
            </div>

            {/* Always Visible: Amount */}

            {/* Conditional Fields: Only for Wallet */}
            {method === "WALLET" && (
              <div className="space-y-6 pt-4 border-t border-slate-800 animate-in fade-in slide-in-from-top-4 duration-300">
                <ReusableForm
                  label="Investment Amount"
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter amount (e.g. 100, 110...)"
                  icon={BiMoney}
                />

                <ReusableForm
                  label="Transaction Password"
                  type="password"
                  value={pass}
                  onChange={(e) => setpass(e.target.value)}
                  placeholder="Enter your security pass"
                  icon={BiMoney}
                />
                <ReusableForm
                  label="OTP Verification"
                  type="text"
                  value={otp}
                  onChange={(e) => setotp(e.target.value.replace(/\D/g, ""))}
                  placeholder="4-digit OTP"
                  icon={Coins}
                  rightButton="Get OTP"
                  onRightButtonClick={handleGetOtp}
                />
              </div>
            )}

            {/* Submit Button */}
            <button
              onClick={handleAction}
              disabled={loading}
              className={`w-full h-16 rounded-2xl font-black text-xl flex items-center justify-center gap-3 transition-all transform active:scale-95 shadow-xl ${
                method === "QR"
                  ? "bg-gradient-to-r from-emerald-500 to-teal-600 shadow-emerald-500/20"
                  : "bg-gradient-to-r from-blue-600 to-indigo-700 shadow-blue-500/20"
              }`}
            >
              {loading ? (
                <Loader2 className="animate-spin" />
              ) : (
                <>
                  {method === "QR" ? "Generate QR Code" : "Confirm Investment"}
                  <CheckCircle2 size={24} />
                </>
              )}
            </button>

            {method === "QR" && (
              <p className="text-center text-xs text-slate-500 italic">
                * Note: You will be redirected to the secure payment page.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Simple Loader component for button
const Loader2 = ({ className }) => (
  <svg
    className={`animate-spin h-6 w-6 text-white ${className}`}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    ></circle>
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    ></path>
  </svg>
);

export default MakeInvestment;

import React, { useEffect, useState, useRef } from "react";
import { Lock, User } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { sendOtpForWithdrawal, withdrawalRequest, withdrawalRequestPrinciple } from "../../../../api/user-api";
import ReusableForm from "../../../../components/ui/ReusableForm";
import PageLoader from "../../../../components/ui/PageLoader";
import { getUserInfo } from "../../../../api/auth-api";
import { setUserInfo } from "../../../../redux/slice/UserInfoSlice";
import PrincipalTerms from "../../../../components/bittronexapages/PrincipalTerms";

const OTP_COOLDOWN_SECONDS = 60;

const PrincipleWithdrawal = () => {
  const userInfo = useSelector((state) => state.userInfo?.userInfo?.user);
  const dispatch = useDispatch();
  const mountedRef = useRef(true);

  const [form, setForm] = useState({
    walletAddress: userInfo?.walletAddress || "",
    amount: "",
    tnxPass: "",
    otp: "",
  });

  const [loading, setLoading] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const [otpCooldown, setOtpCooldown] = useState(0);
  const [showTerms, setShowTerms] = useState(false);
  const [isAgreed, setIsAgreed] = useState(false);

  // Keep wallet in sync if userInfo arrives later
  useEffect(() => {
    setForm((p) => ({ ...p, walletAddress: userInfo?.walletAddress || "" }));
  }, [userInfo?.walletAddress]);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  // cooldown countdown
  useEffect(() => {
    if (!otpCooldown) return;
    const t = setInterval(() => {
      setOtpCooldown((c) => {
        if (c <= 1) {
          clearInterval(t);
          return 0;
        }
        return c - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [otpCooldown]);

  const safeParseAmount = (raw) => {
    // accept decimals, trim whitespace, handle commas
    const sanitized = String(raw).replace(/,/g, "").trim();
    const num = Number(sanitized);
    return Number.isFinite(num) ? Math.round(num * 100) / 100 : NaN; // 2dp
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const handleSendOtp = async () => {
    // guard early to prevent useless requests
    const amount = safeParseAmount(form.amount);
    if (!form.tnxPass || isNaN(amount) || amount <= 0) {
      return Swal.fire({
        icon: "error",
        title: "Invalid",
        text: "Enter a valid amount and transaction password before requesting OTP.",
      });
    }

    try {
      setOtpLoading(true);
      const resp = await sendOtpForWithdrawal();
      if (resp?.success) {
        Swal.fire({ icon: "success", title: "OTP Sent", text: resp?.message || "OTP sent successfully." });
        if (mountedRef.current) setOtpCooldown(OTP_COOLDOWN_SECONDS);
      } else {
        Swal.fire({ icon: "error", title: "Error", text: resp?.message || "Failed to send OTP." });
      }
    } catch (err) {
      console.error("sendOtp error:", err);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err?.response?.data?.message || "Failed to send OTP.",
      });
    } finally {
      if (mountedRef.current) setOtpLoading(false);
    }
  };

  const handleSubmit = () => {
    const amount = safeParseAmount(form.amount);
    const totalInvestment = parseFloat(userInfo?.totalInvestment ?? 0);
    if (!form.tnxPass || !form.amount) {
      return Swal.fire({
        icon: "error",
        title: "Error",
        text: "All fields are required",
      });
    }

    if (isNaN(amount) || amount <= 0) {
      return Swal.fire({
        icon: "error",
        title: "Error",
        text: "Enter valid amount",
      });
    }

    if (amount < 10) {
      return Swal.fire({
        icon: "error",
        title: "Error",
        text: "Minimum $10 required",
      });
    }

    if (amount > totalInvestment) {
      return Swal.fire({
        icon: "error",
        title: "Error",
        text: "Amount exceeds investment",
      });
    }

    setShowTerms(true);
  };

  const handleFinalSubmit = async () => {
    try {
      const amount = safeParseAmount(form.amount);
      const totalInvestment = parseFloat(userInfo?.totalInvestment ?? 0);

      // validations
      if (!form.tnxPass || !form.otp || !form.amount) {
        return Swal.fire({ icon: "error", title: "Error", text: "All fields are required." });
      }
      if (isNaN(amount) || amount <= 0) {
        return Swal.fire({ icon: "error", title: "Error", text: "Amount must be greater than 0." });
      }
      if (amount < 10) {
        return Swal.fire({ icon: "error", title: "Error", text: "Minimum Withdrawal Amount is $10." });
      }
      if (amount > totalInvestment) {
        return Swal.fire({ icon: "error", title: "Error", text: "Amount must be less than total investment." });
      }

      setLoading(true);

      const payload = {
        userWalletAddress: form.walletAddress || userInfo?.walletAddress,
        amount,
        otp: form.otp,
        tnxPass: form.tnxPass,
        // NOTE: original code used "isPrinciple" (spelling). Keep same flag to match backend contract.
        // isPrinciple: true,
      };

      // console.log for debugging, remove in final production or change to logger
      console.log("Submitting principle withdrawal with payload:", payload);

      const response = await withdrawalRequestPrinciple(payload);

      if (response?.success) {
        Swal.fire({ icon: "success", title: "Success", text: response?.message || "Principal withdrawal requested." });
        setShowTerms(false);
        // refresh user info (best-effort)
        try {
          const refreshed = await getUserInfo();
          dispatch(setUserInfo(refreshed));
        } catch (e) {
          console.warn("Failed to refresh user info after principal withdrawal:", e);
        }

        // clear sensitive fields
        setForm((p) => ({ ...p, amount: "", otp: "", tnxPass: "" }));
      } else {
        Swal.fire({ icon: "error", title: "Error", text: response?.message || "Failed to submit principal withdrawal." });
      }
    } catch (err) {
      console.error("principal withdraw error:", err);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err?.response?.data?.message || "Failed to submit principal withdrawal.",
      });
    } finally {
      if (mountedRef.current) setLoading(false);
    }
  };

  if (loading) return <PageLoader />;

  return (
    <div className="p-6 text-white">
      <p className="text-lg text-gray-200 mb-6">Home / Principle Withdrawal</p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-[#0f0f0f] border !border-gray-500 rounded-lg p-4">
          <h3 className="text-gray-300 text-xl mb-2">Total Investment</h3>
          <p className="text-4xl font-bold text-white">${userInfo?.totalInvestment?.toFixed(2) || 0}</p>
        </div>
      </div>

      <div className="bg-[#0f0f0f] border !border-gray-500 rounded-lg mb-6">
        <div className="border-b !border-gray-500 px-6 py-3">
          <h2 className="text-xl font-semibold text-white">Withdraw Principal</h2>
        </div>

        <div className="p-6 space-y-5">
          <ReusableForm
            label="Wallet Address"
            type="text"
            name="walletAddress"
            value={form.walletAddress}
            icon={User}
            required={true}
            disabled={true}
          />

          <ReusableForm
            label="Amount"
            name="amount"
            type="number"
            placeholder="Enter Amount"
            icon={Lock}
            onChange={handleChange}
            value={form.amount}
            min={0}
            required={true}
            inputMode="decimal"
          />

          <ReusableForm
            label="Transaction Password"
            name="tnxPass"
            type="password"
            value={form.tnxPass}
            placeholder="Enter transaction password"
            icon={Lock}
            onChange={handleChange}
            required={true}
          />

          <div className="flex items-center gap-2">
            <ReusableForm
              label="One Time Password"
              name="otp"
              type="number"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={6}
              value={form.otp}
              onChange={handleChange}
              placeholder="Enter OTP"
              icon={Lock}
              required
              rightButton="Get OTP"
              onRightButtonClick={handleSendOtp}
              rightButtonCooldown={30}
              disabled={
                otpLoading ||
                !form.amount ||
                !form.tnxPass ||
                Number(userInfo?.totalInvestment ?? 0) < Number(form.amount)
              }
            />
          </div>

          <div className="text-right">
            <button
              onClick={handleSubmit}
              type="button"
              disabled={
                loading ||
                !form.walletAddress ||
                Number(userInfo?.totalInvestment ?? 0) < Number(form.amount)
              }
              className="bg-[var(--cyan-active)] hover:bg-opacity-80 text-xl text-white font-medium px-6 py-3 rounded-md transition disabled:cursor-not-allowed"
            >
              Submit
            </button>
          </div>
        </div>
      </div>

      {showTerms && (
        <PrincipalTerms
          onClose={() => setShowTerms(false)}
          onAgree={handleFinalSubmit}
        />
      )}
    </div>
  );
};

export default PrincipleWithdrawal;

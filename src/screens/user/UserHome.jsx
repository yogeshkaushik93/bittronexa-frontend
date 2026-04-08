import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../../utils/dateFunctions";
import {
  FaRegCopy,
  FaUsers,
  FaDollarSign,
  FaTrophy,
  FaChartLine,
} from "react-icons/fa6";
import { FiUserCheck, FiTrendingUp } from "react-icons/fi";
import { Coins } from "lucide-react";
import {
  getActivationDate,
  getBannerListUser,
  getBusinessDetails,
} from "../../api/user-api";
import { BiMoneyWithdraw } from "react-icons/bi";
import Notification from "./Notification";

const format6 = (val) => Number(val || 0).toFixed(2);

const UserHome = () => {
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.userInfo?.userInfo);
  const [copied, setCopied] = useState(false);
  const [businessData, setBusinessData] = useState({});

  const [loading, setLoading] = useState(false);
  const [activationDate, setActivationDate] = useState(null);
  const [showLoginBanner, setShowLoginBanner] = useState(false);
  const [showCloseBtn, setShowCloseBtn] = useState(false);

  const [bannerLoading, setBannerLoading] = useState(false);
  const [banners, setBanners] = useState([]);
  const fetchBannerData = async () => {
    try {
      setBannerLoading(true);
      const res = await getBannerListUser();
      setBanners(res?.data || []);
    } catch (err) {
      SwalError.fire({
        title: "Error",
        text: err?.response?.data?.message || "Error fetching banner data.",
        confirmButtonText: "OK",
      });
    } finally {
      setBannerLoading(false);
    }
  };

  useEffect(() => {
    fetchBannerData();
  }, []);

  const user = userInfo?.user || {};

  const activeuser = user?.referedUsers;
  const verifiedCount = activeuser?.filter(
    (u) => u?.isVerified === true,
  ).length;
  const affiliateLink = `${window.location.origin}/register?referral=${user?.referralCode}`;

  useEffect(() => {
    const alreadyShown = localStorage.getItem("loginBannerShown");
    if (!alreadyShown) {
      setShowLoginBanner(true);
      localStorage.setItem("loginBannerShown", "true");
      const closeBtnTimer = setTimeout(() => {
        setShowCloseBtn(true);
      }, 5000);
      return () => {
        clearTimeout(closeBtnTimer);
      };
    }
  }, []);

  const shimmer = (rows = 9) =>
    Array.from({ length: rows }).map((_, i) => (
      <div
        key={i}
        className="flex justify-between py-3 border-b border-gray-700"
      >
        <div className="h-6 w-40 bg-gray-700 rounded animate-pulse"></div>
        <div className="h-6 w-24 bg-gray-700 rounded animate-pulse"></div>
      </div>
    ));

  const handleCopy = () => {
    navigator.clipboard.writeText(affiliateLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const fetchActivationDate = async () => {
    try {
      const response = await getActivationDate();
      if (response?.success) {
        setActivationDate(response?.data?.startDate);
      }
    } catch {
      console.error("Error fetching activation date");
    }
  };

  const fetchBusinessDetails = async () => {
    try {
      setLoading(true);
      const response = await getBusinessDetails();
      if (response?.success) setBusinessData(response?.data);
    } catch {
      console.error("Error fetching business details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBusinessDetails();
    fetchActivationDate();
  }, []);

  const wallets = [
    {
      label: "Main Wallet",
      value: `$${format6(user?.currentEarnings)}`,
      color: "from-orange-500 to-orange-600",
    },
    {
      label: "Package Wallet",
      value: `$${format6(user?.packageWallet)}`,
      color: "from-blue-600 to-blue-800",
    },
    {
      label: "Total Investments",
      value: `$${format6(user?.totalInvestment)}`,
      color: "from-purple-500 to-purple-700",
    },
    {
      label: "Withdrawal Amount",
      value: `$${format6(user?.totalPayouts)}`,
      color: "from-green-500 to-green-600",
    },
  ];

  const incomeSections = [
    {
      title: "Total Income",
      value: format6(user?.totalEarnings),
      icon: <Coins size={28} />,
      navigateLink: "",
    },
    {
      title: " Service Level Income",
      value: format6(user?.totalServiceLevelIncome) || 0,
      icon: <FaUsers size={28} />,
      navigateLink: "/service-level-income",
    },
    {
      title: "Matching Income",
      value: format6(user?.totalMatchingEarnings),
      icon: <FaChartLine size={28} />,
      navigateLink: "/matching-income",
    },
    {
      title: "Reward Income",
      value: format6(user?.rewardIncome),
      icon: <FaTrophy size={28} />,
      navigateLink: "/reward-income",
    },
    {
      title: "Monthly Fast Track Income ",
      value: format6(user?.fastTrackIncomeMonthly) || 0,
      icon: <FaUsers size={28} />,
      navigateLink: "/fast-track-income",
    },
    {
      title: "Total Fast Track Income ",
      value: format6(user?.fastTrackIncome) || 0,
      icon: <FaUsers size={28} />,
      navigateLink: "/fast-track-income",
    },
    {
      title: "Today Trading Profit Income",
      value: format6(user?.dailyRoi),
      icon: <FiTrendingUp size={28} />,
      navigateLink: "/trading-profit-report",
    },
    {
      title: "Total Trading Profit Income",
      value: format6(user?.totalRoi),
      icon: <FaUsers size={28} />,
      navigateLink: "/trading-profit-report",
    },
    {
      title: "Trading Level Income",
      value: format6(user?.levelIncome),
      icon: <FiTrendingUp size={28} />,
      navigateLink: "/trade-level-Income-history",
    },
    {
      title: "Club Income",
      value: format6(user?.clubIncome),
      icon: <FaUsers size={28} />,
      navigateLink: "/club-income",
    },
    {
      title: "IB Income",
      value: format6(user?.IBIncome) || 0,
      icon: <FaUsers size={28} />,
      navigateLink: "/ib-income",
    },

    // {
    //   title: "Rank & Reward Income",
    //   value: format6(user?.rankRewardIncome),
    //   icon: <Award size={28} />,
    //   navigateLink: "/reward-income",
    // },
  ];

  const adminToken = localStorage.getItem("adminToken");
  const adminRole = localStorage.getItem("adminRole");
  const isImpersonating = localStorage.getItem("isImpersonating");
  const backToAdmin = () => {
    if (!adminToken || !adminRole) {
      alert("Admin session not found");
      return;
    }
    localStorage.clear();
    localStorage.setItem("token", adminToken);
    localStorage.setItem("role", adminRole);

    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminRole");
    localStorage.removeItem("isImpersonating");
    window.location.reload();
  };

  return (
    <div className="min-h-screen text-white mt-5 font-sans tracking-wide">
      <div className="relative mb-5">
        {isImpersonating && adminRole === "Admin" && adminToken && (
          <div className="bg-yellow-500 text-black text-xl flex items-center justify-center fixed  top-0 left-0 w-full p-3 z-10">
            <p className="text-white">You are logged in as Admin !</p>

            <button
              className="bg-[var(--cyan-text)] py-2 px-4 rounded-md text-black underline font-semibold hover:scale-105 transition-all duration-200"
              onClick={backToAdmin}
            >
              Back to Admin Panel
            </button>
          </div>
        )}
      </div>

      <div className="mb-10 text-center">
        <h1 className="text-5xl font-extrabold mb-3">
          Welcome,{" "}
          <span className="text-[var(--cyan-text)] capitalize">
            {user?.username || "N/A"}
          </span>{" "}
          👋
        </h1>
        <p className="text-xl text-gray-400">
          Glad to see you again in{" "}
          <span className="text-[var(--cyan-text)]">
            BITTRONEXA {user?.name}
          </span>
        </p>
      </div>

      {/* Affiliate Link */}
      <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 mb-10 shadow-lg border !border-gray-600">
        <p className="text-gray-400 mb-2 text-[1.6rem]">Your Referral Link</p>
        <div className="flex items-center gap-4">
          <p className="text-[var(--cyan-text)] text-[1.5rem] font-mono break-all">
            {affiliateLink}
          </p>
          <button
            onClick={handleCopy}
            className="bg-gray-700 p-2 text-[1.5rem] rounded-md hover:bg-gray-600"
          >
            {copied ? "Copied!" : <FaRegCopy />}
          </button>
        </div>
      </div>

      {/* Wallet Cards */}
      <h2 className="text-3xl font-bold mb-6 text-[var(--cyan-text)]">
        Overview
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        {wallets.map((wallet, idx) => (
          <div
            key={idx}
            className={`bg-gradient-to-br ${wallet.color} rounded-2xl p-6 shadow-lg flex`}
          >
            <div className="text-5xl mr-6">
              {wallet.label.includes("Main") ? (
                <FaDollarSign />
              ) : wallet.label.includes("Package") ? (
                <FiUserCheck />
              ) : wallet.label.includes("Withdrawal") ? (
                <BiMoneyWithdraw />
              ) : (
                <FiTrendingUp />
              )}
            </div>
            <div>
              <p className="text-xl font-semibold">{wallet.label}</p>
              <p className="text-3xl font-extrabold">{wallet.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Income Overview */}
      <h2 className="text-3xl font-bold mb-6 text-[var(--cyan-text)]">
        Your Income Overview
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        {incomeSections.map((item, idx) => (
          <div
            key={idx}
            className="bg-white/5 p-6 rounded-2xl shadow-lg border !border-gray-600"
          >
            <div className="flex justify-between mb-4">
              <div className="text-[var(--cyan-text)]">{item.icon}</div>
              <button
                onClick={() => navigate(item.navigateLink)}
                className="px-4 py-1 text-[1rem] border !border-gray-500 rounded-md"
              >
                View All
              </button>
            </div>
            <p className="text-gray-300 mb-2 text-[1.2rem]">{item.title}</p>
            <p className="text-4xl font-bold">${item.value}</p>
          </div>
        ))}
      </div>

      {/* Bottom 2 Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* User Info */}
        <div className="bg-white/5 rounded-2xl p-8 border !border-gray-600 shadow-lg">
          <h3 className="text-3xl font-bold text-cyan-400 mb-8">
            User Information
          </h3>

          {loading ? (
            <div className="space-y-5">{shimmer()}</div>
          ) : (
            <div className="space-y-5 text-lg">
              {[
                { label: "Full Name", value: user?.name },
                { label: "Username", value: user?.username },
                // { label: "Email", value: user?.email },
                {
                  label: "Sponsor Code",
                  value: user?.parentReferedCode || "N/A",
                },
                // {
                //   label: "Service",
                //   value:
                //     user?.aiService?.isActive || user?.isVerified
                //       ? "Active"
                //       : "Inactive",
                // },
                { label: "Rank", value: user?.rank },
                {
                  label: "Status",
                  value: user?.isVerified ? "Active" : "Inactive",
                },
                {
                  label: "Renewal Date",
                  value: user?.aiService?.expiryDate
                    ? formatDate(user?.aiService?.expiryDate)
                    : "N/A",
                },
                {
                  label: "Service Package",
                  value: "$125",
                },
                {
                  label: "Self Investment Amount",

                  value: `$${user?.totalInvestment || 0}`,
                },
                {
                  label: "Date of Registration",
                  value: formatDate(user?.createdAt),
                },
                {
                  label: "Date of Activation",
                  value: activationDate ? formatDate(activationDate) : "N/A",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex justify-between py-3 border-b !border-gray-700"
                >
                  <span className="text-gray-300">{item.label}</span>
                  <span className="font-bold">{item.value}</span>
                </div>
              ))}
              <button
                className="w-full px-4 py-3 bg-cyan-600 hover:bg-cyan-700 cursor-pointer text-white rounded-lg mt-4"
                onClick={() => navigate("/monthly-closing-report")}
              >
                View Monthly Closing Report
              </button>
            </div>
          )}
        </div>

        {/* Business Details */}
        <div className="bg-white/5 rounded-2xl p-8 border !border-gray-600 shadow-lg">
          <h3 className="text-3xl font-bold text-cyan-400 mb-8">
            Business Details
          </h3>

          {loading ? (
            <div className="space-y-5">{shimmer()}</div>
          ) : (
            <div className="space-y-5 text-lg">
              {[
                { label: "Direct Team", value: verifiedCount || 0 },
                {
                  label: "Total Team",
                  value:
                    businessData?.totalTeams +
                      user?.leftTeam +
                      user?.rightTeam || 0,
                },
                {
                  label: "Total Team (Left/Right)",
                  value: `${businessData?.totalLeftTeam + user?.leftTeam || 0} / ${businessData?.totalRightTeam + user?.rightTeam || 0}`,
                },
                {
                  label: "Total Active (Left/Right)",
                  value: `${businessData?.totalActiveLeft + user?.leftTeam || 0} / ${businessData?.totalActiveRight + user?.rightTeam || 0}`,
                },
                {
                  label: "Total Trading Team Business",
                  value: `$${format6(businessData?.totalBusiness + user?.adminLeftBusiness + user?.adminRightBusiness)}`,
                },
                {
                  label: "Trading Team Business (Left/Right)",
                  value: `$${format6(
                    (businessData?.totalLeftBusiness ?? 0) +
                      (user?.adminLeftBusiness ?? 0),
                  )} / $${format6(
                    (businessData?.totalRightBusiness ?? 0) +
                      (user?.adminRightBusiness ?? 0),
                  )}`,
                },
                // {
                //   label: "Current Month Total Business",
                //   value: `$${format6(businessData?.currentMonthTotalBusiness)}`,
                // },
                {
                  label: "Current Month Total Trading Business (Left/Right)",
                  value: `$${format6(
                    businessData?.currentMonthLeftBusiness,
                  )} / $${format6(businessData?.currentMonthRightBusiness)}`,
                },
                {
                  label: "Bot Carry Forward (Left / Right)",
                  value: `${businessData?.botCarryForwardLeft / 125 || 0} / ${businessData?.botCarryForwardRight / 125 || 0}`,
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex justify-between py-3 border-b !border-gray-700"
                >
                  <span className="text-gray-300">{item.label}</span>
                  <span className="font-bold text-[var(--cyan-text)] text-xl">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {showLoginBanner && banners.length > 0 && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center px-4">
          <div className="relative w-full max-w-5xl rounded-xl overflow-hidden shadow-2xl">
            {showCloseBtn && (
              <button
                onClick={() => setShowLoginBanner(false)}
                className="absolute top-3 right-3 z-10 bg-white text-black text-xl px-4 py-2 rounded-md font-bold hover:bg-gray-200"
              >
                Close
              </button>
            )}
            <Notification banners={banners} loading={bannerLoading} />
          </div>
        </div>
      )}
    </div>
  );
};

export default UserHome;

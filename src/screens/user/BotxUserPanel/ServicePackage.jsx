import React, { useEffect, useState } from "react";
import {
  getActiveService,
  getServicePackages,
  purchaseServicePackageByPackageWallet,
} from "../../../api/user-api";
import {
  Zap,
  RefreshCw,
  Gift,
  Users,
  Lock,
  Calendar,
  TrendingUp,
  CheckCircle,
  XCircle,
  Sparkles,
  Clock,
} from "lucide-react";
import Swal from "sweetalert2";
import WalletOptionModal from "../../../components/ui/WalletOptionModal";
import USDTPaymentMain2 from "../../../components/wallet/USDTPaymentMain2";
import { Modal } from "react-bootstrap";
import { Button2 } from "../../../components/ui/Buttons";
import PageLoader from "../../../components/ui/PageLoader";

const PaymentMethodModal = ({ show, onHide, onSelect }) => {
  return (
    <Modal show={show} onHide={onHide} centered size="md" className="payment-method-modal">
      <Modal.Body className="p-4 bg-black border !border-gray-600 text-white rounded-lg">
        <h5 className="text-center mb-4 font-semibold text-2xl">Select Payment Method</h5>
        <div className="space-y-3">
          <button
            onClick={() => onSelect("USDT")}
            className="w-full text-xl py-3 px-4 bg-green-600 text-white font-semibold rounded-lg hover:scale-105 transition-all duration-200 shadow-md"
          >
            Pay with USDT
          </button>
          <button
            onClick={() => onSelect("PACKAGE_WALLET")}
            className="w-full text-xl py-3 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:scale-105 transition-all duration-200 shadow-md"
          >
            Pay with Package Wallet
          </button>
        </div>
        <div className="mt-4 text-center">
          <button
            onClick={onHide}
            className=" bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-white text-xl"
          >
            Cancel
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

const ServicePackage = () => {
  const [packages, setPackages] = useState([]);
  const [userActivePkg, setUserActivePkg] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [packagedata, setPackagedata] = useState(null);
  const [showPaymentMethodModal, setShowPaymentMethodModal] = useState(false);
  const [showWalletModal, setShowWalletModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [walletType, setWalletType] = useState(null);

  const getTimeRemaining = (expiryDate) => {
    const now = new Date();
    const expiry = new Date(expiryDate);
    const diff = expiry - now;

    if (diff <= 0) {
      const daysAgo = Math.floor(-diff / (1000 * 60 * 60 * 24));
      return `Expired ${daysAgo} day${daysAgo > 1 ? "s" : ""} ago`;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    if (days > 0) return `Expires in ${days} day${days > 1 ? "s" : ""}`;

    const hours = Math.floor(diff / (1000 * 60 * 60));
    if (hours > 0) return `Expires in ${hours} hour${hours > 1 ? "s" : ""}`;

    return "Expires soon";
  };

  const fetchServicePackages = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getServicePackages();
      setPackages(response?.data || []);
    } catch (error) {
      console.error("Error fetching service packages:", error);
      setError("Failed to load packages. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch user's active package
  const fetchUserActivePackage = async () => {
    try {
      const response = await getActiveService();
      if (response?.success && Array.isArray(response?.data) && response.data.length > 0) {
        setUserActivePkg(response.data[0]);
      } else {
        setUserActivePkg(null);
      }
    } catch (error) {
      console.error("Error fetching active package:", error);
      setUserActivePkg(null);
    }
  };

  // Handle Purchase
  const handlePurchase = (pkg) => {
    // console.log(pkg.isActive,"yahi hia ")
    if (!pkg.isActive) {
      Swal.fire("Inactive", "This package is currently unavailable.", "warning");
      return;
    }
    setSelectedPackage(pkg);
    setShowPaymentMethodModal(true); // ← नया modal खुलता है
  };

  // Handle Renew
  const handleRenew = (pkg) => {
    console.log(pkg,"ye kaise hai bia")
    handlePurchase(pkg);
  };

  // Payment Method Selection
  const handlePaymentMethodSelect = async (method) => {
    setShowPaymentMethodModal(false);

    if (method === "USDT") {
      setShowWalletModal(true); // USDT → Wallet Modal
    } else if (method === "PACKAGE_WALLET") {
      // Direct API Call
      try {
        setLoading(true);
        const response = await purchaseServicePackageByPackageWallet({
          packageId: selectedPackage._id,
        });

       setPackagedata(response?.investment)
       
        console.log(response,"kdjfojoik dfvgbwed ")

        if (response?.success) {
          Swal.fire("Success!", "Package activated with Package Wallet!", "success");
          fetchUserActivePackage();
          fetchServicePackages();
        } else {
          Swal.fire("Failed", response?.message || "Insufficient balance.", "error");
        }
      } catch (error) {
        console.error("Package Wallet Purchase Error:", error);
        Swal.fire(error?.response?.data?.message||"Failed to purchase with Package Wallet.");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleWalletConnect = (walletName) => {
    setWalletType(walletName);
    setShowWalletModal(false);
    setShowPaymentModal(true);
  };

  const handlePaymentSuccess = () => {
    setShowPaymentModal(false);
    Swal.fire("Success", "Package activated/renewed successfully!", "success");
    fetchUserActivePackage();
    fetchServicePackages();
  };

  const handlePaymentFailure = () => {
    setShowPaymentModal(false);
    Swal.fire("Failed", "Payment failed. Try again.", "error");
  };

  useEffect(() => {
    fetchServicePackages();
    fetchUserActivePackage();
  }, []);

  const isUserActive = (pkg) => userActivePkg?.packageId === pkg._id;

  return (
    <>
      {/* Payment Method Selection Modal */}
      <PaymentMethodModal
        show={showPaymentMethodModal}
        onHide={() => setShowPaymentMethodModal(false)}
        onSelect={handlePaymentMethodSelect}
      />

      {/* Wallet Option Modal */}
      {showWalletModal && (
        <WalletOptionModal
          hide={() => setShowWalletModal(false)}
          connectWallet={handleWalletConnect}
        />
      )}

      {/* USDT Payment Modal */}
      <Modal
        show={showPaymentModal}
        onHide={() => setShowPaymentModal(false)}
        size="md"
        centered
        scrollable
        className="BNBPaymentModal"
      >
        <Modal.Body className='bg-black border rounded-lg !border-gray-700'>
          <div className="inner">
            <h4 className='text-white mb-5'>Complete Payment</h4>
            {selectedPackage && (
              <USDTPaymentMain2
                amount={selectedPackage.priceUSD}
                walletType={walletType}
                packageId={selectedPackage._id}
                onSuccess={handlePaymentSuccess}
                onFailure={handlePaymentFailure}
              />
            )}
            <div className="btns">
              <Button2
                className="closeBtn"
                name="Close"
                onClick={() => setShowPaymentModal(false)}
              />
            </div>
          </div>
        </Modal.Body>
      </Modal>

      <div className="min-h-screen text-white p-6 md:p-8 relative overflow-hidden">
        <div className="relative z-10 w-full mx-auto">
          {/* Header Section */}
          <header className="mb-12">
            <nav className="flex items-center gap-2 text-lg mb-4">
              <span className="text-gray-400">Home</span>
              <span className="text-gray-500">/</span>
              <span className="text-cyan-400 font-semibold">Service Packages</span>
            </nav>

            <div className="flex items-center gap-4 mb-4">
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
                <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Premium Packages
                </span>
              </h1>
              <Sparkles className="text-cyan-400 animate-pulse" size={28} aria-hidden="true" />
            </div>
          </header>

          {loading ? (
            <PageLoader />
          ) : error ? (
            <div className="flex flex-col items-center justify-center h-96 bg-gradient-to-br from-gray-800/50 to-gray-700/30 rounded-3xl border border-gray-700 backdrop-blur-sm">
              <XCircle className="text-red-400 mb-4" size={64} aria-hidden="true" />
              <p className="text-gray-300 text-xl font-medium">{error}</p>
              <button
                onClick={fetchServicePackages}
                className="mt-4 px-6 py-3 bg-[var(--cyan-active)] text-lg hover:scale-105 text-white font-semibold rounded-lg transition-all duration-300"
              >
                Retry
              </button>
            </div>
          ) : packages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-96 bg-gradient-to-br from-gray-800/50 to-gray-700/30 rounded-3xl border border-gray-700 backdrop-blur-sm">
              <XCircle className="text-gray-500 mb-4" size={64} aria-hidden="true" />
              <p className="text-gray-300 text-xl font-medium">No packages available</p>
              <p className="text-gray-400 text-sm mt-2">Check back later for new offers</p>
            </div>
          ) : (
            <div className="grid gap-6 sm:gap-8 md:grid-cols-2 ">
              {packages.map((pkg, index) => {
                const userHasThis = isUserActive(pkg);
                const expired = userHasThis && userActivePkg?.isExpired;
                // console.log(userHasThis,expired)

                return (
                  <div
                    key={pkg._id}
                    style={{ animationDelay: `${index * 100}ms` }}
                    className="group relative animate-fadeIn"
                    role="region"
                    aria-labelledby={`package-${pkg._id}`}
                  >
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-3xl opacity-0 group-hover:opacity-10 blur transition-all duration-500"></div>

                    <div className="relative border !border-gray-600 rounded-3xl p-6 hover:border-cyan-500/50 transition-all duration-500 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                      {/* Status Badge - Top Right */}
                      {userHasThis && (
                        <div className="mb-5 space-y-3 p-4 bg-gray-800/40 border border-gray-700 rounded-xl">
                          <div className="flex items-center gap-2 text-lg text-gray-300">
                            <CheckCircle size={16} className="text-cyan-400" />
                            <span>Status:</span>
                            <span
                              className={`font-semibold ${
                                userActivePkg.isExpired ? "text-red-400" : "text-green-400"
                              }`}
                            >
                              {userActivePkg.isExpired ? "Expired" : "Active"}
                            </span>
                          </div>

                          <div className="flex items-center gap-2 text-lg text-gray-300">
                            <Calendar size={16} className="text-yellow-400" />
                            <span>Start Date:</span>
                            <span className="text-yellow-300 font-medium">
                              {new Date(userActivePkg.startDate).toLocaleDateString("en-US", {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              })}
                            </span>
                          </div>

                          <div className="flex items-center gap-2 text-lg text-gray-300">
                            <Clock size={16} className="text-blue-400" />
                            <span>End Date:</span>
                            <span className="text-blue-300 font-medium">
                              {new Date(userActivePkg.endDate).toLocaleDateString("en-US", {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              })}
                            </span>
                          </div>

                          <div className="flex items-center gap-2 text-lg text-gray-300">
                            <TrendingUp size={16} className="text-green-400" />
                            <span>Validity:</span>
                            <span className="text-green-300 font-semibold">
                              {userActivePkg.validityMonths} months
                            </span>
                          </div>

                          {!userActivePkg.isExpired && (
                            <div className="mt-2 text-yellow-400 text-lg font-medium">
                              {getTimeRemaining(userActivePkg.endDate)}
                            </div>
                          )}
                        </div>
                      )}

                      <div className="relative">
                        <div className="mb-6">
                          <div className="flex items-center gap-2 mb-3">
                            <Zap className="text-cyan-400" size={24} aria-hidden="true" />
                            <span className="px-2.5 py-0.5 bg-cyan-500/10 border !border-cyan-500 rounded text-cyan-400 text-lg font-medium uppercase tracking-wide">
                              {pkg.type}
                            </span>
                          </div>
                          <h3
                            id={`package-${pkg._id}`}
                            className="text-2xl md:text-3xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors duration-300"
                          >
                            {/* {pkg.name} */} Bittronexa Service Package
                          </h3>
                        </div>

                        {/* Price */}
                        <div className="mb-6 p-4 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border !border-cyan-500 rounded-2xl backdrop-blur-sm">
                          <div className="flex items-baseline gap-2 mb-1">
                            <span className="text-4xl md:text-5xl font-extrabold text-white group-hover:text-cyan-300 transition-colors">
                              ${pkg.priceUSD}
                            </span>
                            {/* <span className="text-[var(--cyan-text)] text-xl font-medium">USD</span> */}
                          </div>
                        </div>

                        {/* Features Grid */}
                        <div className="grid grid-cols-2 gap-3 mb-6">
                          <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-xl hover:bg-gray-800 transition-colors">
                            <div className="flex items-center gap-3">
                              <div className="p-2 bg-cyan-500/10 rounded-lg">
                                <RefreshCw size={16} className="text-cyan-400" aria-hidden="true" />
                              </div>
                              <span className="text-gray-300 text-lg font-medium">Renewal Price</span>
                            </div>
                            <span className="text-white font-bold text-lg">${pkg.renewalUSD}</span>
                          </div>

                          <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-xl hover:bg-gray-800 transition-colors">
                            <div className="flex items-center gap-3">
                              <div className="p-2 bg-green-500/10 rounded-lg">
                                <Gift size={16} className="text-green-400" aria-hidden="true" />
                              </div>
                              <span className="text-gray-300 text-lg font-medium">Direct Bonus</span>
                            </div>
                            <span className="text-green-400 font-bold text-lg">${pkg.directBonusUSD}</span>
                          </div>

                          <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-xl hover:bg-gray-800 transition-colors">
                            <div className="flex items-center gap-3">
                              <div className="p-2 bg-purple-500/10 rounded-lg">
                                <Users size={16} className="text-purple-400" aria-hidden="true" />
                              </div>
                              <span className="text-gray-300 text-lg font-medium">Per Pair Bonus</span>
                            </div>
                            <span className="text-purple-400 font-bold text-lg">${pkg.matchingBonusPerPairUSD}</span>
                          </div>

                          <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-xl hover:bg-gray-800 transition-colors">
                            <div className="flex items-center gap-3">
                              <div className="p-2 bg-blue-500/10 rounded-lg">
                                <Lock size={16} className="text-blue-400" aria-hidden="true" />
                              </div>
                              <span className="text-gray-300 text-lg font-medium">Daily Cap</span>
                            </div>
                            {/* <span className="text-blue-400 font-bold text-lg">${pkg.dailyMatchingCap}</span> */}
                            <span className="text-blue-400 font-bold text-lg">$1500</span>
                          </div>

                          {/* <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-xl hover:bg-gray-800 transition-colors">
                            <div className="flex items-center gap-3">
                              <div className="p-2 bg-yellow-500/10 rounded-lg">
                                <Calendar size={16} className="text-yellow-400" aria-hidden="true" />
                              </div>
                              <span className="text-gray-300 text-lg font-medium">Validity</span>
                            </div>
                            <span className="text-yellow-400 font-bold text-lg">{pkg.validityMonths}m</span>
                          </div> */}

                          {/* <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-xl hover:bg-gray-800 transition-colors">
                            <div className="flex items-center gap-3">
                              <div className="p-2 bg-purple-500/10 rounded-lg">
                                <Award size={16} className="text-purple-400" aria-hidden="true" />
                              </div>
                              <span className="text-gray-300 text-lg font-medium">Rank Points</span>
                            </div>
                            <span className="text-purple-400 font-bold text-lg">{pkg.rankPoints}</span>
                          </div> */}
                        </div>

                        {/* Action Button */}
                        {userHasThis ? (
                          expired ? (
                            <button
                              onClick={() => handleRenew(pkg)}
                              className="w-full text-xl py-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl shadow-lg shadow-orange-500/30 transition-all duration-300 hover:scale-[1.02]"
                            >
                              Renew Now
                            </button>
                          ) : (
                            <button
                              disabled
                              className="w-full text-xl py-4 bg-green-600 text-white font-semibold rounded-xl opacity-80 cursor-not-allowed"
                            >
                              Activated
                            </button>
                          )
                        ) : (
                          <button
                            onClick={() => handlePurchase(pkg)}
                            disabled={!pkg.isActive}
                            className={`w-full text-xl py-4 font-semibold rounded-xl transition-all duration-300 hover:scale-[1.02] ${
                              pkg.isActive
                                ? "bg-[var(--cyan-active)] text-white shadow-lg shadow-cyan-500/30"
                                : "bg-gray-700 text-gray-400 cursor-not-allowed"
                            }`}
                            aria-label={`Purchase ${pkg.name} package for $${pkg.priceUSD}`}
                          >
                            {pkg.isActive ? "Purchase Now" : "Unavailable"}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <style jsx>{`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .animate-fadeIn {
            animation: fadeIn 0.6s ease-out forwards;
          }
        `}</style>
      </div>
    </>
  );
};

export default ServicePackage;
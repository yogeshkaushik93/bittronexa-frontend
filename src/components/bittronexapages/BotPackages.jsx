



// import React, { useState } from 'react';
// import { TrendingUp, Zap, Award, Crown } from 'lucide-react';

// import { automatedBotPackages } from "./Data";
// import Swal from "sweetalert2";
// import WalletOptionModal from "../../components/ui/WalletOptionModal";
// import USDTPaymentMain2 from "../../components/wallet/USDTPaymentMain3";
// import { Modal } from "react-bootstrap";
// import { Button2 } from "../../components/ui/Buttons";
// import PageLoader from "../../components/ui/PageLoader";

// const BotPackages = () => {
//   const [selectedAmounts, setSelectedAmounts] = useState({});
//   const [showPaymentMethodModal, setShowPaymentMethodModal] = useState(false);
//   const [showWalletModal, setShowWalletModal] = useState(false);
//   const [showPaymentModal, setShowPaymentModal] = useState(false);
//   const [selectedPackage, setSelectedPackage] = useState(null);
//   const [walletType, setWalletType] = useState(null);
//   const handleAmountChange = (packageId, value) => {
//     // Round to nearest 100
//     const roundedValue = Math.round(value / 100) * 100;
//     setSelectedAmounts(prev => ({
//       ...prev,
//       [packageId]: roundedValue
//     }));
//   };

//   const BuyPackage = (payload) => {
//     console.log('Package Purchase Payload:', payload);
//   };

//   const handleBuy = (pkg) => {
//     const amount = selectedAmounts[pkg.id] || pkg.investmentRange.min;
    
//     const payload = {
//       packageName: pkg.name,
//       amount: parseFloat(amount),
//       slug: pkg.slug,
//       profitSharing: pkg.tradingProfitSharingPercent,
//     };

//     // BuyPackage(payload);
//      setShowPaymentMethodModal(true);
//   };

//   return (
// <div className="min-h-screen mx-auto p-4 sm:p-6 lg:p-8">
//   <div className="mx-auto">
//     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
//       {automatedBotPackages.map((pkg) => {
//         const Icon = pkg.icon;
//         const minAmount = pkg.investmentRange.min;
//         const maxAmount = pkg.investmentRange.max;
//         const currentAmount = selectedAmounts[pkg.id] || minAmount;

//         return (
//           <div
//             key={pkg.id}
//             className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 hover:border-cyan-500 transition-all duration-300 flex flex-col"
//           >
//             {/* Badge */}
//             <div className={`bg-gradient-to-r ${pkg.gradient} p-3`}>
//               <div className="flex items-center justify-between">
//                 <Icon className="w-22 h-22 text-white" />
//                 <span className="text-2xl font-semibold text-white bg-black/30 px-3 py-1 rounded-full">
//                   {pkg.badge}
//                 </span>
//               </div>
//             </div>

//             {/* Content */}
//             <div className="p-4 flex-grow flex flex-col">
//               <h3 className="text-xl md:text-2xl font-semibold text-white mb-2">
//                 {pkg.name}
//               </h3>

//               {/* Investment Range */}
//               <div className="mb-3">
//                 <p className="text-gray-400 text-xl mb-2">Investment Range</p>
//                 <p className="text-cyan-400 text-2xl font-semibold">
//                   ${minAmount.toLocaleString()} –{" "}
//                   {maxAmount ? `$${maxAmount.toLocaleString()}` : "Unlimited"}
//                 </p>
//               </div>

//               {/* Profit */}
//               <div className="mb-4">
//                 <p className="text-gray-400 text-lg">Profit Sharing</p>
//                 <p className="text-white text-xl font-bold">
//                   {pkg.tradingProfitSharingPercent}%
//                 </p>
//               </div>

//               {/* Features */}
//               <div className="mb-4 flex-grow">
//                 <p className="text-gray-400 text-2xl mb-2">Features</p>
//                 <ul className="space-y-1">
//                   {pkg.features.map((feature, idx) => (
//                     <li
//                       key={idx}
//                       className="flex items-start text-gray-300 text-xl"
//                     >
//                       <span className="text-cyan-400 mr-2">✓</span>
//                       {feature}
//                     </li>
//                   ))}
//                 </ul>
//               </div>

//               {/* Amount Input */}
//               <div className="mb-3">
//                 <label className="text-gray-400 text-xl block mb-1">
//                   Investment Amount ( ${pkg.currency}T )
//                 </label>
//                 <input
//                   type="number"
//                   min={minAmount}
//                   max={maxAmount || 1000000}
//                   step="100"
//                   value={currentAmount}
//                   onChange={(e) =>
//                     handleAmountChange(pkg.id, e.target.value)
//                   }
//                   className="w-full bg-gray-700 mb-2 mt-2 text-white text-xl rounded-md px-3 py-2 border border-gray-600 focus:border-cyan-500 focus:outline-none"
//                 />
//                 <p className="text-gray-200  text-xl mt-1">
//                   Multiples of 100 only
//                 </p>
//               </div>

//               {/* Buy Button */}
//               <button
//                 onClick={() => handleBuy(pkg)}
//                 className={`w-full bg-gradient-to-r ${pkg.gradient} text-white font-semibold text-2xl py-2.5 rounded-md hover:opacity-90 transition`}
//               >
//                 Buy Package
//               </button>
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   </div>
// </div>

//   );
// };
// export default BotPackages;





import React, { useState } from 'react';
import { TrendingUp, Zap, Award, Crown,CreditCard, Wallet, X, } from 'lucide-react';

import { automatedBotPackages } from "./Data";
import Swal from "sweetalert2";
import WalletOptionModal from "../../components/ui/WalletOptionModal";
import USDTPaymentMain2 from "../../components/wallet/USDTPaymentMain3";
import { Modal } from "react-bootstrap";
import { Button2 } from "../../components/ui/Buttons";
import PageLoader from "../../components/ui/PageLoader";

// API - adjust path if needed (same API used in your other component)
// import { purchaseServicePackageByPackageWallet } from "../../../api/user-api";
// 
/**
 * Payment Method Selection Modal (keeps your styling)
 */
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

const BotPackages = () => {
  const [selectedAmounts, setSelectedAmounts] = useState({});
  const [showPaymentMethodModal, setShowPaymentMethodModal] = useState(false);
  const [showWalletModal, setShowWalletModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [walletType, setWalletType] = useState(null);
  const [loading, setLoading] = useState(false); // to prevent duplicate submits

  const handleAmountChange = (packageId, value) => {
    // Round to nearest 100 and ensure numeric
    const num = Number(value) || 0;
    const roundedValue = Math.round(num / 100) * 100;
    setSelectedAmounts(prev => ({
      ...prev,
      [packageId]: roundedValue
    }));
  };

  const BuyPackage = (payload) => {
    // keep for debug / analytics
    console.log('Package Purchase Payload:', payload);
  };

  const handleBuy = (pkg) => {
    const amount = selectedAmounts[pkg.id] || pkg.investmentRange.min;

    const payload = {
      packageName: pkg.name,
      amount: parseFloat(amount),
      slug: pkg.slug,
      profitSharing: pkg.tradingProfitSharingPercent,
      packageId: pkg.id,
      currency: pkg.currency || "USDT",
    };

    BuyPackage(payload);
    setSelectedPackage(payload);
    setShowPaymentMethodModal(true);
  };

  // When user selects a payment method from the modal
  const handlePaymentMethodSelect = async (method) => {
    setShowPaymentMethodModal(false);

    if (!selectedPackage) {
      Swal.fire("Error", "No package selected. Try again.", "error");
      return;
    }

    if (method === "USDT") {
      // Open wallet selection -> then USDT payment modal
      setShowWalletModal(true);
      return;
    }

    if (method === "PACKAGE_WALLET") {
      // Directly call package wallet purchase API
      try {
        setLoading(true);
        // Backend contract: expect package identifier and amount (adjust body shape to your backend)
        const response = await purchaseServicePackageByPackageWallet({
          packageId: selectedPackage.packageId,
          amount: selectedPackage.amount,
          slug: selectedPackage.slug,
          idempotency_key: `${selectedPackage.packageId}-${Date.now()}`, // simple idempotency
        });

        if (response?.success) {
          Swal.fire("Success!", "Package activated with Package Wallet!", "success");
          // you may want to trigger a refresh of packages or active package list from parent/store
        } else {
          Swal.fire("Failed", response?.message || "Purchase failed with package wallet.", "error");
        }
      } catch (err) {
        console.error("Package Wallet Purchase Error:", err);
        Swal.fire("Error", "Failed to purchase with Package Wallet.", "error");
      } finally {
        setLoading(false);
      }
    }
  };

  // walletName example: "MetaMask" or "WalletConnect"
  const handleWalletConnect = (walletName) => {
    setWalletType(walletName);
    setShowWalletModal(false);
    setShowPaymentModal(true);
  };

  const handlePaymentSuccess = () => {
    setShowPaymentModal(false);
    Swal.fire("Success", "Package activated/renewed successfully!", "success");
    // optionally refresh local state or inform parent
  };

  const handlePaymentFailure = () => {
    setShowPaymentModal(false);
    Swal.fire("Failed", "Payment failed. Try again.", "error");
  };

  // Render
  return (
    <>
      {/* Payment Method Modal */}
      <PaymentMethodModal
        show={showPaymentMethodModal}
        onHide={() => setShowPaymentMethodModal(false)}
        onSelect={handlePaymentMethodSelect}
      />

      {/* Wallet Option Modal (existing component you use elsewhere) */}
      {showWalletModal && (
        <WalletOptionModal
          hide={() => setShowWalletModal(false)}
          connectWallet={handleWalletConnect}
        />
      )}

      {/* USDT Payment Modal (USDTPaymentMain3) */}
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
                amount={selectedPackage.amount}
                walletType={walletType}
                packageId={selectedPackage.packageId}
                slug={selectedPackage.slug}
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

      <div className="min-h-screen mx-auto p-4 sm:p-6 lg:p-8">
        <div className="mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {automatedBotPackages.map((pkg) => {
              const Icon = pkg.icon || Zap;
              const minAmount = pkg.investmentRange.min;
              const maxAmount = pkg.investmentRange.max;
              const currentAmount = selectedAmounts[pkg.id] || minAmount;

              return (
                <div
                  key={pkg.id}
                  className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 hover:border-cyan-500 transition-all duration-300 flex flex-col"
                >
                  {/* Badge */}
                  <div className={`bg-gradient-to-r ${pkg.gradient} p-3`}>
                    <div className="flex items-center justify-between">
                      <Icon className="w-22 h-22 text-white" />
                      <span className="text-2xl font-semibold text-white bg-black/30 px-3 py-1 rounded-full">
                        {pkg.badge}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4 flex-grow flex flex-col">
                    <h3 className="text-xl md:text-2xl font-semibold text-white mb-2">
                      {pkg.name}
                    </h3>

                    {/* Investment Range */}
                    <div className="mb-3">
                      <p className="text-gray-400 text-xl mb-2">Investment Range</p>
                      <p className="text-cyan-400 text-2xl font-semibold">
                        ${minAmount.toLocaleString()} –{" "}
                        {maxAmount ? `$${maxAmount.toLocaleString()}` : "Unlimited"}
                      </p>
                    </div>

                    {/* Profit */}
                    <div className="mb-4">
                      <p className="text-gray-400 text-lg">Profit Sharing</p>
                      <p className="text-white text-xl font-bold">
                        {pkg.tradingProfitSharingPercent}%
                      </p>
                    </div>

                    {/* Features */}
                    <div className="mb-4 flex-grow">
                      <p className="text-gray-400 text-2xl mb-2">Features</p>
                      <ul className="space-y-1">
                        {pkg.features.map((feature, idx) => (
                          <li
                            key={idx}
                            className="flex items-start text-gray-300 text-xl"
                          >
                            <span className="text-cyan-400 mr-2">✓</span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Amount Input */}
                    <div className="mb-3">
                      <label className="text-gray-400 text-xl block mb-1">
                        Investment Amount ( ${pkg.currency}T )
                      </label>
                      <input
                        type="number"
                        min={minAmount}
                        max={maxAmount || 1000000}
                        step="100"
                        value={currentAmount}
                        onChange={(e) =>
                          handleAmountChange(pkg.id, e.target.value)
                        }
                        className="w-full bg-gray-700 mb-2 mt-2 text-white text-xl rounded-md px-3 py-2 border border-gray-600 focus:border-cyan-500 focus:outline-none"
                      />
                      <p className="text-gray-200  text-xl mt-1">
                        Multiples of 100 only
                      </p>
                    </div>

                    {/* Buy Button */}
                    <button
                      onClick={() => handleBuy(pkg)}
                      disabled={loading}
                      className={`w-full bg-gradient-to-r ${pkg.gradient} text-white font-semibold text-2xl py-2.5 rounded-md hover:opacity-90 transition ${loading ? "opacity-60 cursor-not-allowed" : ""}`}
                    >
                      {loading ? "Processing..." : "Buy Package"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default BotPackages;

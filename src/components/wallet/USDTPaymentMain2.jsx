import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import Swal from "sweetalert2";
import { Button2 } from "../ui/Buttons";
import PageLoader from "../ui/PageLoader";
import { buyPlanPackage, purchaseServicePackage } from "../../api/user-api";
import { CheckCircle } from "lucide-react";

const USDT_ADDRESS = "0x55d398326f99059fF775485246999027B3197955";
const USDT_ABI = [
  "function allowance(address owner, address spender) view returns (uint256)",
  "function approve(address spender, uint256 amount) returns (bool)",
  "function transfer(address to, uint256 amount) returns (bool)",
  "function balanceOf(address account) view returns (uint256)",
  "function decimals() view returns (uint8)",
];

const USDTPaymentMain2 = ({ amount, packageId, onSuccess, otp, txnPass, onFailure, walletType }) => {
  const [loading, setLoading] = useState(false);
  // investmentAmount is the amount we will send on-chain (string)
  const [investmentAmount, setInvestmentAmount] = useState(() => (amount ? String(amount) : "0.0001"));
  const [walletConnected, setWalletConnected] = useState(false);
  const [recipientAddress, setRecipientAddress] = useState(import.meta.env.VITE_PAYMENT_ADDRESS || "");
  const PENDING_TX_KEY = "pendingTx";

  // Auto switch to BSC on mount (best-effort)
  useEffect(() => {
    const switchToBSC = async () => {
      try {
        if (window.ethereum) {
          const chainId = await window.ethereum.request({ method: "eth_chainId" });
          if (chainId !== "0x38") {
            try {
              await window.ethereum.request({
                method: "wallet_switchEthereumChain",
                params: [{ chainId: "0x38" }],
              });
            } catch (switchError) {
              if (switchError?.code === 4902) {
                await window.ethereum.request({
                  method: "wallet_addEthereumChain",
                  params: [
                    {
                      chainId: "0x38",
                      chainName: "Binance Smart Chain",
                      nativeCurrency: {
                        name: "BNB",
                        symbol: "BNB",
                        decimals: 18,
                      },
                      rpcUrls: ["https://bsc-dataseed1.binance.org/"],
                      blockExplorerUrls: ["https://bscscan.com/"],
                    },
                  ],
                });
              } else {
                // ignore - user may switch manually
                console.warn("wallet_switchEthereumChain error:", switchError);
              }
            }
          }
        }
      } catch (err) {
        console.error("Auto BSC switch failed:", err);
      }
    };

    switchToBSC();
  }, []);

  // keep recipientAddress synced to env (in case it updates)
  useEffect(() => {
    setRecipientAddress(import.meta.env.VITE_PAYMENT_ADDRESS || "");
  }, []);

  // Ensure investmentAmount uses incoming `amount` prop if provided
  useEffect(() => {
    if (amount) {
      setInvestmentAmount(String(amount));
    }
  }, [amount]);

  // Resume pending transaction API call (if any) when component mounts
  useEffect(() => {
    const resumePending = async () => {
      try {
        const saved = localStorage.getItem(PENDING_TX_KEY);
        if (!saved) return;

        const parsed = JSON.parse(saved);
        // Basic validation
        if (!parsed?.txHash) {
          localStorage.removeItem(PENDING_TX_KEY);
          return;
        }

        setLoading(true);

        // Attempt to complete the backend call for this pending tx
        try {
          await transactionHandler({
            txResponse: parsed.txHash,
            amount: parsed.investmentAmount,
            packageId: parsed.packageId,
            otp: parsed.otp,
            txnPass: parsed.txnPass,
          });
          // If transactionHandler succeeded, call provided onSuccess
          onSuccess && onSuccess();
        } catch (err) {
          // If backend reports duplicate (409) we'll handle inside transactionHandler.
          // For other errors, keep pendingTx so user or background job can retry later.
          console.error("Resuming pending tx failed:", err);
        } finally {
          setLoading(false);
        }
      } catch (err) {
        console.error("Error while resuming pending tx:", err);
      }
    };

    resumePending();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // run only once on mount

  const handleConnectWallet = async () => {
    try {
      if (!window.ethereum) {
        Swal.fire({
          icon: "error",
          title: "Connection Failed",
          text: "MetaMask or SafePal is not installed.",
        });
        return;
      }

      if (walletType === "safepal") {
        const isSafePal = window.ethereum.isSafePal || navigator.userAgent.toLowerCase().includes("safepal");
        if (!isSafePal) {
          throw new Error("Please use SafePal wallet.");
        }
      }

      await window.ethereum.request({ method: "eth_requestAccounts" });

      try {
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: "0x38" }],
        });
      } catch (switchError) {
        if (switchError?.code === 4902) {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: "0x38",
                chainName: "Binance Smart Chain",
                nativeCurrency: {
                  name: "BNB",
                  symbol: "BNB",
                  decimals: 18,
                },
                rpcUrls: ["https://bsc-dataseed1.binance.org/"],
                blockExplorerUrls: ["https://bscscan.com/"],
              },
            ],
          });
        } else {
          console.warn("Switch chain error:", switchError);
        }
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const userAddress = await signer.getAddress();
      console.log("Connected wallet address:", userAddress);
      setWalletConnected(true);
    } catch (error) {
      console.error("Error connecting wallet:", error);
      Swal.fire({
        icon: "error",
        title: "Connection Failed",
        text: error?.message || "Failed to connect wallet. Please try again.",
      });
    }
  };

  /**
   * transactionHandler
   * - Sends the payload to backend (purchaseServicePackage).
   * - Removes pendingTx from localStorage only when backend confirms success or when backend reports duplicate.
   * - Throws error back to caller on failure so callers can decide what to do (keep pendingTx).
   */
  const transactionHandler = async (payload) => {
    try {
      // Call the backend API which should be idempotent using txResponse (txHash).
      await purchaseServicePackage(payload);

      // Backend accepted it; remove pending Tx since it's processed.
      localStorage.removeItem(PENDING_TX_KEY);

      Swal.fire({
        icon: "success",
        title: "Payment Successful",
        text: `Transaction confirmed. You have successfully sent ${payload.amount} USDT.`,
        confirmButtonText: "Ok",
        allowOutsideClick: false,
      }).then((result) => {
        if (result.isConfirmed) {
          // keep original behavior: reload
          window.location.reload();
        }
      });
    } catch (error) {
      // If backend returns 409 (duplicate) we should remove the pendingTx because it's already processed.
      const status = error?.response?.status || error?.status;
      if (status === 409) {
        // Duplicate transaction - remove pending, inform user and resolve.
        localStorage.removeItem(PENDING_TX_KEY);
        Swal.fire({
          icon: "error",
          title: "Duplicate Transaction",
          text: error?.response?.data?.message || error?.message || "This transaction has already been processed.",
        });
        return;
      }

      // For other errors, keep pendingTx so it can be retried later.
      console.error("Error during purchaseServicePackage API call:", error);
      throw error;
    }
  };

  /**
   * handlePayment
   * - Performs on-chain transfer.
   * - Immediately after tx is mined, saves pendingTx to localStorage.
   * - Then calls transactionHandler to notify backend.
   */
  const handlePayment = async () => {
    if (!recipientAddress) {
      Swal.fire({
        icon: "error",
        title: "Invalid Address",
        text: "Please enter a valid recipient address",
      });
      return;
    }

    setLoading(true);

    try {
      if (!window.ethereum) throw new Error("MetaMask or SafePal is not installed.");

      const chainId = await window.ethereum.request({ method: "eth_chainId" });
      if (chainId !== "0x38") {
        throw new Error("Please connect to BSC network first");
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const userAddress = await signer.getAddress();

      const usdtContract = new ethers.Contract(USDT_ADDRESS, USDT_ABI, signer);

      // decimals() and balanceOf return BigInt-compatible values in ethers v6
      const decimals = await usdtContract.decimals();
      const balance = await usdtContract.balanceOf(userAddress); // BigInt
      // parseUnits returns BigInt
      const amountToSend = investmentAmount || "0.0001"; // string
      const amountInUSDT = ethers.parseUnits(amountToSend, decimals);

      if (BigInt(balance.toString()) < BigInt(amountInUSDT.toString())) {
        throw new Error("Insufficient USDT balance");
      }

      // Build transfer call data and send transaction to token contract
      const txData = usdtContract.interface.encodeFunctionData("transfer", [
        recipientAddress,
        amountInUSDT,
      ]);

      const tx = await signer.sendTransaction({
        to: USDT_ADDRESS,
        data: txData,
        // gasLimit can be tuned in production; leaving moderate default
        gasLimit: 100000,
      });

      // Wait for transaction mined. If you prefer to treat tx.hash as "sent" and handle confirm later, change this.
      const receipt = await tx.wait();

      // Immediately persist the tx + metadata so we never lose it
      const pendingPayload = {
        txHash: tx.hash,
        investmentAmount: amountToSend, // keep what was actually sent on-chain
        packageId,
        otp,
        txnPass,
        timestamp: Date.now(),
      };

      localStorage.setItem(PENDING_TX_KEY, JSON.stringify(pendingPayload));

      // Now call backend to register this payment
      try {
        await transactionHandler({
          txResponse: tx.hash,
          amount: amountToSend,
          packageId,
          otp,
          txnPass,
        });

        // call parent's success callback
        onSuccess && onSuccess();
      } catch (apiError) {
        // transactionHandler will have left pendingTx in localStorage for retries.
        console.error("API call after tx succeeded failed:", apiError);
        Swal.fire({
          icon: "error",
          title: "Payment Recorded Locally",
          text: "On-chain transfer succeeded but we couldn't complete the server request. We'll retry automatically when possible.",
        });
        onFailure && onFailure();
      }
    } catch (error) {
      console.error("Error during USDT transfer:", error);
      Swal.fire({
        icon: "error",
        title: "Transfer Failed",
        text: error?.message || "Transfer failed. Please try again.",
      });
      onFailure && onFailure();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[30vh] p-6 bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-2xl shadow-lg text-center">
      {loading && <PageLoader />}

      <h3 className="text-2xl font-semibold text-white">
        Pay <b className="text-green-400">{investmentAmount}</b> USDT
      </h3>

      <div className="flex flex-col gap-4 w-full max-w-sm mt-5">
        {!walletConnected ? (
          <button
            onClick={handleConnectWallet}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white text-2xl font-semibold rounded-lg shadow-md transition-all duration-300"
          >
            Connect Wallet
          </button>
        ) : (
          <p className="text-green-400 text-2xl font-medium flex items-center gap-2 justify-center">
            <CheckCircle className="h-8 w-8" /> Wallet is connected
          </p>
        )}

        {walletConnected && (
          <button
            onClick={handlePayment}
            disabled={loading || !walletConnected || !recipientAddress}
            className={`w-full text-2xl py-3 font-semibold rounded-lg shadow-md transition-all duration-300 ${
              loading || !recipientAddress
                ? "bg-gray-500 cursor-not-allowed text-gray-200"
                : "bg-green-700 hover:bg-green-600 text-white"
            }`}
          >
            {loading ? "Processing..." : "Pay USDT"}
          </button>
        )}
      </div>
    </div>
  );
};

export default USDTPaymentMain2;

import { useEffect, useState } from "react";
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

const USDTPaymentMain2 = ({ amount, packageId, onSuccess, onFailure,otp,txnPass, walletType }) => {
    const [loading, setLoading] = useState(false);
    const [investmentAmount, setInvestmentAmount] = useState(0);
    const [walletConnected, setWalletConnected] = useState(false);
    const [recipientAddress, setRecipientAddress] = useState(import.meta.env.VITE_PAYMENT_ADDRESS);

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
                            if (switchError.code === 4902) {
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
                                throw switchError;
                            }
                        }
                    }
                }
            } catch (error) {
                console.error("Auto BSC switch failed:", error.message);
            }
        };

        switchToBSC();
    }, []);

    useEffect(() => {
        setRecipientAddress(import.meta.env.VITE_PAYMENT_ADDRESS);
    }, []);

    useEffect(() => {
        if (!amount) return;
        setInvestmentAmount("0.0001");
    }, [amount]);

    useEffect(() => {
        const savedTx = localStorage.getItem("pendingTx");
        if (savedTx) {
            const parsed = JSON.parse(savedTx);
            transactionHandler({
                txResponse: parsed.txHash,
                investmentAmount: parsed.investmentAmount,
                packageId: parsed.packageId,
                otp,
                txnPass
            })
                .then(onSuccess)
                .catch((error) => {
                    if (error.response?.status === 409 || error.status === 409) {
                        Swal.fire({
                            icon: "error",
                            title: "Duplicate Transaction",
                            text: error?.message || "This transaction has already been processed.",
                        });
                    } else {
                        onFailure();
                    }
                })
                .finally(() => {
                    localStorage.removeItem("pendingTx");
                });
        }
    }, []);

    const handleConnectWallet = async () => {
        try {
            if (window.ethereum) {
                if (walletType === "safepal") {
                    const isSafePal =
                        window.ethereum.isSafePal ||
                        navigator.userAgent.toLowerCase().includes("safepal");
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
                    if (switchError.code === 4902) {
                        await window.ethereum.request({
                            method: "wallet_addEthereumChain",
                            params: [{
                                chainId: "0x38",
                                chainName: "Binance Smart Chain",
                                nativeCurrency: {
                                    name: "BNB",
                                    symbol: "BNB",
                                    decimals: 18,
                                },
                                rpcUrls: ["https://bsc-dataseed1.binance.org/"],
                                blockExplorerUrls: ["https://bscscan.com/"],
                            }],
                        });
                    } else {
                        throw switchError;
                    }
                }

                const provider = new ethers.BrowserProvider(window.ethereum);
                const signer = await provider.getSigner();
                const userAddress = await signer.getAddress();
                console.log("Connected wallet address:", userAddress);
                setWalletConnected(true);
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Connection Failed",
                    text: "MetaMask or SafePal is not installed.",
                });
            }
        } catch (error) {
            console.error("Error connecting wallet:", error);
            Swal.fire({
                icon: "error",
                title: "Connection Failed",
                text: error.message || "Failed to connect wallet. Please try again.",
            });
        }
    };

    const transactionHandler = async (payload) => {
        try {
            await purchaseServicePackage(payload);
            localStorage.removeItem("pendingTx");

            Swal.fire({
                icon: "success",
                title: "Payment Successful",
                text: `Transaction confirmed. You have successfully sent ${payload.investmentAmount} USDT.`,
                confirmButtonText: "Ok",
                allowOutsideClick: false,
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.reload();
                }
            });
        } catch (error) {
            console.error("Error during buyPlanPackage API:", error);
            throw error;
        }
    };

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
            if (window.ethereum) {
                const chainId = await window.ethereum.request({ method: "eth_chainId" });
                if (chainId !== "0x38") {
                    throw new Error("Please connect to BSC network first");
                }

                const provider = new ethers.BrowserProvider(window.ethereum);
                const signer = await provider.getSigner();
                const userAddress = await signer.getAddress();
                const usdtContract = new ethers.Contract(USDT_ADDRESS, USDT_ABI, signer);

                const decimals = await usdtContract.decimals();
                const balance = await usdtContract.balanceOf(userAddress);
                const amountInUSDT = ethers.parseUnits(investmentAmount.toString(), decimals);

                if (balance < amountInUSDT) {
                    throw new Error("Insufficient USDT balance");
                }

                const txData = usdtContract.interface.encodeFunctionData("transfer", [
                    recipientAddress,
                    amountInUSDT,
                ]);

                const tx = await signer.sendTransaction({
                    to: USDT_ADDRESS,
                    data: txData,
                    gasLimit: 100000,
                });

                await tx.wait();

                localStorage.setItem("pendingTx", JSON.stringify({
                    txHash: tx.hash,
                    investmentAmount: amount,
                    packageId,
                }));

                await transactionHandler({
                    txResponse: tx.hash,
                    amount,
                    packageId,
                });

                onSuccess();
            } else {
                throw new Error("MetaMask or SafePal is not installed.");
            }
        } catch (error) {
            console.error("Error during USDT transfer:", error);
            Swal.fire({
                icon: "error",
                title: "Transfer Failed",
                text: error.message || "Transfer failed. Please try again.",
            });
            onFailure();
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
                        className={`w-full text-2xl py-3 font-semibold rounded-lg shadow-md transition-all duration-300 ${loading || !recipientAddress
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

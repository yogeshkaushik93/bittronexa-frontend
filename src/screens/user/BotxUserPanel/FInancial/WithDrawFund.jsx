import React, { useState } from "react";
import { Lock, User } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { sendOtpForWithdrawal, withdrawalRequest } from "../../../../api/user-api";
import ReusableForm from "../../../../components/ui/ReusableForm";
import PageLoader from "../../../../components/ui/PageLoader";
import { getUserInfo } from "../../../../api/auth-api";
import { setUserInfo } from "../../../../redux/slice/UserInfoSlice";
import PrincipleWithdrawal from "./PrincipleWithdrawal";

const WithDrawFund = () => {
    const userInfo = useSelector((state) => state.userInfo?.userInfo?.user);
    const [formData, setFormData] = useState({
        walletAddress: userInfo?.walletAddress,
        amount: "",
        loginPassword: "",
        otp: "",
        tnxPass: ""
    });
    const [loading, setLoading] = useState(false);
    const [otpLoading, setOtpLoading] = useState(false);

    const dispatch = useDispatch();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleWithdrawFund = async () => {
        try {
            const amount = Number(formData.amount);
            const balance = Number(userInfo?.currentEarnings);

            // 1️⃣ Required fields
            if (!formData.tnxPass || !formData.otp || !formData.amount) {
                return Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'All fields are required',
                });
            }

            // 2️⃣ Invalid amount
            if (isNaN(amount) || amount <= 0) {
                return Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Amount must be greater than 0',
                });
            }

            // 3️⃣ Minimum withdrawal (IMPORTANT FIX)
            if (amount < 10) {
                return Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Minimum Withdrawal Amount is $10',
                });
            }

            // 4️⃣ Balance check
            if (amount > balance) {
                return Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Amount must be less than main wallet balance',
                });
            }

            // ✅ Passed all validations
            setLoading(true);

            const payload = {
                userWalletAddress: userInfo?.walletAddress,
                amount,
                otp: formData.otp,
                tnxPass: formData.tnxPass,
            };

            const response = await withdrawalRequest(payload);

            if (response?.success) {
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: response?.message || 'Withdrawal request sent successfully',
                });

                const user = await getUserInfo();
                dispatch(setUserInfo(user));
            }
        } catch (error) {
            console.log("error in sending withdrawal request", error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error?.response?.data?.message || 'Failed to send withdrawal request',
            });
        } finally {
            setLoading(false);
        }
    };



    const handleSendOtp = async () => {
        try {
            setOtpLoading(true);
            const response = await sendOtpForWithdrawal();
            if (response?.success) {
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: response?.message || 'OTP sent successfully',
                });
            }
        } catch (error) {
            console.log("error in sending otp", error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error?.response?.data?.message || 'Failed to send OTP',
            })
        } finally {
            setOtpLoading(false);
        }
    };


    if (loading) return <PageLoader />

    return (
        <>
            <div className="p-6 text-white">
                <p className="text-lg text-gray-200 mb-6">Home / Withdraw</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                    <div className="bg-[#0f0f0f] border !border-gray-500 rounded-lg p-4">
                        <h3 className="text-gray-300 text-xl mb-2">Main Wallet</h3>
                        <p className="text-4xl font-bold text-white">${userInfo?.currentEarnings?.toFixed(2) || 0}</p>
                    </div>
                </div>

                {/* Withdraw Section */}
                <div className="bg-[#0f0f0f] border !border-gray-500 rounded-lg mb-6">
                    <div className="border-b !border-gray-500 px-6 py-3">
                        <h2 className="text-xl font-semibold text-white">Withdraw Fund</h2>
                    </div>

                    <div className="p-6 space-y-5">
                        {/* User ID */}
                        <ReusableForm
                            label="Wallet Address"
                            type="text"
                            name="walletAddress"
                            value={userInfo?.walletAddress}
                            icon={User}
                            required={true}
                            disabled={true}
                        />

                        {/* Package Amount */}
                        <ReusableForm
                            label="Amount"
                            name="amount"
                            type="number"
                            placeholder="Enter Amount"
                            icon={Lock}
                            onChange={handleInputChange}
                            required={true}
                        />

                        {/* Transaction Password */}
                        <ReusableForm
                            label="Transaction Password"
                            name="tnxPass"
                            type="password"
                            value={formData.tnxPass}
                            placeholder="Enter transaction password"
                            icon={Lock}
                            onChange={handleInputChange}
                            required={true}
                        />

                        {/* OTP */}
                        <div className="flex items-center gap-2">

                            <ReusableForm
                                label="One Time Password"
                                name="otp"
                                type="number"
                                inputMode="numeric"
                                pattern="[0-9]*"
                                maxLength={6}
                                value={formData.otp}
                                onChange={handleInputChange}
                                placeholder="Enter OTP"
                                icon={Lock}
                                required
                                rightButton="Get OTP"
                                onRightButtonClick={handleSendOtp}
                                rightButtonCooldown={30}
                                disabled={!formData.amount || !formData.tnxPass}
                            />
                        </div>

                        {/* Submit Button */}
                        <div className="text-right">
                            <button
                                onClick={handleWithdrawFund}
                                type="button"
                                disabled={loading || !userInfo?.walletAddress || userInfo?.currentEarnings < formData.amount}
                                className="bg-[var(--cyan-active)] hover:bg-opacity-80 text-xl text-white font-medium px-6 py-3 rounded-md transition disabled:cursor-not-allowed"
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </div>

            </div>
            <PrincipleWithdrawal />

        </>
    );
};

export default WithDrawFund;

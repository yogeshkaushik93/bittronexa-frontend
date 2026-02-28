
"use client";
import React, { useEffect, useState } from "react";
import { Wallet } from "lucide-react";
import ReusableForm from "../../components/ui/ReusableForm";
import { setWalletAddress } from "../../api/user-api";
import Swal from "sweetalert2";
import PageLoader from "../../components/ui/PageLoader";
import { useDispatch, useSelector } from "react-redux";
import { getUserInfo } from "../../api/auth-api";
import { setUserInfo } from "../../redux/slice/UserInfoSlice";

const Withdrawal = () => {
  const [formData, setFormData] = useState({
    wallet: "USDT.BEP20",
    address: "",
    // transactionPassword: "",
    // otp: "",
  });
  const [loading, setLoading] = useState(false);
  const userInfo = useSelector((state) => state.userInfo?.userInfo?.user);
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  const isValidBEP20Address = (address) => {
    return /^0x[a-fA-F0-9]{40}$/.test(address);
  };

  const handleSubmit = async (e) => {
    if (!isValidBEP20Address(formData?.address)) {
      return Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Please enter a valid BEP20 address',
      })
    }

    e.preventDefault();
    try {
      setLoading(true);
      const payload = {
        walletAddress: formData?.address,
        walletType: formData?.wallet
      }
      const response = await setWalletAddress(payload);
      if (response?.success) {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: response?.message || 'Wallet address set successfully',
        });
        const user = await getUserInfo();
        dispatch(setUserInfo(user));
      }
    } catch (error) {
      console.log("error in setting wallet address", error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error?.response?.data?.message || 'Failed to set wallet address',
      })
    } finally {
      setLoading(false);
    }
  };

  const walletOptions = [
    { value: "USDT.BEP20", label: "USDT.BEP20" },
    // { value: "USDT.TRC20", label: "USDT.TRC20" },
    // { value: "BTC", label: "BTC" },
  ];

  useEffect(() => {
    if (userInfo?.walletAddress) {
      setFormData({
        address: userInfo?.walletAddress
      })
    }
  }, [userInfo]);

  if (loading) return <PageLoader />

  return (
    <div className="min-h-screen  text-white mt-5">
      <div className="mb-6">
        <h1 className="text-4xl font-semibold mb-3">Wallet Address</h1>
        <div className="flex items-center gap-2 text-gray-500 text-xl">
          <span className="hover:text-gray-300 cursor-pointer transition-colors">
            Home
          </span>
          <span>/</span>
          <span className="hover:text-gray-300 cursor-pointer transition-colors">
            Setting
          </span>
          <span>/</span>
          <span className="text-gray-300">Wallet Address</span>
        </div>
      </div>

      <div className="bg-[#0F0F0F] rounded-xl p-8 border !border-gray-800">
        <h2 className="text-2xl font-semibold mb-6">
          Add New USDT.BEP20 Address to Receive Profits
        </h2>

        <div className="space-y-6">
          <ReusableForm
            label="Select Wallet"
            name="wallet"
            type="select"
            value={formData.wallet}
            onChange={handleInputChange}
            options={walletOptions}
            required
            icon={Wallet}
          />

          <ReusableForm
            label="Address"
            name="address"
            type="text"
            value={formData.address}
            onChange={handleInputChange}
            placeholder="Enter Wallet Address"
            required
            icon={Wallet}
          />

          {/* <ReusableForm
            label="Transaction Password"
            name="transactionPassword"
            type="password"
            value={formData.transactionPassword}
            onChange={handleTransactionPasswordChange}
            placeholder="******"
            required
            icon={Lock}
          /> */}

          {/* <div className="flex items-center gap-2">
            <div className="flex-grow">
              <ReusableForm
                label="One Time Password"
                name="otp"
                type="password"
                value={formData.otp}
                onChange={handleOtpChange}
                placeholder="Enter One Time Password"
                required
                icon={Lock}
              />
            </div>

            <button
              type="button"
              onClick={handleSendOtp}
              className="bg-transparent border !border-[var(--cyan-active)] text-[var(--cyan-active)] px-4 py-4  relative top-4 rounded-lg text-xl font-medium hover:bg-blue-500 hover:text-white transition-colors"
            >
              Send OTP
            </button>
          </div> */}


          <button
            type="button"
            onClick={handleSubmit}
            className="bg-[var(--cyan-active)] hover:scale-105 transition-all duration-300 text-white px-6 py-3 rounded-lg text-lg font-semibold "
          >
            Submit
          </button>
        </div>
      </div>

      {
        userInfo?.walletAddress ? (
          <div className="bg-[#0F0F0F] rounded-xl p-8 border !border-gray-800 mt-5 text-xl space-y-2">
            <h2 className="text-[var(--cyan-text)]">Already Set Wallet Address</h2>
            <p className="text-2xl">{userInfo?.walletAddress}</p>
          </div>
        ) : (
          <div className="bg-[#0F0F0F] rounded-xl p-8 border !border-gray-800 mt-5 text-xl space-y-2">
            <p className="text-2xl">No Wallet Address Set</p>
          </div>
        )
      }
    </div>
  );
};

export default Withdrawal;
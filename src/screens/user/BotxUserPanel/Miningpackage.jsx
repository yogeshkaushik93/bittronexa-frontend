"use client";
import React, { useState } from "react";
import { Lock, MessageSquare, User, DollarSign } from "lucide-react";
import ReusableForm from "../../../components/ui/ReusableForm";
import ReusableDataTable from "../../../components/ui/ReusableTable";

const MiningPackage = () => {
  const [formData, setFormData] = useState({
    userId: "X603554",
    amount: "",
    transactionPassword: "",
    otp: "",
    remarks: "",
  });
  const [data, setData] = useState([]);

  const columns = [
    { label: "#", key: "index", render: (val, row, index) => index + 1 },
    { label: "ID", key: "id" },
    { label: "Name", key: "name" },
    { label: "Amount", key: "amount" },
    { label: "Wallet Used", key: "walletUsed" },
    { label: "Mode", key: "mode" },
    { label: "Date", key: "date" },
    { label: "Remarks", key: "remarks" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Data:", formData);
  };

  return (
    <div className="min-h-screen bg-[#0b0b0b] text-white px-6 py-8">
      {/* Page Header */}
      <p className="text-lg text-gray-200 mb-6">Home / Mining Package</p>

      {/* Notification */}
      <div className="bg-[#141414] border !border-gray-500 rounded-lg p-4 mb-6">
        <h2 className="text-yellow-400 text-3xl font-semibold">Notification</h2>
        <p className="text-gray-300 text-xl mt-1">
          Here, you can invest any amount to get more mining benefits.
        </p>
      </div>

      {/* Wallet Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div className="bg-[#0f0f0f] border !border-gray-500 rounded-lg p-5">
          <h3 className="text-gray-300 text-lg font-medium">Node Wallet</h3>
          <p className="text-4xl font-semibold mt-2">$0</p>
        </div>
        <div className="bg-[#0f0f0f] border !border-gray-500 rounded-lg p-5">
          <h3 className="text-gray-300 text-lg font-medium">Capital Wallet</h3>
          <p className="text-4xl font-semibold mt-2">$0</p>
        </div>
      </div>

      {/* Form + Report Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Side - Form */}
        <div className="bg-[#0f0f0f] border !border-gray-500 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Fill Mining Details</h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <ReusableForm
              label="User ID"
              name="userId"
              value={formData.userId}
              onChange={handleChange}
              disabled
              icon={User}
            />

            <ReusableForm
              label="Package Amount"
              name="amount"
              type="number"
              placeholder="Enter amount"
              value={formData.amount}
              onChange={handleChange}
              icon={DollarSign}
            />
            <p className="text-red-500 text-sm -mt-3">
              The minimum amount limit is $100 and must be in multiples of $10.
            </p>

            <ReusableForm
              label="Transaction Password"
              name="transactionPassword"
              type="password"
              placeholder="Enter your transaction password"
              value={formData.transactionPassword}
              onChange={handleChange}
              icon={Lock}
            />

            <div className="flex items-center gap-2">
              <div className="flex-grow">
                <ReusableForm
                  label="One Time Password"
                  name="otp"
                  type="password"
                  value={formData.otp}
                  onChange={handleChange}
                  placeholder="Enter One Time Password"
                  required
                  icon={Lock}
                />
              </div>

              <button
                type="button"
                // onClick={handleSendOTP}
                className="bg-transparent border !border-[var(--cyan-active)] text-[var(--cyan-active)] px-4 py-4  relative top-4 rounded-lg text-xl font-medium hover:bg-blue-500 hover:text-white transition-colors"
              >
                Send OTP
              </button>
            </div>

            <ReusableForm
              label="Remarks"
              name="remarks"
              type="textarea"
              placeholder="Remarks..."
              value={formData.remarks}
              onChange={handleChange}
              icon={MessageSquare}
            />


            <button
              type="submit"
              className="bg-[var(--cyan-active)] text-xl hover:scale-105 text-white font-semibold py-3 px-6 rounded-lg transition w-full"
            >
              Submit
            </button>
          </form>
        </div>

        {/* Right Side - Report */}
        <div className="bg-[#0f0f0f] border !border-gray-500 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Report</h2>
          <ReusableDataTable data={data} columns={columns} />
        </div>
      </div>
    </div>
  );
};

export default MiningPackage;

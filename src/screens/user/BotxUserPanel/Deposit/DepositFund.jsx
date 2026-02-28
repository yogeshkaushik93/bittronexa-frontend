import React, { useState } from "react";
import { Lock, User } from "lucide-react";
import ReusableForm from "../../../../components/ui/ReusableForm";

const DepositFund = () => {
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

  return (
    <div className="p-6 text-white">
      {/* Page Header */}
      <p className="text-lg text-gray-200 mb-6">Home / Deposit</p>

      {/* Gentle Reminder Section */}
      <div className="bg-[#0e141b] border !border-gray-500 rounded-lg p-4 mb-6">
        <p className="text-xl text-gray-300">
          <span className="text-[var(--cyan-active)] underline font-semibold">
            Important Reminder:
          </span>{" "}
          Here, you can add fund by paying crypto currency and it will automatically credit into your package wallet after payment confimation.
        </p>
      </div>

      {/* Withdraw Section */}
      <div className="bg-[#0f0f0f] border !border-gray-500 rounded-lg mb-6">
        <div className="border-b !border-gray-500 px-6 py-3">
          <h2 className="text-xl font-semibold text-white">Fill Details</h2>
        </div>

        <div className="p-6 space-y-5">
          <ReusableForm
            type="select"
            label="Select Package"
            name="package"
            onChange={() => {}}
            options={["USDT BEP20"]}
            icon={User}
          />

          {/* Package Amount */}
          <ReusableForm
            label="Amount (USD)"
            name="amount"
            type="number"
            placeholder="Enter Amount"
            icon={Lock}
            onChange={() => { }}
          />

          {/* Transaction Password */}
          <ReusableForm
            label="Transaction Password"
            name="transactionPassword"
            type="password"
            placeholder="Enter Transaction Password"
            icon={Lock}
            onChange={() => { }}
          />

          {/* Submit Button */}
          <div className="text-right">
            <button className="bg-[var(--cyan-active)] hover:bg-opacity-80 text-xl text-white font-medium px-6 py-3 rounded-md transition">
              Submit
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default DepositFund;

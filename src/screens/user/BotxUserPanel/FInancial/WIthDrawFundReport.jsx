import React, { useEffect, useState } from "react";
import ReusableDataTable from "../../../../components/ui/ReusableTable";
import { getWithdrawalHistory } from "../../../../api/payment-api";
import PageLoader from "../../../../components/ui/PageLoader";
import { dateFormat, formatValueWithCurrency } from "../../../../utils/additionalFunc";

const WIthDrawFundReport = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchWithdrawalHistory = async () => {
    try {
      setLoading(true);
      const response = await getWithdrawalHistory();
      if (response?.success) {
        setData(response?.data);
      }
    } catch (error) {
      console.log("error in fetching withdrawal history", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchWithdrawalHistory();
  }, []);

  if (loading) return <PageLoader />

  const columns = [
    { label: "#", key: "index", render: (val, row, index) => index + 1 },
    { label: "Username", key: "userId", render: (val) => val?.username || "N/A" },
    { label: "Wallet Address", key: "userWalletAddress" },
    { label: "Withdrawal Amount", key: "amount", render: (val) => val ? formatValueWithCurrency(val) : "N/A" },
    { label: "Fee Amount", key: "feeAmount", render: (val) => val ? formatValueWithCurrency(val) : "N/A" },
    { label: "Fee Percent(%)", key: "feePercent", render: (val) => val ? `${val}%` : "N/A" },
    { label: "Net Amount", key: "netAmountSent", render: (val) => val ? formatValueWithCurrency(val) : "N/A" },
    {
      label: "Status", key: "status", render: (val) => {
        let bgColor = "";
        if (val === "processing") bgColor = "bg-yellow-500 text-black";
        if (val === "rejected") bgColor = "bg-red-600 text-white";
        if (val === "approved") bgColor = "bg-green-600 text-white";
        return (
          <button className={`px-3 py-1 rounded-full font-semibold ${bgColor} capitalize`}> {val}</button>
        )
      }
    },
    {
      label: "Reject Reason", key: "reason", render: (val) => {
        let bgColor = "";
        if (val) bgColor = "text-red-500";
        return (
          <button className={`px-3 py-1 rounded-full font-semibold ${bgColor} capitalize`}>{val ? val : "N/A"}</button>
        )
      }
    },
    
    { label: "Date", key: "createdAt", render: (val) => val ? dateFormat(val) : "N/A" },

  ];

  return (
    <div className="mt-5 rounded-2xl shadow-md">
      <div>
        <ReusableDataTable
          columns={columns}
          data={data}
          title="Direct Team List"
        />
      </div>
    </div>
  );
};

export default WIthDrawFundReport;

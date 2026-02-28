import React, { useEffect, useState } from "react";
import ReusableDataTable from "../../../components/ui/ReusableTable";
import ReusableForm from "../../../components/ui/ReusableForm";
import { Button5 } from "../../../components/ui/Buttons";
import { Calendar } from "lucide-react";
import { getInvestmentHistory } from "../../../api/user-api";
import { dateFormat, formatValueWithCurrency, maskMemberIdFourLatter } from "../../../utils/additionalFunc";

const InvestmentHistory = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchInvestmentHistory = async () => {
    try {
      setLoading(true);
      const response = await getInvestmentHistory();
      if (response?.success) {
        setData(response?.data);
      }
    } catch (error) {
      console.log("error in fetching investment history", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInvestmentHistory();
  }, []);

  const columns = [
    { label: "#", key: "index", render: (val, row, index) => index + 1 },
    { label: "Username", key: "userId", render: (val) => val?.username || "N/A" },
    { label: "Name", key: "userId", render: (val) => val?.name || "N/A" },
    { label: "Investment Amount", key: "investmentAmount", render: (val) => val ? formatValueWithCurrency(val) : "N/A" },
    { label: "Tx Hash", key: "txResponse", render: (val) => val ? maskMemberIdFourLatter(val) : "N/A" },
    // { label: "Type", key: "type", render: (val) => val === "packageWallet" ? "Package Wallet" : "Main Wallet" },
    { label: "Status", key: "status", render: (val) => <span className={`capitalize px-3 py-1 rounded-full font-semibold ${val === "active" ? "text-green-500 bg-green-400/20" : "text-red-500 bg-red-400/20"}`}>{val === "active" ? "Active" : "Inactive"}</span> },
    { label: "Date", key: "createdAt", render: (val) => val ? dateFormat(val) : "N/A" },
  ];

  return (
    <div className="mt-5 rounded-2xl shadow-md">
      <ReusableDataTable
        columns={columns}
        data={data}
        title="Investment History"
      />
    </div>
  );
};

export default InvestmentHistory;

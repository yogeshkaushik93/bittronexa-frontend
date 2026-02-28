import React, { useEffect, useState } from "react";
import { getPrincipalWithdrawalHistory } from "../../api/user-api";
import ReusableDataTable from "../ui/ReusableTable";
import { formatValueWithCurrency } from "../../utils/additionalFunc";
import PageLoader from "../ui/PageLoader";

const TopupMainWallet = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await getPrincipalWithdrawalHistory();
        setData(res?.data || []);
      } catch (error) {
        console.error("❌ Error fetching history:", error);
        setData([]);
      } finally {
        setLoading(false)
      }
    };

    fetchData();
  }, []);

  const columns = [
    {
      label: "#",
      key: "index",
      render: (_, __, index) => index + 1,
    },
    { label: "Wallet Address", key: "userWalletAddress" },
    { label: "Network", key: "networkType" },
    { label: "Requested Amount", key: "requestedAmount", render: (val) => val ? formatValueWithCurrency(val) : 0 },
    { label: "Total Profit", key: "totalRoi", render: (val) => val ? formatValueWithCurrency(val) : 0 },
    { label: "Profit Cut", key: "roiCut", render: (val) => val ? formatValueWithCurrency(val) : 0 },
    { label: "Investment Cut", key: "investmentCut", render: (val) => val ? formatValueWithCurrency(val) : 0 },
    { label: "System Cut", key: "systemCut", render: (val) => val ? formatValueWithCurrency(val) : 0 },
    { label: "Net Amount", key: "netAmount", render: (val) => val ? formatValueWithCurrency(val) : 0 },
    { label: "Remaining Principal", key: "remainingPrincipal", render: (val) => val ? formatValueWithCurrency(val) : 0 },
    {
      label: "Status",
      key: "status",
      render: (val) => {
        const status = (val || "").toLowerCase();

        const statusStyles = {
          approved: "bg-green-600 text-white",
          pending: "bg-yellow-500 text-black",
          rejected: "bg-red-600 text-white",
        };

        return (
          <span
            className={`px-3 py-1 text-xl font-semibold rounded-full capitalize ${statusStyles[status] || "bg-gray-400 text-white"
              }`}
          >
            {status}
          </span>
        );
      },
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
    // { label: "Transaction Hash", key: "transactionHash" },
    // { label: "Processed By", key: "processedBy"  },
    // { label: "Processed At", key: "processedAt" },
    { label: "Requested At", key: "createdAt", render: (val) => new Date(val).toLocaleString() },
  ];

  if(loading) return <PageLoader />

  return (
    <div className="mt-5">
      <ReusableDataTable
        title="Principal Withdrawal History"
        columns={columns}
        data={data}
      />
    </div>
  );
};

export default TopupMainWallet;

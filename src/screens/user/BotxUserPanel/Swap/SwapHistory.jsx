import React, { useEffect, useState } from "react";
import ReusableDataTable from "../../../../components/ui/ReusableTable";
import { getP2PTransferHistory, getSwapHistory } from "../../../../api/user-api";
import { dateFormat, formatValueWithCurrency } from "../../../../utils/additionalFunc";
import PageLoader from "../../../../components/ui/PageLoader";


const SwapHistory = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchSwapHistory = async () => {
    try {
      setLoading(true);
      const response = await getSwapHistory();
      if (response?.success) {
        setData(response?.data);
      }
    } catch (error) {
      console.log("Error fetching swap history:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchSwapHistory();
  }, []);

  const columns = [
    { label: "#", key: "index", render: (val, row, index) => index + 1 },
    { label: "Sender Username", key: "senderUsername", render: (val) => val || "N/A" },
    { label: "Receiver Username", key: "receiverUsername", render: (val) => val || "N/A" },
    { label: "Transfer Amount", key: "amount", render: (val) => val ? formatValueWithCurrency(val) : "N/A" },
    { label: "Wallet Type", key: "type", render: (val) => val ? "mainWallet" ? "Main Wallet" : "Package Wallet" : "N/A" },
    { label: "Date", key: "createdAt", render: (val) => val ? dateFormat(val) : "N/A" },
  ];

  if (loading) return <PageLoader />

  return (
    <div className="mt-5 rounded-2xl shadow-md">
      <div>
        <ReusableDataTable
          columns={columns}
          data={data}
          title="Swap Report"
        />
      </div>
    </div>
  );
};

export default SwapHistory;

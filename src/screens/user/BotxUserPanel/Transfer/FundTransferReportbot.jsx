import React, { useEffect, useState } from "react";
import ReusableDataTable from "../../../../components/ui/ReusableTable";
import { getP2PTransferHistory } from "../../../../api/user-api";
import { dateFormat, formatValueWithCurrency } from "../../../../utils/additionalFunc";
import PageLoader from "../../../../components/ui/PageLoader";
import { useSelector } from "react-redux";


const FundTransferReportbot = () => {
  const userInfo = useSelector((state) => state.userInfo?.userInfo?.user);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [position, setPosition] = useState("all");
  const [filteredData, setFilteredData] = useState([]);


  const fetchP2PTransferHistory = async () => {
    try {
      setLoading(true);
      const response = await getP2PTransferHistory();
      if (response?.success) {
        setData(response?.data);
        setFilteredData(response.data);
      }
    } catch (error) {
      console.log("Error fetching P2P transfer history:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchP2PTransferHistory();
  }, []);

  const handleFilter = () => {
    if (!userInfo?.username) return;

    let updatedData = [...data];

    if (position === "debit") {
      updatedData = data.filter(
        (item) => item.senderUsername === userInfo.username
      );
    }

    if (position === "credit") {
      updatedData = data.filter(
        (item) => item.receiverUsername === userInfo.username
      );
    }

    setFilteredData(updatedData);
  };


  const columns = [
    { label: "#", key: "index", render: (val, row, index) => index + 1 },
    { label: "Sender Username", key: "senderUsername", render: (val) => val || "N/A" },
    { label: "Receiver Username", key: "receiverUsername", render: (val) => val || "N/A" },
    { label: "Transfer Amount", key: "amount", render: (val) => val ? formatValueWithCurrency(val) : "N/A" },
    {
      label: "Wallet Type",
      key: "type",
      render: (val) => {
        if (!val) return "N/A";
        if (val === "packageWallet") return "Package Wallet";
        if (val === "currentEarnings") return "Main Wallet";
        return val;
      },
    }
    ,
    {
      label: "Status",
      key: "status",
      render: (_, row) => {
        const currentUsername = userInfo?.username;

        if (!currentUsername) return "N/A";

        const isDebit = row?.senderUsername === currentUsername;
        const isCredit = row?.receiverUsername === currentUsername;

        if (isDebit) {
          return (
            <span className="px-3 py-1 rounded-full bg-red-600 text-white font-semibold">
              Debit
            </span>
          );
        }

        if (isCredit) {
          return (
            <span className="px-3 py-1 rounded-full bg-green-600 text-white font-semibold">
              Credit
            </span>
          );
        }

        return (
          <span className="px-3 py-1 rounded-full bg-gray-500 text-white">
            —
          </span>
        );
      },
    }
    ,
    { label: "Date", key: "createdAt", render: (val) => val ? dateFormat(val) : "N/A" },
  ];

  if (loading) return <PageLoader />

  return (
    <div className="mt-5 rounded-2xl shadow-md">
      <div className="flex items-center justify-end gap-4 mb-5">
        <select
          value={position}
          onChange={(e) => setPosition(e.target.value)}
          className="bg-transparent border !border-gray-500 rounded-lg px-4 py-3 text-xl text-white"
        >
          <option value="all" className="bg-gray-900">All</option>
          <option value="debit" className="bg-gray-900">Sender History</option>
          <option value="credit" className="bg-gray-900">Receiver History</option>
        </select>

        <button
          onClick={handleFilter}
          disabled={loading}
          className="bg-cyan-600 px-8 py-3 rounded-lg text-xl font-semibold disabled:opacity-50"
        >
          {loading ? "Loading..." : "Filter"}
        </button>
      </div>
      <div>
        <ReusableDataTable
          columns={columns}
          data={filteredData}
          title="Fund Transfer Report"
        />
      </div>
    </div>
  );
};

export default FundTransferReportbot;

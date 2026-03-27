import React, { useEffect, useState, useMemo } from "react";
import { getActiveServiceOther } from "../../api/user-api";
import ReusableDataTable from "../ui/ReusableTable";

const OtherServicePackageActivationHistory = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchPackageHistory = async () => {
    try {
      setLoading(true);
      const res = await getActiveServiceOther();

      if (res?.success) {
        const normalized = (res?.data || []).map((item) => ({
          ...item,
          transactionType: "debit", // 🔥 service investment is always debit
        }));

        setData(normalized);
      }
    } catch (error) {
      console.error("❌ Failed to fetch service package history", error);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPackageHistory();
  }, []);

  const columns = useMemo(
    () => [
      {
        label: "Sr",
        key: "index",
        render: (_, __, index) => index + 1,
      },
      {
        label: "From User",
        key: "fromUser",
        render: (val) => val?.username || "—",
      },
      {
        label: "To User",
        key: "toUser",
        render: (val) => val?.username || "—",
      },
      {
        label: "Amount (USDT)",
        key: "amount",
        sortable: true,
        render: (val) => `$ ${Number(val || 0).toFixed(2)}`,
      },
      {
        label: "Wallet",
        key: "walletType",
        render: (val) =>
          val === "packageWallet" ? "Package Wallet" : "Main Wallet",
      },
    //   {
    //     label: "Type",
    //     key: "transactionType",
    //     render: () => (
    //       <span className="px-3 py-1 text-sm font-semibold rounded-full bg-red-600 text-white">
    //         Debit
    //       </span>
    //     ),
    //   },
      {
        label: "Status",
        key: "status",
        render: (val) => (
          <span className="px-2 py-1 text-xl font-medium rounded bg-green-100 text-green-700">
            {val}
          </span>
        ),
      },
      {
        label: "Date",
        key: "createdAt",
        sortable: true,
        render: (val) =>
          val ? new Date(val).toLocaleString() : "—",
      },
    ],
    []
  );

  return (
    <div className="p-6">
      <ReusableDataTable
        data={data}
        columns={columns}
        loading={loading}
        emptyMessage="No service investment history found"
      />
    </div>
  );
};

export default OtherServicePackageActivationHistory;

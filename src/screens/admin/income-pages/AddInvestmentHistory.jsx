

import React, { useEffect, useState, useMemo } from "react";
import { getInvestedHistory } from "../../../api/user-api";
import ReusableDataTable from "../../../components/ui/ReusableTable";
import { useSelector } from "react-redux";

const AddInvestmentHistory = () => {
  const [data, setData] = useState([]);
  const userInfo = useSelector((state) => state.userInfo?.userInfo?.user);

  const fetchData = async () => {
    try {
      const res = await getInvestedHistory();

      const normalized = (res?.data || []).map((row) => ({
        ...row,
        transactionType:
          row?.fromUser?.username === userInfo?.username
            ? "debit"
            : "credit",
      }));

      setData(normalized);
    } catch (err) {
      console.error("❌ Failed to fetch investment history", err);
      setData([]);
    }
  };

  useEffect(() => {
    if (!userInfo?.username) return;
    fetchData();
  }, [userInfo?.username]);

  const columns = useMemo(
    () => [
      {
        label: "#",
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
        label: "Amount",
        key: "amount",
        render: (val) => `$ ${val}`,
      },
      {
        label: "Wallet",
        key: "walletType",
        render: (val) =>
          val === "packageWallet" ? "Package Wallet" : "Main Wallet",
      },
      {
        label: "Type",
        key: "transactionType",
        render: (val) => (
          <span
            className={`px-3 py-1 text-lg font-semibold rounded-full ${val === "debit"
                ? "bg-red-600 text-white"
                : "bg-green-600 text-white"
              }`}
          >
            {val === "debit" ? "Debit" : "Credit"}
          </span>
        ),
      },


      {
        label: "Tx Hash",
        key: "txHash",
        render: (val) =>
          val ? (
            <span>
              {val ? val?.slice(0, 10) + "..." + val?.slice(-10) : "—"}
            </span>
          ) : (
            "—"
          ),
      },
      {
        label: "Created At",
        key: "createdAt",
        render: (val) => val ? new Date(val).toLocaleString() : "—",
      },
    ],
    [userInfo?.username]
  );

  return (
    <div className="p-4">
      {/* <h1 className="text-xl font-semibold mb-4">Investment History</h1> */}

      <ReusableDataTable
        columns={columns}
        data={data}
        emptyMessage="No investment history found"
      />
    </div>
  );
};

export default AddInvestmentHistory;

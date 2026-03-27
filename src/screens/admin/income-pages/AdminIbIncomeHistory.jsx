
import React, { useEffect, useState } from "react";

import { getIbIncomeHistory } from "../../../api/admin-api";
import ReusableDataTable from "../../../components/ui/ReusableTable";

const AdminIbIncomeHistory = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      setLoading(true);
      const res = await getIbIncomeHistory();
      setData(res?.data || []);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
   
    {
      label: "Username",
      key: "userId",
      render: (val) => val?.username || "—",
    },
    {
      label: "Name",
      key: "userId",
      render: (val) => val?.name || "—",
    },
    {
      label: "Email",
      key: "userId",
      render: (val) => val?.email || "—",
    },
    {
      label: "Rank",
      key: "rank",
    },
    {
      label: "Weak Leg Business",
      key: "weakLegBusiness",
    },
    {
      label: "%",
      key: "percent",
    },
    {
      label: "Bonus Amount",
      key: "bonusAmount",
      render: (val) => `$${val?.toFixed(2)}`,
    },
    {
      label: "Status",
      key: "status",
      render: (val) => (
        <span className={`px-3 py-1 rounded-full text-sm font-semibold 
        ${val === "PENDING" ? "bg-yellow-500 text-black" : "bg-green-500 text-white"}`}>
          {val}
        </span>
      ),
    },
    {
      label: "Date",
      key: "createdAt",
      render: (val) => val ? new Date(val).toLocaleString() : "—",
    },
  ];


  return (
    <div>
      {loading ? (
        <div className="text-center text-white py-10">Loading...</div>
      ) : (
        <ReusableDataTable data={data} columns={columns} />
      )}
    </div>
  );
};

export default AdminIbIncomeHistory;

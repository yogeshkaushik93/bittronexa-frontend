"use client";
import React, { useEffect, useState } from "react";
import { getIbIncome } from "../../api/user-api";
import ReusableDataTable from "../ui/ReusableTable";


const IBIncome = () => {
  const [income, setIncome] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIBIncome = async () => {
      try {
        const res = await getIbIncome();
        setIncome(Array.isArray(res?.data) ? res.data : []);
      } catch (err) {
        console.error("Failed to fetch IB income:", err);
        setIncome([]);
      } finally {
        setLoading(false);
      }
    };

    fetchIBIncome();
  }, []);

  if (loading) {
    return <p className="text-white p-4 text-lg">Loading IB Income...</p>;
  }

  const columns = [
    {
      key: "Sr No",
      label: "ID",
      render: (_, row, index) => index + 1,
    },
    {
      key: "userId",
      label: "Username",
      sortable: true,
      render: (_, row) => row?.userId?.username || "N/A",
    },
    {
      key: "userId",
      label: "Name",
      sortable: true,
      render: (_, row) => row?.userId?.name || "N/A",
    },
    {
      key: "rank",
      label: "Rank",
      sortable: true,
    },
    {
      key: "weakLegBusiness",
      label: "Business",
      sortable: true,
      render: (value) => `${value?.toFixed(2) || "0.00"} USDT`,
    },
    {
      key: "bonusAmount",
      label: "Amount (USDT)",
      sortable: true,
      render: (value) => `${value?.toFixed(2) || "0.00"} USDT`,
    },
    {
      key: "status",
      label: "Status",
      sortable: true,
      render: (value) => {
        const color =
          value === "paid"
            ? "bg-green-700"
            : value === "pending"
              ? "bg-yellow-600"
              : "bg-red-700";

        return (
          <span className={`px-3 py-1 rounded-lg text-sm text-white ${color}`}>
            {value.toUpperCase()}
          </span>
        );
      },
    },
    {
      key: "createdAt",
      label: "Date",
      sortable: true,
      render: (value) => new Date(value).toLocaleDateString(),
    },
  ];

  return (
    <div className="mt-5">
      <ReusableDataTable
        data={income}
        columns={columns}
        enableDateFilter
        dateKey="createdAt"
      />
    </div>
  );
};

export default IBIncome;

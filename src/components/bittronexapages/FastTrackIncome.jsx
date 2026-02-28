"use client";
import React, { useEffect, useState } from "react";
import { getFastTrackIncome } from "../../api/user-api";
import ReusableDataTable from "../ui/ReusableTable";


export default function FastTrackIncome() {
  const [income, setIncome] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFastTrackIncome = async () => {
      try {
        const res = await getFastTrackIncome();
        setIncome(Array.isArray(res?.data) ? res.data : []);
      } catch (err) {
        console.error("Failed to fetch fast-track income:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFastTrackIncome();
  }, []);

  if (loading) {
    return <p className="text-white p-4">Loading Fast Track Income...</p>;
  }

  // -------------------------------
  // 🔥 TABLE COLUMNS CONFIG
  // -------------------------------
  const columns = [
    {
      key: "userId",
      label: "User",
      sortable: true,
      render: (val, row) => row?.userId?.name || "N/A",
    },
    {
      key: "rank",
      label: "Rank",
      sortable: true,
    },
    {
      key: "matching",
      label: "Matching",
      sortable: true,
      render: (val) => val ?? 0,
    },
    {
      key: "amount",
      label: "Amount",
      sortable: true,
      render: (val) => `$${val}`,
    },
    {
      key: "status",
      label: "Status",
      sortable: true,
      render: (val) => (
        <span
          className={`px-3 py-1 rounded-lg text-sm ${
            val === "paid"
              ? "bg-green-700"
              : val === "pending"
              ? "bg-yellow-700"
              : "bg-red-700"
          }`}
        >
          {val}
        </span>
      ),
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
}

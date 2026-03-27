import React, { useEffect, useState } from "react";
import ReusableDataTable from "../../../components/ui/ReusableTable";
import { getMatchingIncome } from "../../../api/admin-api";
import PageLoader from "../../../components/ui/PageLoader";

const MatchingIncomeReport = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getMatchingIncome();
      setData(response?.data || []);
    } catch (err) {
      console.error("❌ Error fetching matching income:", err);
      setError("Failed to fetch matching income report.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const columns = [
    {
      key: "username",
      label: "Username",
      sortable: true,
      render: (value, row) => row.userId?.username || "-",
    },
    {
      key: "name",
      label: "Name",
      sortable: true,
      render: (value, row) => row.userId?.name || "-",
    },
    
    {
      key: "pairs",
      label: "Pairs",
      sortable: true,
      render: (value, row) => row.pairs || 0,
    },
    {
      key: "pairUnit",
      label: "Pair Unit",
      sortable: true,
      render: (value, row) => row.pairUnit || 0,
    },
    {
      key: "amountPerPair",
      label: "Amount Per Pair",
      sortable: true,
      render: (value, row) => row.amountPerPair || 0,
    },
    {
      key: "totalAmount",
      label: "Total Amount",
      sortable: true,
      render: (value, row) => row.totalAmount || 0,
    },
    {
      key: "leftCarryForward",
      label: "Left Carry Forward",
      sortable: true,
      render: (value, row) => row.leftCarryForward || 0,
    },
    {
      key: "rightCarryForward",
      label: "Right Carry Forward",
      sortable: true,
      render: (value, row) => row.rightCarryForward || 0,
    },
    {
      key: "createdAt",
      label: "Created At",
      sortable: true,
      render: (value, row) => new Date(row.createdAt).toLocaleString() || "-",
    },
  ];

  if (loading) return <PageLoader />

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-white">Matching Income Report</h1>
      <ReusableDataTable data={data} columns={columns} />
    </div>
  );
};

export default MatchingIncomeReport;
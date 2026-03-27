
import React, { useEffect, useState } from "react";

import { getFastTrackIncomeHistory } from "../../../api/admin-api";
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
      const res = await getFastTrackIncomeHistory();
      setData(res?.data || []);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      label: "Date",
      key: "createdAt",
      render: (val) => new Date(val).toLocaleString(),
    },
    {
      label: "User ID",
      key: "userId",
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
    },
    {
      label: "Description",
      key: "description",
      sortable: false,
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

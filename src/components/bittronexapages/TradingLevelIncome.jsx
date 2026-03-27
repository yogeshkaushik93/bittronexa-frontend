import { useEffect, useState } from "react";
import { getServiceLevelIncome } from "../../api/user-api";
import ReusableDataTable from "../ui/ReusableTable";


const TradingLevelIncome = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchIncome = async () => {
      try {
        const res = await getServiceLevelIncome();
        setData(res?.data || []);
      } catch (err) {
        console.error("Service level income error:", err);
      }
    };

    fetchIncome();
  }, []);

  const columns = [
    {
      key: "username",
      label: "User ID",
      render: (_, row) => row?.userId?.username || "-"
    },
    {
      key: "name",
      label: "User Name",
      render: (_, row) => row?.userId?.name || "-"
    },
    // {
    //   key: "fromUsername",
    //   label: "From User ID",
    //   render: (_, row) => row?.fromUserId?.username || "-"
    // },
    {
      key: "fromName",
      label: "From User Name",
      render: (_, row) => row?.fromUserId?.name || "-"
    },
    {
      key: "amount",
      label: "Amount"
    },
    {
      key: "level",
      label: "Level"
    },
    {
      key: "dayCount",
      label: "Day Count"
    },
    {
      key: "percent",
      label: "Percent (%)"
    },
    {
      key: "createdAt",
      label: "Date",
      render: (val) =>
        val ? new Date(val).toLocaleString() : "-"
    }
  ];

  return (
    <div className="space-y-6 mt-5">
      <ReusableDataTable
        data={data}
        columns={columns}
        enableDateFilter
        dateKey="createdAt"
      />
    </div>
  );
};

export default TradingLevelIncome;

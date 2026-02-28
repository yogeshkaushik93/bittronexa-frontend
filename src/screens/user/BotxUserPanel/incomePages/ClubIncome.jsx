import React, { useEffect, useState } from "react";
import ReusableDataTable from "../../../../components/ui/ReusableTable";
import { getClubIncomeHistory } from "../../../../api/user-api";
import { dateFormat, formatValueWithCurrency } from "../../../../utils/additionalFunc";

const ClubIncome = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchClubIncomeHistory = async () => {
    try {
      setLoading(true);
      const response = await getClubIncomeHistory();
      if (response?.success) {
        setData(response?.data);
      }
    } catch (error) {
      console.log("error in fetching club income", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchClubIncomeHistory();
  }, [])

  const columns = [
    { label: "#", key: "index", render: (val, row, index) => index + 1 },
    { label: "Username", key: "userId", render: (val) => val?.username || "N/A" },
    { label: "Club Name", key: "clubName" },
    { label: "Rank", key: "rank" },
    { label: "Percent(%)", key: "percent", render: (val) => val ? `${val}%` : "N/A" },
    { label: "Income", key: "incomeAmount", render: (val) => val ? formatValueWithCurrency(val) : "N/A" },
    { label: "Date", key: "createdAt", render: (val) => val ? dateFormat(val) : "N/A" },
  ];

  return (
    <div className="mt-5 rounded-2xl shadow-md">
      <div>
        <ReusableDataTable
          columns={columns}
          data={data}
          enableDateFilter
          dateKey="createdAt"
        />
      </div>
    </div>
  );
};

export default ClubIncome;

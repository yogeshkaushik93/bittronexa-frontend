import { useEffect, useState } from "react";
import ReusableDataTable from "../../../../components/ui/ReusableTable";
import { getMatchingIncomeHistory } from "../../../../api/user-api";
import PageLoader from "../../../../components/ui/PageLoader";
import { dateFormat, formatValueWithCurrency } from "../../../../utils/additionalFunc";

const MatchingIncome = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchMatchingIncomeHistory = async () => {
    try {
      setLoading(true);
      const response = await getMatchingIncomeHistory();
      if (response?.success) {
        setData(response?.data);
      }
    } catch (error) {
      console.log("error in fetching matching income", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchMatchingIncomeHistory();
  }, [])


  const columns = [
    { label: "#", key: "index", render: (val, row, index) => index + 1 },
    { label: "From User", key: "fromUser", render: (val) => val?.username || "N/A" },
    { label: "To User", key: "userId", render: (val) => val?.username || "N/A" },
    { label: "Pairs", key: "pairs"},
    { label: "Pair Amount", key: "pairUnit", render: (val) => val ? formatValueWithCurrency(val) : "N/A"  },
    { label: "Pair Bonus", key: "amountPerPair", render: (val) => val ? formatValueWithCurrency(val) : "N/A"  },
    { label: "Date", key: "createdAt", render: (val) => val ? dateFormat(val) : "N/A" },
  ];

  if (loading) return <PageLoader />

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

export default MatchingIncome;

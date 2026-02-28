import "primeicons/primeicons.css";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/saga-blue/theme.css";
import { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
import { LevelIncomeApi } from "../../../api/user-api";
import { formatValueWithCurrency, dateFormat } from "../../../utils/additionalFunc";
import ReusableDataTable from "../../../components/ui/ReusableTable";
import PageLoader from "../../../components/ui/PageLoader";

const LevelIncomeReports = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);


  const levelIncomeHistory = async () => {
    try {
      setLoading(true);
      const response = await LevelIncomeApi();
      if (response?.success) {
        setData(response.data);
      }
    } catch (error) {
      console.error("Error fetching level income history:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    levelIncomeHistory();
  }, []);


  const columns = [
    { label: "#", key: "index", render: (val, row, index) => index + 1 },
    { label: "From User", key: "fromUserId", render: (val) => val?.username || "N/A" },
    {
      label: "Level", key: "level", render: (val) => {
        return (
          <span className={`px-2 inline-flex capitalize`}>
            {val == "1" ? "Direct" : `Level ${val}`}
          </span>
        )
      }
    },
    { label: "Level Income", key: "amount", render: (val) => val ? formatValueWithCurrency(val) : "N/A" },
    { label: "Percentage", key: "percent", render: (val) => (val || val === 0) ? `${val}%` : "N/A" },
    { label: "Investment Amount", key: "investmentId", render: (val) => val ? formatValueWithCurrency(val?.investmentAmount) : "N/A" },
    { label: "Date", key: "createdAt", render: (val) => dateFormat(val) },
  ];

  if (loading) return <PageLoader />

  return (
    <div className="mt-5 rounded-2xl shadow-md">
      {/* <h1>hellow /</h1> */}   
      <ReusableDataTable
        columns={columns}
        data={data}
        enableDateFilter
        dateKey="createdAt"
      />
    </div>
  );
};

export default LevelIncomeReports;

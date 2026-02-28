import React, { useEffect, useState } from "react";
import { getInvestmentHistory } from "../../../api/user-api";
import { dateFormat, formatValueWithCurrency, maskMemberIdFourLatter } from "../../../utils/additionalFunc";
import ReusableDataTable from "../../../components/ui/ReusableTable";
import { useSelector } from "react-redux";


const PortFolio = () => {
  const {user} = useSelector((state) => state?.userInfo?.userInfo);
  console.log(user)
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [totalAmount, settotalAount] = useState(null)
  const fetchInvestmentHistory = async () => {
    try {
      setLoading(true);
      const response = await getInvestmentHistory();
      if (response?.success) {
        setData(response?.data);
      }
    } catch (error) {
      console.log("error in fetching investment history", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInvestmentHistory();
  }, []);

  useEffect(() => {
    let total = 0;
    data.forEach((item) => {
      total += item?.investmentAmount;
    });
    settotalAount(total);
  }, [data]);

  const columns = [
    { label: "#", key: "index", render: (val, row, index) => index + 1 },
    { label: "Username", key: "userId", render: (val) => val?.username || "N/A" },
    { label: "Name", key: "userId", render: (val) => val?.name || "N/A" },
    { label: "Investment Amount", key: "investmentAmount", render: (val) => val ? formatValueWithCurrency(val) : "N/A" },
    { label: "Tx Hash", key: "txResponse", render: (val) => val ? maskMemberIdFourLatter(val) : "N/A" },
    { label: "Status", key: "status", render: (val) => <span className={`capitalize px-3 py-1 rounded-full font-semibold ${val === "active" ? "text-green-500 bg-green-400/20" : "text-red-500 bg-red-400/20"}`}>{val === "active" ? "Active" : "Inactive"}</span> },
    { label: "Date", key: "createdAt", render: (val) => val ? dateFormat(val) : "N/A" },
  ];

  return (
    <div className="mt-5 rounded-2xl shadow-md">
      <div className="space-y-2 mb-5">
        <h2 className="text-xl  font-medium text-slate-400 uppercase tracking-wider">
          Total Investment
        </h2>

        <div className="text-4xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
          ${user?.totalInvestment || 0}
        </div>
      </div>
      <ReusableDataTable
        columns={columns}
        data={data}
        title="Investment History"
      />
    </div>
  );
};

export default PortFolio;

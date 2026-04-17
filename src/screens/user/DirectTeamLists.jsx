import React, { useEffect, useState } from "react";
import ReusableDataTable from "../../components/ui/ReusableTable";
import { getUserDirectTeam } from "../../api/user-api";
import {
  dateFormat,
  formatValueWithCurrency,
} from "../../utils/additionalFunc";
import PageLoader from "../../components/ui/PageLoader";
import { useNavigate } from "react-router-dom";

const DirectTeamLists = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchAllDirectUsers = async () => {
    try {
      setLoading(true);
      const response = await getUserDirectTeam();

      if (response?.success) {
        // const updatedData = (response.data || []).map((item) => ({
        //   ...item,
        //   totalTeam:
        //     (item.totalTeam || 0) +
        //     (item.leftTeam || 0) +
        //     (item.rightTeam || 0),
        //   totalLeftBusiness:
        //     Number(item?.business?.leftBusiness || 0) +
        //     Number(item?.adminLeftBusiness || 0),
        //   totalRightBusiness:
        //     Number(item?.business?.rightBusiness || 0) +
        //     Number(item?.adminRightBusiness || 0),
        //   totalBusiness:
        //     Number(item?.business?.totalBusiness || 0) +
        //     Number(item?.adminLeftBusiness || 0) +
        //     Number(item?.adminRightBusiness || 0),
        // }));

        const updatedData = (response.data || []).map((item) => ({
          ...item,

          totalTeam:
            (item.totalTeam || 0) +
            (item.leftTeam || 0) +
            (item.rightTeam || 0),

          /* 🔥 REAL + ADMIN MERGE */
          totalLeftBusiness:
            Number(item?.business?.totalLeftBusiness || 0) +
            Number(item?.adminBusiness?.adminLeftBusiness || 0),

          totalRightBusiness:
            Number(item?.business?.totalRightBusiness || 0) +
            Number(item?.adminBusiness?.adminRightBusiness || 0),

          totalBusiness:
            Number(item?.business?.totalBusiness || 0) +
            Number(item?.adminBusiness?.adminLeftBusiness || 0) +
            Number(item?.adminBusiness?.adminRightBusiness || 0),
        }));
        setData(updatedData);
      }
    } catch (error) {
      console.error("Error fetching user direct team:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllDirectUsers();
  }, []);

  const columns = [
    { label: "#", key: "index", render: (val, row, index) => index + 1 },
    {
      label: "Username",
      key: "username",
      render: (val, row) => {
        return (
          <span
            navigate
            onClick={() => navigate(`/nested-team`, { state: row })}
            className="hover:text-[var(--cyan-text)] cursor-pointer"
          >
            {val}
          </span>
        );
      },
    },
    { label: "Name", key: "name", render: (val) => val || "N/A" },
    { label: "Total Team", key: "totalTeam", render: (val) => (val ? val : 0) },
    {
      label: "Self Investment",
      key: "totalInvestment",
      render: (val) =>
        val || val === 0 ? formatValueWithCurrency(val) : "N/A",
    },
    {
      label: "Left Business",
      key: "totalLeftBusiness",
      render: (val) => (val ? formatValueWithCurrency(val) : 0),
    },
    {
      label: "Right Business",
      key: "totalRightBusiness",
      render: (val) => (val ? formatValueWithCurrency(val) : 0),
    },
    {
      label: "Total Business",
      key: "totalBusiness",
      render: (val) => (val ? formatValueWithCurrency(val) : 0),
    },
    {
      label: "Position",
      key: "position",
      render: (val) => (
        <button
          className={`px-3 py-1 text-lg font-semibold rounded-full text-white shadow-md transition-all duration-300 ${
            val === "left"
              ? "bg-blue-700 hover:bg-blue-600"
              : "bg-purple-700 hover:bg-purple-600"
          }`}
        >
          {val?.toUpperCase()}
        </button>
      ),
    },
    {
      label: "Rank",
      key: "rank",
      render: (val) => (val === "None" ? "N/A" : val),
    },
    {
      label: "Status",
      key: "isVerified",
      render: (val) => (
        <span
          className={`px-3 py-1 text-lg rounded-full font-semibold text-white ${
            val ? "bg-green-600" : "bg-red-600"
          }`}
        >
          {val ? "Active" : "Inactive"}
        </span>
      ),
    },

    {
      label: "Joining Date",
      key: "createdAt",
      render: (val) => (val ? dateFormat(val) : "N/A"),
    },
  ];

  if (loading) return <PageLoader />;

  return (
    <div className="mt-5">
      <ReusableDataTable
        columns={columns}
        data={data}
        enableDateFilter
        dateKey="createdAt"
      />
    </div>
  );
};

export default DirectTeamLists;

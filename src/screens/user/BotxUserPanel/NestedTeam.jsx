import React, { useEffect, useState } from "react";
import ReusableDataTable from "../../../components/ui/ReusableTable";
import { getLeftRightUsers } from "../../../api/user-api";
import {
  dateFormat,
  formatValueWithCurrency,
} from "../../../utils/additionalFunc";
import { useLocation, useNavigate } from "react-router-dom";

const NestedTeam = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const userData = location.state;

  const fetchLeftRightUsers = async () => {
    try {
      setLoading(true);
      const response = await getLeftRightUsers(userData?._id);
      if (response?.success) {
        const updatedData = (response.data || []).map((item) => ({
          ...item,

          totalTeam: item.totalTeam || 0,

          /* 🔥 BUSINESS */
          totalLeftBusiness:
            Number(item?.business?.leftBusiness || 0) +
            Number(item?.adminBusiness?.adminLeftBusiness || 0),

          totalRightBusiness:
            Number(item?.business?.rightBusiness || 0) +
            Number(item?.adminBusiness?.adminRightBusiness || 0),

          totalBusiness:
            Number(item?.business?.totalBusiness || 0) +
            Number(item?.adminBusiness?.adminLeftBusiness || 0) +
            Number(item?.adminBusiness?.adminRightBusiness || 0),
        }));
        setData(updatedData);
      }
    } catch (error) {
      console.error("Error fetching team users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userData?._id) {
      fetchLeftRightUsers();
    }
  }, [userData?._id]);

  const columns = [
    { label: "#", key: "index", render: (val, row, index) => index + 1 },
    {
      label: "Username",
      key: "username",
      render: (val, row) => (
        <span
          onClick={() => navigate(`/nested-team`, { state: row })}
          className="hover:text-[var(--cyan-text)] cursor-pointer font-medium"
        >
          {val}
        </span>
      ),
    },
    {
      label: "Name",
      key: "name",
      render: (val) => val || "N/A",
    },
    {
      label: "Total Team",
      key: "totalTeam",
      render: (val) => (val || val === 0 ? val : "N/A"),
    },
    {
      label: "Self Investment",
      key: "totalInvestment",
      render: (val) =>
        val || val === 0 ? formatValueWithCurrency(val) : "N/A",
    },
    // {
    //   label: "Left Business",
    //   key: "totalLeftBusiness",
    //   render: (val) => (val ? formatValueWithCurrency(val) : 0),
    // },
    // {
    //   label: "Right Business",
    //   key: "totalRightBusiness",
    //   render: (val) => (val ? formatValueWithCurrency(val) : 0),
    // },
    // {
    //   label: "Total Business",
    //   key: "totalBusiness",
    //   render: (val) => (val ? formatValueWithCurrency(val) : 0),
    // },
    {
      label: "Left Business",
      key: "totalLeftBusiness",
      render: (val) => formatValueWithCurrency(val || 0),
    },
    {
      label: "Right Business",
      key: "totalRightBusiness",
      render: (val) => formatValueWithCurrency(val || 0),
    },
    {
      label: "Total Business",
      key: "totalBusiness",
      render: (val) => formatValueWithCurrency(val || 0),
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
      label: "Date",
      key: "createdAt",
      render: (val) => (val ? dateFormat(val) : "N/A"),
    },
  ];

  return (
    <div className="mt-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="px-8 py-3 text-xl font-semibold rounded-lg bg-[var(--cyan-active)] hover:scale-105 transition-all duration-300"
        >
          Back
        </button>
        <div className="w-96 border border-gray-600 rounded-lg mb-4 p-4">
          <div className="flex flex-col text-white">
            <h2 className="text-xl font-bold">
              Username:{" "}
              <span className="text-[var(--cyan-text)]">
                {userData?.username || "N/A"}
              </span>
            </h2>
            <h2 className="text-xl font-bold">
              Name:{" "}
              <span className="text-[var(--cyan-text)]">
                {userData?.name || "N/A"}
              </span>
            </h2>
          </div>
        </div>
      </div>

      {/* Table */}
      <ReusableDataTable
        columns={columns}
        data={data}
        title={`${userData?.username}'s Team`}
        loading={loading}
      />
    </div>
  );
};

export default NestedTeam;

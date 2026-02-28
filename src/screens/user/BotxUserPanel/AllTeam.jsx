
import React, { useEffect, useState } from "react";
import ReusableDataTable from "../../../components/ui/ReusableTable";
import { ChevronDown, ChevronUp } from "lucide-react";
import { getLevelUsersDetails } from "../../../api/user-api";
import PageLoader from "../../../components/ui/PageLoader";
import { dateFormat } from "../../../utils/additionalFunc";

const AllTeam = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openLevel, setOpenLevel] = useState(null);

  // Fetch all level users
  const getAllLevelUser = async () => {
    try {
      setLoading(true);
      const response = await getLevelUsersDetails();
      if (response?.success && Array.isArray(response.data)) {
        setData(response.data);
      }
    } catch (error) {
      console.error("Error fetching level users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllLevelUser();
  }, []);

  // Columns for the table
  const columns = [
    { label: "#", key: "index", render: (val, row, index) => index + 1 },
    { label: "Username", key: "username", render: (val) => val || "N/A" },
    { label: "Name", key: "name", render: (val) => val || "N/A" },
    { label: "Referral Code", key: "referralCode", render: (val) => val || "N/A" },
    {
      label: "Position",
      key: "position",
      render: (val) => (
        <span
          className={`px-3 py-1 text-lg font-semibold rounded-full text-white shadow-md ${
            val === "left"
              ? "bg-blue-700 hover:bg-blue-600"
              : "bg-purple-700 hover:bg-purple-600"
          }`}
        >
          {val?.toUpperCase() || "N/A"}
        </span>
      ),
    },
    {
      label: "Rank",
      key: "rank",
      render: (val) => val === "None" ? "N/A" : val,
    },
    {
      label: "Total Investment",
      key: "totalInvestment",
      render: (val) => `$${val || 0}`,
    },
    {
      label: "Total Business",
      key: "business",
      render: (val) => `$${val?.totalBusiness || 0}`,
    },
    {
      label: "Date",
      key: "createdAt",
      render: (val) => val ? dateFormat(val) : "N/A",
    },
  ];

  // Handle accordion toggle
  const toggleLevel = (level) => {
    setOpenLevel(openLevel === level ? null : level);
  };

  if (loading) return <PageLoader />;

  return (
    <div className="rounded-2xl mt-5">
      {/* Header */}
      <h2 className="text-3xl font-bold text-white mb-6">
        All Team Members
      </h2>

      {/* Accordion List */}
      <div className="space-y-4">
        {data?.map((levelData) => (
          <div
            key={levelData.level}
            className="border !border-gray-700 rounded-xl overflow-hidden transition-all"
          >
            {/* Accordion Header */}
            <div
              onClick={() => toggleLevel(levelData.level)}
              className="flex justify-between items-center p-4 bg-black/80  hover:bg-gray-950 cursor-pointer transition-all"
            >
              <h3 className="text-2xl font-semibold text-white">
                Level {levelData.level} — <span className="text-[var(--cyan-text)]">{levelData.count} Users</span>
              </h3>
              {openLevel === levelData.level ? (
                <ChevronUp className="text-white" />
              ) : (
                <ChevronDown className="text-white" />
              )}
            </div>

            {/* Accordion Body with smooth animation */}
            <div
              className={`transition-all duration-500 ease-in-out overflow-hidden ${
                openLevel === levelData.level
                  ? "max-h-[800px] opacity-100 p-4"
                  : "max-h-0 opacity-0 p-0"
              } bg-gray-950 border-t border-gray-700`}
            >
              {levelData?.users?.length > 0 ? (
                <ReusableDataTable
                  columns={columns}
                  data={levelData.users}
                  title={`Level ${levelData.level} Members`}
                />
              ) : (
                <p className="text-gray-400 text-xl text-center py-4">
                  No users found for this level.
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllTeam;


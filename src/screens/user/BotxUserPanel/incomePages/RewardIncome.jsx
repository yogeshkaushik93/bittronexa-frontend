import React, { useEffect, useMemo, useState } from "react";
import ReusableDataTable from "../../../../components/ui/ReusableTable";
import { getRewardIncomeHistory } from "../../../../api/user-api";
import { dateFormat, formatValueWithCurrency } from "../../../../utils/additionalFunc";

const rankRewards = [
  { rank: "Aspire Trader", match: 25, reward: 100 },
  { rank: "Prime Trader", match: 50, reward: 300 },
  { rank: "Advanced Trader", match: 100, reward: 500 },
  { rank: "Executive", match: 500, reward: 3000 },
  { rank: "Star Executive", match: 1000, reward: 5000 },
  { rank: "Team Leader", match: 2000, reward: 10000 },
  { rank: "Senior Leader", match: 5000, reward: 25000 },
  { rank: "Bronze Leader", match: 10000, reward: 50000 },
  { rank: "Silver Leader", match: 25000, reward: 100000 },
  { rank: "Gold Leader", match: 50000, reward: 250000 },
  { rank: "Platinum Leader", match: 100000, reward: 500000 },
  { rank: "Diamond", match: 250000, reward: 1000000 },
  { rank: "Crown Diamond", match: 500000, reward: 2500000 },
  { rank: "Royal Crown Ambassador", match: 1000000, reward: 5000000 },
];

const RewardIncome = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchRewardIncomeHistory = async () => {
    try {
      setLoading(true);
      const response = await getRewardIncomeHistory();
      if (response?.success) {
        setHistory(response.data || []);
      }
    } catch (err) {
      console.error("Failed to fetch reward income history", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRewardIncomeHistory();
  }, []);

  const historyMap = useMemo(() => {
    const map = new Map();
    history.forEach((item) => {
      if (item?.rankTitle) {
        map.set(item.rankTitle.toLowerCase(), item);
      }
    });
    return map;
  }, [history]);

  const tableData = useMemo(() => {
    return rankRewards.map((rankItem) => {
      const matchedHistory = historyMap.get(rankItem.rank.toLowerCase());

      return {
        rank: rankItem.rank,
        requiredPairs: rankItem.match,
        achievedPairs: matchedHistory?.achievedMatches || 0,
        rewardAmount: rankItem.reward,
        achievedAt: matchedHistory?.achievedAt || null,
        status: matchedHistory ? "Achieved" : "Not Achieved",
      };
    });
  }, [historyMap]);

  const columns = [
    {
      label: "#",
      key: "index",
      render: (_, __, index) => index + 1,
    },
    {
      label: "Rank",
      key: "rank",
    },
    {
      label: "Required Pairs",
      key: "requiredPairs",
    },
    // {
    //   label: "Achieved Pairs",
    //   key: "achievedPairs",
    // },
    {
      label: "Reward Amount",
      key: "rewardAmount",
      render: (val) => formatValueWithCurrency(val),
    },
    {
      label: "Status",
      key: "status",
      render: (val) => (
        <span
          className={`px-3 py-1  rounded-full text-xl font-semibold ${
            val === "Achieved"
              ? "bg-green-600 text-xl text-white"
              : "bg-gray-300 text-gray-800"
          }`}
        >
          {val}
        </span>
      ),
    },
    {
      label: "Achieved Date",
      key: "achievedAt",
      render: (val) => (val ? dateFormat(val) : "—"),
    },
  ];

  return (
    <div className="mt-5 rounded-2xl shadow-md">
      <ReusableDataTable
        columns={columns}
        data={tableData}
        enableDateFilter
        dateKey="achievedAt"
      />
    </div>
  );
};

export default RewardIncome;

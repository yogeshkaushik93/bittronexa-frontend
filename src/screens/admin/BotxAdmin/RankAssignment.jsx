import { useEffect, useState } from "react";
import { assignRankForUser, getUerDetails } from "../../../api/admin-api";
import Swal from "sweetalert2";

// Rank list
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

const RankAssignment = () => {
  const [username, setUsername] = useState("");
  const [debouncedUsername, setDebouncedUsername] = useState("");
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [weekLegCount, setWeekLegCount] = useState(null);
  const [selectedRank, setSelectedRank] = useState("");

  const handleChange = (e) => setUsername(e.target.value?.toUpperCase());

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedUsername(username), 500);
    return () => clearTimeout(timer);
  }, [username]);

  // Fetch user details
  useEffect(() => {
    if (!debouncedUsername) {
      setUserData(null);
      setWeekLegCount(null);
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      try {
        const payload = { username: debouncedUsername };
        const res = await getUerDetails(payload);
        setUserData(res.data);
        setWeekLegCount(res.data?.weakLegCount || 0);
      } catch (error) {
        setUserData(null);
        setWeekLegCount(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [debouncedUsername]);

  const handleSubmit = async () => {
    if (!username || !selectedRank) {
      Swal.fire({
        icon: "warning",
        title: "Missing Fields",
        text: "Please enter a username and select a rank before continuing.",
        confirmButtonColor: "#3085d6",
      });
      return;
    }

    // Show confirmation popup
    const result = await Swal.fire({
      title: "Are you sure?",
      text: `Do you want to assign the rank "${selectedRank}" to ${username}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, assign it!",
      cancelButtonText: "No, cancel",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
    });

    if (result.isConfirmed) {
      // Backend payload: count = weekLegCount, rank = selectedRank
      const payload = {
        username,
        count: weekLegCount || 0,
        rank: selectedRank,
      };

      try {
        const res = await assignRankForUser(payload);
        if (res?.success) {
          Swal.fire({
            icon: "success",
            title: "Rank Assignment Successful",
            text: res.message || "Rank has been successfully assigned!",
            confirmButtonColor: "#3085d6",
          });
          setSelectedRank("");
        }
      } catch (error) {
        console.error("assign rank error", error);
        Swal.fire({
          icon: "error",
          title: "Request Failed",
          text:
            error.response?.data?.message ||
            "An error occurred while processing the request.",
          confirmButtonColor: "#d33",
        });
      }
    }
  };

  return (
    <div className="min-h-screen text-white p-10 text-[1.4rem] leading-relaxed">
      <div className="max-w-7xl mx-auto">
        {/* Username input */}
        <div className="backdrop-blur-xl bg-white/5 border-b border-white/10 rounded-3xl p-10 mb-10 shadow-2xl">
          <label className="block text-2xl font-semibold text-gray-300 mb-4">
            Search User
          </label>
          <input
            type="text"
            placeholder="Enter username..."
            onChange={handleChange}
            value={username}
            className="w-full px-6 py-3 bg-white/5 border border-white/10 rounded-2xl text-2xl text-white placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-blue-500/50 focus:border-transparent transition-all"
          />
        </div>

        {/* User info */}
        {loading ? (
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-10 mb-10 text-center">
            <p className="text-gray-400 mt-6 text-2xl">Loading user data...</p>
          </div>
        ) : userData ? (
          <div className="space-y-10 mb-10">
            <div className="backdrop-blur-xl border !border-white/10 rounded-3xl p-4 shadow-2xl">
              {/* Avatar + Basic Info */}
              <div className="flex items-center gap-8 mb-6">
                <div className="w-28 h-28 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-4xl font-bold">
                  {userData.username?.substring(0, 2).toUpperCase() || "U"}
                </div>
                <div className="flex-1">
                  <h3 className="text-4xl font-bold">{userData.username}</h3>
                  <p className="text-gray-400 text-2xl">{userData.email}</p>
                  <div className="flex items-center gap-4 mt-4 flex-wrap">
                    {/* Verified Status */}
                    <div
                      className={`flex items-center gap-3 px-5 py-2 rounded-full ${
                        userData.isVerified
                          ? "bg-green-500/20 text-green-400"
                          : "bg-red-500/20 text-red-400"
                      }`}
                    >
                      <div
                        className={`w-3 h-3 rounded-full ${
                          userData.isVerified ? "bg-green-500" : "bg-red-500"
                        }`}
                      ></div>
                      <span className="text-2xl font-medium">
                        {userData.isVerified ? "Active" : "Inactive"}
                      </span>
                    </div>

                    {/* Referral Code */}
                    <div className="px-5 py-2 rounded-full bg-blue-500/20 text-blue-400 text-2xl font-medium">
                      {userData.referralCode}
                    </div>

                    {/* Current Rank */}
                    {userData.rank && (
                      <div className="px-5 py-2 rounded-full bg-purple-500/20 text-purple-400 text-2xl font-medium">
                        🏅 {userData.rank}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          debouncedUsername && (
            <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-10 mb-10 text-center text-2xl">
              <p className="text-gray-400">
                No user found with username "{debouncedUsername}"
              </p>
            </div>
          )
        )}

        {/* Rank select */}
        <div className="backdrop-blur-xl border-b border-white/10 rounded-3xl p-10 shadow-2xl">
          <div className="mb-6">
            <h3 className="text-3xl font-semibold mb-3">Assign Rank</h3>
          </div>
          <div className="backdrop-blur-sm bg-white/5 rounded-2xl p-6 border border-white/10 mb-8">
            <label className="text-2xl font-semibold text-gray-300 mb-2 block">
              Select Rank
            </label>
            <select
              className="w-full px-6 py-3 bg-white/5 border border-white/10 rounded-2xl text-2xl text-white placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-blue-500/50 focus:border-transparent transition-all"
              value={selectedRank}
              onChange={(e) => setSelectedRank(e.target.value)}
            >
              <option value="">-- Select Rank --</option>
              {rankRewards.map((rankObj) => (
                <option key={rankObj.rank} value={rankObj.rank}>
                  {rankObj.rank}
                </option>
              ))}
            </select>
          </div>

          {/* Submit button */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full py-6 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed rounded-2xl font-bold text-3xl transition-all duration-300 shadow-lg hover:shadow-2xl hover:scale-[1.03] active:scale-[0.98]"
          >
            {loading ? "Assigning..." : "Assign Rank"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RankAssignment;

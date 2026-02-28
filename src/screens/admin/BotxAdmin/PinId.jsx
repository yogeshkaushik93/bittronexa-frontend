
import { useEffect, useState } from "react";
import { addMatchingByAdmin, getUserByName, pinIdByAdmin } from "../../../api/admin-api";
import {  User } from "lucide-react";
import Swal from "sweetalert2";
import ReusableForm from "../../../components/ui/ReusableForm";

const PinId = () => {
    const [username, setUsername] = useState("");
    const [debouncedUsername, setDebouncedUsername] = useState("");
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [count, setCount] = useState("");

    const handleChange = (e) => {
        setUsername(e.target.value?.toUpperCase());
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedUsername(username);
        }, 500);
        return () => clearTimeout(timer);
    }, [username]);

    useEffect(() => {
        if (!debouncedUsername) {
            setUserData(null);
            return;
        }

        const fetchData = async () => {
            setLoading(true);
            try {
                const payload = { username: debouncedUsername };
                const res = await getUserByName(payload);
                setUserData(res.data);
            } catch (error) {
                setUserData(null);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [debouncedUsername]);

    const handleSubmit = async () => {
        if (!username || !count) {
            Swal.fire({
                icon: "warning",
                title: "Missing Fields",
                text: "Please enter a username and count before continuing.",
                confirmButtonColor: "#3085d6",
            });
            return;
        }

        const payload = { username, count:Number(count) };
        try {
            const res = await pinIdByAdmin(payload);
            if (res?.success) {
                Swal.fire({
                    icon: "success",
                    title: "PinId Successful",
                    text: res.message,
                    confirmButtonColor: "#3085d6",
                });
                setCount("");
            }
        } catch (error) {
            console.error("pin id error", error);
            Swal.fire({
                icon: "error",
                title: "Request Failed",
                text: error.response?.data?.message || "An error occurred while processing the request.",
                confirmButtonColor: "#d33",
            });
        }
    };

    return (
        <div className="min-h-screen  text-white p-10 text-[1.4rem] leading-relaxed">
            <div className="max-w-7xl mx-auto">

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

                {/* User Info */}
                {loading ? (
                    <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-10 mb-10 text-center">
                        <div className="animate-pulse">
                            <div className="w-28 h-28 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto mb-6"></div>
                            <div className="h-6 bg-white/10 rounded w-1/2 mx-auto mb-3"></div>
                            <div className="h-5 bg-white/10 rounded w-1/3 mx-auto"></div>
                        </div>
                        <p className="text-gray-400 mt-6 text-2xl">Loading user data...</p>
                    </div>
                ) : userData ? (
                    <div className="space-y-10 mb-10">
                        <div className="backdrop-blur-xl  border !border-white/10 rounded-3xl p-4 shadow-2xl">
                            <div className="flex items-center gap-8 mb-10">
                                <div className="w-28 h-28 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-4xl font-bold">
                                    {userData.username?.substring(0, 2).toUpperCase() || "U"}
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-4xl font-bold">{userData.username}</h3>
                                    <p className="text-gray-400 text-2xl">{userData.email}</p>
                                    <div className="flex items-center gap-4 mt-4">
                                        <div
                                            className={`flex items-center gap-3 px-5 py-2 rounded-full ${userData.status
                                                ? "bg-green-500/20 text-green-400"
                                                : "bg-red-500/20 text-red-400"
                                                }`}
                                        >
                                            <div
                                                className={`w-3 h-3 rounded-full ${userData.status ? "bg-green-500" : "bg-red-500"
                                                    }`}
                                            ></div>
                                            <span className="text-2xl font-medium">
                                                {userData.status ? "Active" : "Inactive"}
                                            </span>
                                        </div>
                                        <div className="px-5 py-2 rounded-full bg-blue-500/20 text-blue-400 text-2xl font-medium">
                                            {userData.referralCode}
                                        </div>
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

                <div className="backdrop-blur-xl  border-b border-white/10 rounded-3xl p-10 shadow-2xl">
                    <div className="mb-6">
                        <h3 className="text-3xl font-semibold mb-3">
                            Pin Id
                        </h3>
                    </div>

                    <div className="backdrop-blur-sm bg-white/5 rounded-2xl p-6 border border-white/10 mb-8">
                        <ReusableForm
                            label="Pin Id Count"
                            type="number"
                            value={count}
                            onChange={(e) => setCount(e.target.value)}
                            placeholder="Enter Pin Id Count"
                            icon={User}
                        />
                    </div>

                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="w-full py-6 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed rounded-2xl font-bold text-3xl transition-all duration-300 shadow-lg hover:shadow-2xl hover:scale-[1.03] active:scale-[0.98]"
                    >
                        {loading ? "Submitting..." : "Submit"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PinId;

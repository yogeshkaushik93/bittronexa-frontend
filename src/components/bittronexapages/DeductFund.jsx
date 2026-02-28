
import { useEffect, useState } from "react";
import { deductFundByAdmin, getUserByName } from "../../api/admin-api";
import Swal from "sweetalert2";
import ReusableForm from "../ui/ReusableForm";
import { Coins, Wallet } from "lucide-react";

const DeductFund = () => {
    const [username, setUsername] = useState("");
    const [debouncedUsername, setDebouncedUsername] = useState("");
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        amount: "",
        type: "",
        reason: "",
    })
    const [submitLoading, setSubmitLoading] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

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
                console.error("❌ Error fetching user:", error);
                setUserData(null);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [debouncedUsername]);

    const handleSubmit = async () => {
        if (!formData.amount || !formData.type) {
            Swal.fire({
                icon: "warning",
                title: "Missing Fields",
                text: "All fields are required.",
                confirmButtonColor: "#3085d6",
            });
            return;
        }
        const payload = {
            username: debouncedUsername,
            amount: Number(formData.amount),
            walletType: formData.type,
            reason: formData.reason
        };

        try {
            setSubmitLoading(true);
            const res = await deductFundByAdmin(payload);
            if (res?.success) {
                Swal.fire({
                    icon: "success",
                    title: "Deduct Successful",
                    text: res.message || "Deduct successful.",
                    confirmButtonColor: "#3085d6",
                });
            }
        } catch (error) {
            console.error("❌ Deduct Error:", error);
            Swal.fire({
                icon: "error",
                title: "Request Failed",
                text: error.response?.data?.message || "An error occurred while processing the request.",
                confirmButtonColor: "#d33",
            });
        } finally {
            setSubmitLoading(false);
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
                        <div className="backdrop-blur-xl  border-b border-white/10 rounded-3xl p-4 shadow-2xl">
                            <div className="flex items-center gap-8 mb-10 pb-10 border-b border-white/10">
                                <div className="w-28 h-28 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-4xl font-bold">
                                    {userData.username?.substring(0, 2).toUpperCase() || "U"}
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-4xl font-bold">{userData.username}</h3>
                                    <p className="text-gray-400 text-2xl">{userData.email}</p>
                                </div>
                            </div>

                            <div className="backdrop-blur-xl  border-b border-white/10 rounded-3xl p-4 shadow-2xl">
                                <div className="mb-6">
                                    <h3 className="text-4xl font-semibold mb-5">
                                        Deduct Fund
                                    </h3>
                                    <div className="space-y-5">
                                        <ReusableForm
                                            label="Wallet Type"
                                            name="type"
                                            type="select"
                                            value={formData.type}
                                            onChange={handleInputChange}
                                            icon={Wallet}
                                            options={[
                                                { value: "mainWallet", label: "Main Wallet" },
                                                { value: "packageWallet", label: "Package Wallet" },
                                            ]}
                                            required={true}
                                        />
                                        <ReusableForm
                                            label="Reason (Optional)"
                                            name="reason"
                                            type="select"
                                            value={formData.reason}
                                            onChange={handleInputChange}
                                            icon={Wallet}
                                            options={[
                                                { value: "Penalty", label: "Penalty" },
                                                { value: "Wrong Credit", label: "Wrong Credit" },
                                                { value: "Fraud", label: "Fraud" },
                                                { value: "Adjustment", label: "Adjustment" },
                                            ]}
                                        />
                                        <ReusableForm
                                            label="Amount"
                                            name="amount"
                                            type="number"
                                            value={formData.amount}
                                            onChange={handleInputChange}
                                            placeholder={"Enter Amount"}
                                            icon={Coins}
                                            required={true}
                                        />
                                    </div>
                                </div>

                                <button
                                    onClick={handleSubmit}
                                    disabled={submitLoading || !formData.amount || !formData.type}
                                    className="w-full py-6 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed rounded-2xl font-bold text-3xl transition-all duration-300 shadow-lg hover:shadow-2xl hover:scale-[1.03] active:scale-[0.98]"
                                >
                                    {submitLoading ? "Submitting..." : "Submit"}
                                </button>
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


            </div>
        </div>
    );
};

export default DeductFund;

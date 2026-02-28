import { useState } from "react";
import { Coins, User, Search, Link } from "lucide-react";
import Swal from "sweetalert2";
import PageLoader from "../ui/PageLoader";
import ReusableForm from "../ui/ReusableForm";
import { addBotBusinessByAdmin, getUserByName } from "../../api/admin-api";

const AddBotBusiness = () => {
    const [loading, setLoading] = useState(false);
    const [searchedUser, setSearchedUser] = useState(null);
    const [searching, setSearching] = useState(false);

    const [formData, setFormData] = useState({
        username: "",
        count: "",
        position: "",
    });

    const getUserProfileImage = () => {
        return searchedUser?.profileImage || "https://img.icons8.com/3d-fluency/94/guest-male--v2.png";
    };

    // input change handler
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === "username") {
            setFormData((prev) => ({ ...prev, [name]: value.toUpperCase() }));
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

    // 🧭 Search user by username
    const handleSearchUser = async () => {
        if (!formData.username.trim()) {
            return Swal.fire({
                icon: "warning",
                title: "Username Required",
                text: "Please enter a receiver username first.",
            });
        }

        try {
            setSearching(true);
            const payload = { username: formData.username };
            const res = await getUserByName(payload);
            if (res?.success) {
                setSearchedUser(res?.data);
            }
        } catch (error) {
            console.error("Error fetching user:", error);
            setSearchedUser(null);
        } finally {
            setSearching(false);
        }
    };

    const handleSubmit = async () => {
        try {
            if (!formData.username || !formData.count || !formData.position) {
                return Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "All fields are required",
                })
            }

            if (!searchedUser) {
                return Swal.fire({
                    icon: "error",
                    title: "No Receiver",
                    text: "Please search and confirm receiver first.",
                });
            }

            setLoading(true);
            const payload = {
                username: formData.username,
                count: formData.count,
                position: formData.position
            };
            const response = await addBotBusinessByAdmin(payload);
            if (response?.success) {
                Swal.fire({
                    icon: "success",
                    title: "Success",
                    text: response?.message,
                });
                setFormData({ username: "", count: "" });
                setSearchedUser(null);
            }
        } catch (error) {
            console.log("error in investing", error);
            Swal.fire({
                icon: "error",
                title: "Error",
                text: error?.response?.data?.message || "Failed to invest",
            });
        } finally {
            setLoading(false);
        }
    };


    return (
        <>
            {(loading || searching) && <PageLoader />}
            <div className="min-h-screen text-white mt-5">
                <div className="rounded-xl p-8 border !border-gray-800 space-y-6">
                    <div className="flex items-end gap-3">
                        <div className="flex-1">
                            <ReusableForm
                                type="text"
                                label="Receiver Username"
                                name="username"
                                value={formData.username}
                                onChange={handleInputChange}
                                placeholder={"Enter Receiver Username"}
                                icon={User}
                                required={true}
                            />
                        </div>

                        <button
                            onClick={handleSearchUser}
                            disabled={searching}
                            className="flex text-xl items-center gap-2 bg-[var(--cyan-active)] hover:scale-105 text-white font-semibold px-5 py-4 rounded-lg transition-all duration-200"
                        >
                            <Search className="w-8 h-8" />
                            Search
                        </button>
                    </div>

                    {searchedUser && (
                        <div className="bg-[#111] border !border-gray-700 rounded-xl p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 transition-all duration-200">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-gray-200 !hover:border-gray-400 transition-all">
                                    <img
                                        src={getUserProfileImage()}
                                        alt="profile"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div>
                                    <h6 className="font-semibold text-2xl text-white">{searchedUser?.username}</h6>
                                    <p className="text-xl text-gray-300">{searchedUser?.name}</p>
                                    <button
                                        className={`py-1 px-4 mt-2 text-lg font-semibold rounded-full ${searchedUser?.isVerified
                                            ? "bg-green-600"
                                            : "bg-red-600"
                                            }`}
                                    >
                                        {searchedUser?.isVerified ? "Active" : "Inactive"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {searchedUser && (
                        <>
                            <ReusableForm
                                label="Count"
                                name="count"
                                type="number"
                                value={formData.count}
                                onChange={handleInputChange}
                                placeholder={"Enter Team Count"}
                                icon={Coins}
                                required={true}
                            />
                            <ReusableForm
                                label="Select Position"
                                name="position"
                                type="select"
                                value={formData.position}
                                options={[{ label: "Left", value: "left" }, { label: "Right", value: "right" }]}
                                onChange={handleInputChange}
                                icon={Link}
                                required={true}
                            />

                            <div className="flex justify-end pt-4">
                                <button
                                    disabled={loading}
                                    onClick={handleSubmit}
                                    className="bg-[var(--cyan-active)] hover:scale-105 text-white font-bold px-10 py-3 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl text-xl"
                                >
                                    Submit
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

export default AddBotBusiness;

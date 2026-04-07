import { useState } from "react";
import { User, Search } from "lucide-react";
import Swal from "sweetalert2";
import ReusableForm from "../../../components/ui/ReusableForm";
import PageLoader from "../../../components/ui/PageLoader";
import { activateUserId, fetchUserByUsername } from "../../../api/user-api";
import { useDispatch, useSelector } from "react-redux";
import { getUserInfo } from "../../../api/auth-api";
import { setUserInfo } from "../../../redux/slice/UserInfoSlice";
import { useNavigate } from "react-router-dom";

const ActivateUserId = () => {
  const userInfo = useSelector((state) => state.userInfo?.userInfo?.user);
  const [searchedUser, setSearchedUser] = useState(null);
  const [searching, setSearching] = useState(false);
  const [activateLoading, setActivateLoading] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    amount: "",
    type: "",
    otp: "",
    tnxPass: "",
  });
  const dispatch = useDispatch();

  const getUserProfileImage = () => {
    return (
      userInfo?.profileImage ||
      "https://img.icons8.com/3d-fluency/94/guest-male--v2.png"
    );
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
      const res = await fetchUserByUsername(payload);
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
  const handleNavigate = () => {
    navigate("/activate-user-id");
  };

  const handleActivateUserId = async () => {
    try {
      if (userInfo?.pinIdCount <= 0) {
        return Swal.fire({
          icon: "error",
          title: "Error",
          text: "You have no PIN ID left to activate",
        });
      }
      setActivateLoading(true);
      const response = await activateUserId({
        username: searchedUser?.username,
      });
      if (response?.success) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: response?.message || "User ID activated successfully!",
        });
        handleSearchUser();
        const user = await getUserInfo();
        dispatch(setUserInfo(user));
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error?.response?.data?.message || "Failed to activate User ID",
      });
    } finally {
      setActivateLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen text-white mt-5">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 text-gray-300 text-xl">
            <span className="hover:text-gray-300 cursor-pointer transition-colors">
              Home
            </span>
            <span>/</span>
            <span className="hover:text-gray-300 cursor-pointer transition-colors">
              Activate User ID
            </span>
          </div>
          <h1 className="text-3xl font-bold mt-4">Activate User ID</h1>
        </div>

        <div className="p-4 border !border-gray-600 mb-5 rounded-2xl w-96 space-y-2">
          <p className="text-lg text-gray-400">Pin Id Count</p>
          <h2 className="text-3xl">{userInfo?.pinIdCount}</h2>
        </div>

        <div className="rounded-xl p-8 border !border-gray-600 space-y-6">
          <div className="flex items-end gap-3">
            <div className="flex-1">
              <ReusableForm
                type="text"
                label="Search Username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                placeholder={"Enter Username"}
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
              {searching ? "Searching..." : "Search"}
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
                  <h6 className="font-semibold text-2xl text-white">
                    {searchedUser?.username}
                  </h6>
                  <p className="text-xl text-gray-300">{searchedUser?.name}</p>
                  <button
                    className={`py-1 px-4 mt-2 text-lg font-semibold rounded-full ${
                      searchedUser?.isVerified ? "bg-green-600" : "bg-red-600"
                    }`}
                  >
                    {searchedUser?.isVerified ? "Active" : "Inactive"}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Amount & Submit */}
          {searchedUser && (
            <div>
              {searchedUser?.isVerified ? (
                <p className="text-xl">User ID is already active</p>
              ) : (
                <button
                  onClick={handleActivateUserId}
                  disabled={activateLoading || userInfo?.pinIdCount <= 0}
                  className={`py-3 px-4 mt-2 text-xl font-semibold rounded-lg disabled:cursor-not-allowed bg-cyan-600 hover:bg-cyan-700 transition-all duration-300`}
                >
                  {activateLoading ? "Activating..." : "Activate User ID"}
                </button>
              )}
            </div>
          )}
        </div>
        <div
          onClick={() => navigate("/user-pin-id-history")}
          className="flex items-center justify-center mt-5 cursor-pointer"
        >
          <span className="text-2xl max-w-2xl font-bold bg-green-600 border !border-gray-700 rounded-xl p-3 text-white text-center  flex justify-center hover:scale-105 transition-all duration-200 items-center gap-2 ">
            {" "}
            Go to History
          </span>
        </div>
      </div>
    </>
  );
};

export default ActivateUserId;

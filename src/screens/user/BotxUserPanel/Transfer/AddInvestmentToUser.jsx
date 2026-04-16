import { useState } from "react";
import { Coins, User, Search, Wallet, Lock } from "lucide-react";
import Swal from "sweetalert2";
import ReusableForm from "../../../../components/ui/ReusableForm";
import PageLoader from "../../../../components/ui/PageLoader";
import {
  makeP2PTransfer,
  fetchUserByUsername,
  sendOtptoUser,
  makeInvestmentToUser,
} from "../../../../api/user-api";
import { useDispatch, useSelector } from "react-redux";
import { getUserInfo } from "../../../../api/auth-api";
import { setUserInfo } from "../../../../redux/slice/UserInfoSlice";

const AddInvestmentToUser = () => {
  const userInfo = useSelector((state) => state.userInfo?.userInfo?.user);
  const [loading, setLoading] = useState(false);
  const [searchedUser, setSearchedUser] = useState(null);
  const [searching, setSearching] = useState(false);

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

  // 💸 P2P Transfer Function
  const handleP2PTransfer = async () => {
    try {
      if (
        !formData.username ||
        !formData.amount ||
        !formData.otp ||
        !formData.type ||
        !formData.tnxPass
      ) {
        return Swal.fire({
          icon: "error",
          title: "Error",
          text: "All fields are required",
        });
      }

      if (!searchedUser) {
        return Swal.fire({
          icon: "error",
          title: "No Receiver",
          text: "Please search and confirm receiver first.",
        });
      }

      if (Number(formData.amount) < 10) {
        return Swal.fire({
          icon: "error",
          title: "Invalid Amount",
          text: "Amount must be at least $10.",
        });
      }

      setLoading(true);
      const payload = {
        username: formData.username,
        amount: formData.amount,
        otp: formData.otp,
        type: formData.type,
        tnxPass: formData.tnxPass,
      };
      const response = await makeInvestmentToUser(payload);
      if (response?.success) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: response?.message || "Investment successful!",
        });
        const user = await getUserInfo();
        dispatch(setUserInfo(user));
        setFormData({ username: "", amount: "" });
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

  // inside component
  const handleGetOtp = async () => {
    const res = await sendOtptoUser();
    console.log(res.data);
    if (res?.success) {
      Swal.fire({
        icon: "success",
        title: "OTP Sent",
        text: `${res?.message || "OTP sent successfully"}. Check your device.`,
      });
      return true; // signal success -> ReusableForm starts cooldown
    } else {
      Swal.fire("Error", res?.message || "Failed to send OTP", "error");
      return false;
    }
  };

  return (
    <>
      {(loading || searching) && <PageLoader />}
      <div className="min-h-screen text-white mt-5">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 text-gray-300 text-xl">
            <span className="hover:text-gray-300 cursor-pointer transition-colors">
              Home
            </span>
            <span>/</span>
            <span className="hover:text-gray-300 cursor-pointer transition-colors">
              Make Investment
            </span>
          </div>
          <h1 className="text-3xl font-bold mt-4">Make Investment</h1>
        </div>

        {/* Wallet Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div className="bg-[#0f0f0f] border !border-gray-500 rounded-lg p-4">
            <h3 className="text-gray-300 text-xl mb-2">Main Wallet</h3>
            <p className="text-4xl font-bold text-white">
              ${userInfo?.currentEarnings?.toFixed(2)}
            </p>
          </div>
          <div className="bg-[#0f0f0f] border !border-gray-500 rounded-lg p-4">
            <h3 className="text-gray-300 text-xl mb-2">Package Wallet</h3>
            <p className="text-4xl font-bold text-white">
              ${userInfo?.packageWallet?.toFixed(2)}
            </p>
          </div>
        </div>

        {/* Transfer Section */}
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

          {/* Show Receiver Card */}
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
            <>
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
                label="Amount"
                name="amount"
                type="number"
                value={formData.amount}
                onChange={handleInputChange}
                placeholder={"Enter Amount"}
                icon={Coins}
                required={true}
              />

              <ReusableForm
                label="Transaction Password"
                name="tnxPass"
                type="password"
                value={formData.tnxPass}
                onChange={handleInputChange}
                placeholder={"Enter Transaction Password"}
                icon={Lock}
                required={true}
              />

              <ReusableForm
                label="OTP"
                name="otp"
                type="text" // text + inputMode gives better UX than number
                inputMode="numeric"
                maxLength={6}
                value={formData.otp}
                onChange={handleInputChange}
                placeholder="Enter OTP"
                icon={Coins}
                required={true}
                rightButton="Get OTP"
                onRightButtonClick={handleGetOtp}
                rightButtonCooldown={30} // optional: 30 seconds cooldown on success
                disabled={!formData.amount || !formData.type}
              />

              <div className="flex justify-end pt-4">
                <button
                  disabled={loading}
                  onClick={handleP2PTransfer}
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

export default AddInvestmentToUser;

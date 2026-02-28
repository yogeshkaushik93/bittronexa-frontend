import { useState } from "react";
import { Coins, User, Search, Wallet } from "lucide-react";
import Swal from "sweetalert2";
import ReusableForm from "../../../../components/ui/ReusableForm";
import PageLoader from "../../../../components/ui/PageLoader";
import { makeP2PTransfer, swapMainToPackage } from "../../../../api/user-api";
import { useDispatch, useSelector } from "react-redux";
import { getUserInfo } from "../../../../api/auth-api";
import { setUserInfo } from "../../../../redux/slice/UserInfoSlice";

const Swap = () => {
  const userInfo = useSelector((state) => state.userInfo?.userInfo?.user);
  const [loading, setLoading] = useState(false);
  const [searchedUser, setSearchedUser] = useState(null);
  const [searching, setSearching] = useState(false);

  const [formData, setFormData] = useState({
    amount: "",
  });
  const dispatch = useDispatch();


  // input change handler
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSwapAmount = async () => {
    try {
      if (Number(formData.amount) < 10) {
        return Swal.fire({
          icon: "error",
          title: "Invalid Amount",
          text: "Amount must be at least $10.",
        });
      }

      if (Number(formData.amount) > userInfo?.currentEarnings) {
        return Swal.fire({
          icon: "error",
          title: "Invalid Amount",
          text: "Amount must be less than your main wallet.",
        });
      }

      setLoading(true);
      const payload = {
        amount: formData.amount,
      };

      const response = await swapMainToPackage(payload);
      if (response?.success) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: response?.message || "Swap successful!",
        });
        const user = await getUserInfo();
        dispatch(setUserInfo(user));
        setFormData({ amount: "" });
      }
    } catch (error) {
      console.log("error in swapping", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error?.response?.data?.message || "Failed to swap",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <PageLoader />}
      <div className="min-h-screen text-white mt-5">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 text-gray-300 text-xl">
            <span className="hover:text-gray-300 cursor-pointer transition-colors">
              Home
            </span>
            <span>/</span>
            <span className="hover:text-gray-300 cursor-pointer transition-colors">
              Swap
            </span>
          </div>
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
          <>

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

            <div className="flex justify-end pt-4">
              <button
                disabled={loading}
                onClick={handleSwapAmount}
                className="bg-[var(--cyan-active)] hover:scale-105 text-white font-bold px-10 py-3 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl text-xl"
              >
                Submit
              </button>
            </div>
          </>
        </div>
      </div>
    </>
  );
};

export default Swap;

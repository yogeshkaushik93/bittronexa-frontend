// "use client";
// import React, { useEffect, useState } from "react";
// import { User, Mail, Phone, Globe, Lock } from "lucide-react";
// import ReusableForm from "../../../components/ui/ReusableForm";
// import { useDispatch, useSelector } from "react-redux";
// import Swal from "sweetalert2";
// import { updateUserProfile } from "../../../api/user-api";
// import PageLoader from "../../../components/ui/PageLoader";
// import { getUserInfo } from "../../../api/auth-api";
// import { setUserInfo } from "../../../redux/slice/UserInfoSlice";

// const Profile = () => {
//   const userInfo = useSelector((state) => state.userInfo?.userInfo?.user);
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     username: "",
//     // mobile: "8384810483",
//     // country: "India",
//     // password: "******",
//     // profileImage: null,
    
//   });
//   const [loading, setLoading] = useState(false);

//   const dispatch = useDispatch();


//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     if (name === "profileImage") {
//       setFormData({ ...formData, profileImage: files[0] });
//     } else {
//       setFormData({ ...formData, [name]: value });
//     }
//   };

//   const handleUpdate = async () => {
//     try {
//       setLoading(true);
//       const response = await updateUserProfile(formData);
//       if (response?.success) {
//         Swal.fire({
//           icon: 'success',
//           title: 'Success',
//           text: response?.message || 'Profile updated successfully',
//         });
//         const user = await getUserInfo();
//         dispatch(setUserInfo(user));
//       }
//     } catch (error) {
//       console("Error updating profile:", error);
//       Swal.fire({
//         icon: 'error',
//         title: 'Error',
//         text: error?.response?.data?.message || 'Failed to update profile',
//       });
//     } finally {
//       setLoading(false);
//     }
//   };


//   useEffect(() => {
//     if (userInfo) {
//       setFormData({
//         name: userInfo?.name,
//         email: userInfo?.email,
//         username: userInfo?.username,
//         // mobile: userInfo?.mobile,
//         // country: userInfo?.country,
//         // password: userInfo?.password,
//         // profileImage: userInfo?.profileImage,
//       });
//     }
//   }, [userInfo])


//   if (loading) return <PageLoader />

//   return (
//     <div className="min-h-screen text-white mt-5">
//       {/* Header */}
//       <div className="mb-6">
//         <h1 className="text-4xl font-semibold mb-3">Profile</h1>
//         <div className="flex items-center gap-2 text-gray-500 text-xl">
//           <span className="hover:text-gray-300 cursor-pointer transition-colors">
//             Home
//           </span>
//           <span>/</span>
//           <span className="hover:text-gray-300 cursor-pointer transition-colors">
//             Setting
//           </span>
//           <span>/</span>
//           <span className="text-gray-300">Profile</span>
//         </div>
//       </div>

//       {/* Profile Form */}
//       <div className="rounded-xl p-8 border !border-gray-800 space-y-6">
//         {/* Profile Image Upload */}
//         {/* <div className="flex items-center gap-6 mb-8">
//           <div className="w-24 h-24 rounded-full overflow-hidden border border-gray-700">
//             {formData.profileImage ? (
//               <img
//                 src={URL.createObjectURL(formData.profileImage)}
//                 alt="Profile Preview"
//                 className="w-full h-full object-cover"
//               />
//             ) : (
//               <img
//                 src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
//                 alt="Default Avatar"
//                 className="w-full h-full object-cover"
//               />
//             )}
//           </div>
//           <div className="flex-1">
//             <ReusableForm
//               label="Upload Profile Image"
//               name="profileImage"
//               type="file"
//               onChange={handleChange}
//             />
//           </div>
//         </div> */}

//         {/* Name */}
//         <ReusableForm
//           label="Full Name"
//           name="name"
//           value={formData.name}
//           onChange={handleChange}
//           icon={User}
//         />
//         <ReusableForm
//           label="Username"
//           name="text"
//           type="username"
//           value={formData.username}
//           onChange={handleChange}
//           icon={User}
//           disabled={true}
//         />
//         <ReusableForm
//           label="Email"
//           name="email"
//           type="email"
//           value={formData.email}
//           onChange={handleChange}
//           icon={Mail}
//           disabled={true}
//         />

//         {/* Email + Country */}
//         {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//           <ReusableForm
//             label="Country"
//             name="country"
//             value={formData.country}
//             onChange={handleChange}
//             icon={Globe}
//           />
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//           <ReusableForm
//             label="Mobile Number"
//             name="mobile"
//             type="tel"
//             value={formData.mobile}
//             onChange={handleChange}
//             icon={Phone}
//           />

//           <ReusableForm
//             label="Transaction Password"
//             name="password"
//             type="password"
//             value={formData.password}
//             onChange={handleChange}
//             icon={Lock}
//           />
//         </div> */}

//         {/* Submit Button */}
//         <div className="flex justify-end pt-4">
//           <button
//             onClick={handleUpdate}
//             className="bg-[var(--cyan-active)] hover:scale-105 text-white font-bold px-10 py-3 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl text-xl"
//           >
//             Update
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;





"use client";
import React, { useEffect, useState } from "react";
import { User, Mail, Lock, EyeOff, Eye } from "lucide-react";
import ReusableForm from "../../../components/ui/ReusableForm";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { setupTransactionPassword, updateUserProfile } from "../../../api/user-api";
import PageLoader from "../../../components/ui/PageLoader";
import { getUserInfo } from "../../../api/auth-api";
import { setUserInfo } from "../../../redux/slice/UserInfoSlice";

const Profile = () => {
  const userInfo = useSelector((state) => state.userInfo?.userInfo?.user);
  const [activeTab, setActiveTab] = useState("profile");
  const [showTxnPassword, setShowTxnPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    username: "",
  });
  const [transactionPassword, setTransactionPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "profileImage") {
      setFormData({ ...formData, profileImage: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleUpdate = async () => {
    try {
      setLoading(true);
      const response = await updateUserProfile(formData);
      if (response?.success) {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: response?.message || 'Profile updated successfully',
        });
        const user = await getUserInfo();
        dispatch(setUserInfo(user));
      }
    } catch (error) {
      console("Error updating profile:", error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error?.response?.data?.message || 'Failed to update profile',
      });
    } finally {
      setLoading(false);
    }
  };

  // const handleTransactionPasswordUpdate = async () => {
  //   if (!transactionPassword) {
  //     Swal.fire({
  //       icon: 'warning',
  //       title: 'Warning',
  //       text: 'Please enter transaction password',
  //     });
  //     return;
  //   }
    
  //   try {
  //     setLoading(true);
  //     // API call for transaction password update
  //     const payload ={ password: transactionPassword }
  //     const response = await setupTransactionPassword(payload);
  //     Swal.fire({
  //       icon: 'success',
  //       title: 'Success',
  //       text: 'Transaction password updated successfully',
  //     });
  //     setTransactionPassword("");
  //   } catch (error) {
  //     Swal.fire({
  //       icon: 'error',
  //       title: 'Error',
  //       text: 'Failed to update transaction password',
  //     });
  //   } finally {
  //     setLoading(false);
  //   }
  // };


  const handleTransactionPasswordUpdate = async () => {
  if (!transactionPassword) {
    Swal.fire({
      icon: 'warning',
      title: 'Warning',
      text: 'Please enter transaction password',
    });
    return;
  }

  try {
    setLoading(true);

    const payload = { password: transactionPassword };
    const response = await setupTransactionPassword(payload);

    // Backend always sends { success: boolean, message: string }
    if (response?.success) {
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: response.message || "Transaction password updated",
      });
      setTransactionPassword("");
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: response?.message || "Failed to update transaction password",
      });
    }
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: error?.response?.data?.message || "Something went wrong",
    });
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    if (userInfo) {
      setFormData({
        name: userInfo?.name,
        email: userInfo?.email,
        username: userInfo?.username,
      });
    }
  }, [userInfo]);


  
const toggleTxnPasswordVisibility = () => {
  setShowTxnPassword((prev) => !prev);
};
  if (loading) return <PageLoader />;

  return (
    <div className="min-h-screen text-white mt-5">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-4xl font-semibold mb-3">Profile</h1>
        <div className="flex items-center gap-2 text-gray-500 text-xl">
          <span className="hover:text-gray-300 cursor-pointer transition-colors">
            Home
          </span>
          <span>/</span>
          <span className="hover:text-gray-300 cursor-pointer transition-colors">
            Setting
          </span>
          <span>/</span>
          <span className="text-gray-300">Profile</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-6 border-b  border-gray-800">
        <button
          onClick={() => setActiveTab("profile")}
          className={`px-6 py-3 text-2xl border mb-2 !border-gray-700 rounded-xl font-medium transition-all duration-200 ${
            activeTab === "profile"
              ? "text-white  font-bold border-b-2 bg-[#0891B2] border-[var(--cyan-active)]"
              : "text-gray-400 hover:text-gray-300"
          }`}
        >
          Profile
        </button>
        <button
          onClick={() => setActiveTab("transaction")}
          className={`px-6 py-3  mb-3 font-medium border rounded-xl !border-gray-700  text-2xl transition-all duration-200 ${
            activeTab === "transaction"
              ? "text-white font-bold border-b-2 bg-[#0891B2]"
              : "text-gray-400 hover:text-gray-300"
          }`}
        >
          Setup Transaction Password
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === "profile" ? (
        <div className="rounded-xl p-8 border !border-gray-800 space-y-6">
          {/* Name */}
          <ReusableForm
            label="Full Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            icon={User}
          />
          <ReusableForm
            label="Username"
            name="text"
            type="username"
            value={formData.username}
            onChange={handleChange}
            icon={User}
            disabled={true}
          />
          <ReusableForm
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            icon={Mail}
            disabled={true}
          />

          {/* Submit Button */}
          <div className="flex justify-end pt-4">
            <button
              onClick={handleUpdate}
              className="bg-[var(--cyan-active)] hover:scale-105 text-white font-bold px-10 py-3 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl text-xl"
            >
              Update
            </button>
          </div>
        </div>
      ) : (
     <div className="rounded-xl p-8 border !border-gray-800 space-y-6">
  {/* Transaction Password Input */}
  <div className="space-y-2">
    <label className="block text-gray-300 text-2xl font-medium mb-2">
      Transaction Password
    </label>

    <div className="relative">
      <Lock
        className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400"
        size={20}
      />

      <input
        type={showTxnPassword ? "text" : "password"}
        value={transactionPassword}
        onChange={(e) => setTransactionPassword(e.target.value)}
        placeholder="Enter transaction password"
        className="w-full bg-transparent border border-gray-700 rounded-lg px-12 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[var(--cyan-active)] transition-all duration-200 text-lg"
      />

      {/* 👁 Toggle Icon */}
      <div
        onClick={toggleTxnPasswordVisibility}
        className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-gray-200 transition"
      >
        {showTxnPassword ? (
          <EyeOff size={22} />
        ) : (
          <Eye size={22} />
        )}
      </div>
    </div>
  </div>

  {/* Submit Button */}
  <div className="flex justify-end pt-4">
    <button
      onClick={handleTransactionPasswordUpdate}
      className="bg-[var(--cyan-active)] hover:scale-105 text-white font-bold px-10 py-3 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl text-xl"
    >
      Setup Transaction Password
    </button>
  </div>
</div>
      )}
    </div>
  );
};

export default Profile;
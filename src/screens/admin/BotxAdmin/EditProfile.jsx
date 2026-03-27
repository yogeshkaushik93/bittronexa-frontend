

import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { User, Mail, CheckCircle, Save, FileLock, LockKeyhole } from "lucide-react";
import { editUserBotxAdmin } from "../../../api/admin-api";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const location = useLocation();
  const rowData = location.state?.rowData;
  const [formData, setFormData] = useState({
    name: rowData?.name || "",
    email: rowData?.email || "",
    role: rowData?.role || "user",
    status: rowData?.status || false,
    rank: rowData?.rank || "None",
    tnxPassword: "",
    Password: "",
  });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false)
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    setLoading(true)
    e.preventDefault();

    const payload = {
      name: formData.name,
      email: formData.email,
      userId: rowData._id,
      tnxPassword: formData.tnxPassword,
      Password: formData.Password

    };

    console.log("🟢 Payload to send:", payload);

    try {
      const res = await editUserBotxAdmin(payload);
      console.log("🟢 API Response:", res);

      if (res?.success) {
        Swal.fire({
          icon: "success",
          title: "Profile Updated",
          text: res?.message || "Admin profile updated successfully!",
          showConfirmButton: false,
          timer: 2000,
        });
        navigate(-1); // Go back to the previous page
      } else {
        Swal.fire({
          icon: "error",
          title: "Update Failed",
          text: res?.message || "Something went wrong!",
        });
      }
    } catch (error) {
      console.error("❌ Error updating profile:", error);
      Swal.fire({
        icon: "error",
        title: "Server Error",
        text: "Unable to update profile. Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" text-white flex flex-col items-center justify-center p-6">
      {/* Back Button */}
      {/* <div className="w-full max-w-2xl mb-6">
        <button
          onClick={() => window.history.back()}
          className="flex items-center gap-2 text-2xl text-gray-300 hover:text-white transition-colors backdrop-blur-sm bg-white/10 px-4 py-2 rounded-lg border border-white/20"
        >
          <ArrowLeft className="w-8 h-8" />
          Back
        </button>
      </div> */}



      {rowData ? (
        <form
          onSubmit={handleSubmit}
          className="backdrop-blur-xl bg-white/10 border border-white/20 p-8 rounded-3xl w-full max-w-2xl space-y-6 shadow-2xl"
        >
          {/* Name Field */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-2xl text-gray-300 font-semibold">
              <User className="w-8 h-8 text-purple-400" />
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter full name"
              className="w-full p-4 text-2xl rounded-xl bg-white/5 border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all placeholder:text-gray-500 backdrop-blur-sm"
            />
          </div>

          {/* Email Field */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-2xl text-gray-300 font-semibold">
              <Mail className="w-8 h-8 text-blue-400" />
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email address"
              className="w-full p-4 text-2xl rounded-xl bg-white/5 border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-gray-500 backdrop-blur-sm"
            />
          </div>
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-2xl text-gray-300 font-semibold">

              <FileLock className="w-8 h-8 text-blue-400" />
              Transaction Password
            </label>
            <input
              type="text"
              name="tnxPassword"
              value={formData.transactionPassword}
              onChange={handleChange}
              placeholder="Enter Transaction Password"
              className="w-full p-4 text-2xl rounded-xl bg-white/5 border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-gray-500 backdrop-blur-sm"
            />
          </div>
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-2xl text-gray-300 font-semibold">
              {/* <Mail className="w-8 h-8 text-blue-400" /> */}
              <LockKeyhole className="w-8 h-8 text-blue-400" />
              Change Password
            </label>
            <input
              type="text"
              name="Password"
              value={formData.transactionPassword}
              onChange={handleChange}
              placeholder="Enter Login Password "
              className="w-full p-4 text-2xl rounded-xl bg-white/5 border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-gray-500 backdrop-blur-sm"
            />
          </div>

          {/* Role Field */}
          {/* <div className="space-y-2">
            <label className="flex items-center gap-2 text-2xl text-gray-300 font-semibold">
              <Shield className="w-8 h-8 text-green-400" />
              Role
            </label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full p-4 text-2xl rounded-xl bg-white/5 border border-white/20 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all backdrop-blur-sm cursor-pointer"
            >
              <option value="user" className="bg-gray-800">User</option>
              <option value="admin" className="bg-gray-800">Admin</option>
            </select>
          </div> */}

          {/* Rank Field */}
          {/* <div className="space-y-2">
            <label className="flex items-center gap-2 text-2xl text-gray-300 font-semibold">
              <Award className="w-8 h-8 text-yellow-400" />
              Rank
            </label>
            <input
              type="text"
              name="rank"
              value={formData.rank}
              onChange={handleChange}
              placeholder="Enter rank"
              className="w-full p-4 text-2xl rounded-xl bg-white/5 border border-white/20 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all placeholder:text-gray-500 backdrop-blur-sm"
            />
          </div> */}

          {/* Status Toggle */}
          <div className="flex items-center space-x-4 p-4 rounded-xl bg-white/5 border border-white/20 backdrop-blur-sm">
            <input
              type="checkbox"
              name="status"
              checked={formData.status}
              onChange={handleChange}
              className="w-8 h-8 rounded cursor-pointer accent-green-500"
              id="status-toggle"
              disabled
            />
            <label
              htmlFor="status-toggle"
              className="flex items-center gap-3 text-2xl text-gray-300 cursor-pointer select-none"
            >
              <CheckCircle className={`w-8 h-8 ${formData.status ? 'text-green-400' : 'text-gray-500'}`} />
              Active Status
              <span className={`ml-2 px-3 py-1 rounded-full text-xl font-semibold ${formData.status
                  ? 'bg-green-500/20 text-green-400 border border-green-500/50'
                  : 'bg-gray-500/20 text-gray-400 border border-gray-500/50'
                }`}>
                {formData.status ? 'Active' : 'Inactive'}
              </span>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-black-600 to-gray-600 hover:from-gray-700 hover:to-black-700 transition-all p-4 rounded-xl font-bold text-2xl shadow-lg hover:shadow-purple-500/50 flex items-center justify-center gap-3 group"
          >
            <Save className="w-8 h-8 group-hover:scale-110 transition-transform" />
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </form>
      ) : (
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 p-12 rounded-3xl text-center">
          <p className="text-3xl text-gray-400">No data received</p>
        </div>
      )}
    </div>
  );
};

export default EditProfile;
import React, { useState } from "react";
import Swal from "sweetalert2";
import { registerBulkuser } from "../../api/admin-api";

const BulkRegister = () => {
  const [baseName, setBaseName] = useState("");
  const [baseEmail, setBaseEmail] = useState("");
  const [userCount, setUserCount] = useState("");
  const [referredBy, setReferredBy] = useState("");
  const [password, setPassword] = useState("");
  const [position, setPosition] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      baseName,
      baseEmail,
      userCount: Number(userCount),
      referredBy,
      password,
      position,
    };

    try {
      const response = await registerBulkuser(payload);
      if (!response?.success) {
        throw new Error("Bulk user creation failed");
      }

      Swal.fire({
        icon: "success",
        title: "Users Created Successfully ✅",
        text: "Bulk users have been created successfully.",
        confirmButtonText: "Done",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Registration Failed ❌",
        text:
          error?.response?.data?.message ||
          error?.message ||
          "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setBaseName("");
    setBaseEmail("");
    setUserCount("");
    setReferredBy("");
    setPassword("");
    setPosition("");
  };

  return (
    <div className="min-h-screen p-6">
      <div className="w-full mx-auto">
        <div className="border !border-gray-500 rounded-lg shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-300 font-medium text-2xl mb-2">
                Base Name *
              </label>
              <input
                type="text"
                value={baseName}
                onChange={(e) => setBaseName(e.target.value)}
                required
                placeholder="Name"
                className="w-full px-4 py-3 bg-transparent border !border-gray-600 rounded-lg text-white text-xl"
              />
            </div>

            {/* Base Email */}
            <div>
              <label className="block text-gray-300 text-2xl font-medium mb-2">
                Base Email *
              </label>
              <input
                type="email"
                value={baseEmail}
                onChange={(e) => setBaseEmail(e.target.value)}
                required
                placeholder="Email"
                className="w-full px-4 py-3 bg-transparent border !border-gray-600 rounded-lg text-white text-xl"
              />
            </div>

            {/* User Count */}
            <div>
              <label className="block text-gray-300 text-2xl font-medium mb-2">
                Number of Users *
              </label>
              <input
                type="number"
                value={userCount}
                onChange={(e) => setUserCount(e.target.value)}
                min="1"
                required
                placeholder="Numbers of Users"
                className="w-full px-4 py-3 bg-transparent border !border-gray-600 rounded-lg text-white text-xl"
              />
            </div>

            {/* Referred By */}
            <div>
              <label className="block text-gray-300 text-2xl font-medium mb-2">
                Referred By
              </label>
              <input
                type="text"
                value={referredBy}
                onChange={(e) =>
                  setReferredBy(e.target.value.toUpperCase().trim())
                }
                placeholder="Referral Code"
                className="w-full px-4 py-3 bg-transparent border !border-gray-600 rounded-lg text-white text-xl"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-gray-300 text-2xl font-medium mb-2">
                Position *
              </label>
              <select
                name="position"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                required
                className="w-full px-4 py-3 bg-transparent border !border-gray-600 rounded-lg text-white text-xl"
              >
                {/* Default empty option */}
                <option value="" disabled className="text-black">
                  Select Position
                </option>

                <option value="left" className="text-black">
                  Left
                </option>

                <option value="right" className="text-black">
                  Right
                </option>
              </select>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-2xl py-3 rounded-lg disabled:opacity-50"
              >
                {loading ? "Creating Users..." : "Create Users"}
              </button>

              <button
                type="button"
                onClick={handleReset}
                className="flex-1 bg-gray-700 text-white text-2xl py-3 rounded-lg"
              >
                Reset Form
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BulkRegister;

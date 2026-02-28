// import React, { useState } from "react";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import { CheckCircle, XCircle } from "lucide-react";
// import { getTotalTeams} from "../../../api/user-api"
// import ReusableDataTable from "../../../components/ui/ReusableTable";
// const Totalteams = () => {
//   const [startDate, setStartDate] = useState(new Date("2022-08-05"));
//   const [endDate, setEndDate] = useState(new Date("2025-12-15"));
//   const [position, setPosition] = useState("Right");

// const [teams, setTeams] = useState([]);
// const [loading, setLoading] = useState(false);
// const [error, setError] = useState(null);

// const totalTeamsColumns = [
//   {
//     label: "#",
//     key: "sr",
//     sortable: false,
//     render: (_, __, index) => index + 1,
//   },
//   {
//     label: "Username",
//     key: "username",
//   },
//   {
//     label: "Name",
//     key: "name",
//   },
//   {
//     label: "Email",
//     key: "email",
//   },
//   {
//     label: "Leg",
//     key: "leg",
//     render: (val) => (
//       <span
//         className={`px-3 py-1 rounded-full text-sm capitalize ${
//           val === "left"
//             ? "bg-blue-500/20 text-blue-400"
//             : "bg-purple-500/20 text-purple-400"
//         }`}
//       >
//         {val}
//       </span>
//     ),
//   },
//   {
//     label: "Rank",
//     key: "rank",
//   },
//   {
//     label: "Verified",
//     key: "isVerified",
//     render: (val) =>
//       val ? (
//         <span className="flex items-center gap-2 text-green-400">
//           <CheckCircle size={16} /> Yes
//         </span>
//       ) : (
//         <span className="flex items-center gap-2 text-red-400">
//           <XCircle size={16} /> No
//         </span>
//       ),
//   },
//   {
//     label: "Active",
//     key: "activeItself",
//     render: (val) =>
//       val ? (
//         <span className="text-green-400 font-semibold">Active</span>
//       ) : (
//         <span className="text-yellow-400 font-semibold">Inactive</span>
//       ),
//   },
//   {
//     label: "Joined On",
//     key: "createdAt",
//     render: (val) =>
//       val
//         ? new Date(val).toLocaleDateString("en-GB", {
//             day: "2-digit",
//             month: "short",
//             year: "numeric",
//           })
//         : "-",
//   },
// ];

// const handleFilter = async () => {
//   const formatDate = (date) => {
//     const day = String(date.getDate()).padStart(2, "0");
//     const month = String(date.getMonth() + 1).padStart(2, "0");
//     const year = date.getFullYear();
//     return `${day}-${month}-${year}`;
//   };


//   const payload = {
//     startDate: formatDate(startDate),
//     endDate: formatDate(endDate),
//     position: position.toLocaleLowerCase(),
//   };

//   try {
//     setLoading(true);
//     setError(null);

//     const res = await getTotalTeams(payload);
//   console.log(res)
//     if (!res?.success) {
//       throw new Error(res?.message || "Failed to fetch teams");
//     }

//     setTeams(res?.data?.users || []);
//   } catch (err) {
//     console.error("getTotalTeams error:", err);
//     setError(err.message);
//   } finally {
//     setLoading(false);
//   }
// };




//   return (
//     <div className="w-full min-h-screen bg-transparent p-8 text-white">
//       <div className="w-full mx-auto">
//         {/* Header */}
//         <div className="mb-8">
//           {/* <h1 className="text-3xl font-bold text-orange-500 border-b-2 border-orange-500 inline-block pb-2">
//             Total Amount!
//           </h1> */}
//         </div>

//         {/* Filter Section */}
//         <div className="bg-transparent border-2 border-gray-700 rounded-lg p-6">
//           <div className="flex flex-wrap gap-4 items-end">
//             {/* Start Date */}
//             <div className="flex-1 min-w-[200px]">
//               <DatePicker
//                 selected={startDate}
//                 onChange={(date) => setStartDate(date)}
//                 dateFormat="dd-MM-yyyy"
//                 maxDate={endDate}
//                 showMonthDropdown
//                 showYearDropdown
//                 dropdownMode="select"
//                 calendarClassName="custom-datepicker"
//                 className="w-full bg-transparent border-2 border-gray-700 rounded-lg px-4 py-3 text-xl text-white focus:outline-none focus:border-orange-500 transition-colors cursor-pointer"
//               />
//             </div>

//             {/* End Date */}
//             <div className="flex-1 min-w-[200px]">
//               <DatePicker
//                 selected={endDate}
//                 onChange={(date) => setEndDate(date)}
//                 dateFormat="dd-MM-yyyy"
//                 minDate={startDate}
//                 showMonthDropdown
//                 showYearDropdown
//                 dropdownMode="select"
//                 calendarClassName="custom-datepicker"
//                 className="w-full bg-transparent border-2 border-gray-700 rounded-lg px-4 py-3 text-xl text-white focus:outline-none focus:border-orange-500 transition-colors cursor-pointer"
//               />
//             </div>

//             {/* Position */}
//             <div className="flex-1 min-w-[200px]">
//               <select
//                 value={position}
//                 onChange={(e) => setPosition(e.target.value)}
//                 className="w-full bg-transparent border-2 text-xl border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-colors cursor-pointer"
//               >
//                 <option value="Left" className="bg-gray-800 ">
//                   Left
//                 </option>
//                 <option value="Right" className="bg-gray-800">
//                   Right
//                 </option>
//               </select>
//             </div>

//             {/* Filter Button */}
//             <div>
//               <button
//                 onClick={handleFilter}
//                 className="bg-[#0891B2] hover:bg-[#0891B2] text-2xl text-white font-semibold px-8 py-3 rounded-lg transition-colors duration-200"
//               >
//                 Filter
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Content Area */}
//        <ReusableDataTable
//   data={teams}     // 👈 API se aaya hua users array
//   columns={totalTeamsColumns}
// />
//       </div>
//     </div>
//   );
// };

// export default Totalteams;




import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CheckCircle, XCircle } from "lucide-react";
import { getTotalTeams } from "../../../api/user-api";
import ReusableDataTable from "../../../components/ui/ReusableTable";

const Totalteams = () => {
  const [startDate, setStartDate] = useState(new Date("2022-08-05"));
  const [endDate, setEndDate] = useState(new Date());
  const [position, setPosition] = useState("all");

  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // ---------- table columns ----------
  const totalTeamsColumns = [
    {
      label: "#",
      key: "sr",
      sortable: false,
      render: (_, __, index) => index + 1,
    },
    { label: "Username", key: "username" },
    { label: "Name", key: "name" },
    { label: "Trading Package", key: "totalInvestment", render: (val) => `$${val}` || "N/A" },
    {
      label: "Leg",
      key: "leg",
      render: (val) => (
        <span
          className={`px-3 py-1 rounded-full capitalize ${val === "left"
            ? "bg-blue-500/20 text-blue-400"
            : "bg-purple-500/20 text-purple-400"
            }`}
        >
          {val}
        </span>
      ),
    },
    { label: "Rank", key: "rank" },
    {
      label: "Verified",
      key: "isVerified",
      render: (val) =>
        val ? (
          <span className="flex items-center gap-2 text-green-400">
            <CheckCircle size={16} /> Yes
          </span>
        ) : (
          <span className="flex items-center gap-2 text-red-400">
            <XCircle size={16} /> No
          </span>
        ),
    },
    {
      label: "Active",
      key: "activePackage",
      render: (val) =>
        val ? (
          <span className="text-green-400 font-semibold">Active</span>
        ) : (
          <span className="text-yellow-400 font-semibold">Inactive</span>
        ),
    },
    {
      label: "Joined On",
      key: "createdAt",
      render: (val) =>
        val
          ? new Date(val).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })
          : "-",
    },
    {
      label: "Activation Date",
      key: "activeDate",
      render: (val) =>
        val
          ? new Date(val).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })
          : "-",
    },
  ];

  // ---------- helpers ----------
  const formatDate = (date) => {
    return date.toISOString().split("T")[0]; // yyyy-MM-dd
  };


  // ---------- filter ----------
  const handleFilter = async () => {
    const payload = {
      startDate: formatDate(startDate),
      endDate: formatDate(endDate),
      position: position === "all" ? null : position.toLowerCase(),
    };

    try {
      setLoading(true);
      setError(null);

      const res = await getTotalTeams(payload);
      if (!res?.success) {
        throw new Error(res?.message || "Failed to fetch teams");
      }
      const updatedData = (res.users || []).map((item, index) => ({
        ...item,
        sr: index + 1,
        activePackage: item.isVerified || item.activeItself
      }))
      setTeams(updatedData);
    } catch (err) {
      console.error("getTotalTeams error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen p-8 text-white">
      <div className="border border-gray-700 rounded-lg p-6 mb-6">
        <div className="flex flex-wrap gap-4 items-end">
          <DatePicker
            selected={startDate}
            onChange={setStartDate}
            dateFormat="dd-MM-yyyy"
            maxDate={endDate}
            className="bg-transparent border border-gray-700 rounded-lg px-4 py-3 text-xl text-white"
          />

          <DatePicker
            selected={endDate}
            onChange={setEndDate}
            dateFormat="dd-MM-yyyy"
            minDate={startDate}
            className="bg-transparent border border-gray-700 rounded-lg px-4 py-3 text-xl text-white"
          />

          <select
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            className="bg-transparent border border-gray-700 rounded-lg px-4 py-3 text-xl text-white"
          >
            <option value="all" className="bg-gray-900">All</option>
            <option value="left" className="bg-gray-900">Left</option>
            <option value="right" className="bg-gray-900">Right</option>
          </select>

          <button
            onClick={handleFilter}
            disabled={loading}
            className="bg-cyan-600 px-8 py-3 rounded-lg text-xl font-semibold disabled:opacity-50"
          >
            {loading ? "Loading..." : "Filter"}
          </button>
        </div>
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <ReusableDataTable
        data={teams}
        columns={totalTeamsColumns}
      />
    </div>
  );
};

export default Totalteams;

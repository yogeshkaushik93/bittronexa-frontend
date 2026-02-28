// import React, { useEffect, useState } from 'react'
// import { getIbIncomeHistory } from '../../../api/admin-api'

// export default function AdminIbIncomeHistory() {
//   const [data, setData] = useState([])
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState(null)

//   const fetchHistory = async (signal) => {
//     try {
//       setLoading(true)
//       setError(null)
//       const res = await getIbIncomeHistory(signal ? { signal } : undefined)
//       setData(res?.data ?? res ?? [])
//     } catch (e) {
//       if (e.name === 'AbortError') return
//       setError(e.message || 'Failed to load IB income history')
//     } finally {
//       setLoading(false)
//     }
//   }

//   useEffect(() => {
//     const controller = new AbortController()
//     fetchHistory(controller.signal)
//     return () => controller.abort()
//   }, [])

//   return (
//     <div className="p-4 max-w-6xl mx-auto">
//       <div className="flex items-center justify-between mb-4">
//         <h2 className="text-xl font-semibold">IB Income History</h2>
//         <div className="flex gap-2">
//           <button
//             onClick={() => fetchHistory()}
//             className="px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700"
//           >
//             Refresh
//           </button>
//         </div>
//       </div>

//       {loading && <div className="py-8 text-center">Loading...</div>}
//       {error && <div className="bg-red-100 text-red-800 p-3 rounded mb-4">{error}</div>}
//       {!loading && data.length === 0 && <div className="text-center text-gray-500 py-8">No records found</div>}

//       {data.length > 0 && (
//         <div className="overflow-x-auto bg-white rounded shadow-sm">
//           <table className="w-full table-auto">
//             <thead>
//               <tr className="text-left">
//                 <th className="p-3 border-b">Date</th>
//                 <th className="p-3 border-b">User</th>
//                 <th className="p-3 border-b">From</th>
//                 <th className="p-3 border-b">Amount</th>
//                 <th className="p-3 border-b">Remark</th>
//               </tr>
//             </thead>
//             <tbody>
//               {data.map((row) => (
//                 <tr key={row._id ?? row.id ?? Math.random()}>
//                   <td className="p-3 border-b">{new Date(row.createdAt ?? row.date ?? Date.now()).toLocaleString()}</td>
//                   <td className="p-3 border-b">{row.userId?.name ?? row.userName ?? row.userId ?? '—'}</td>
//                   <td className="p-3 border-b">{row.fromUserId?.name ?? row.fromUserName ?? row.fromUserId ?? '—'}</td>
//                   <td className="p-3 border-b">{row.amount ?? row.income ?? row.value ?? '—'}</td>
//                   <td className="p-3 border-b">{row.remark ?? row.type ?? '—'}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   )
// }


import React, { useEffect, useState } from "react";

import { getIbIncomeHistory } from "../../../api/admin-api";
import ReusableDataTable from "../../../components/ui/ReusableTable";

const AdminIbIncomeHistory = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      setLoading(true);
      const res = await getIbIncomeHistory();
      setData(res?.data || []);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
   
    {
      label: "Username",
      key: "userId",
      render: (val) => val?.username || "—",
    },
    {
      label: "Name",
      key: "userId",
      render: (val) => val?.name || "—",
    },
    {
      label: "Email",
      key: "userId",
      render: (val) => val?.email || "—",
    },
    {
      label: "Rank",
      key: "rank",
    },
    {
      label: "Weak Leg Business",
      key: "weakLegBusiness",
    },
    {
      label: "%",
      key: "percent",
    },
    {
      label: "Bonus Amount",
      key: "bonusAmount",
      render: (val) => `$${val?.toFixed(2)}`,
    },
    {
      label: "Status",
      key: "status",
      render: (val) => (
        <span className={`px-3 py-1 rounded-full text-sm font-semibold 
        ${val === "PENDING" ? "bg-yellow-500 text-black" : "bg-green-500 text-white"}`}>
          {val}
        </span>
      ),
    },
    {
      label: "Date",
      key: "createdAt",
      render: (val) => val ? new Date(val).toLocaleString() : "—",
    },
  ];


  return (
    <div>
      {loading ? (
        <div className="text-center text-white py-10">Loading...</div>
      ) : (
        <ReusableDataTable data={data} columns={columns} />
      )}
    </div>
  );
};

export default AdminIbIncomeHistory;

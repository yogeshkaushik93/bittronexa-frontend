// // import React, { useEffect } from 'react'
// // import { getRankRewardIncome } from '../../../api/admin-api';

// // const RankReward = () => {

// //     const fetchData = async () => {
// //         const response = await getRankRewardIncome();
// //         console.log(response)
// //     }
// //     useEffect(() => {
// //         fetchData();
// //     }, []);

// //   return (
// //     <div>
      
// //     </div>
// //   )
// // }

// // export default RankReward

// import React, { useEffect, useState } from 'react';
// import ReusableDataTable from '../../../components/ui/ReusableTable';
// import { getRankRewardIncome } from '../../../api/admin-api';

// const RankReward = () => {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [apiMessage, setApiMessage] = useState(null);

//   const fetchData = async () => {
//     setLoading(true);
//     setError(null);
//     setApiMessage(null);
//     try {
//       const response = await getRankRewardIncome();
//       console.log('✅ Rank Reward Income Report:', response);
//       if (response?.success === false) {
//         setApiMessage(response?.message || 'No data available.');
//         setData([]);
//       } else {
//         setData(response?.data || []);
//         setApiMessage(null);
//       }
//     } catch (err) {
//       console.error('❌ Error fetching rank reward income:', err);
//       setError('Failed to fetch rank reward income report.');
//       setApiMessage(null);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   // Define columns for the table
//   const columns = [
//     {
//       key: 'username',
//       label: 'Username',
//       sortable: true,
//       render: (value, row) => row.userId?.username || '-',
//     },
//     {
//       key: 'name',
//       label: 'Name',
//       sortable: true,
//       render: (value, row) => row.userId?.name || '-',
//     },
//     {
//       key: 'email',
//       label: 'Email',
//       sortable: true,
//       render: (value, row) => row.userId?.email || '-',
//     },
//     {
//       key: 'achievedPairs',
//       label: 'Achieved Pairs',
//       sortable: true,
//       render: (value, row) => row.achievedPairs || 0,
//     },
//     {
//       key: 'rewardAmount',
//       label: 'Reward Amount',
//       sortable: true,
//       render: (value, row) => row.rewardAmount || 0,
//     },
//     {
//       key: 'rankTitle',
//       label: 'Rank Title',
//       sortable: true,
//       render: (value, row) => row.rankTitle || '-',
//     },
//     {
//       key: 'achievedAt',
//       label: 'Achieved At',
//       sortable: true,
//       render: (value, row) => new Date(row.achievedAt).toLocaleString() || '-',
//     },
//     {
//       key: 'createdAt',
//       label: 'Created At',
//       sortable: true,
//       render: (value, row) => new Date(row.createdAt).toLocaleString() || '-',
//     },
//     {
//       key: 'updatedAt',
//       label: 'Updated At',
//       sortable: true,
//       render: (value, row) => new Date(row.updatedAt).toLocaleString() || '-',
//     },
//   ];

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-6 text-white">Rank Reward Report</h1>
//       {loading && (
//         <div className="flex justify-center items-center h-64">
//           <div className="text-lg text-gray-400">Loading Rank Reward Report...</div>
//         </div>
//       )}
//       {error && (
//         <div className="flex justify-center items-center h-64">
//           <div className="text-red-400 text-lg">{error}</div>
//         </div>
//       )}
//       {!loading && !error && (
//         <div>
//           {apiMessage && (
//             <div className="mb-4 p-4 bg-red-500 bg-opacity-20 border border-red-500 rounded-lg text-red-300">
//               {apiMessage}
//             </div>
//           )}
//           <ReusableDataTable data={data} columns={columns} />
//         </div>
//       )}
//     </div>
//   );
// };

// export default RankReward;


import React, { useEffect, useState } from 'react';
import ReusableDataTable from '../../../components/ui/ReusableTable';
import { getRankRewardIncome } from '../../../api/admin-api';

const RankReward = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [noDataMessage, setNoDataMessage] = useState('');

  const fetchData = async () => {
    setLoading(true);
    setNoDataMessage('');
    try {
      const response = await getRankRewardIncome();
      console.log('Rank Reward Response:', response);

      if (response?.success === false) {
        setData([]);
        setNoDataMessage(response?.message || 'No rank reward history found');
      } else {
        setData(response?.data || []);
        setNoDataMessage('');
      }
    } catch (err) {
      console.error('Error:', err);
      setData([]);
      setNoDataMessage('Failed to load data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const columns = [
    { key: 'username', label: 'Username', render: (row) => row.userId?.username || '-' },
    { key: 'name', label: 'Name', render: (row) => row.userId?.name || '-' },
    { key: 'email', label: 'Email', render: (row) => row.userId?.email || '-' },
    { key: 'achievedPairs', label: 'Achieved Pairs', render: (row) => row.achievedPairs || 0 },
    { key: 'rewardAmount', label: 'Reward Amount', render: (row) => `$${row.rewardAmount || 0}` },
    { key: 'rankTitle', label: 'Rank Title', render: (row) => row.rankTitle || '-' },
    { key: 'achievedAt', label: 'Achieved At', render: (row) => row.achievedAt ? new Date(row.achievedAt).toLocaleDateString() : '-' },
    { key: 'createdAt', label: 'Created At', render: (row) => new Date(row.createdAt).toLocaleDateString() },
  ].map(col => ({ ...col, sortable: true }));

  return (
    <div className="p-6 min-h-screen">
      {/* <h1 className="text-3xl font-bold mb-8 text-white">Rank Reward Report</h1> */}

      {/* Loading */}
      {loading && (
        <div className="flex justify-center items-center h-64">
          <div className="text-lg text-gray-400 animate-pulse">Loading Rank Rewards...</div>
        </div>
      )}

      {/* Main Content - Table Always Visible */}
      {!loading && (
        <div>
          {/* TABLE - Hamesha dikhega */}
          <div className=" rounded-xl shadow-lg overflow-hidden">
            <ReusableDataTable 
              data={data} 
              columns={columns}
              emptyMessage="No records to display" // optional fallback
            />
          </div>

        
        </div>
      )}
    </div>
  );
};

export default RankReward;
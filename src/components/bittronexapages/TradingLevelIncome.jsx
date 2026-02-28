// import { useEffect, useState } from "react";
// import { getServiceLevelIncome } from "../../api/user-api";
// import ReusableDataTable from "../ui/ReusableTable";


// const TradingLevelIncome = () => {
//   const [tableData, setTableData] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await getServiceLevelIncome();
//         console.log("Service level income response:", res);

//         // ✅ important: API data mapping
//         setTableData(res?.data || []);
//       } catch (error) {
//         console.error("getServiceLevelIncome error:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   const columns = [
//     {
//       key: "userId.username",
//       label: "User ID",
//       render: (_, row) => row?.userId?.username || "-"
//     },
//     {
//       key: "userId.name",
//       label: "Name",
//       render: (_, row) => row?.userId?.name || "-"
//     },
//     {
//       key: "amount",
//       label: "Amount",
//     },
//     {
//       key: "level",
//       label: "Level",
//     },
//     {
//       key: "dayCount",
//       label: "Day Count",
//     },
//     {
//       key: "createdAt",
//       label: "Date",
//       render: (val) => new Date(val).toLocaleDateString(),
//     },
//   ];

//   return (
//     <div className="space-y-6">
//       {/* <h1 className="text-2xl font-semibold text-white">
//         Service Level Income
//       </h1> */}

//       <ReusableDataTable
//         data={tableData}
//         columns={columns}
//       />
//     </div>
//   );
// };

// export default TradingLevelIncome;



import { useEffect, useState } from "react";
import { getServiceLevelIncome } from "../../api/user-api";
import ReusableDataTable from "../ui/ReusableTable";


const TradingLevelIncome = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchIncome = async () => {
      try {
        const res = await getServiceLevelIncome();
        setData(res?.data || []);
      } catch (err) {
        console.error("Service level income error:", err);
      }
    };

    fetchIncome();
  }, []);

  const columns = [
    {
      key: "username",
      label: "User ID",
      render: (_, row) => row?.userId?.username || "-"
    },
    {
      key: "name",
      label: "User Name",
      render: (_, row) => row?.userId?.name || "-"
    },
    // {
    //   key: "fromUsername",
    //   label: "From User ID",
    //   render: (_, row) => row?.fromUserId?.username || "-"
    // },
    {
      key: "fromName",
      label: "From User Name",
      render: (_, row) => row?.fromUserId?.name || "-"
    },
    {
      key: "amount",
      label: "Amount"
    },
    {
      key: "level",
      label: "Level"
    },
    {
      key: "dayCount",
      label: "Day Count"
    },
    {
      key: "percent",
      label: "Percent (%)"
    },
    {
      key: "createdAt",
      label: "Date",
      render: (val) =>
        val ? new Date(val).toLocaleString() : "-"
    }
  ];

  return (
    <div className="space-y-6 mt-5">
      <ReusableDataTable
        data={data}
        columns={columns}
        enableDateFilter
        dateKey="createdAt"
      />
    </div>
  );
};

export default TradingLevelIncome;

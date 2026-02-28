import React, { useEffect, useState } from 'react'
import { getP2Phistory } from '../../../api/admin-api'
import ReusableDataTable from '../../../components/ui/ReusableTable'
import { dateFormat, formatValueWithCurrency } from '../../../utils/additionalFunc'
import { useSelector } from 'react-redux'
const P2PHistory = () => {
  const [data, setData] = useState(null);
  const userInfo = useSelector((state) => state.userInfo?.userInfo?.user);
  const fetchdata = async () => {
    const res = await getP2Phistory()
    setData(res?.data)
  }
  useEffect(() => { fetchdata() }, [])

  const columns = [
    { label: "#", key: "index", render: (val, row, index) => index + 1 },
    { label: "Sender Username", key: "senderUsername", render: (val) => val || "N/A" },
    { label: "Receiver Username", key: "receiverUsername", render: (val) => val || "N/A" },
    { label: "Transfer Amount", key: "amount", render: (val) => val ? formatValueWithCurrency(val) : "N/A" },
    // {
    //   label: "Status", key: "senderUsername", render: (val) => {
    //     const isDebit = val === userInfo?.username;
    //     return (
    //       <span
    //         className={`px-3 py-1 font-semibold rounded-full ${isDebit
    //           ? "bg-red-600 text-white "
    //           : "bg-green-600 text-white"
    //           }`}
    //       >
    //         {isDebit ? "Debit" : "Credit"}
    //       </span>
    //     );
    //   }
    // },
    {
      label: "Status", key: "senderUsername", render: (val) => {
        // const isDebit = val === userInfo?.username;
        return (
          <span
            className={`px-3 py-1 font-semibold rounded-full bg-green-600 text-white`}
          >
            Success
          </span>
        );
      }
    },
    { label: "Date", key: "createdAt", render: (val) => val ? dateFormat(val) : "N/A" },
  ];

  return (
    <div className="mt-5 rounded-2xl shadow-md">
      <div>
        <ReusableDataTable
          columns={columns}
          data={data}
          title="P2P Report"
        />
      </div>
    </div>
  )
}

export default P2PHistory

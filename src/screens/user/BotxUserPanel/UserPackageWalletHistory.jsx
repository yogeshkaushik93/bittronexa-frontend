import React, { useEffect, useState } from 'react'
import { getTopupPackageWalletHistory } from '../../../api/admin-api'
import ReusableDataTable from '../../../components/ui/ReusableTable'
import { dateFormat, formatValueWithCurrency } from '../../../utils/additionalFunc'
import PageLoader from '../../../components/ui/PageLoader'
import { getAdminTopupPackageWalletHistory } from '../../../api/user-api'
const UserPackageWalletHistory = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchdata = async () => {
        try {
            setLoading(true);
            const response = await getAdminTopupPackageWalletHistory();
            if (response?.success) {
                setData(response?.data);
            }
        } catch (error) {
            console.log("error in topup package history", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => { fetchdata() }, [])

    const columns = [
        { label: "#", key: "index", render: (val, row, index) => index + 1 },
        { label: "Username", key: "userId", render: (val) => val?.username || "N/A" },
        { label: "Name", key: "userId", render: (val) => val?.name || "N/A" },
        { label: "Topup Amount", key: "amount", render: (val) => val ? formatValueWithCurrency(val) : "N/A" },
        { label: "Topup By", key: "amount", render: (val) => "Admin" },
        {
            label: "Status", key: "senderUsername", render: (val) => {
                // const isDebit = val === userInfo?.username;
                return (
                    <span
                        className={`px-3 py-1 text-lg rounded-full bg-green-600 text-white`}
                    >
                        Success
                    </span>
                );
            }
        },
        { label: "Date", key: "createdAt", render: (val) => val ? dateFormat(val) : "N/A" },
    ];

    if (loading) return <PageLoader />

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

export default UserPackageWalletHistory

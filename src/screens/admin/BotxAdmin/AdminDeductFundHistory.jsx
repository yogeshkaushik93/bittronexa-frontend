import React, { useEffect, useState } from 'react'
import ReusableDataTable from '../../../components/ui/ReusableTable';
import { getDeductFundHistoryByAdmin } from '../../../api/admin-api';

const AdminDeductFundHistory = () => {
    const [history, setHistory] = useState([]);

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const res = await getDeductFundHistoryByAdmin();
                setHistory(res?.data || []);
            } catch (err) {
                console.error("Error fetching history:", err);
            }
        };
        fetchHistory();
    }, []);

    const columns = [
        {
            key: "index",
            label: "Sr No",
            render: (_, row, index) => index + 1
    },
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
        {
            key: "amount",
            label: "Amount",
            render: (val) => `$${val.toFixed(2)}`
        },
        {
            key: "reason",
            label: "Reason"
        },
        {
            key: "walletType",
            label: "Wallet Type",
            render: (val) => val === "mainWallet" ? "Main Wallet" : "Package Wallet"
        },
        {
            key: "createdAt",
            label: "Date",
            render: (val) =>
                val ? new Date(val).toLocaleString() : "-"
        }
    ];

    return (
        <div className='mt-5'>
            <ReusableDataTable
                data={history}
                columns={columns}
            />
        </div>
    )
}

export default AdminDeductFundHistory

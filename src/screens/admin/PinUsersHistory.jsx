import React, { useEffect, useState } from 'react'
import { getPinUserHistory } from '../../api/admin-api';
import PageLoader from '../../components/ui/PageLoader';
import ReusableDataTable from '../../components/ui/ReusableTable';

const PinUsersHistory = () => {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchHistory = async () => {
        try {
            setLoading(true);
            const res = await getPinUserHistory();
            if (res?.success) {
                setHistory(res?.data || []);
            }
        } catch (error) {
            console.error("Error fetching history:", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchHistory();
    }, []);

    const columns = [
        { label: "#", key: "index", render: (val, row, index) => index + 1 },
        {
            label: "Username",
            key: "activatedToUserId",
            render: (val) => val?.username || "N/A"
        },

        {
            label: "Name",
            key: "activatedToUserId",
            render: (val) => val?.name || "N/A"
        },

        {
            label: "Activated By Username",
            key: "activatedByUserId",
            render: (val) => val?.username || "N/A"
        },

        {
            label: "Activated By Name",
            key: "activatedByUserId",
            render: (val) => val?.name || "N/A"
        },


        {
            label: "Package Name",
            key: "packageName"
        },

        {
            label: "Price (USD)",
            key: "packagePriceUSD"
        },

        {
            label: "Validity (Months)",
            key: "validityMonths"
        },

        {
            label: "Start Date",
            key: "startDate",
            render: (val) => val ? new Date(val).toLocaleDateString() : "N/A"
        },

        {
            label: "End Date",
            key: "endDate",
            render: (val) => val ? new Date(val).toLocaleDateString() : "N/A"
        },

        {
            label: "Status",
            key: "status",
            render: (val) => (
                <span className={`px-3 py-1 rounded-full capitalize text-white text-xl ${val === "active" ? "bg-green-600" : "bg-red-600"}`}>
                    {val}
                </span>
            )
        },

        {
            label: "Created At",
            key: "createdAt",
            render: (val) => val ? new Date(val).toLocaleString() : "N/A"
        },
    ];

    if (loading) return <PageLoader />


    return (
        <div className="mt-5 rounded-2xl shadow-md">
                <ReusableDataTable
                    columns={columns}
                    data={history}
                    title="Pin Users History"
                />
        </div>
    )
}

export default PinUsersHistory


import { useEffect, useState } from "react";
import { getBusinessPlanHistory } from "../../api/user-api";
import ReusableDataTable from "../ui/ReusableTable";


const BusinessPlanHistory = () => {
    const [data, setData] = useState([]);
    const [total, setTotal] = useState(0);
    const [type, setType] = useState("subscription");
    const [loading, setLoading] = useState(false);

    const getCurrentMonthRange = () => {
        const now = new Date();
        const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
        const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);
        const formatDate = (date) => date.toISOString().split("T")[0];
        return {
            start: formatDate(firstDay),
            end: formatDate(lastDay),
        };
    };

    const { start, end } = getCurrentMonthRange();
    const [startDate, setStartDate] = useState(start);
    const [endDate, setEndDate] = useState(end);



    const fetchBusinessHistory = async () => {
        try {
            const payload = {
                type,
                startDate,
                endDate
            };
            setLoading(true);
            const res = await getBusinessPlanHistory(payload);
            let combinedData = [];
            if (type === "subscription") {
                combinedData = res?.data?.subscription?.history;
                setTotal(res?.data?.subscription?.total || 0);
            }
            else if (type === "business") {
                combinedData = res?.data?.investment?.history;
                setTotal(res?.data?.investment?.total || 0);
            }
            else {
                combinedData = [
                    ...res?.data?.investment?.history,
                    ...res?.data?.subscription?.history
                ];
            }
            setData(combinedData || []);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const columns = [
        {
            key: "sr",
            label: "Sr No",
            render: (_, row, index) => index + 1
        },
        {
            key: "username",
            label: "Username",
            render: (_, row) => row?.username || "-"
        },
        {
            key: "name",
            label: "Name",
            render: (_, row) => row?.name || "-"
        },


        {
            key: "price",
            label: "Amount",
            render: (val) => `$${val?.toFixed(2)}`
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
            <div className="bg-gray-950/20 border !border-gray-500 rounded-2xl p-5 shadow-md">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                    <div className="flex flex-col gap-1">
                        <label className="text-xl text-gray-400">Select Type</label>
                        <select
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                            className="bg-gray-900 text-white text-xl px-4 py-3 rounded-lg border !border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="subscription">Subscription</option>
                            <option value="business">Trading Business</option>
                        </select>
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-xl text-gray-400">Start Date</label>
                        <input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            className="bg-gray-900 text-white text-xl px-4 py-3 rounded-lg border !border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-xl text-gray-400">End Date</label>
                        <input
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            className="bg-gray-900 text-white text-xl px-4 py-3 rounded-lg border !border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <button
                        onClick={fetchBusinessHistory}
                        disabled={loading}
                        className="bg-blue-700 hover:bg-blue-800 text-white text-xl font-semibold py-3 px-5 rounded-lg transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50 shadow-md"
                    >
                       {loading ? "Loading..." : "Search"}
                    </button>
                </div>
            </div>

            <div className="bg-gray-950/20 border !border-gray-500 rounded-2xl p-4 shadow-md">
                <h2 className="text-2xl">Total {type === "subscription" ? "Subscription " : "Trading Business "} :
                    <span className="text-green-500"> ${total.toFixed(2)}</span></h2>
            </div>

            <ReusableDataTable
                data={data}
                columns={columns}
            />
        </div>
    );
};

export default BusinessPlanHistory;

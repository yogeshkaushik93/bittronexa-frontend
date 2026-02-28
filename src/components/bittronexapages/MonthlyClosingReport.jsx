import { useEffect, useState } from "react";
import { getMonthlyClosingReport } from "../../api/user-api";
import { dateFormat } from "../../utils/additionalFunc";
import ReusableDataTable from "../ui/ReusableTable";

const MonthlyClosingReport = () => {
    const [closingReportData, setClosingReportData] = useState([]);

    const fetchMonthlyClosingReport = async () => {
        try {
            const res = await getMonthlyClosingReport();
            if (res?.success) {
                setClosingReportData(res?.data || []);
            }
        } catch (error) {
            console.error("error in monthly closing report", error);
        }
    };

    useEffect(() => {
        fetchMonthlyClosingReport();
    }, []);

    const columns = [
        { key: "Sr No", label: "Sr", render: (_, row, index) => index + 1 },
        { key: "rank", label: "Rank" },
        { key: "directTeam", label: "Direct Team" },
        { key: "monthlyTrading", label: "Monthly Trading Business (L / R)" , render: (val) => `${val?.left} / ${val?.right}` },
        { key: "totalTrading", label: "Total Trading Business (L / R)", render: (val) => `${val?.left} / ${val?.right}` },
        // { key: "month", label: "Month" },
        // { key: "year", label: "Year" },
        { key: "closingDate", label: "Closing Date", render: (value) => dateFormat(value) },
    ]

    return (
        <div className="mt-5">
            <ReusableDataTable
                data={closingReportData}
                columns={columns}
            />
        </div>
    );
};

export default MonthlyClosingReport;

import { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import PageLoader from "../../../components/ui/PageLoader";
import { getServiceLevelIncometHistory } from "../../../api/admin-api";
import { maskMemberIdFourLatter } from "../../../utils/additionalFunc";

const ServiceLevelIncomeHistory = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const fetchIncomeHandler = async () => {
    try {
      setLoading(true);
      const response = await getServiceLevelIncometHistory();
      setData(response?.data || []); 
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIncomeHandler();
  }, []);

  const serialNumberTemplate = (rowData, { rowIndex }) => rowIndex + 1;

  const dateTimeTemplate = (rowData) =>
    new Date(rowData.createdAt).toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });

  const amountTemplate = (rowData) => {
    const amt = Number(rowData.amount || 0);
    return `${amt.toFixed(2)} USDT`;
  };

  const totalLevelIncomeTemplate = (rowData) => {
    const val = Number(rowData.fromUserId?.levelIncome ?? 0);
    return `${val.toFixed(2)} USDT`;
  };

  const levelTemplate = (rowData) => `Level ${rowData.level ?? "-"}`;

  const percentTemplate = (rowData) =>
    rowData.percent != null ? `${Number(rowData.percent).toFixed(2)}%` : "-";

  const investmentPriceTemplate = (rowData) => {
    const p = rowData.investmentId?.priceUSD;
    return p != null ? `${Number(p).toFixed(2)} USD` : "-";
  };

  const usernameTemplate = (rowData) =>
    rowData.userId?.username ?? rowData.userId?._id ?? "-";

  const fromUserTemplate = (rowData) =>
    rowData.fromUserId?.username ?? rowData.fromUserId?._id ?? "-";

  return (
    <>
      {loading && <PageLoader />}
      <div className="Reports AdminLevelIncomeReports martop">
        <div className="dataTable ss-card martop">
          <DataTable
            value={data}
            paginator
            rows={10}
            rowsPerPageOptions={[5, 10, 25]}
            filterDisplay="row"
            emptyMessage="No records found"
          >
            <Column
              style={{ width: "5%" }}
              body={serialNumberTemplate}
              header="S.No"
              sortable
            />
            <Column header="Username" body={usernameTemplate} filter sortable />
            <Column header="From User" body={fromUserTemplate} filter sortable />
            <Column header="Name" body={(rowData) => rowData.fromUserId?.name} filter sortable />
            <Column field="amount" header="Level Income" body={amountTemplate} filter sortable />
            <Column
              header="Total Level Income"
              body={totalLevelIncomeTemplate}
              filter
              sortable
            />
            <Column field="level" header="Level" body={levelTemplate} filter sortable />
            <Column field="percent" header="Percent(%)" body={percentTemplate} filter sortable />
            <Column
              header="Investment Price (USD)"
              body={investmentPriceTemplate}
              filter
              sortable
            />
            <Column field="createdAt" body={dateTimeTemplate} header="Income Date" filter sortable />
          </DataTable>
        </div>
      </div>
    </>
  );
};

export default ServiceLevelIncomeHistory;
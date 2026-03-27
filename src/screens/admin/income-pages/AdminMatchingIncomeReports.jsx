import { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import PageLoader from "../../../components/ui/PageLoader";
import { getROiHistory } from "../../../api/admin-api";

const AdminMatchingIncomeReports = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const fetchIncomeHandler = async () => {
    try {
      setLoading(true);
      const response = await getROiHistory();
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

  const serialNumberTemplate = (rowData, { rowIndex }) => {
    return rowIndex + 1;
  };

  const dateTimeTemplate = (rowData) => {
    return new Date(rowData.creditedDate).toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
  };

  const usernameTemplate = (rowData) => {
    return rowData?.userId?.username || "N/A";
  };

  const investmentTemplate = (rowData) => {
    const amount = rowData?.baseAmount || 0;
    return amount.toFixed(3) + " USDT";
  };

  const dailyRoiTemplate = (rowData) => {
    const amount = rowData?.roiAmount || 0;
    return amount.toFixed(3) + " USDT";
  };

  const totalRoiTemplate = (rowData) => {
    const amount = rowData?.userId?.totalRoi || 0;
    return amount.toFixed(3) + " USDT";
  };

  const statusTemplate = (rowData) => {
    return (
      <span className={`status-badge ${rowData?.status}`}>
        {rowData?.status || "N/A"}
      </span>
    );
  };

  return (
    <>
      {loading && <PageLoader />}
      <div className="Reports AdminMatchingIncomeReports martop">
        <div className="dataTable ss-card martop">
          <DataTable
            value={data}
            paginator
            rows={10}
            rowsPerPageOptions={[5, 10, 25, 50]}
            filterDisplay="row"
            emptyMessage="No ROI history found"
          >
            <Column
              style={{ width: "10%" }}
              body={serialNumberTemplate}
              header="S.No"
              filter
              sortable
            />
            <Column body={usernameTemplate} header="Username" filter sortable />
            <Column body={(rowData) => rowData?.userId?.name || "N/A"} header="Name" filter sortable />
            <Column
              body={investmentTemplate}
              header="Investment"
              filter
              sortable
            />
            <Column
              body={dailyRoiTemplate}
              header="Daily ROI"
              filter
              sortable
            />
            <Column
              body={totalRoiTemplate}
              header="Total ROI"
              filter
              sortable
            />
            <Column body={statusTemplate} header="Status" filter sortable />
            <Column
              body={dateTimeTemplate}
              header="Credited Date"
              filter
              sortable
            />
          </DataTable>
        </div>
      </div>
    </>
  );
};

export default AdminMatchingIncomeReports;

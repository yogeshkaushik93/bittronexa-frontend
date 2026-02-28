import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useEffect, useState } from "react";
import PageLoader from "../../components/ui/PageLoader";
import { getCompleteWithdrawal } from "../../api/payment-api";
import { approveWithdrawal, rejectWithdrawal } from "../../api/admin-api";
import { dateFormat, maskMemberIdFourLatter } from "../../utils/additionalFunc";
import { Tag } from "primereact/tag";
import Swal from "sweetalert2";
import QRCode from "react-qr-code";

const CompleteWithdrawalRequest = () => {
  const [globalFilter, setGlobalFilter] = useState(null);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("");


  const statusOptions = [
    { label: "All", value: "" },
    { label: "Pending", value: "processing" },
    { label: "Completed", value: "completed" },
    { label: "Rejected", value: "rejected" },
  ];

  const filteredData = selectedStatus
    ? data.filter((item) => item.status === selectedStatus)
    : data;



  // filters state
  const [filters, setFilters] = useState({
    status: { value: null, matchMode: "equals" },
    "userId.username": { value: null, matchMode: "contains" },
    "userId.email": { value: null, matchMode: "contains" },
  });

  const fetchWithdrawalHistory = async () => {
    try {
      setLoading(true);
      const response = await getCompleteWithdrawal();
      setData(response?.data || []);
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to fetch withdrawal data.",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWithdrawalHistory();
  }, []);

  const serialNumberTemplate = (rowData, { rowIndex }) => rowIndex + 1;

  const statusTemplate = (rowData) => {
    if (rowData.status === "success") {
      return (
        <Tag
          severity="success"
          value="Completed"
          style={{ fontSize: "1.2rem", padding: ".2rem .5rem" }}
        />
      );
    } else if (rowData.status === "rejected") {
      return (
        <Tag
          severity="danger"
          value="Rejected"
          style={{ fontSize: "1.2rem", padding: ".2rem .5rem" }}
        />
      );
    } else {
      return (
        <Tag
          severity="info"
          value={rowData.status}
          style={{ fontSize: "1.2rem", padding: ".2rem .5rem", textTransform: 'capitalize' }}
        />
      );
    }
  };

  const handleApprove = async (id) => {
    try {
      setLoading(true);
      const res = await approveWithdrawal({ withdrawalId: id });
      await fetchWithdrawalHistory();
      Swal.fire("Approved", res?.message || "Withdrawal approved.", "success");
    } catch (error) {
      console.error(error);
      Swal.fire(
        "Error",
        error?.response?.data?.message || "Approval failed.",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  // const handleReject = async (id) => {
  //   try {
  //     setLoading(true);
  //     const res = await rejectWithdrawal({ withdrawalId: id });
  //     await fetchWithdrawalHistory();
  //     Swal.fire("Rejected", res?.message || "Withdrawal rejected.", "success");
  //   } catch (error) {
  //     console.error(error);
  //     Swal.fire(
  //       "Error",
  //       error?.response?.data?.message || "Rejection failed.",
  //       "error"
  //     );
  //   } finally {
  //     setLoading(false);
  //   }
  // };



  const handleReject = async (id) => {
  const { value: reason, isConfirmed } = await Swal.fire({
    title: "Reject Withdrawal",
    input: "textarea",
    inputLabel: "Reason for rejection",
    inputPlaceholder: "Enter rejection reason...",
    inputAttributes: {
      "aria-label": "Rejection reason",
    },
    showCancelButton: true,
    confirmButtonText: "Reject",
    cancelButtonText: "Cancel",
    confirmButtonColor: "#d33",
    preConfirm: (value) => {
      if (!value || !value.trim()) {
        Swal.showValidationMessage("Reason is required");
        return false;
      }
      return value.trim();
    },
  });

  // User cancelled
  if (!isConfirmed) return;

  try {
    setLoading(true);

    const payload = {
      withdrawalId: id,
      reason,
    };

    const res = await rejectWithdrawal(payload);

    await fetchWithdrawalHistory();

    Swal.fire("Rejected", res?.message || "Withdrawal rejected.", "success");
  } catch (error) {
    console.error(error);
    Swal.fire(
      "Error",
      error?.response?.data?.message || "Rejection failed.",
      "error"
    );
  } finally {
    setLoading(false);
  }
};



  const actionTemplate = (rowData) => (
    <div className="flex gap-2 flex-wrap">
      <button
        onClick={() => handleApprove(rowData._id)}
        className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 shadow-md"
      >
        <i className="pi pi-check mr-2"></i> Approve
      </button>
      <button
        onClick={() => handleReject(rowData._id)}
        className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 shadow-md"
      >
        <i className="pi pi-times mr-2"></i> Reject
      </button>
      <button
        onClick={() => {
          setSelectedRow(rowData);
          setViewModalVisible(true);
        }}
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 shadow-md"
      >
        <i className="pi pi-eye mr-2"></i> View
      </button>
    </div>
  );

  return (
    <>
      {loading && <PageLoader />}

      <div className="WithdrawalReport CompleteWithdrawalRequest martop">
        <div className="flex flex-wrap gap-4 items-center justify-end mb-4">
          <label className="text-xl text-gray-300 font-medium">
            Filter by Status
          </label>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="bg-gray-900 border !border-gray-600 text-white px-4 py-3 text-lg rounded-lg outline-none focus:border-cyan-500"
          >
            {statusOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>


        <div className="dataTable ss-card martop whitespace-nowrap">
          <DataTable
            value={filteredData}
            paginator
            rows={10}
            rowsPerPageOptions={[5, 10, 25]}
            filterDisplay="row"
            globalFilter={globalFilter}
            filters={filters}
          >
            <Column body={serialNumberTemplate} header="S.No" />
            <Column
              field="userId.username"
              header="Username"
              filter
              sortable
            />
            <Column field="userId.name" header="Full Name" />
            <Column
              field="userId.email"
              header="Email"
              filter
              sortable
            />
            <Column
              field="userWalletAddress"
              header="Wallet Address"
              body={(rowData) =>
                maskMemberIdFourLatter(rowData.userWalletAddress)
              }
              filter
              sortable
            />
            <Column
              field="amount"
              header="Amount"
              body={(rowData) => `${rowData.amount.toFixed(2)} USDT`}
              filter
              sortable
            />
            <Column
              field="netAmountSent"
              header="Net Sent"
              body={(rowData) => `${rowData.netAmountSent.toFixed(2)} USDT`}
              filter
              sortable
            />
            <Column
              field="feeAmount"
              header="Fee"
              body={(rowData) => `${rowData.feeAmount.toFixed(2)} USDT`}
              filter
              sortable
            />
            <Column field="createdAt" body={(rowData) => dateFormat(rowData?.createdAt)} header="Date" filter
              sortable />
            <Column
              field="status"
              header="Status"
              body={statusTemplate}
              filter
              sortable
            />
            <Column
              header="Actions"
              body={actionTemplate}
              style={{ minWidth: "14rem" }}
              filter
              sortable
            />
          </DataTable>
        </div>
      </div>

      {/* View Modal with QR */}
      {viewModalVisible && selectedRow && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-xl bg-black/80 text-white rounded-2xl shadow-2xl border border-gray-700 p-6 animate-slideUp">

            {/* Close Button */}
            <button
              onClick={() => setViewModalVisible(false)}
              className="absolute top-3 right-4 text-gray-400 hover:text-red-500 text-5xl font-bold transition-colors"
            >
              &times;
            </button>

            {/* Title */}
            <h2 className="text-3xl font-semibold text-center mb-6 border-b border-gray-700 pb-3">
              Withdrawal Details
            </h2>

            {/* QR Code */}
            <div className="flex justify-center mb-5">
              <div className="p-3 bg-white rounded-xl shadow-lg border-2 border-blue-400 hover:border-blue-500 transition-all duration-200">
                <QRCode value={selectedRow.userWalletAddress || "NA"} size={128} />
              </div>
            </div>

            {/* Info Section */}
            <div className="space-y-1 text-lg">
              <div className="grid grid-cols-2 gap-y-2">
                <span className="text-gray-400">Username:</span>
                <span className="font-medium">{selectedRow.userId?.username || "N/A"}</span>

                <span className="text-gray-400">Full Name:</span>
                <span className="font-medium">{selectedRow.userId?.name || "N/A"}</span>

                <span className="text-gray-400">Email:</span>
                <span className="font-medium">{selectedRow.userId?.email || "N/A"}</span>

                <span className="text-gray-400">Amount:</span>
                <span className="font-medium text-green-400">${selectedRow.amount.toFixed(2)}</span>

                <span className="text-gray-400">Fee Amount:</span>
                <span className="font-medium text-red-400">${selectedRow.feeAmount.toFixed(2)}</span>

                <span className="text-gray-400">Net Sent:</span>
                <span className="font-medium text-blue-400">${selectedRow.netAmountSent.toFixed(2)}</span>

                <span className="text-gray-400">Status:</span>
                <span
                  className={`font-semibold capitalize ${selectedRow.status === "success"
                    ? "text-green-400"
                    : selectedRow.status === "rejected"
                      ? "text-red-400"
                      : "text-yellow-400"
                    }`}
                >
                  {selectedRow.status}
                </span>
                <span className="text-gray-400">Wallet Address:</span>
                <span className="font-medium break-all">{selectedRow.userWalletAddress || "N/A"}</span>
                <span className="text-gray-400">Date:</span>
                <span className="font-medium">
                  {dateFormat(selectedRow.createdAt)}
                </span>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-6 text-center">
              <button
                onClick={() => setViewModalVisible(false)}
                className="px-6 py-2 text-lg bg-blue-600 hover:bg-blue-700 rounded-md shadow-md transition-transform transform hover:scale-105 font-medium"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </>
  );
};

export default CompleteWithdrawalRequest;
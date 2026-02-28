

import { Button } from "primereact/button";
import { useEffect, useState } from "react";
import ReusableDataTable from "../../components/ui/ReusableTable.jsx";
import PageLoader from "../../components/ui/PageLoader";
import ViewTicketDetail from "../../components/ui/ViewPaymentDetailModal";
import { SwalError, SwalSuccess } from "../../utils/custom-alert";
import {
  approveComplainRequest,
  getPendingComplainHistory,
  rejectComplainRequest,
} from "../../api/admin-api";
import ApproveMessageModal from "../../components/ui/ApproveMessageModal.jsx";
import RejectMessageModal from "../../components/ui/RejectMessageModal.jsx";

const ComplainTicketList = () => {
  const [loading, setLoading] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [History, setHistory] = useState([]);
  const [viewDetail, setViewDetail] = useState();

  const [showApproveModal, setShowApproveModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [rejectingTicket, setRejectingTicket] = useState(null);
 const [previewImage, setPreviewImage] = useState(null);
  const getRaiseTicketHistory = async () => {
    try {
      setLoading(true);
      const response = await getPendingComplainHistory();
      setHistory(response?.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const rejectUserHandler = (rowData) => {
    // Edge case: Don't allow rejection if already approved
    if (rowData.status === "Approved") {
      SwalError.fire({
        icon: "warning",
        title: "Cannot Reject",
        text: "This ticket has already been approved and cannot be rejected.",
      });
      return;
    }

    setRejectingTicket(rowData);
    setShowRejectModal(true);
  };

  const handleApprove = (rowData) => {
    // Edge case: Don't allow approval if already rejected
    if (rowData.status === "Rejected") {
      SwalError.fire({
        icon: "warning",
        title: "Cannot Approve",
        text: "This ticket has already been rejected and cannot be approved.",
      });
      return;
    }

    setSelectedTicket(rowData);
    setShowApproveModal(true);
  };

  const submitApprovalWithMessage = async (message) => {
    try {
      setLoading(true);
      await approveComplainRequest(selectedTicket._id, { message });
      SwalSuccess.fire({
        icon: "success",
        title: "Approved",
        text: "Complain Approved Successfully",
      });
      setShowApproveModal(false);
      
      // Update the specific ticket in the list instead of reloading
      setHistory((prev) =>
        prev.map((ticket) =>
          ticket._id === selectedTicket._id
            ? { ...ticket, status: "Approved", response: message }
            : ticket
        )
      );
    } catch (error) {
      console.log(error);
      SwalError.fire({
        icon: "error",
        title: "Error",
        text: error?.response?.data?.message || "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  };

  const submitRejectionWithMessage = async (message) => {
    try {
      setLoading(true);
      await rejectComplainRequest(rejectingTicket._id, { message });
      SwalSuccess.fire({
        icon: "success",
        title: "Rejected",
        text: "Complain Rejected Successfully",
      });
      
      // Update the specific ticket in the list
      setHistory((prev) =>
        prev.map((ticket) =>
          ticket._id === rejectingTicket._id
            ? { ...ticket, status: "Rejected", response: message }
            : ticket
        )
      );
      
      setShowRejectModal(false);
    } catch (error) {
      console.log(error);
      SwalError.fire({
        icon: "error",
        title: "Error",
        text: error?.response?.data?.message || "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  };

  const showTicketPopup = (rowData) => {
    setShowDetail(true);
    setViewDetail(rowData);
  };

  // Define columns for ReusableDataTable
  const columns = [
    {
      key: "index",
      label: "#",
      render: (value, row, index) => index + 1,
    },
    {
      key: "userId",
      label: "Username",
      render: (value) => value?.username || "-",
      sortable: true,
    },
    {
      key: "userId",
      label: "Name",
      render: (value) => value?.name || "-",
      sortable: true,
    },
    {
      key: "random",
      label: "Unique ID",
      render: (value) => value || "-",
      sortable: true,
    },
     {
      label: "Proof Image", key: "proofImage", render: (val, row, index) => {
        return (
          <img
            src={val?.url}
            alt={val?.public_id}
            className="h-24 w-32 object-cover rounded-lg cursor-pointer hover:scale-105 transition"
            onClick={() => setPreviewImage(val?.url)}
          />
      )
    } },

    {
      key: "subject",
      label: "Subject",
      sortable: true,
    },
    {
      key: "message",
      label: "Message",
      sortable: true,
      render: (value) => (
        <div className="max-w-xs truncate" title={value}>
          {value}
        </div>
      ),
    },
    {
      key: "status",
      label: "Status",
      sortable: true,
      render: (value) => {
        const statusColors = {
          Approved: "bg-green-500/20 text-green-400 border-green-500",
          Rejected: "bg-red-500/20 text-red-400 border-red-500",
          Pending: "bg-yellow-500/20 text-yellow-400 border-yellow-500",
        };
        return (
          <span
            className={`px-3 py-1 rounded-full text-lg font-semibold border ${
              statusColors[value] || "bg-gray-500/20 text-gray-400 !border-gray-500"
            }`}
          >
            {value}
          </span>
        );
      },
    },
    {
      key: "createdAt",
      label: "Date",
      sortable: true,
      render: (value) => new Date(value).toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
    },
    {
      key: "actions",
      label: "Actions",
      sortable: false,
      render: (_, rowData) => {
        const isApproved = rowData.status === "Approved";
        const isRejected = rowData.status === "Rejected";

        return (
          <div className="flex flex-wrap gap-2">
            <Button
              label="View"
              className="pi pi-eye"
              onClick={() => showTicketPopup(rowData)}
              style={{
                color: "#dadada",
                fontWeight: "600",
                border: "1px solid #dadada",
                backgroundColor: "#2b2b2b",
                padding: "5px 10px",
                borderRadius: "5px",
                fontSize: "12px",
              }}
            />
            <Button
              label="Approve"
              icon="pi pi-check"
              className="p-button-success"
              onClick={() => handleApprove(rowData)}
              disabled={isRejected || isApproved}
              style={{
                color: isRejected || isApproved ? "#888" : "green",
                border: "1px solid #dadada",
                backgroundColor: isRejected || isApproved ? "#ddd" : "#abebc6",
                padding: "5px 10px",
                borderRadius: "5px",
                fontSize: "12px",
                cursor: isRejected || isApproved ? "not-allowed" : "pointer",
                opacity: isRejected || isApproved ? 0.5 : 1,
              }}
            />
            <Button
              label="Reject"
              icon="pi pi-times"
              className="p-button-danger"
              onClick={() => rejectUserHandler(rowData)}
              disabled={isApproved || isRejected}
              style={{
                color: isApproved || isRejected ? "#888" : "red",
                border: "1px solid #dadada",
                backgroundColor: isApproved || isRejected ? "#ddd" : "#f5b7b1",
                padding: "5px 10px",
                borderRadius: "5px",
                fontSize: "12px",
                cursor: isApproved || isRejected ? "not-allowed" : "pointer",
                opacity: isApproved || isRejected ? 0.5 : 1,
              }}
            />
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    getRaiseTicketHistory();
  }, []);

  return (
    <>
      {loading && <PageLoader />}

      {showDetail && (
        <ViewTicketDetail
          data={viewDetail}
          show={showDetail}
          onHide={() => setShowDetail(false)}
        />
      )}

      {showApproveModal && (
        <ApproveMessageModal
          visible={showApproveModal}
          onHide={() => setShowApproveModal(false)}
          onSubmit={submitApprovalWithMessage}
        />
      )}

      {showRejectModal && (
        <RejectMessageModal
          visible={showRejectModal}
          onHide={() => setShowRejectModal(false)}
          onSubmit={submitRejectionWithMessage}
        />
      )}

      <div className="WithdrawalReport martop">
        <ReusableDataTable 
          data={History} 
          columns={columns}
          className="martop"
        />
      </div>

       {previewImage && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[999]">
          <button
            onClick={() => setPreviewImage(null)}
            className="absolute top-6 right-6 text-white text-3xl"
          >
            ✖
          </button>

          <img
            src={previewImage}
            alt="Proof"
            className="max-h-[90vh] max-w-[90vw] rounded-xl shadow-2xl"
          />
        </div>
      )}
    </>
  );
};

export default ComplainTicketList;
import React, { useEffect, useState } from "react";
import { approvePrincipalWithdrawal, getPrincipalWithdrawalHistory, rejectPrincipalWithdrawal } from "../../api/admin-api";
import ReusableDataTable from "../ui/ReusableTable";
import { QRCodeSVG } from "qrcode.react";
import Swal from "sweetalert2";

const PrincipleWithdrwalReport = () => {
    const [data, setData] = useState([]);
    const [selectedRow, setSelectedRow] = useState(null);
    const [approveLoading, setApproveLoading] = useState(false);
    const [rejectLoading, setRejectLoading] = useState(false);

    const fetchData = async () => {
        try {
            const res = await getPrincipalWithdrawalHistory();
            setData(res?.data || []);
        } catch (error) {
            console.error("❌ Error fetching history:", error);
            setData([]);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const columns = [
        {
            label: "#",
            key: "index",
            render: (_, __, index) => index + 1,
        },

        {
            label: "User ID",
            key: "userId",
            render: (val) => val?.username || "—",
        },

        {
            label: "Name",
            key: "userId",
            render: (val) => val?.name || "—",
        },

        {
            label: "Wallet Address",
            key: "userWalletAddress",
        },

        {
            label: "Network",
            key: "networkType",
        },

        {
            label: "Requested Amount",
            key: "requestedAmount",
        },

        {
            label: "Total ROI",
            key: "totalRoi",
        },

        {
            label: "ROI Cut",
            key: "roiCut",
        },

        {
            label: "Investment Cut",
            key: "investmentCut",
        },

        {
            label: "System Cut",
            key: "systemCut",
        },

        {
            label: "Net Amount",
            key: "netAmount",
        },

        {
            label: "Remaining Principal",
            key: "remainingPrincipal",
        },

        {
            label: "Status",
            key: "status",
            render: (val) => {
                if (val === "pending") return <span className="bg-yellow-100 text-yellow-500 capitalize p-2 rounded-full">{val}</span>;
                if (val === "approved") return <span className="bg-green-100 text-green-500 capitalize p-2 rounded-full">{val}</span>;
                if (val === "rejected") return <span className="bg-red-100 text-red-500 capitalize p-2 rounded-full">{val}</span>;
                return (
                    <span>{val}</span>
                )
            },
        },

        //   {
        //     label: "Transaction Hash",
        //     key: "transactionHash",
        //     render: (val) => val || "—",
        //   },

        //   {
        //     label: "Processed By",
        //     key: "processedBy",
        //     render: (val) => val || "—",
        //   },

        //   {
        //     label: "Processed At",
        //     key: "processedAt",
        //     render: (val) => val || "—",
        //   },

        {
            label: "Requested At",
            key: "createdAt",
            render: (val) => new Date(val).toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" }) || "—",
        },
        {
            label: "Action",
            key: "action",
            render: (_, row) => (
                <button
                    onClick={() => setSelectedRow(row)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                >
                    View
                </button>
            ),
        }
    ];


    const handleApprove = async (id) => {
        try {
            setApproveLoading(true);
            const response = await approvePrincipalWithdrawal(id);
            if (response?.success) {
                Swal.fire({
                    icon: 'success',
                    title: 'Approved',
                    text: response?.message || 'The request has been approved successfully.',
                });
                fetchData();
            }
        } catch (error) {
            console.error("❌ Error approving request:", error);
            Swal.fire({
                icon: 'error',
                title: 'Approval Failed',
                text: error?.response?.data?.message || 'An error occurred while approving the request.',
            })
        } finally {
            setApproveLoading(false);
        }
    }


    // const handleReject = async (id) => {
    //     try {
    //         setRejectLoading(true);
    //         const response = await rejectPrincipalWithdrawal(id);
    //         if (response?.success) {
    //             Swal.fire({
    //                 icon: 'success',
    //                 title: 'Rejected',
    //                 text: response?.message || 'The request has been rejected successfully.',
    //             });
    //             fetchData();
    //         }
    //     } catch (error) {
    //         console.error("❌ Error rejecting request:", error);
    //         Swal.fire({
    //             icon: 'error',
    //             title: 'Rejection Failed',
    //             text: error?.response?.data?.message || 'An error occurred while rejecting the request.',
    //         })
    //     } finally {
    //         setRejectLoading(false);
    //     }
    // }


    const handleReject = async (id) => {
  const { value: reason, isConfirmed } = await Swal.fire({
    title: "Reject Withdrawal",
    input: "textarea",
    inputLabel: "Rejection Reason",
    inputPlaceholder: "Enter reason for rejection...",
    showCancelButton: true,
    confirmButtonText: "Reject",
    cancelButtonText: "Cancel",
    confirmButtonColor: "#d33",
    preConfirm: (value) => {
      if (!value || !value.trim()) {
        Swal.showValidationMessage("Rejection reason is required");
        return false;
      }
      return value.trim();
    },
  });

  // User clicked cancel
  if (!isConfirmed) return;

  try {
    setRejectLoading(true);

    const payload = {
       id,
      reason,
    };

    const response = await rejectPrincipalWithdrawal(payload);

    if (response?.success) {
      Swal.fire({
        icon: "success",
        title: "Rejected",
        text:
          response?.message ||
          "The request has been rejected successfully.",
      });

      fetchData();
    }
  } catch (error) {
    console.error("❌ Error rejecting request:", error);

    Swal.fire({
      icon: "error",
      title: "Rejection Failed",
      text:
        error?.response?.data?.message ||
        "An error occurred while rejecting the request.",
    });
  } finally {
    setRejectLoading(false);
  }
};



    return (
        <div className="mt-5">
            <ReusableDataTable
                title="Principal Withdrawal History"
                columns={columns}
                data={data}
            />

            {selectedRow && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
                    <div className="bg-black border !border-gray-500 w-full max-w-5xl rounded-xl p-5 relative">

                        <button
                            onClick={() => setSelectedRow(null)}
                            className="absolute top-5 right-5 text-gray-500 hover:text-black text-3xl"
                        >
                            ✕
                        </button>

                        <h2 className="text-2xl font-semibold mb-4">
                            Principal Withdrawal Details
                        </h2>

                        {/* DETAILS */}
                        <div className="grid grid-cols-2 gap-4 text-lg">
                            <div><b className="text-cyan-400">Name:</b> {selectedRow.userId?.name}</div>

                            <div className="col-span-2 flex flex-col gap-6">
                                <div>
                                    <b className="text-cyan-400">Wallet Address:</b>
                                    <p className="break-all text-gray-300 mt-1">
                                        {selectedRow.userWalletAddress} 
                                    </p>
                                </div>

                                <div className="bg-white w-fit p-1 rounded-lg">
                                    {selectedRow.userWalletAddress ? (
                                        <QRCodeSVG
                                            value={selectedRow.userWalletAddress}
                                            width={160}
                                            height={160}
                                            level="H"
                                            includeMargin
                                        />
                                    ) : (
                                        <span className="text-red-500 text-lg">Wallet not available</span>
                                    )}
                                </div>

                            </div>

                            <div className="capitalize"><b>Status:</b> {selectedRow.status}</div>

                            <div><b className="text-cyan-400">Requested Amount:</b> {selectedRow.requestedAmount}</div>
                            <div><b className="text-cyan-400">Net Amount:</b> {selectedRow.netAmount} USDT</div>

                            <div><b className="text-cyan-400">Total ROI:</b> {selectedRow.totalRoi} USDT</div>
                            <div><b className="text-cyan-400">ROI Cut:</b> {selectedRow.roiCut} USDT</div>

                            <div><b className="text-cyan-400">Investment Cut:</b> {selectedRow.investmentCut} USDT</div>
                            <div><b className="text-cyan-400">System Cut:</b> {selectedRow.systemCut} USDT</div>

                            <div><b className="text-cyan-400">Remaining Principal:</b> {selectedRow.remainingPrincipal} USDT</div>
                            <div><b className="text-cyan-400">Requested At:</b> {new Date(selectedRow.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</div>
                        </div>

                        {/* ACTIONS */}
                        {selectedRow.status === "pending" && (
                            <div className="flex justify-end gap-3 mt-6 text-lg">
                                <button
                                    onClick={() => handleReject(selectedRow._id)}
                                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                                >
                                    {rejectLoading ? 'Rejecting...' : 'Reject'}
                                </button>

                                <button
                                    onClick={() => handleApprove(selectedRow._id)}
                                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                                >
                                    {approveLoading ? 'Approving...' : 'Approve'}
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default PrincipleWithdrwalReport;

import React, { useEffect, useState } from 'react';
import ReusableDataTable from '../../components/ui/ReusableTable';
import { getComplainHistory } from '../../api/user-api';
import { dateFormat } from '../../utils/additionalFunc';
import PageLoader from '../../components/ui/PageLoader';
import { Ticket } from 'lucide-react';

const ComplainTicketHistory = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [viewDetail, setViewDetail] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const getRaiseTicketHistory = async () => {
    try {
      setLoading(true);
      const response = await getComplainHistory();
      if (response?.success) {
        setData(response?.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getRaiseTicketHistory();
  }, []);

  const columns = [
    { label: "#", key: "index", render: (val, row, index) => index + 1 },
    { label: "Subject", key: "subject" },
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
    // {
    //   label: "Message", key: "message", render: (val) => (
    //     <p className="max-w-xs truncate text-gray-300" title={val}>{val}</p>
    //   )
    // },
   
    {
      label: "Status", key: "status", render: (val) => (
        <span
          className={`px-3 py-1 rounded-full text-xl font-semibold
            ${val.includes("Approved")
              ? "bg-green-800 text-green-200"
              : val.includes("Pending")
                ? "bg-yellow-600 text-white"
                : "bg-red-700 text-red-300"
            }`}
        >
          {val.split("/")[0]}
        </span>
      )
    },
    { label: "Submitted At", key: "createdAt", render: (val) => dateFormat(val) },
    {
      label: "Actions", key: "actions", render: (val, row) => (
        <button
          onClick={() => {
            setShowDetail(true);
            setViewDetail(row);
          }}
          className="px-3 py-2 rounded-lg font-medium bg-blue-700 hover:bg-blue-600 transition text-white shadow-sm"
        >
          View
        </button>
      )
    },
  ];

  if (loading) return <PageLoader />;

  return (
    <div className='mt-5'>
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-white mb-1">My Support Tickets</h2>
        <p className="text-gray-400 text-lg">Track all your raised tickets easily</p>
      </div>

      <ReusableDataTable
        columns={columns}
        data={data}
        title="Ticket History"
        searchPlaceholder="Search by Ticket ID or Message..."
        emptyMessage="No tickets raised yet. Create one from Support → Create Ticket"
      />

      {showDetail && viewDetail && (
        <div className="fixed inset-0 bg-black/50 bg-opacity-70 flex items-center justify-center z-50 backdrop-blur-sm animate-fadeIn">
          <div className="bg-black/60 border !border-gray-300 text-white rounded-xl shadow-2xl w-[90%] max-w-3xl p-6 relative">
            {/* Close Button */}
            <button
              onClick={() => setShowDetail(false)}
              className="absolute text-2xl top-4 right-4 text-gray-300 hover:text-white transition"
            >
              ✖
            </button>

            <h2 className="text-3xl text-[var(--cyan-text)] font-bold mb-4 border-b !border-gray-600 pb-4 flex items-center gap-3">
              <Ticket size={24} /> Ticket Details
            </h2>

            <div className="space-y-4 text-xl">
              <p><strong className="text-gray-400">Subject:</strong> {viewDetail?.subject}</p>
              <p><strong className="text-gray-400">Message:</strong> {viewDetail?.message}</p>
              <p>
                <strong className="text-gray-400">Status:</strong>{' '}
                <span
                  className={`px-3 py-1 rounded-full text-lg font-semibold
                    ${viewDetail?.status.includes("Approved")
                      ? "bg-green-400/20 text-green-500"
                      : viewDetail?.status.includes("Pending")
                        ? "bg-yellow-400/20 text-yellow-600"
                        : "bg-red-400/20 text-red-600"
                    }`}
                >
                  {viewDetail?.status?.split("/")[0]}
                </span>
              </p>
              <p><strong className="text-gray-400">Submitted At:</strong> {dateFormat(viewDetail?.createdAt)}</p>
              <p className='border-t pt-2 my-5 !border-gray-500'><strong className="text-[var(--cyan-text)] text-2xl">Admin Response:</strong> {viewDetail?.response ? viewDetail?.response : "No response yet"}</p>
            </div>

            <div className="flex justify-end mt-6">
              <button
                onClick={() => setShowDetail(false)}
                className="bg-blue-700 hover:bg-blue-600 transition text-white px-5 py-2 text-xl rounded-md font-semibold shadow-md"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

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


      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
      `}</style>
    </div>
  );
};

export default ComplainTicketHistory;

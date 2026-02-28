// import React, { useState } from "react";
// import { Dialog } from "primereact/dialog";
// import { Button } from "primereact/button";
// import { InputTextarea } from "primereact/inputtextarea";

// const RejectMessageModal = ({ visible, onHide, onSubmit }) => {
//   const [message, setMessage] = useState("");

//   const handleSubmit = () => {
//     if (!message.trim()) return; // Do nothing if message is empty

//     onSubmit(message);     // Submit the message to the parent
//     setMessage("");        // Clear the input
//     onHide();              // Close the modal after successful submission
//   };

//   return (
//     <Dialog
//       header="Reject Complain"
//       visible={visible}
//       onHide={onHide}
//       style={{ width: "40vw" }}
//       className="rounded-lg"
//     >
//       <div className="flex flex-col gap-4 p-4">
//         <label htmlFor="responseMessage" className="font-semibold text-gray-700">
//           Rejection Reason
//         </label>
//         <InputTextarea
//           id="responseMessage"
//           rows={5}
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//           placeholder="Please provide the reason for rejection"
//           className="w-full border border-gray-300 rounded-md p-2 text-gray-800 shadow-sm focus:ring-2 focus:ring-red-400"
//         />
//         <div className="flex justify-end mt-2">
//           <Button
//             label="Send & Reject"
//             icon="pi pi-times"
//             onClick={handleSubmit}
//             className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-md shadow-md"
//           />
//         </div>
//       </div>
//     </Dialog>
//   );
// };

// export default RejectMessageModal;



import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputTextarea } from "primereact/inputtextarea";

const RejectMessageModal = ({ visible, onHide, onSubmit }) => {
  const [message, setMessage] = useState("");

  const handleSubmit = () => {
    if (!message.trim()) {
      alert("Please enter a rejection reason");
      return;
    }
    onSubmit(message);
    setMessage("");
  };

  const handleCancel = () => {
    setMessage("");
    onHide();
  };

  return (
    <>
      <Dialog
        header={
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
              <i className="pi pi-times text-red-600 text-xl"></i>
            </div>
            <span className="text-xl font-bold text-gray-800">Reject Complaint</span>
          </div>
        }
        visible={visible}
        onHide={handleCancel}
        style={{ width: "500px", maxWidth: "90vw" }}
        className="reject-modal"
        dismissableMask
      >
        <div className="flex flex-col gap-5 p-2">
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md">
            <p className="text-sm text-red-800">
              <i className="pi pi-exclamation-triangle mr-2"></i>
              You are about to reject this complaint. Please provide a clear reason for rejection.
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="responseMessage" className="font-semibold text-gray-700 text-sm">
              Rejection Reason <span className="text-red-500">*</span>
            </label>
            <InputTextarea
              id="responseMessage"
              rows={6}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Please provide the reason for rejection..."
              className="w-full border-2 border-gray-300 rounded-lg p-3 text-gray-800 focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all"
              autoFocus
            />
            <span className="text-xs text-gray-500">
              {message.length} characters
            </span>
          </div>

          <div className="flex justify-end gap-3 mt-2">
            <Button
              label="Cancel"
              icon="pi pi-times"
              onClick={handleCancel}
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold px-5 py-2 rounded-lg transition-all border border-gray-300"
              outlined
            />
            <Button
              label="Send & Reject"
              icon="pi pi-ban"
              onClick={handleSubmit}
              disabled={!message.trim()}
              className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold px-5 py-2 rounded-lg shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>
        </div>
      </Dialog>

      <style jsx global>{`
        .reject-modal .p-dialog-header {
          background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%);
          border-bottom: 2px solid #ef4444;
          padding: 1.5rem;
        }

        .reject-modal .p-dialog-content {
          padding: 1.5rem;
          background: white;
        }

        .reject-modal .p-dialog {
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
        }
      `}</style>
    </>
  );
};

export default RejectMessageModal;
// import { Dialog } from "primereact/dialog";
// import { Button } from "primereact/button";
// import { InputTextarea } from "primereact/inputtextarea";
// import { useState } from "react";

// const ApproveMessageModal = ({ visible, onHide, onSubmit }) => {
//   const [message, setMessage] = useState("");

//   const handleSubmit = () => {
//     if (!message.trim()) return;
//     onSubmit(message);
//     setMessage(""); // Clear after submit
//   };

//   return (
//     <Dialog
//       header="Approve Complain"
//       visible={visible}
//       onHide={onHide}
//       style={{ width: "40vw" }}
//       className="rounded-lg"
//     >
//       <div className="flex flex-col gap-4 p-4">
//         <label htmlFor="responseMessage" className="font-semibold text-gray-700">
//           Response Message
//         </label>
//         <InputTextarea
//           id="responseMessage"
//           rows={5}
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//           placeholder="Write your response to the user..."
//           className="w-full border border-gray-300 rounded-md p-2 text-gray-800 shadow-sm focus:ring-2 focus:ring-blue-400"
//         />
//         <div className="flex justify-end mt-2">
//           <Button
//             label="Send & Approve"
//             icon="pi pi-check"
//             onClick={handleSubmit}
//             className="bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded-md shadow-md"
//           />
//         </div>
//       </div>
//     </Dialog>
//   );
// };

// export default ApproveMessageModal;



import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputTextarea } from "primereact/inputtextarea";
import { useState } from "react";

const ApproveMessageModal = ({ visible, onHide, onSubmit }) => {
  const [message, setMessage] = useState("");

  const handleSubmit = () => {
    if (!message.trim()) {
      alert("Please enter a response message");
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
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <i className="pi pi-check text-green-600 text-xl"></i>
            </div>
            <span className="text-xl font-bold text-gray-800">Approve Complaint</span>
          </div>
        }
        visible={visible}
        onHide={handleCancel}
        style={{ width: "500px", maxWidth: "90vw" }}
        className="approve-modal"
        dismissableMask
      >
        <div className="flex flex-col gap-5 p-2">
          <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-md">
            <p className="text-sm text-green-800">
              <i className="pi pi-info-circle mr-2"></i>
              You are about to approve this complaint. Please provide a response message to the user.
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="responseMessage" className="font-semibold text-gray-700 text-sm">
              Response Message <span className="text-red-500">*</span>
            </label>
            <InputTextarea
              id="responseMessage"
              rows={6}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write your response to the user..."
              className="w-full border-2 border-gray-300 rounded-lg p-3 text-gray-800 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"
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
              label="Send & Approve"
              icon="pi pi-check"
              onClick={handleSubmit}
              disabled={!message.trim()}
              className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold px-5 py-2 rounded-lg shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>
        </div>
      </Dialog>

      <style jsx global>{`
        .approve-modal .p-dialog-header {
          background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
          border-bottom: 2px solid #22c55e;
          padding: 1.5rem;
        }

        .approve-modal .p-dialog-content {
          padding: 1.5rem;
          background: white;
        }

        .approve-modal .p-dialog {
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
        }
      `}</style>
    </>
  );
};

export default ApproveMessageModal;
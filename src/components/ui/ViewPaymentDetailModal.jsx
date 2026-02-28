// /* eslint-disable react/prop-types */
// import { Modal } from "react-bootstrap";
// import { Button2 } from "./Buttons";

// const ViewTicketDetail = ({ show, onHide, data }) => {
//   console.log(data.response)
//   return (
//     <>
//       <div className="ViewTicketDetail">
//         <Modal
//           show={show}
//           onHide={onHide}
//           size="md"
//           aria-labelledby="contained-modal-title-vcenter"
//           centered
//           scrollable
//           className="PaymentAcceptModal-modal"
//         >
//           <Modal.Body style={{ backgroundColor: "#CBC3E3", color: "#000" }}>
//             <div className="inner">
//               <div className="top-container " >
//                 <h5 className="title" style={{ color: "#000" }}>Complain Details</h5>
//               </div>
//               <div className="inner-wrapper">
//                 <div className="msg mar-top">
//                   <h5 className=" text-[2rem]">Subject:</h5>
//                   <h3 className=" text-[2rem]">{data?.subject}</h3>
//                 </div>
//                 <div className="msg mar-top">
//                   <h5 className=" text-[2rem]">Message:</h5>
//                   <h3 className=" text-[2rem]" >{data?.message}</h3>
//                 </div>
//                 <div className="msg mar-top">
//                   <h5 className=" text-[2rem]">Response:</h5>
//                   <h3 className=" text-[2rem]" >{data?.response}</h3>
//                 </div>
//               </div>
//               <div className="btns">
//                 <Button2 name={"Close"} onClick={onHide} />
//               </div>
//             </div>
//           </Modal.Body>
//         </Modal>
//       </div>
//     </>
//   );
// };

// export default ViewTicketDetail;


/* eslint-disable react/prop-types */
import { Modal } from "react-bootstrap";
import { Button2 } from "./Buttons";

const ViewTicketDetail = ({ show, onHide, data }) => {
  console.log(data.response);

  const getStatusColor = (status) => {
    switch (status) {
      case "Approved":
        return "bg-green-100 text-green-800 border-green-300";
      case "Rejected":
        return "bg-red-100 text-red-800 border-red-300";
      case "Pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  return (
    <div className="ViewTicketDetail">
      <Modal
        show={show}
        onHide={onHide}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        scrollable
        className="PaymentAcceptModal-modal"
      >
        <Modal.Body className="p-0 bg-gray-800 rounded-lg">
          <div className="p-6">
            {/* Header */}
            <div className="text-center mb-6 pb-4 border-b-2 border-white/20">
              <h5 className="text-2xl font-bold text-white tracking-wide uppercase">
                Complaint Details
              </h5>
            </div>

            {/* Content Card */}
            <div className="border !border-gray-600 rounded-xl p-6 shadow-lg space-y-4">
              

              {/* Status */}
              <div className="bg-gray-50 rounded-lg p-4 border-l-4 border-purple-500">
                <h5 className="text-sm font-semibold text-purple-600 uppercase tracking-wide mb-2">
                  Status
                </h5>
                <span
                  className={`inline-block px-4 py-2 rounded-full text-sm font-semibold border-2 ${getStatusColor(
                    data?.status
                  )}`}
                >
                  {data?.status || "Pending"}
                </span>
              </div>

              {/* Subject */}
              <div className="bg-gray-50 rounded-lg p-4 border-l-4 border-indigo-500">
                <h5 className="text-sm font-semibold text-indigo-600 uppercase tracking-wide mb-1">
                  Subject
                </h5>
                <p className="text-base text-gray-800 leading-relaxed">
                  {data?.subject || "-"}
                </p>
              </div>

              {/* Message */}
              <div className="bg-gray-50 rounded-lg p-4 border-l-4 border-blue-500">
                <h5 className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-1">
                  Message
                </h5>
                <p className="text-base text-gray-800 leading-relaxed whitespace-pre-wrap">
                  {data?.message || "-"}
                </p>
              </div>

              {/* Response */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4 border-l-4 border-green-500">
                <h5 className="text-sm font-semibold text-green-600 uppercase tracking-wide mb-1">
                  Admin Response
                </h5>
                <p className="text-base text-gray-800 leading-relaxed whitespace-pre-wrap">
                  {data?.response || "No response yet"}
                </p>
              </div>

              {/* Date */}
              <div className="bg-gray-50 rounded-lg p-4 border-l-4 border-purple-500">
                <h5 className="text-sm font-semibold text-purple-600 uppercase tracking-wide mb-1">
                  Created At
                </h5>
                <p className="text-base text-gray-800">
                  {data?.createdAt
                    ? new Date(data.createdAt).toLocaleString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : "-"}
                </p>
              </div>
            </div>

            {/* Close Button */}
            <div className="mt-6 flex justify-center border">
              <Button2 name={"Close"} onClick={onHide} />
            </div>
          </div>
        </Modal.Body>
      </Modal>

      <style jsx>{`
        .ViewTicketDetail .modal-content {
          border-radius: 12px;
          overflow: hidden;
          border: none;
          background: transparent;
        }

        .ViewTicketDetail .modal-body {
          padding: 0;
        }
      `}</style>
    </div>
  );
};

export default ViewTicketDetail;
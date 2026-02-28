// /* eslint-disable react/prop-types */
// import { Modal } from "react-bootstrap";
// import "../../styles/ModalStyle.css";
// import TextInput from "./TextInput";
// import { Button2 } from "./Buttons";
// import { useState, useEffect } from "react";
// import { emailValidator, otpValidator, passwordValidator } from "../../utils/inputValidator";
// import { SwalError, SwalSuccess } from "../../utils/custom-alert";
// import PageLoader from "./PageLoader";
// import TextInputPassword from "./TextInputPassword";

// const ForgotPassword = ({ show, handleClose, apiFuncOtp, apiFuncReset }) => {
//   const [loading, setLoading] = useState(false);
//   const [email, setEmail] = useState("");
//   const [payload, setPayload] = useState({
//     email: "",
//     otp: "",
//     newPassword: "", 
//     confirmPassword: "",
//   });
//   const [otpSend, setOtpSend] = useState(false);
//   const [timer, setTimer] = useState(0);

//   useEffect(() => {
//     let interval;
//     if (timer > 0) {
//       interval = setInterval(() => {
//         setTimer((prev) => prev - 1);
//       }, 1000);
//     }
//     return () => clearInterval(interval);
//   }, [timer]);

//   const validateEmail = () => {
//     const error = emailValidator(email);
//     if (error) {
//       SwalError.fire({
//         icon: "error",
//         title: "Oops...",
//         text: error,
//       });
//       return false;
//     }
//     return true;
//   };

//   const validateResetForm = () => {
//     const emailError = emailValidator(payload.email);
//     const otpError = otpValidator(payload.otp);
//     const newPasswordError = passwordValidator(payload.newPassword);
//     const confirmPasswordError = passwordValidator(payload.confirmPassword);

//     if (emailError || otpError || newPasswordError || confirmPasswordError) {
//       SwalError.fire({
//         icon: "error",
//         title: "Oops...",
//         text: emailError || otpError || newPasswordError || confirmPasswordError,
//       });
//       return false;
//     }

//     if (payload.newPassword !== payload.confirmPassword) {
//       SwalError.fire({
//         icon: "error", 
//         title: "Oops...",
//         text: "Passwords do not match",
//       });
//       return false;
//     }

//     return true;
//   };

//   const handleSendOtpSubmit = async () => {
//       if (!validateEmail()) return;

//       try {
//         setLoading(true);
//         const response = await apiFuncOtp({ email });
//           SwalSuccess.fire({
//             icon: "success",
//             title: "OTP Sent",
//             text: response?.message,
//           });
//           setPayload(prev => ({...prev, email}));
//           setOtpSend(true);
//           setTimer(60);
//       } catch (error) {
//         SwalError.fire({
//           icon: "error",
//           title: "Oops...", 
//           text: error?.response?.data?.message || "Something went wrong",
//         });
//       }finally{
//         setLoading(false);
//       }
//   };
//   const handleChangePasswordSubmit = async () => {
//     if (!validateResetForm()) return;
//     try {
//       setLoading(true);
//       const response = await apiFuncReset(payload);
//         SwalSuccess.fire({
//           icon: "success",
//           title: "Password Reset Successfully",
//           text: response?.message,
//         });
//         setPayload(prev => ({...prev, email}));
//         setOtpSend(false);
//         setEmail("");
//         setPayload({
//           email: "",
//           otp: "",
//           newPassword: "", 
//           confirmPassword: "",
//         });
//         handleClose();
//     } catch (error) {
//       SwalError.fire({
//         icon: "error",
//         title: "Oops...", 
//         text: error?.response?.data?.message || "Something went wrong",
//       });
//     }finally{
//       setLoading(false);
//     }
//   }

//   return (
//     <Modal
//       aria-labelledby="contained-modal-title-vcenter"
//       centered
//       show={show}
//       onHide={handleClose}
//       className=" ForgotPassword-modal"
//       size="md"
//     >
//       {loading && <PageLoader/>}
//       <Modal.Body>
//         <div className="inner_box">
//           <h5 className="main-heading" data-aos="fade-up">Forgot Password</h5>
//           {otpSend ? (
//             <>
//               <div className="input_container">
//                 <TextInput
//                   value={payload?.otp}
//                   onChange={(e) => setPayload({ ...payload, otp: e.target.value })}
//                   placeholder="OTP"
//                   labelName={"Enter OTP"}
//                   type="tel"
//                   error={!otpValidator(payload?.otp)}
//                   max={6}
//                   min={6}
//                 />
//                 <TextInputPassword
//                   value={payload?.newPassword}
//                   onChange={(e) => setPayload({ ...payload, newPassword: e.target.value })}
//                   placeholder="New Password"
//                   error={!passwordValidator(payload?.newPassword)}
//                   type="password"
//                   labelName={"Enter New Password"}
//                 />
//                 <TextInput
//                   value={payload?.confirmPassword}
//                   onChange={(e) => setPayload({ ...payload, confirmPassword: e.target.value })}
//                   placeholder="Confirm Password"
//                   error={!passwordValidator(payload?.confirmPassword)}
//                   type="password"
//                   labelName={"Enter Confirm Password"}
//                 />
//               </div>
//               <div className="btns">
//                 <button 
//                   type="button" 
//                   style={{
//                     fontSize: "1.6rem", 
//                     color: timer > 0 ? "#999" : "var(--text-secondary)",
//                     cursor: timer > 0 ? "not-allowed" : "pointer"
//                   }} 
//                   onClick={handleSendOtpSubmit} 
//                   className="resend-btn"
//                   disabled={timer > 0}
//                 >
//                   {timer > 0 ? `Resend OTP in ${timer}s` : "Resend OTP"}
//                 </button>
//                 <Button2 onClick={handleChangePasswordSubmit} name={"Submit"}/>
//               </div>
//             </>
//           ) : (
//             <>
//               <div className="input_container">
//                 <TextInput
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   placeholder="Email"
//                   type="email"
//                   labelName={"Enter your email"}
//                   error={!emailValidator(email)}
//                 />
//               </div>
//               <div className="btns">
//                 <Button2 onClick={handleSendOtpSubmit} name={"Send OTP"}/>
//                 <Button2 className="cancel-btn" onClick={handleClose} name={"Cancel"}/>
//               </div>
//             </>
//           )}
//         </div>
//       </Modal.Body>
//     </Modal>
//   );
// };

// export default ForgotPassword;

// import { useState } from "react";
// import {sendOtpForResetPass,resetPassword} from "../../api/user-api"
// const sendOtpApi = (email) =>
//   new Promise((resolve, reject) => {
//     setTimeout(() => {
//       email === "test@gmail.com"
//         ? resolve("OTP sent to your email")
//         : reject("Email not registered");
//     }, 1000);
//   });

// const resetPasswordApi = (data) =>
//   new Promise((resolve, reject) => {
//     setTimeout(() => {
//       data.otp === "123456"
//         ? resolve("Password reset successful")
//         : reject("Invalid OTP");
//     }, 1000);
//   });

// const ForgotPassword = () => {
//   const [step, setStep] = useState(1);
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");
//   const [email, setEmail] = useState("");
//   const [form, setForm] = useState({
//     otp: "",
//     newPassword: "",
//     confirmPassword: "",
//   });

//   const sendOtp = async () => {
//     if (!email) return setMessage("Email is required");
//     try {
//       setLoading(true);
//       setMessage("");
//       const res = await sendOtpApi(email);
//       setMessage(res);
//       setStep(2);
//     } catch (err) {
//       setMessage(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const resetPassword = async () => {
//     if (
//       !form.otp ||
//       !form.newPassword ||
//       form.newPassword !== form.confirmPassword
//     ) {
//       return setMessage("Invalid input");
//     }

//     try {
//       setLoading(true);
//       setMessage("");
//       const res = await resetPasswordApi(form);
//       setMessage(res);
//       setStep(1);
//       setEmail("");
//       setForm({ otp: "", newPassword: "", confirmPassword: "" });
//     } catch (err) {
//       setMessage(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="  flex items-center justify-center px-4">
//       <div className="w-full max-w-2xl  bg-zinc-900 rounded-xl p-6 shadow-lg">
//         <h2 className="text-white text-2xl font-semibold text-center mb-6">
//           Forgot Password
//         </h2>

//         {message && (
//           <p className="text-xl  text-yellow-400 text-center mb-4">
//             {message}
//           </p>
//         )}

//         {step === 1 && (
//           <>
//             <input
//               type="email"
//               placeholder="Enter your email"
//               className="w-full bg-transparent  border border-zinc-700 text-xl text-white px-3 py-2 rounded mb-4 focus:outline-none focus:border-white"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//             <button
//               onClick={sendOtp}
//               disabled={loading}
//               className="w-full bg-white text-xl  text-black font-bold  py-3  rounded hover:bg-gray-200 transition disabled:opacity-50"
//             >
//               {loading ? "Sending..." : "Send OTP"}
//             </button>
//           </>
//         )}

//         {step === 2 && (
//           <>
//             <input
//               placeholder="Enter OTP"
//               className="w-full bg-black border !border-zinc-500 text-white text-xl px-3 py-2 rounded mb-3 focus:outline-none focus:border-white"
//               value={form.otp}
//               onChange={(e) =>
//                 setForm({ ...form, otp: e.target.value })
//               }
//             />
//             <input
//               type="password"
//               placeholder="New Password"
//               className="w-full bg-black border !border-zinc-500 text-white text-xl px-3 py-2 rounded mb-3 focus:outline-none focus:border-white"
//               value={form.newPassword}
//               onChange={(e) =>
//                 setForm({ ...form, newPassword: e.target.value })
//               }
//             />
//             <input
//               type="password"
//               placeholder="Confirm Password"
//               className="w-full bg-black border !border-zinc-500 text-xl text-white px-3 py-2 rounded mb-4 focus:outline-none focus:border-white"
//               value={form.confirmPassword}
//               onChange={(e) =>
//                 setForm({ ...form, confirmPassword: e.target.value })
//               }
//             />
//             <button
//               onClick={resetPassword}
//               disabled={loading}
//               className="w-full bg-white text-black text-2xl font-semibold py-2 rounded hover:bg-gray-200 transition disabled:opacity-50"
//             >
//               {loading ? "Submitting..." : "Reset Password"}
//             </button>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ForgotPassword;



// import { useState } from "react";
// import { sendOtpForResetPass, resetPassword } from "../../api/user-api";

// const ForgotPassword = () => {
//   const [step, setStep] = useState(1);
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");

//   const sendOtp = async () => {
//     if (!email) return setMessage("Email is required");

//     try {
//       setLoading(true);
//       setMessage("");
//       const paylaod = { email }
//       const res = await sendOtpForResetPass(paylaod);
//       setMessage(res?.message || "OTP sent");
//       setStep(2);
//     } catch (err) {
//       setMessage(err?.response?.data?.message || "Something went wrong");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleResetPassword = async () => {
//     if (!password || password !== confirmPassword) {
//       return setMessage("Passwords do not match");
//     }

//     try {
//       setLoading(true);
//       setMessage("");
//       const res = await resetPassword({ password });
//       setMessage(res?.message || "Password reset successful");
//       setStep(1);
//       setEmail("");
//       setPassword("");
//       setConfirmPassword("");
//     } catch (err) {
//       setMessage(err?.response?.data?.message || "Reset failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-black px-4">
//       <div className="w-full max-w-2xl rounded-xl p-6">
//         <h2 className="text-white text-2xl font-semibold text-center mb-6">
//           Forgot Password
//         </h2>

//         {message && (
//           <p className="text-xl text-yellow-400 text-center mb-4">
//             {message}
//           </p>
//         )}

//         {step === 1 && (
//           <>
//             <input
//               type="email"
//               placeholder="Enter your email"
//               className="w-full bg-transparent border border-zinc-700 text-xl text-white px-3 py-2 rounded mb-4"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//             <button
//               onClick={sendOtp}
//               disabled={loading}
//               className="w-full bg-white text-black text-xl font-bold py-3 rounded disabled:opacity-50"
//             >
//               {loading ? "Sending..." : "Send OTP"}
//             </button>
//           </>
//         )}

//         {step === 2 && (
//           <>
//             <input
//               type="password"
//               placeholder="New Password"
//               className="w-full bg-black border border-zinc-500 text-white text-xl px-3 py-2 rounded mb-3"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//             <input
//               type="password"
//               placeholder="Confirm Password"
//               className="w-full bg-black border border-zinc-500 text-white text-xl px-3 py-2 rounded mb-4"
//               value={confirmPassword}
//               onChange={(e) => setConfirmPassword(e.target.value)}
//             />
//             <button
//               onClick={handleResetPassword}
//               disabled={loading}
//               className="w-full bg-white text-black text-2xl font-semibold py-2 rounded disabled:opacity-50"
//             >
//               {loading ? "Submitting..." : "Reset Password"}
//             </button>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ForgotPassword;




import { useState } from "react";
import { sendOtpForResetPass, resetPassword } from "../../api/user-api";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otp, setotp] = useState(null);
  // const [username, setusername] = useState(second)
const navigate = useNavigate();
  const sendOtp = async () => {
    if (!email,!username) return setMessage("Email and username is required");

    try {
      setLoading(true);
      setMessage("");

      const payload = { email ,username};   
      console.log("SEND OTP PAYLOAD:", payload);

      const res = await sendOtpForResetPass(payload);
      console.log("SEND OTP RESPONSE:", res);

      setMessage(res?.message);
      setStep(2);
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || "OTP failed");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (!password || password !== confirmPassword) {
      return setMessage("Passwords do not match");
    }

    try {
      setLoading(true);
      setMessage("");

      const payload = { email, password,otp ,username};
      console.log("RESET PAYLOAD:", payload);

      const res = await resetPassword(payload);
      console.log("RESET RESPONSE:", res);

      setMessage(res?.message);
      if(res?.success){
        navigate("/login")
      }
      setStep(1);
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data.message || "Reset failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center  py-16 !border-gray-500 rounded-lg  border px-4">
      <div className="w-full max-w-2xl rounded-xl p-6">
        <div>
        <h2 className="text-white text-2xl font-semibold text-center mb-6">
          Forgot Password
        </h2>
     
      </div>
        {message && (
          <p className="text-xl text-yellow-400 text-center mb-4">
            {message}
          </p>
        )}

        {step === 1 && (
          <>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full bg-transparent border border-zinc-700 text-xl text-white px-3 py-2 rounded mb-4"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
           <input
              type="username"
              placeholder="Enter your username"
              className="w-full bg-transparent border border-zinc-700 text-xl text-white px-3 py-2 rounded mb-4"
              value={username}
             
              onChange={(e) =>
  setUsername(e.target.value.toUpperCase())
}
            />
          
            <button
              onClick={sendOtp}
              disabled={loading}
              className="w-full bg-white text-black text-xl font-bold py-3 rounded disabled:opacity-50"
            >
              {loading ? "Sending..." : "Send OTP"}
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <input
              type="password"
              placeholder="New Password"
              className="w-full bg-black border border-zinc-500 text-white text-xl px-3 py-2 rounded mb-3"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full bg-black border border-zinc-500 text-white text-xl px-3 py-2 rounded mb-4"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <input
              type="username"
              placeholder="Enter your username"
              className="w-full bg-transparent border border-zinc-700 text-xl text-white px-3 py-2 rounded mb-4"
              value={username}
             
              onChange={(e) =>
  setUsername(e.target.value.toUpperCase())
}

            />
            <input
              type="Oto"
              placeholder="Enter Otp"
              className="w-full bg-black border border-zinc-500 text-white text-xl px-3 py-2 rounded mb-4"
              value={otp}
              onChange={(e) => setotp(e.target.value)}
            />
              
            <button
              onClick={handleResetPassword}
              disabled={loading}
              className="w-full bg-white text-black text-2xl font-semibold py-2 rounded disabled:opacity-50"
            >
              {loading ? "Submitting..." : "Reset Password"}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;

// import { Link, useNavigate } from "react-router-dom";
// import { useState } from "react";
// import { AuthenticatedRoutes, AuthRoutes } from "../../constants/Routes";
// import PageLoader from "../ui/PageLoader";
// import { SwalError } from "../../utils/custom-alert";
// import Swal from "sweetalert2";
// import { loginWithEmail } from "../../api/auth-api";
// import ReusableForm from "../ui/ReusableForm";
// import { Mail, Lock } from "lucide-react";
// import cloueFare from "../../screens/assets/cloudefarepng.png"
// const AuthLoginForm = () => {
//     const [payload, setPayload] = useState({
//         username: "",
//         password: "",
//     });
//     const [loading, setLoading] = useState(false);
//     const navigate = useNavigate();

//     const handleNavigate = () => {
//         navigate(AuthenticatedRoutes.USER_DASHBOARD);
//         window.location.reload();
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (loading) return;

//         try {
//             setLoading(true);

//             // ✅ Prepare payload
//             const data = {
//                 username: payload?.email?.trim()?.toUpperCase(),
//                 password: payload.password,
//             };

//             // ✅ API Call
//             const response = await loginWithEmail(data);

//             // ✅ Store token and redirect
//             localStorage.setItem("token", response.token);
//             localStorage.setItem("role", "User");

//             Swal.fire({
//                 icon: "success",
//                 title: "Login Successful",
//                 text: "You have logged in successfully!",
//                 timer: 2000,
//             }).then(() => {
//                 handleNavigate();
//             });
//         } catch (error) {
//             console.error("Login error:", error);
//             SwalError.fire({
//                 icon: "error",
//                 title: "Login Failed",
//                 text: error?.response?.data?.message || error.message,
//             });
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <>
//             {loading && <PageLoader />}
//             <div className="AuthLoginForm content ">
//                 <form
//                 data-aos="fade-up"
//                 onSubmit={handleSubmit}
//                 className="space-y-5 border !border-gray-500 shadow rounded-xl p-5 w-full max-w-2xl mx-auto"
//             >
//                 <Link to="/" className="main-heading flex items-center justify-center text-3xl font-semibold text-white" data-aos="fade-up">
//                     Welcome Back
//                 </Link>
//                 <p
//                     className="!text-gray-300 !text-2xl text-center mb-5"
//                     data-aos="fade-up"
//                 >
//                     Sign in to access your dashboard and manage your account.
//                 </p>

//                 <ReusableForm
//                     label="UserName"
//                     type="text"
//                     name="email"
//                     value={payload?.email?.toUpperCase()}
//                     onChange={(e) => setPayload((prev) => ({ ...prev, email: e.target.value }))}
//                     placeholder={"Enter Your Username"}
//                     required={true}
//                     icon={Mail}
//                 />

//                 <ReusableForm
//                     label="Password"
//                     type="password"
//                     name="password"
//                     value={payload.password}
//                     onChange={(e) => setPayload((prev) => ({ ...prev, password: e.target.value }))}
//                     placeholder={"Enter Your Password"}
//                     required={true}
//                     icon={Lock}
//                 />

//                 <button
//                     type="submit"
//                     disabled={loading}
//                     className="mt-6 bg-[var(--cyan-active)] w-full text-xl hover:scale-105 text-white font-semibold py-4 rounded-xl transition-all duration-300"
//                 >
//                     {loading ? "Logging In..." : "Login"}
//                 </button>

//                 <span
//                     data-aos="fade-up"
//                     className="flex items-center justify-center text-2xl text-gray-300 !text-center mt-4"
//                 >
//                     Don’t have an account?
//                     <Link
//                         to={AuthRoutes.REGISTER}
//                         className="ml-2 text-xl font-bold text-white underline hover:text-blue-400 transition"
//                     >
//                         Sign up
//                     </Link>
//                 </span>
//             </form>
//             </div>
//         </>
//     );
// };

// export default AuthLoginForm;



// import { Link, useNavigate } from "react-router-dom";
// import { useState } from "react";
// import { AuthenticatedRoutes, AuthRoutes } from "../../constants/Routes";
// import PageLoader from "../ui/PageLoader";
// import { SwalError } from "../../utils/custom-alert";
// import Swal from "sweetalert2";
// import { loginWithEmail } from "../../api/auth-api";
// import ReusableForm from "../ui/ReusableForm";
// import { Mail, Lock, Shield, CheckCircle } from "lucide-react";
// import cloueFare from "../../screens/assets/cloudefarepng.png";

// const AuthLoginForm = () => {
//     const [payload, setPayload] = useState({
//         username: "",
//         password: "",
//     });
//     const [loading, setLoading] = useState(false);
//     const [captchaVerified, setCaptchaVerified] = useState(false);
//     const [captchaLoading, setCaptchaLoading] = useState(false);
//     const navigate = useNavigate();

//     const handleNavigate = () => {
//         navigate(AuthenticatedRoutes.USER_DASHBOARD);
//         window.location.reload();
//     };

//     // Simulate Cloudflare Turnstile verification
//     const handleCaptchaVerify = () => {
//         setCaptchaLoading(true);
        
//         // Simulate verification delay
//         setTimeout(() => {
//             setCaptchaVerified(true);
//             setCaptchaLoading(false);
//         }, 1500);
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (loading) return;

//         // Check if captcha is verified
//         if (!captchaVerified) {
//             SwalError.fire({
//                 icon: "warning",
//                 title: "Verification Required",
//                 text: "Please complete the security verification first.",
//             });
//             return;
//         }

//         try {
//             setLoading(true);

//             // ✅ Prepare payload
//             const data = {
//                 username: payload?.email?.trim()?.toUpperCase(),
//                 password: payload.password,
//             };

//             // ✅ API Call
//             const response = await loginWithEmail(data);

//             // ✅ Store token and redirect
//             localStorage.setItem("token", response.token);
//             localStorage.setItem("role", "User");

//             Swal.fire({
//                 icon: "success",
//                 title: "Login Successful",
//                 text: "You have logged in successfully!",
//                 timer: 2000,
//             }).then(() => {
//                 handleNavigate();
//             });
//         } catch (error) {
//             console.error("Login error:", error);
//             SwalError.fire({
//                 icon: "error",
//                 title: "Login Failed",
//                 text: error?.response?.data?.message || error.message,
//             });
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleForgot = () => {
//     navigate(AuthRoutes.CHANGE_PASSSORD);
//   };

//     return (
//         <>
//             {loading && <PageLoader />}
//             <div className="AuthLoginForm content">
//                 <form
//                     data-aos="fade-up"
//                     onSubmit={handleSubmit}
//                     className="space-y-5 border !border-gray-500 shadow rounded-xl p-5 w-full max-w-2xl mx-auto"
//                 >
//                     <Link
//                         to="/"
//                         className="main-heading flex items-center justify-center text-3xl font-semibold text-white"
//                         data-aos="fade-up"
//                     >
//                         Welcome Back
//                     </Link>
//                     <p
//                         className="!text-gray-300 !text-2xl text-center mb-5"
//                         data-aos="fade-up"
//                     >
//                         Sign in to access your dashboard and manage your account.
//                     </p>

//                     <ReusableForm
//                         label="UserName"
//                         type="text"
//                         name="email"
//                         value={payload?.email?.toUpperCase()}
//                         onChange={(e) =>
//                             setPayload((prev) => ({ ...prev, email: e.target.value }))
//                         }
//                         placeholder={"Enter Your Username"}
//                         required={true}
//                         icon={Mail}
//                     />
// <div className="mb-3 ">
//                     <ReusableForm
//                         label="Password"
//                         type="password"
//                         name="password"
//                         value={payload.password}
//                         onChange={(e) =>
//                             setPayload((prev) => ({ ...prev, password: e.target.value }))
//                         }
//                         placeholder={"Enter Your Password"}
//                         required={true}
//                         icon={Lock}
//                         className=""
//                     />
//                     <ReusableForm
//                         label="Confirm Password"
//                         type="confim password"
//                         name="confirm password"
//                         value={payload.password}
//                         onChange={(e) =>
//                             setPayload((prev) => ({ ...prev, password: e.target.value }))
//                         }
//                         placeholder={"Enter Your Password"}
//                         required={true}
//                         icon={Lock}
//                         className=""
//                     />
// </div>


//       <span
//         onClick={handleForgot}
//         style={{ color: "#fff", cursor: "pointer", fontSize: "16px" ,marginTop:"1rem" }}
//         className="underline !hover:text-blue-500"
//       >
//         Forgot your password?
//       </span>
   


//                     {/* Cloudflare Turnstile Simulation */}
//                    {/* Cloudflare Turnstile Simulation */}
// <div className="mt-4" data-aos="fade-up">
//   <div
//     className={`relative border rounded-lg p-4 transition-all duration-300 ${
//       captchaVerified ? "border-green-500 bg-green-50" : "border-gray-400 bg-gray-50"
//     }`}
//   >
//     {!captchaVerified ? (
//       // BEFORE verification
//       <div className="flex items-center justify-between">
//         {/* LEFT SIDE: CLICKABLE CHECKBOX AREA */}
//         <button
//           type="button"
//           onClick={handleCaptchaVerify}
//           disabled={captchaLoading}
//           className="flex items-center gap-3 cursor-pointer bg-transparent border-0 outline-none"
//         >
//           <div
//             className={`w-8 h-8 border-2  rounded ${
//               captchaLoading
//                 ? "border-blue-500 border-t-transparent animate-spin"
//                 : "border-gray-400"
//             }`}
//           ></div>

//           <span className="text-gray-700 text-lg font-bold">
//             {captchaLoading ? "Verifying..." : "Verify you are human"}
//           </span>
//         </button>

//         {/* RIGHT SIDE: CLOUDFARE BUTTON (also triggers verify) */}
//         <button
//           type="button"
//           onClick={handleCaptchaVerify}
//           disabled={captchaLoading}
//           className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded hover:bg-gray-100 transition disabled:opacity-50"
//         >
//           <img src={cloueFare} alt="Cloudflare" className="w-24 h-8" />
//           <span className="text-xl text-gray-600">Cloudflare</span>
//         </button>
//       </div>
//     ) : (
//       // AFTER verification
//       <div className="flex items-center justify-between">
//         <div className="flex items-center gap-3">
//           <CheckCircle className="w-6 h-6 text-green-600" />
//           <span className="text-green-700 text-xl font-medium">
//             Verification successful!
//           </span>
//         </div>

//         <div className="flex items-center gap-2">
//           {/* <Shield className="w-22 h-22 text-green-600" /> */}
//           <img src={cloueFare} alt="Cloudflare" className="w-32 h-12" />
//         </div>
//       </div>
//     )}
//   </div>

//   <p className="text-xl text-gray-400 mt-2 text-center">
//     Protected by Cloudflare 
//   </p>
// </div>


//                     <button
//                         type="submit"
//                         disabled={loading || !captchaVerified}
//                         className="mt-6 bg-[var(--cyan-active)] w-full text-xl hover:scale-105 text-white font-semibold py-4 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
//                     >
//                         {loading ? "Logging In..." : "Login"}
//                     </button>

//                     <span
//                         data-aos="fade-up"
//                         className="flex items-center justify-center text-2xl text-gray-300 !text-center mt-4"
//                     >
//                         Don't have an account?
//                         <Link
//                             to={AuthRoutes.REGISTER}
//                             className="ml-2 text-xl font-bold text-white underline hover:text-blue-400 transition"
//                         >
//                             Sign up
//                         </Link>
//                     </span>
//                 </form>
//             </div>

//             <div className="h-[100px] w-full ">

//             </div>
//         </>
//     );
// };

// export default AuthLoginForm;





import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { AuthenticatedRoutes, AuthRoutes } from "../../constants/Routes";
import PageLoader from "../ui/PageLoader";
import { SwalError } from "../../utils/custom-alert";
import Swal from "sweetalert2";
import { loginWithEmail } from "../../api/auth-api";
import ReusableForm from "../ui/ReusableForm";
import { Mail, Lock, Shield, CheckCircle } from "lucide-react";
import cloueFare from "../../screens/assets/cloudefarepng.png";

const AuthLoginForm = () => {
    const [payload, setPayload] = useState({
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [loading, setLoading] = useState(false);
    const [captchaVerified, setCaptchaVerified] = useState(false);
    const [captchaLoading, setCaptchaLoading] = useState(false);
    const navigate = useNavigate();
const [rememberMe, setRememberMe] = useState(false)
    const handleNavigate = () => {
        navigate(AuthenticatedRoutes.USER_DASHBOARD);
        window.location.reload();
    };

    // Simulate Cloudflare Turnstile verification
    const handleCaptchaVerify = () => {
        setCaptchaLoading(true);
        
        // Simulate verification delay
        setTimeout(() => {
            setCaptchaVerified(true);
            setCaptchaLoading(false);
        }, 1500);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (loading) return;

        // Check if captcha is verified
        if (!captchaVerified) {
            SwalError.fire({
                icon: "warning",
                title: "Verification Required",
                text: "Please complete the security verification first.",
            });
            return;
        }

        // NEW: Ensure password and confirmPassword match before API call
        // if (payload.password !== payload.confirmPassword) {
        //     SwalError.fire({
        //         icon: "warning",
        //         title: "Password Mismatch",
        //         text: "Password and Confirm Password must match.",
        //     });
        //     return;
        // }

        try {
            setLoading(true);

            // ✅ Prepare payload
            const data = {
                username: payload?.email?.trim()?.toUpperCase(),
                password: payload.password,
            };

            // ✅ API Call
            const response = await loginWithEmail(data);

            // ✅ Store token and redirect
            localStorage.setItem("token", response.token);
            localStorage.setItem("role", "User");

            Swal.fire({
                icon: "success",
                title: "Login Successful",
                text: "You have logged in successfully!",
                timer: 2000,
            }).then(() => {
                handleNavigate();
            });
        } catch (error) {
            console.error("Login error:", error);
            SwalError.fire({
                icon: "error",
                title: "Login Failed",
                text: error?.response?.data?.message || error.message,
            });
        } finally {
            setLoading(false);
        }
    };

    const handleForgot = () => {
        navigate(AuthRoutes.CHANGE_PASSSORD);
    };

    return (
        <>
            {loading && <PageLoader />}
            <div className="AuthLoginForm content">
                <form
                    data-aos="fade-up"
                    onSubmit={handleSubmit}
                    className="space-y-5 border !border-gray-500 shadow rounded-xl p-5 w-full max-w-2xl mx-auto"
                >
                    <Link
                        to="/"
                        className="main-heading flex items-center justify-center text-3xl font-semibold text-white"
                        data-aos="fade-up"
                    >
                        Welcome Back
                    </Link>
                    <p
                        className="!text-gray-300 !text-2xl text-center mb-5"
                        data-aos="fade-up"
                    >
                        Sign in to access your dashboard and manage your account.
                    </p>

                    <ReusableForm
                        label="UserName"
                        type="text"
                        name="email"
                        value={payload?.email?.toUpperCase()}
                        onChange={(e) =>
                            setPayload((prev) => ({ ...prev, email: e.target.value }))
                        }
                        placeholder={"Enter Your Username"}
                        required={true}
                        icon={Mail}
                    />
                    <div className="mb-3 ">
                        <ReusableForm
                            label="Password"
                            type="password"
                            name="password"
                            value={payload.password}
                            onChange={(e) =>
                                setPayload((prev) => ({ ...prev, password: e.target.value }))
                            }
                            placeholder={"Enter Your Password"}
                            required={true}
                            icon={Lock}
                            className=""
                        />
                        {/* <ReusableForm
                            label="Confirm Password"
                            type="password"
                            name="confirmPassword"
                            value={payload.confirmPassword}
                            onChange={(e) =>
                                setPayload((prev) => ({ ...prev, confirmPassword: e.target.value }))
                            }
                            placeholder={"Confirm Your Password"}
                            required={true}
                            icon={Lock}
                            className=""
                        /> */}
                    </div>

                    <span
                        onClick={handleForgot}
                        style={{ color: "#fff", cursor: "pointer", fontSize: "16px" ,marginTop:"1rem" }}
                        className="underline !hover:text-blue-500"
                    >
                        Forgot your password?
                    </span>

                      


                    {/* Cloudflare Turnstile Simulation */}
                    <div className="mt-4" data-aos="fade-up">
                        <div
                            className={`relative border rounded-lg p-4 transition-all duration-300 ${
                                captchaVerified ? "border-green-500 bg-green-50" : "border-gray-400 bg-gray-50"
                            }`}
                        >
                            {!captchaVerified ? (
                                // BEFORE verification
                                <div className="flex items-center justify-between">
                                    {/* LEFT SIDE: CLICKABLE CHECKBOX AREA */}
                                    <button
                                        type="button"
                                        onClick={handleCaptchaVerify}
                                        disabled={captchaLoading}
                                        className="flex items-center gap-3 cursor-pointer bg-transparent border-0 outline-none"
                                    >
                                        <div
                                            className={`w-8 h-8 border-2  rounded ${
                                                captchaLoading
                                                    ? "border-blue-500 border-t-transparent animate-spin"
                                                    : "border-gray-400"
                                            }`}
                                        ></div>

                                        <span className="text-gray-700 text-lg font-bold">
                                            {captchaLoading ? "Verifying..." : "Verify you are human"}
                                        </span>
                                    </button>

                                    {/* RIGHT SIDE: CLOUDFARE BUTTON (also triggers verify) */}
                                    <button
                                        type="button"
                                        onClick={handleCaptchaVerify}
                                        disabled={captchaLoading}
                                        className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded hover:bg-gray-100 transition disabled:opacity-50"
                                    >
                                        <img src={cloueFare} alt="Cloudflare" className="w-24 h-8" />
                                        <span className="text-xl text-gray-600">Cloudflare</span>
                                    </button>
                                </div>
                            ) : (
                                // AFTER verification
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <CheckCircle className="w-6 h-6 text-green-600" />
                                        <span className="text-green-700 text-xl font-medium">
                                            Verification successful!
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <img src={cloueFare} alt="Cloudflare" className="w-32 h-12" />
                                    </div>
                                </div>
                            )}
                        </div>

                        <p className="text-xl text-gray-400 mt-2 text-center">
                            Protected by Cloudflare 
                        </p>
                    </div>

                     <div className="flex items-center gap-3 mt-2">
  <input
    type="checkbox"
    id="rememberMe"
    checked={rememberMe}
    onChange={(e) => setRememberMe(e.target.checked)}
    className="w-5 h-5 accent-cyan-500 cursor-pointer"
  />
  <label
    htmlFor="rememberMe"
    className="text-gray-300 text-lg cursor-pointer select-none"
  >
    Remember me
  </label>
</div>

                    <button
                        type="submit"
                        disabled={loading || !captchaVerified}
                        className="mt-6 bg-[var(--cyan-active)] w-full text-xl hover:scale-105 text-white font-semibold py-4 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                    >
                        {loading ? "Logging In..." : "Login"}
                    </button>

                    <span
                        data-aos=""
                        className="flex items-center justify-center text-2xl text-gray-300 !text-center mt-4"
                    >
                        Don't have an account?
                        <Link
                            to={AuthRoutes.REGISTER}
                            className="ml-2 text-xl font-bold text-white underline hover:text-blue-400 transition"
                        >
                            Sign up
                        </Link>
                    </span>
                </form>
            </div>

            {/* <div className="h-[100px] w-full " /> */}

        </>
    );
};

export default AuthLoginForm;

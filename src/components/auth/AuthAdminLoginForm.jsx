/* eslint-disable react/no-unescaped-entities */
import { useNavigate } from "react-router-dom";
import { Button2 } from "../ui/Buttons";
import TextInput from "../ui/TextInput";
import { useState } from "react";
import { AuthenticatedRoutes } from "../../constants/Routes";
import PageLoader from "../ui/PageLoader";
import { emailValidator, passwordValidator } from "../../utils/inputValidator";
import { SwalError, SwalSuccess } from "../../utils/custom-alert";
import { loginWithEmailAdminApi, sendOtpForAdminLogin } from "../../api/admin-api";
import TextInputPassword from "../ui/TextInputPassword";
import Swal from "sweetalert2";
const AuthAdminLoginForm = () => {
  const [payload, setPayload] = useState({
    email: "",
    password: "",
    otp: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [otpLoading, setOtpLoading] = useState(false);

  const navigate = useNavigate();

  const validate = () => {
    let formErrors = {};
    let isValid = true;

    const emailError = emailValidator(payload.email);
    if (emailError) {
      formErrors.email = emailError;
      isValid = false;
    }

    const passwordError = passwordValidator(payload.password);
    if (passwordError) {
      formErrors.password = passwordError;
      isValid = false;
    }

    setErrors(formErrors);
    return isValid;
  };

  const handleAdminLogin = async () => {
    if (!validate()) return;

    if (!payload.email || !payload.password || !payload.otp) {
      return SwalError.fire({
        icon: "error",
        title: "Oops...",
        text: "All fields are required",
      });
    }

    if (loading) return;
    setLoading(true);

    try {
      const response = await loginWithEmailAdminApi({
        email: payload.email,
        password: payload.password,
        otp: payload.otp,
      });

      localStorage.setItem("token", response.token);
      localStorage.setItem("role", "Admin");
      Swal.fire({
        icon: "success",
        title: "Login Success",
        text: "You have logged in successfully",
      }).then(() => {
        navigate(AuthenticatedRoutes.ADMIN_DASHBOARD);
        window.location.reload();
      });
    } catch (error) {
      console.log(error);
      SwalError.fire({
        icon: "error",
        title: "Login Failed",
        text: error?.response?.data.message || error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSendOtp = async () => {
    try {
      const emailError = emailValidator(payload.email);
      if (emailError) {
        return SwalError.fire({
          icon: "error",
          title: "Invalid Email",
          text: emailError,
        });
      }

      setOtpLoading(true);
      const response = await sendOtpForAdminLogin({ email: payload.email });
      if (response?.success) {
        Swal.fire({
          icon: "success",
          title: "OTP Sent",
          text: response?.message || "OTP sent successfully",
        });
      }
    } catch (error) {
      console.log(error);
      SwalError.fire({
        icon: "error",
        title: "Login Failed",
        text: error?.response?.data.message || error.message,
      })
    } finally {
      setOtpLoading(false);
    }
  }


  return (
    <>
      {/* {loading && <PageLoader />} */}
      <div className="AuthLoginForm AuthAdminLoginForm content max-w-2xl w-full">
        <h5 className="main-heading text-5xl" data-aos="fade-up">
          Welcome Back Admin<span className="hii">👋</span>
        </h5>
        <p data-aos="fade-up" className="text-2xl my-3">
          Today is a new day. It's your day. You shape it. Sign in to start
          managing your projects.
        </p>
        <div data-aos="fade-up" className="w-full flex flex-col items-center gap-4 mt-5">
          <div className="w-full">
            <TextInput
              onChange={(e) => setPayload({ ...payload, email: e.target.value })}
              value={payload?.email}
              placeholder={"Example@gmail.com"}
              labelName="Email"
              error={errors.email}
              className="!w-full"
            />
          </div>
          <div className="w-full">
            <TextInputPassword
              type={"password"}
              value={payload?.password}
              onChange={(e) =>
                setPayload({ ...payload, password: e.target.value })
              }
              placeholder={"Enter Password"}
              labelName="Password"
              error={errors.password}
            />
          </div>

          <div className="w-full">
            <label className="text-2xl mb-2 block">One Time Password</label>

            <div className="flex items-center gap-3 w-full">
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={6}
                value={payload.otp}
                onChange={(e) =>
                  setPayload({
                    ...payload,
                    otp: e.target.value.replace(/\D/g, ""),
                  })
                }
                placeholder="Enter OTP"
                className="w-full px-4 py-3 text-2xl rounded-2xl text-black"
              />

              <button
                onClick={handleSendOtp}
                disabled={otpLoading || !payload?.email}
                className="w-60 px-2 py-3 bg-cyan-600 hover:bg-cyan-700 text-2xl rounded-2xl text-white font-semibold disabled:opacity-60"
              >
                {otpLoading ? "Sending..." : "Send OTP"}
              </button>
            </div>
          </div>


          <div data-aos="fade-up" className="btns w-full">
            <Button2
              onClick={handleAdminLogin}
              name={loading ? "Logging in..." : "Login"}
              disabled={loading}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthAdminLoginForm;

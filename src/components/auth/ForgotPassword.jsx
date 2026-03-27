import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { sendOtpForResetPass, resetPassword } from "../../api/user-api";

const ForgotPassword = () => {
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [otp, setotp] = useState(null);
    const navigate = useNavigate();

    const sendOtp = async () => {
        if (!email, !username) return setMessage("Email and username is required");

        try {
            setLoading(true);
            setMessage("");

            const payload = { email, username };
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

            const payload = { email, password, otp, username };
            console.log("RESET PAYLOAD:", payload);

            const res = await resetPassword(payload);
            console.log("RESET RESPONSE:", res);

            setMessage(res?.message);
            if (res?.success) {
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
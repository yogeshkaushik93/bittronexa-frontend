import { useState } from "react";
import { setExperiencePassword } from "../../api/user-api.js";

const getStrength = (pw) => {
  if (!pw) return { score: 0, label: "", color: "" };
  let s = 0;
  if (pw.length >= 8) s++;
  if (pw.length >= 12) s++;
  if (/[a-z]/.test(pw) && /[A-Z]/.test(pw)) s++;
  if (/\d/.test(pw)) s++;
  if (/[^a-zA-Z0-9]/.test(pw)) s++;
  const levels = [
    { label: "Too Weak", color: "#ef4444" },
    { label: "Weak", color: "#f97316" },
    { label: "Fair", color: "#eab308" },
    { label: "Strong", color: "#22c55e" },
    { label: "Very Strong", color: "#10b981" },
  ];
  const idx = Math.min(s, 5) - 1;
  return {
    score: s,
    label: levels[idx]?.label || "",
    color: levels[idx]?.color || "",
  };
};

const checks = [
  { test: (p) => p.length >= 8, text: "At least 8 characters" },
  { test: (p) => /[A-Z]/.test(p), text: "One uppercase letter" },
  { test: (p) => /[a-z]/.test(p), text: "One lowercase letter" },
  { test: (p) => /\d/.test(p), text: "One number" },
  { test: (p) => /[^a-zA-Z0-9]/.test(p), text: "One special character" },
];

const EyeOpen = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const EyeClosed = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </svg>
);

const LockIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const CheckIcon = ({ passed }) => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke={passed ? "#10b981" : "#64748b"}
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ transition: "stroke 0.3s ease" }}
  >
    {passed ? (
      <polyline points="20 6 9 17 4 12" />
    ) : (
      <line x1="18" y1="6" x2="6" y2="18" />
    )}
  </svg>
);

const Spinner = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    style={{ animation: "spin 0.8s linear infinite" }}
  >
    <path d="M12 2a10 10 0 0 1 10 10" />
  </svg>
);

const SuccessIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#10b981"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const ErrorIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#ef4444"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="15" y1="9" x2="9" y2="15" />
    <line x1="9" y1="9" x2="15" y2="15" />
  </svg>
);

const submitPassword = async (password) => {
  const response = await setExperiencePassword({ password });
  if (!response.success) {
    const errData = await response.json().catch(() => ({}));
    throw new Error(errData.message || `Request failed (${response.status})`);
  }

  return response.json();
};
// ─────────────────────────────────────────────────────────

export const ExperiencePassword = () => {
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [focused, setFocused] = useState(false);
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState("");
  const strength = getStrength(password);

  const handleSubmit = async () => {
    if (strength.score < 3 || status === "loading") return;

    setStatus("loading");
    setErrorMsg("");

    try {
      const data = await setExperiencePassword({ password });
      setStatus("success");
    } catch (err) {
      console.error("API Error:", err);
      setErrorMsg(err.message || "Something went wrong");
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3500);
    }
  };

  const canSubmit =
    strength.score >= 3 && status !== "loading" && status !== "success";

  const buttonContent = () => {
    switch (status) {
      case "loading":
        return (
          <span
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
            }}
          >
            <Spinner /> Submitting...
          </span>
        );
      case "success":
        return (
          <span
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
            }}
          >
            <SuccessIcon /> Password Set!
          </span>
        );
      case "error":
        return "Try Again →";
      default:
        return strength.score >= 3 ? "Continue →" : "Enter a stronger password";
    }
  };

  const buttonBg = () => {
    if (status === "success")
      return "linear-gradient(135deg, #10b981 0%, #059669 100%)";
    if (status === "error")
      return "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)";
    if (status === "loading" || canSubmit)
      return "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)";
    return "#1a1a28";
  };

  const buttonShadow = () => {
    if (status === "success") return "0 8px 30px rgba(16,185,129,0.35)";
    if (status === "error") return "0 8px 30px rgba(239,68,68,0.35)";
    if (canSubmit || status === "loading")
      return "0 8px 30px rgba(99,102,241,0.35)";
    return "none";
  };

  return (
    <div
      style={{
        // minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#0a0a0f",
        fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif",
        padding: "20px",
      }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Space+Mono:wght@400;700&display=swap"
        rel="stylesheet"
      />

      <div style={{ width: "100%", maxWidth: 420, position: "relative" }}>
        {/* Glow */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "80%",
            height: "80%",
            background:
              status === "success"
                ? "radial-gradient(circle, #10b98120 0%, transparent 70%)"
                : password.length > 0
                  ? `radial-gradient(circle, ${strength.color}15 0%, transparent 70%)`
                  : "radial-gradient(circle, #6366f115 0%, transparent 70%)",
            filter: "blur(40px)",
            transition: "background 0.5s ease",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />

        <div
          style={{
            position: "relative",
            zIndex: 1,
            background: "linear-gradient(145deg, #13131a 0%, #0e0e15 100%)",
            border: `1px solid ${focused ? "#2a2a3d" : "#1a1a28"}`,
            borderRadius: 20,
            padding: "36px 32px 32px",
            boxShadow:
              "0 25px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.03)",
            transition: "border-color 0.3s ease",
          }}
        >
          {/* Header */}
          <div style={{ marginBottom: 28 }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: 44,
                height: 44,
                borderRadius: 12,
                background:
                  status === "success"
                    ? "linear-gradient(135deg, #10b981 0%, #059669 100%)"
                    : "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                marginBottom: 16,
                boxShadow:
                  status === "success"
                    ? "0 8px 24px rgba(16,185,129,0.3)"
                    : "0 8px 24px rgba(99,102,241,0.3)",
                transition: "all 0.5s ease",
              }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {status === "success" ? (
                  <polyline points="20 6 9 17 4 12" />
                ) : (
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                )}
              </svg>
            </div>
            <h2
              style={{
                color: "#f0f0f5",
                fontSize: 22,
                fontWeight: 700,
                margin: "0 0 6px 0",
                letterSpacing: "-0.02em",
              }}
            >
              {status === "success" ? "Password saved!" : "Set your password"}
            </h2>
            <p
              style={{
                color: "#64748b",
                fontSize: 14,
                margin: 0,
                lineHeight: 1.5,
              }}
            >
              {status === "success"
                ? "Your password has been set successfully"
                : "Make it strong and memorable"}
            </p>
          </div>

          {/* Input */}
          <div
            style={{
              position: "relative",
              marginBottom: 20,
              opacity: status === "success" ? 0.4 : 1,
              transition: "opacity 0.4s ease",
              pointerEvents: status === "success" ? "none" : "auto",
            }}
          >
            <label
              style={{
                display: "block",
                color: "#94a3b8",
                fontSize: 12,
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                marginBottom: 10,
                fontFamily: "'Space Mono', monospace",
              }}
            >
              Password
            </label>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                background: focused ? "#1a1a28" : "#14141e",
                border: `1.5px solid ${focused ? "#6366f1" : "#1e1e30"}`,
                borderRadius: 12,
                transition: "all 0.25s ease",
                boxShadow: focused ? "0 0 0 3px rgba(99,102,241,0.12)" : "none",
              }}
            >
              <div
                style={{
                  padding: "0 0 0 16px",
                  color: focused ? "#6366f1" : "#475569",
                  display: "flex",
                  alignItems: "center",
                  transition: "color 0.25s ease",
                }}
              >
                <LockIcon />
              </div>
              <input
                type={show ? "text" : "password"}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (status === "error") setStatus("idle");
                }}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                placeholder="Enter your password"
                disabled={status === "loading"}
                style={{
                  flex: 1,
                  background: "transparent",
                  border: "none",
                  outline: "none",
                  padding: "16px 12px",
                  color: "#e2e8f0",
                  fontSize: 15,
                  fontFamily: show
                    ? "'DM Sans', sans-serif"
                    : "'Space Mono', monospace",
                  letterSpacing: show ? "normal" : "0.15em",
                  caretColor: "#6366f1",
                }}
              />
              <button
                onClick={() => setShow(!show)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: "0 16px",
                  color: "#64748b",
                  display: "flex",
                  alignItems: "center",
                  transition: "color 0.2s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#a5b4fc")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#64748b")}
                aria-label={show ? "Hide password" : "Show password"}
              >
                {show ? <EyeOpen /> : <EyeClosed />}
              </button>
            </div>
          </div>

          {/* Strength Bar */}
          {password.length > 0 && status !== "success" && (
            <div
              style={{
                marginBottom: 22,
                animation: "fadeSlideIn 0.3s ease forwards",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 10,
                }}
              >
                <span
                  style={{
                    color: "#94a3b8",
                    fontSize: 12,
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    fontFamily: "'Space Mono', monospace",
                  }}
                >
                  Strength
                </span>
                <span
                  style={{
                    color: strength.color,
                    fontSize: 12,
                    fontWeight: 700,
                    letterSpacing: "0.04em",
                    fontFamily: "'Space Mono', monospace",
                    transition: "color 0.3s ease",
                  }}
                >
                  {strength.label}
                </span>
              </div>
              <div style={{ display: "flex", gap: 5 }}>
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    style={{
                      flex: 1,
                      height: 4,
                      borderRadius: 99,
                      background:
                        i <= strength.score ? strength.color : "#1e1e30",
                      transition: "background 0.35s ease",
                      boxShadow:
                        i <= strength.score
                          ? `0 0 8px ${strength.color}40`
                          : "none",
                    }}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Requirements */}
          {password.length > 0 && status !== "success" && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 8,
                padding: "16px 18px",
                background: "#0f0f18",
                borderRadius: 12,
                border: "1px solid #1a1a28",
                animation: "fadeSlideIn 0.4s ease forwards",
              }}
            >
              {checks.map((c, i) => {
                const passed = c.test(password);
                return (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      transition: "opacity 0.3s ease",
                      opacity: passed ? 0.7 : 1,
                    }}
                  >
                    <CheckIcon passed={passed} />
                    <span
                      style={{
                        color: passed ? "#10b981" : "#64748b",
                        fontSize: 13,
                        fontWeight: 500,
                        transition: "color 0.3s ease",
                        textDecoration: passed ? "line-through" : "none",
                        textDecorationColor: passed
                          ? "#10b98140"
                          : "transparent",
                      }}
                    >
                      {c.text}
                    </span>
                  </div>
                );
              })}
            </div>
          )}

          {/* Error Toast */}
          {status === "error" && errorMsg && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "12px 16px",
                marginTop: 16,
                background: "rgba(239,68,68,0.08)",
                border: "1px solid rgba(239,68,68,0.2)",
                borderRadius: 10,
                animation: "fadeSlideIn 0.3s ease forwards",
              }}
            >
              <ErrorIcon />
              <span style={{ color: "#fca5a5", fontSize: 13, fontWeight: 500 }}>
                {errorMsg}
              </span>
            </div>
          )}

          {/* Submit */}
          <button
            disabled={!canSubmit}
            onClick={handleSubmit}
            style={{
              width: "100%",
              marginTop: 24,
              padding: "16px",
              borderRadius: 12,
              border: "none",
              fontSize: 15,
              fontWeight: 700,
              fontFamily: "'DM Sans', sans-serif",
              letterSpacing: "0.02em",
              cursor: canSubmit ? "pointer" : "not-allowed",
              background: buttonBg(),
              color:
                canSubmit ||
                status === "loading" ||
                status === "success" ||
                status === "error"
                  ? "#fff"
                  : "#475569",
              boxShadow: buttonShadow(),
              transition: "all 0.35s ease",
              transform: "translateY(0)",
            }}
            onMouseEnter={(e) => {
              if (canSubmit) {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow =
                  "0 12px 40px rgba(99,102,241,0.45)";
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = buttonShadow();
            }}
          >
            {buttonContent()}
          </button>
        </div>

        <style>{`
          @keyframes fadeSlideIn {
            from { opacity: 0; transform: translateY(8px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
          input::placeholder { color: #334155; }
        `}</style>
      </div>
    </div>
  );
};

export default ExperiencePassword;

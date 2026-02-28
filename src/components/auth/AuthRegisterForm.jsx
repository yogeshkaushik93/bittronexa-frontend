import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import PageLoader from "../ui/PageLoader";
import { SwalError } from "../../utils/custom-alert";
import Swal from "sweetalert2";
import ReusableForm from "../ui/ReusableForm";
import {
  User,
  Mail,
  Lock,
  Rocket,
  Share2,
  CheckCircle,
} from "lucide-react";
import { registerWithEmail } from "../../api/auth-api";
import cloueFare from "../../screens/assets/cloudefarepng.png";
import Flag from "react-world-flags";
import {  AuthRoutes } from "../../constants/Routes";
import { getNameByRefrel } from "../../api/user-api";

const options = [
  { name: "Afghanistan", value: "+93", code: "AF" },
  { name: "Albania", value: "+355", code: "AL" },
  { name: "Algeria", value: "+213", code: "DZ" },
  { name: "Andorra", value: "+376", code: "AD" },
  { name: "Angola", value: "+244", code: "AO" },
  { name: "Antigua and Barbuda", value: "+1-268", code: "AG" },
  { name: "Argentina", value: "+54", code: "AR" },
  { name: "Armenia", value: "+374", code: "AM" },
  { name: "Australia", value: "+61", code: "AU" },
  { name: "Austria", value: "+43", code: "AT" },
  { name: "Azerbaijan", value: "+994", code: "AZ" },
  { name: "Bahamas", value: "+1-242", code: "BS" },
  { name: "Bahrain", value: "+973", code: "BH" },
  { name: "Bangladesh", value: "+880", code: "BD" },
  { name: "Barbados", value: "+1-246", code: "BB" },
  { name: "Belarus", value: "+375", code: "BY" },
  { name: "Belgium", value: "+32", code: "BE" },
  { name: "Belize", value: "+501", code: "BZ" },
  { name: "Benin", value: "+229", code: "BJ" },
  { name: "Bhutan", value: "+975", code: "BT" },
  { name: "Bolivia", value: "+591", code: "BO" },
  { name: "Bosnia and Herzegovina", value: "+387", code: "BA" },
  { name: "Botswana", value: "+267", code: "BW" },
  { name: "Brazil", value: "+55", code: "BR" },
  { name: "Brunei", value: "+673", code: "BN" },
  { name: "Bulgaria", value: "+359", code: "BG" },
  { name: "Burkina Faso", value: "+226", code: "BF" },
  { name: "Burundi", value: "+257", code: "BI" },
  { name: "Cambodia", value: "+855", code: "KH" },
  { name: "Cameroon", value: "+237", code: "CM" },
  { name: "Canada", value: "+1", code: "CA" },
  { name: "Cape Verde", value: "+238", code: "CV" },
  { name: "Central African Republic", value: "+236", code: "CF" },
  { name: "Chad", value: "+235", code: "TD" },
  { name: "Chile", value: "+56", code: "CL" },
  { name: "China", value: "+86", code: "CN" },
  { name: "Colombia", value: "+57", code: "CO" },
  { name: "Comoros", value: "+269", code: "KM" },
  { name: "Congo (Brazzaville)", value: "+242", code: "CG" },
  { name: "Congo (Kinshasa)", value: "+243", code: "CD" },
  { name: "Costa Rica", value: "+506", code: "CR" },
  { name: "Croatia", value: "+385", code: "HR" },
  { name: "Cuba", value: "+53", code: "CU" },
  { name: "Cyprus", value: "+357", code: "CY" },
  { name: "Czech Republic", value: "+420", code: "CZ" },
  { name: "Denmark", value: "+45", code: "DK" },
  { name: "Djibouti", value: "+253", code: "DJ" },
  { name: "Dominica", value: "+1-767", code: "DM" },
  { name: "Dominican Republic", value: "+1-809", code: "DO" },
  { name: "Ecuador", value: "+593", code: "EC" },
  { name: "Egypt", value: "+20", code: "EG" },
  { name: "El Salvador", value: "+503", code: "SV" },
  { name: "Equatorial Guinea", value: "+240", code: "GQ" },
  { name: "Eritrea", value: "+291", code: "ER" },
  { name: "Estonia", value: "+372", code: "EE" },
  { name: "Eswatini", value: "+268", code: "SZ" },
  { name: "Ethiopia", value: "+251", code: "ET" },
  { name: "Fiji", value: "+679", code: "FJ" },
  { name: "Finland", value: "+358", code: "FI" },
  { name: "France", value: "+33", code: "FR" },
  { name: "Gabon", value: "+241", code: "GA" },
  { name: "Gambia", value: "+220", code: "GM" },
  { name: "Georgia", value: "+995", code: "GE" },
  { name: "Germany", value: "+49", code: "DE" },
  { name: "Ghana", value: "+233", code: "GH" },
  { name: "Greece", value: "+30", code: "GR" },
  { name: "Grenada", value: "+1-473", code: "GD" },
  { name: "Guatemala", value: "+502", code: "GT" },
  { name: "Guinea", value: "+224", code: "GN" },
  { name: "Guinea-Bissau", value: "+245", code: "GW" },
  { name: "Guyana", value: "+592", code: "GY" },
  { name: "Haiti", value: "+509", code: "HT" },
  { name: "Honduras", value: "+504", code: "HN" },
  { name: "Hungary", value: "+36", code: "HU" },
  { name: "Iceland", value: "+354", code: "IS" },
  { name: "India", value: "+91", code: "IN" },
  { name: "Indonesia", value: "+62", code: "ID" },
  { name: "Iran", value: "+98", code: "IR" },
  { name: "Iraq", value: "+964", code: "IQ" },
  { name: "Ireland", value: "+353", code: "IE" },
  { name: "Israel", value: "+972", code: "IL" },
  { name: "Italy", value: "+39", code: "IT" },
  { name: "Jamaica", value: "+1-876", code: "JM" },
  { name: "Japan", value: "+81", code: "JP" },
  { name: "Jordan", value: "+962", code: "JO" },
  { name: "Kazakhstan", value: "+7", code: "KZ" },
  { name: "Kenya", value: "+254", code: "KE" },
  { name: "Kiribati", value: "+686", code: "KI" },
  { name: "Kuwait", value: "+965", code: "KW" },
  { name: "Kyrgyzstan", value: "+996", code: "KG" },
  { name: "Laos", value: "+856", code: "LA" },
  { name: "Latvia", value: "+371", code: "LV" },
  { name: "Lebanon", value: "+961", code: "LB" },
  { name: "Lesotho", value: "+266", code: "LS" },
  { name: "Liberia", value: "+231", code: "LR" },
  { name: "Libya", value: "+218", code: "LY" },
  { name: "Liechtenstein", value: "+423", code: "LI" },
  { name: "Lithuania", value: "+370", code: "LT" },
  { name: "Luxembourg", value: "+352", code: "LU" },
  { name: "Madagascar", value: "+261", code: "MG" },
  { name: "Malawi", value: "+265", code: "MW" },
  { name: "Malaysia", value: "+60", code: "MY" },
  { name: "Maldives", value: "+960", code: "MV" },
  { name: "Mali", value: "+223", code: "ML" },
  { name: "Malta", value: "+356", code: "MT" },
  { name: "Marshall Islands", value: "+692", code: "MH" },
  { name: "Mauritania", value: "+222", code: "MR" },
  { name: "Mauritius", value: "+230", code: "MU" },
  { name: "Mexico", value: "+52", code: "MX" },
  { name: "Micronesia", value: "+691", code: "FM" },
  { name: "Moldova", value: "+373", code: "MD" },
  { name: "Monaco", value: "+377", code: "MC" },
  { name: "Mongolia", value: "+976", code: "MN" },
  { name: "Montenegro", value: "+382", code: "ME" },
  { name: "Morocco", value: "+212", code: "MA" },
  { name: "Mozambique", value: "+258", code: "MZ" },
  { name: "Myanmar", value: "+95", code: "MM" },
  { name: "Namibia", value: "+264", code: "NA" },
  { name: "Nauru", value: "+674", code: "NR" },
  { name: "Nepal", value: "+977", code: "NP" },
  { name: "Netherlands", value: "+31", code: "NL" },
  { name: "New Zealand", value: "+64", code: "NZ" },
  { name: "Nicaragua", value: "+505", code: "NI" },
  { name: "Niger", value: "+227", code: "NE" },
  { name: "Nigeria", value: "+234", code: "NG" },
  { name: "North Korea", value: "+850", code: "KP" },
  { name: "North Macedonia", value: "+389", code: "MK" },
  { name: "Norway", value: "+47", code: "NO" },
  { name: "Oman", value: "+968", code: "OM" },
  { name: "Pakistan", value: "+92", code: "PK" },
  { name: "Palau", value: "+680", code: "PW" },
  { name: "Palestine", value: "+970", code: "PS" },
  { name: "Panama", value: "+507", code: "PA" },
  { name: "Papua New Guinea", value: "+675", code: "PG" },
  { name: "Paraguay", value: "+595", code: "PY" },
  { name: "Peru", value: "+51", code: "PE" },
  { name: "Philippines", value: "+63", code: "PH" },
  { name: "Poland", value: "+48", code: "PL" },
  { name: "Portugal", value: "+351", code: "PT" },
  { name: "Qatar", value: "+974", code: "QA" },
  { name: "Romania", value: "+40", code: "RO" },
  { name: "Russia", value: "+7", code: "RU" },
  { name: "Rwanda", value: "+250", code: "RW" },
  { name: "Saint Kitts and Nevis", value: "+1-869", code: "KN" },
  { name: "Saint Lucia", value: "+1-758", code: "LC" },
  { name: "Saint Vincent and the Grenadines", value: "+1-784", code: "VC" },
  { name: "Samoa", value: "+685", code: "WS" },
  { name: "San Marino", value: "+378", code: "SM" },
  { name: "Sao Tome and Principe", value: "+239", code: "ST" },
  { name: "Saudi Arabia", value: "+966", code: "SA" },
  { name: "Senegal", value: "+221", code: "SN" },
  { name: "Serbia", value: "+381", code: "RS" },
  { name: "Seychelles", value: "+248", code: "SC" },
  { name: "Sierra Leone", value: "+232", code: "SL" },
  { name: "Singapore", value: "+65", code: "SG" },
  { name: "Slovakia", value: "+421", code: "SK" },
  { name: "Slovenia", value: "+386", code: "SI" },
  { name: "Solomon Islands", value: "+677", code: "SB" },
  { name: "Somalia", value: "+252", code: "SO" },
  { name: "South Africa", value: "+27", code: "ZA" },
  { name: "South Korea", value: "+82", code: "KR" },
  { name: "South Sudan", value: "+211", code: "SS" },
  { name: "Spain", value: "+34", code: "ES" },
  { name: "Sri Lanka", value: "+94", code: "LK" },
  { name: "Sudan", value: "+249", code: "SD" },
  { name: "Suriname", value: "+597", code: "SR" },
  { name: "Sweden", value: "+46", code: "SE" },
  { name: "Switzerland", value: "+41", code: "CH" },
  { name: "Syria", value: "+963", code: "SY" },
  { name: "Taiwan", value: "+886", code: "TW" },
  { name: "Tajikistan", value: "+992", code: "TJ" },
  { name: "Tanzania", value: "+255", code: "TZ" },
  { name: "Thailand", value: "+66", code: "TH" },
  { name: "Timor-Leste", value: "+670", code: "TL" },
  { name: "Togo", value: "+228", code: "TG" },
  { name: "Tonga", value: "+676", code: "TO" },
  { name: "Trinidad and Tobago", value: "+1-868", code: "TT" },
  { name: "Tunisia", value: "+216", code: "TN" },
  { name: "Turkey", value: "+90", code: "TR" },
  { name: "Turkmenistan", value: "+993", code: "TM" },
  { name: "Tuvalu", value: "+688", code: "TV" },
  { name: "Uganda", value: "+256", code: "UG" },
  { name: "Ukraine", value: "+380", code: "UA" },
  { name: "United Arab Emirates", value: "+971", code: "AE" },
  { name: "United Kingdom", value: "+44", code: "GB" },
  { name: "United States", value: "+1", code: "US" },
  { name: "Uruguay", value: "+598", code: "UY" },
  { name: "Uzbekistan", value: "+998", code: "UZ" },
  { name: "Vanuatu", value: "+678", code: "VU" },
  { name: "Vatican City", value: "+379", code: "VA" },
  { name: "Venezuela", value: "+58", code: "VE" },
  { name: "Vietnam", value: "+84", code: "VN" },
  { name: "Yemen", value: "+967", code: "YE" },
  { name: "Zambia", value: "+260", code: "ZM" },
  { name: "Zimbabwe", value: "+263", code: "ZW" },
];

const AuthRegisterForm = () => {
  const { search } = useLocation();
  const navigate = useNavigate();

  const [payload, setPayload] = useState({
    name: "",
    email: "",
    password: "",
    mobile: "",
    countryCode: "+91",
    referredBy: "",
    leg: "",
  });

  const [loading, setLoading] = useState(false);
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [captchaLoading, setCaptchaLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [passwordError, setPasswordError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [referrerName, setReferrerName] = useState("");
  const [refLoading, setRefLoading] = useState(false);
  const [refError, setRefError] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(search);
    const referralCode = params.get("referral") || "";
    setPayload((prev) => ({ ...prev, referredBy: referralCode }));
  }, [search]);

  // Validate password / confirm in realtime
  useEffect(() => {
    if (payload.password && payload.password.length < 8) {
      setPasswordError("Password must be at least 8 characters.");
      setPasswordsMatch(false);
      return;
    }

    if (confirmPassword.length === 0 && payload.password.length === 0) {
      setPasswordError("");
      setPasswordsMatch(true);
      return;
    }

    if (confirmPassword !== payload.password) {
      setPasswordError("Passwords do not match.");
      setPasswordsMatch(false);
    } else {
      setPasswordError("");
      setPasswordsMatch(true);
    }
  }, [confirmPassword, payload.password]);

  // FIXED: Referral code lookup with proper debouncing
  useEffect(() => {
    const refCode = payload.referredBy.trim();
    
    // Reset states when empty
    if (!refCode) {
      setReferrerName("");
      setRefError("");
      setRefLoading(false);
      return;
    }

    // Set loading immediately
    setRefLoading(true);
    setRefError("");
    setReferrerName("");

    // Debounce API call
    const timer = setTimeout(async () => {
      try {
        console.log("Calling API with referral code:", refCode);
        const requestPayload = { code: refCode };
        const res = await getNameByRefrel(requestPayload);
        
        console.log("API Response:", res);
        
        if (res?.success) {
          setReferrerName(res?.username ||  "Unknown");
          setRefError("");
        } else {
          setReferrerName("");
          setRefError(res?.message || "Invalid referral code");
        }
      } catch (err) {
        console.error("Referral lookup error:", err);
        setReferrerName("");
        setRefError(err?.response?.data?.message || "Failed to verify referral code");
      } finally {
        setRefLoading(false);
      }
    }, 800); // 800ms debounce

    return () => clearTimeout(timer);
  }, [payload.referredBy]);

  const handleNavigate = () => {
    navigate(AuthRoutes.LOGIN);
  };

  const handleCaptchaVerify = () => {
    setCaptchaLoading(true);
    setTimeout(() => {
      setCaptchaVerified(true);
      setCaptchaLoading(false);
    }, 1500);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    if (!captchaVerified) {
      SwalError.fire({
        icon: "warning",
        title: "Verification Required",
        text: "Please complete the security verification first.",
      });
      return;
    }

    if (!payload.password || payload.password.length < 8) {
      SwalError.fire({
        icon: "error",
        title: "Weak Password",
        text: "Password must be at least 8 characters.",
      });
      return;
    }

    if (!passwordsMatch) {
      SwalError.fire({
        icon: "error",
        title: "Password Mismatch",
        text: "Please make sure the passwords match.",
      });
      return;
    }

    try {
      setLoading(true);
      const data = {
        name: payload.name.trim(),
        email: payload.email.trim().toLowerCase(),
        password: payload.password,
        phone: `${payload.countryCode}${payload.mobile}`.trim(),
        referredBy: payload.referredBy || "",
        position: payload.leg?.toLowerCase() || "",
      };

      console.log("register payload:", { ...data, password: "***" });

      const response = await registerWithEmail(data);
      if (response?.success) {
        Swal.fire({
          icon: "success",
          title: "Registration Successful",
          html: `
            <p>${response?.message}</p>
            <p style="margin-top:8px; font-size:16px;">
              <b>Your Username:</b>
              <span id="usernameText" style="color:#3085d6; font-weight:600;">
                ${response?.user?.username}
              </span>
              <button id="copyBtn" 
                style="
                  margin-left:8px;
                  padding:2px 6px;
                  font-size:12px;
                  border:none;
                  border-radius:4px;
                  background:#3085d6;
                  color:white;
                  cursor:pointer;
                ">
                Copy
              </button>
            </p>
          `,
          didOpen: () => {
            const copyBtn = document.getElementById("copyBtn");
            const usernameText = document.getElementById("usernameText")?.innerText;

            if (copyBtn) {
              copyBtn.addEventListener("click", () => {
                navigator.clipboard.writeText(usernameText).then(() => {
                  copyBtn.innerText = "Copied!";
                  copyBtn.style.background = "#4caf50";
                  setTimeout(() => {
                    copyBtn.innerText = "Copy";
                    copyBtn.style.background = "#3085d6";
                  }, 1500);
                });
              });
            }
          },
        }).then(() => {
          handleNavigate();
        });
      } else {
        SwalError.fire({
          icon: "error",
          title: "Registration Failed",
          text: response?.message || "Something went wrong",
        });
      }
    } catch (error) {
      console.error(error);
      SwalError.fire({
        icon: "error",
        title: "Registration Failed",
        text: error?.response?.data?.message || error.message || "Unknown error",
      });
    } finally {
      setLoading(false);
    }
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
            Create Account
          </Link>

          <ReusableForm
            label="Full Name"
            type="text"
            name="name"
            value={payload.name}
            onChange={(e) =>
              setPayload((prev) => ({ ...prev, name: e.target.value }))
            }
            placeholder={"Enter Your Full Name"}
            required={true}
            icon={User}
          />

          <ReusableForm
            label="Email Address"
            type="email"
            name="email"
            value={payload.email}
            onChange={(e) =>
              setPayload((prev) => ({ ...prev, email: e.target.value }))
            }
            placeholder={"Enter Your Email"}
            required={true}
            icon={Mail}
          />

          {/* Mobile Number with Country Flag */}
          <div className="relative">
            <label className="text-white mb-1 text-xl flex gap-2">
              MOBILE NO. <span className="text-red-500 text-4xl">*</span>
            </label>
            <div className="w-full flex gap-2 items-center">
              <div className="w-[330px] relative">
                <div
                  onClick={() => {
                    setOpen(!open);
                    if (!open) setSearchQuery("");
                  }}
                  className="p-3 rounded-lg border !border-gray-600 text-xl bg-transparent text-white cursor-pointer flex justify-between items-center gap-2"
                >
                  <Flag
                    code={
                      options.find((opt) => opt.value === payload.countryCode)
                        ?.code || "IN"
                    }
                    style={{ width: 24, height: 16 }}
                  />
                  <span>
                    {options.find((opt) => opt.value === payload.countryCode)
                      ?.value}{" "}
                    (
                    {options.find((opt) => opt.value === payload.countryCode)
                      ?.name}
                    )
                  </span>
                  <span className="ml-auto">▼</span>
                </div>

                {open && (
                  <div className="absolute z-10 w-full max-h-96 overflow-auto mt-2 rounded-lg border !border-gray-600 bg-black text-white text-xl">
                    <div className="sticky top-0 bg-[#2b2e39] border-b border-gray-700">
                      <input
                        type="text"
                        className="w-full p-3 outline-none bg-[#2b2e39] text-white placeholder-gray-400 text-xl"
                        placeholder="Search country or code..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    {options
                      .filter(
                        (option) =>
                          option.name
                            .toLowerCase()
                            .includes(searchQuery.toLowerCase()) ||
                          option.value.includes(searchQuery)
                      )
                      .map((option) => (
                        <div
                          key={`${option.name}-${option.value}`}
                          onClick={() => {
                            setPayload({ ...payload, countryCode: option.value });
                            setOpen(false);
                            setSearchQuery("");
                          }}
                          className={`flex items-center justify-between p-4 border-b border-gray-700 last:border-b-0 cursor-pointer hover:bg-[#3a3d4c] ${
                            payload.countryCode === option.value
                              ? "text-cyan-500"
                              : ""
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <Flag
                              code={option.code}
                              style={{ width: 24, height: 16 }}
                            />
                            <span>
                              {option.value} ({option.name})
                            </span>
                          </div>
                          <span
                            className={`w-5 h-5 rounded-full border-2 ${
                              payload.countryCode === option.value
                                ? "border-cyan-500 bg-cyan-500"
                                : "border-white"
                            }`}
                          />
                        </div>
                      ))}
                  </div>
                )}
              </div>

              <input
                type="number"
                className="text-xl w-full p-3 rounded-lg outline-none border !border-gray-600 bg-transparent text-white placeholder-gray-400"
                placeholder="Enter mobile number"
                value={payload.mobile}
                onChange={(e) => setPayload({ ...payload, mobile: e.target.value })}
                required
              />
            </div>
          </div>

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
            autoComplete="new-password"
          />

          <ReusableForm
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder={"Confirm Your Password"}
            required={true}
            icon={Lock}
            autoComplete="new-password"
          />

          {passwordError ? (
            <p className="text-red-400 text-sm mt-1">{passwordError}</p>
          ) : (
            payload.password &&
            confirmPassword &&
            passwordsMatch && (
              <p className="text-green-400 text-sm mt-1">Passwords match ✓</p>
            )
          )}

          {/* Referrer Status Display */}
          {refLoading && (
            <div className="flex items-center gap-2 text-yellow-400 text-lg">
              <div className="w-4 h-4 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
              <span>Verifying referral code...</span>
            </div>
          )}

          {referrerName && !refLoading && (
            <div className="flex items-center gap-2 text-green-400 text-lg font-semibold bg-green-900/20 p-3 rounded-lg border border-green-500/30">
              <CheckCircle className="w-5 h-5" />
              <span>Referrer: {referrerName}</span>
            </div>
          )}

          {refError && !refLoading && (
            <div className="flex items-center gap-2 text-red-400 text-lg bg-red-900/20 p-3 rounded-lg border border-red-500/30">
              <span>⚠️ {refError}</span>
            </div>
          )}

          <ReusableForm
            label="Referral Code"
            type="text"
            name="referredBy"
            value={payload.referredBy}
            onChange={(e) => {
              const value = e.target.value
                .toUpperCase()
                .replace(/[^A-Z0-9]/g, "");

              setPayload((prev) => ({
                ...prev,
                referredBy: value,
              }));
            }}
            placeholder="Enter Your Referral Code"
            required={false}
            icon={Share2}
            autoComplete="off"
          />

          <ReusableForm
            label="Leg Position"
            type="select"
            name="leg"
            options={[
              { value: "Left", label: "Left" },
              { value: "Right", label: "Right" },
            ]}
            value={payload.leg}
            onChange={(e) => setPayload((prev) => ({ ...prev, leg: e.target.value }))}
            required={true}
            icon={Rocket}
          />

          {/* Cloudflare Turnstile Simulation */}
          <div className="mt-4" data-aos="fade-up">
            <div
              className={`relative border rounded-lg p-4 transition-all duration-300 ${
                captchaVerified ? "border-green-500 bg-green-50" : "border-gray-400 bg-gray-50"
              }`}
            >
              {!captchaVerified ? (
                <div className="flex items-center justify-between">
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
          </div>

          <button
            type="submit"
            disabled={
              loading ||
              !captchaVerified ||
              !passwordsMatch ||
              !payload.password ||
              payload.password.length < 8
            }
            className="mt-6 bg-[var(--cyan-active)] w-full text-xl hover:scale-105 text-white font-semibold py-4 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {loading ? "Registering..." : "Register"}
          </button>

          <span className="flex justify-center mt-4 text-gray-300 text-xl">
            Already have an account?
            <Link to={AuthRoutes.LOGIN} className="ml-2 font-semibold text-white underline hover:text-blue-400 transition">
              Login
            </Link>
          </span>
        </form>
      </div>
    </>
  );
};

export default AuthRegisterForm;
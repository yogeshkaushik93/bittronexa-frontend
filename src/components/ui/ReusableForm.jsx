// "use client";
// import React, { useState } from "react";
// import { Eye, EyeOff } from "lucide-react";

// const ReusableForm = ({
//   label,
//   name,
//   type = "text",
//   value,
//   onChange,
//   placeholder,
//   options,
//   required = false,
//   icon: Icon,
//   className = "",
//   disabled = false,
//   rows = 4,
// }) => {
//   const [showPassword, setShowPassword] = useState(false);

//   const handleTogglePassword = () => setShowPassword(!showPassword);

//   const commonInputClass = `bg-transparent flex-1 outline-none text-white placeholder-white/70 text-xl disabled:cursor-not-allowed ${className}`;

//   const renderInput = () => {
//     switch (type) {
//       case "select":
//         return (
//           <select
//             id={name}
//             name={name}
//             value={value}
//             onChange={onChange}
//             required={required}
//             disabled={disabled}
//             className={commonInputClass}
//           >
//             <option value="" className="bg-[#101420] text-gray-400">
//               Select {label}
//             </option>
//             {options?.map((opt) => (
//               <option
//                 key={opt?.value || opt}
//                 value={opt?.value || opt}
//                 className="bg-[#101420] text-gray-300"
//               >
//                 {opt?.label || opt}
//               </option>
//             ))}
//           </select>
//         );

//       case "date":
//         return (
//           <input
//             id={name}
//             name={name}
//             type="date"
//             value={value}
//             onChange={onChange}
//             required={required}
//             disabled={disabled}
//             className={`${commonInputClass} cursor-pointer [color-scheme:dark]`}
//           />
//         );

//       case "password":
//         return (
//           <div className="flex items-center w-full">
//             <input
//               id={name}
//               name={name}
//               type={showPassword ? "text" : "password"}
//               placeholder={placeholder}
//               value={value}
//               onChange={onChange}
//               required={required}
//               disabled={disabled}
//               className={commonInputClass}
//             />
//             <button
//               type="button"
//               onClick={handleTogglePassword}
//               className="text-gray-400 hover:text-gray-200 transition ml-2"
//             >
//               {showPassword ? (
//                 <EyeOff className="w-6 h-6" />
//               ) : (
//                 <Eye className="w-6 h-6" />
//               )}
//             </button>
//           </div>
//         );

//       case "file":
//         return (
//           <input
//             id={name}
//             name={name}
//             type="file"
//             onChange={onChange}
//             required={required}
//             disabled={disabled}
//             className={`file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[var(--cyan-active)] file:text-white ${commonInputClass}`}
//           />
//         );

//       case "textarea":
//         return (
//           <div className="w-full flex  gap-2">
//             {Icon && (
//               <div className="bg-[#252525] p-2 rounded w-fit h-fit">
//                 <Icon className="w-10 h-10 text-gray-300 group-focus-within:text-[var(--cyan-active)]" />
//               </div>
//             )}
//             <textarea
//               id={name}
//               name={name}
//               rows={rows}
//               placeholder={placeholder}
//               value={value}
//               onChange={onChange}
//               required={required}
//               disabled={disabled}
//               className={`${commonInputClass} px-2 py-3`}
//             />
//           </div>
//         );

//       default:
//         return (
//           <input
//             id={name}
//             name={name}
//             type={type}
//             placeholder={placeholder}
//             value={type !== "file" ? value : undefined}
//             onChange={onChange}
//             required={required}
//             disabled={disabled}
//             className={commonInputClass}
//           />
//         );
//     }
//   };

//   return (
//     <div className="w-full">
//       {label && (
//         <label
//           htmlFor={name}
//           className="block text-xl font-medium mb-2 text-gray-300"
//         >
//           {label} {required && <span className="text-red-500">*</span>}
//         </label>
//       )}

//       <div
//         className={`flex ${
//           type === "textarea" ? "flex-col items-start" : "items-center"
//         } gap-3 rounded-lg px-2 py-2 border !border-gray-700 ${
//           type === "file" ? "bg-[#111]" : ""
//         } group`}
//       >
//         {/* Show icon for all input types except textarea (handled inside renderInput) */}
//         {Icon && type !== "textarea" && (
//           <div className="bg-[#252525] p-2 rounded">
//             <Icon className="w-10 h-10 text-gray-300 group-focus-within:text-[var(--cyan-active)]" />
//           </div>
//         )}
//         {renderInput()}
//       </div>
//     </div>
//   );
// };

// export default ReusableForm;





"use client";
import React, { useEffect, useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const ReusableForm = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  options,
  required = false,
  icon: Icon,
  className = "",
  disabled = false,
  rows = 4,

  // NEW: inline right button support
  rightButton,                // string: text to show, e.g. "Get OTP"
  onRightButtonClick,         // function: handler, may return Promise<boolean|void>
  rightButtonCooldown = 0,    // seconds to disable button after successful click (0 = no cooldown)
  rightButtonDisabled = false,// externally force-disable button
  rightButtonClassName = "",  // additional classes for the button

  // forwarded input attributes
  inputMode,
  maxLength,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [btnPending, setBtnPending] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
    let timer;
    if (cooldown > 0) {
      timer = setInterval(() => setCooldown((c) => (c <= 1 ? 0 : c - 1)), 1000);
    }
    return () => clearInterval(timer);
  }, [cooldown]);

  const handleTogglePassword = () => setShowPassword(!showPassword);

  // call the provided handler; if it resolves truthy, start cooldown
  const handleRightClick = async () => {
    if (btnPending || cooldown > 0 || rightButtonDisabled) return;
    if (!onRightButtonClick) return;

    try {
      setBtnPending(true);
      const result = await Promise.resolve(onRightButtonClick()); // supports sync/async
      // only start cooldown on explicit truthy response OR if cooldown provided and handler didn't throw
      if (result !== false && rightButtonCooldown > 0) {
        setCooldown(rightButtonCooldown);
      }
    } catch (err) {
      // handler threw — do not start cooldown
      console.error("Right button handler error:", err);
    } finally {
      setBtnPending(false);
    }
  };

  const commonInputClass = `bg-transparent flex-1 outline-none text-white placeholder-white/70 text-xl disabled:cursor-not-allowed ${className}`;

  const renderInput = () => {
    switch (type) {
      case "select":
        return (
          <select
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            required={required}
            disabled={disabled}
            className={commonInputClass}
          >
            <option value="" className="bg-[#101420] text-gray-400">
              Select {label}
            </option>
            {options?.map((opt) => (
              <option
                key={opt?.value || opt}
                value={opt?.value || opt}
                className="bg-[#101420] text-gray-300"
              >
                {opt?.label || opt}
              </option>
            ))}
          </select>
        );

      case "date":
        return (
          <input
            id={name}
            name={name}
            type="date"
            value={value}
            onChange={onChange}
            required={required}
            disabled={disabled}
            className={`${commonInputClass} cursor-pointer [color-scheme:dark]`}
          />
        );

      case "password":
        return (
          <div className="flex items-center w-full">
            <input
              id={name}
              name={name}
              type={showPassword ? "text" : "password"}
              placeholder={placeholder}
              value={value}
              onChange={onChange}
              required={required}
              disabled={disabled}
              className={commonInputClass}
            />
            <button
              type="button"
              onClick={handleTogglePassword}
              className="text-gray-400 hover:text-gray-200 transition ml-2"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff className="w-6 h-6" /> : <Eye className="w-6 h-6" />}
            </button>
          </div>
        );

      case "file":
        return (
          <input
            id={name}
            name={name}
            type="file"
            onChange={onChange}
            required={required}
            disabled={disabled}
            className={`file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[var(--cyan-active)] file:text-white ${commonInputClass}`}
          />
        );

      case "textarea":
        return (
          <div className="w-full flex  gap-2">
            {Icon && (
              <div className="bg-[#252525] p-2 rounded w-fit h-fit">
                <Icon className="w-10 h-10 text-gray-300 group-focus-within:text-[var(--cyan-active)]" />
              </div>
            )}
            <textarea
              id={name}
              name={name}
              rows={rows}
              placeholder={placeholder}
              value={value}
              onChange={onChange}
              required={required}
              disabled={disabled}
              className={`${commonInputClass} px-2 py-3`}
            />
          </div>
        );

      default:
        return (
          <input
            id={name}
            name={name}
            type={type}
            placeholder={placeholder}
            value={type !== "file" ? value : undefined}
            onChange={onChange}
            required={required}
            disabled={disabled}
            inputMode={inputMode}
            maxLength={maxLength}
            className={commonInputClass}
          />
        );
    }
  };

  // Inline right button element (shown for non-textarea inputs)
  const renderRightButton = () => {
    if (!rightButton) return null;

    const isDisabled = btnPending || cooldown > 0 || rightButtonDisabled || disabled;
    const label = cooldown > 0 ? `${cooldown}s` : rightButton;

    return (
      <button
        type="button"
        onClick={handleRightClick}
        disabled={isDisabled}
        aria-disabled={isDisabled}
        aria-label={rightButton}
        className={`ml-3 px-3 py-3 bg-[var(--cyan-active)] hover:bg-cyan-600 text-white text-xl rounded-lg transition flex items-center justify-center ${rightButtonClassName} ${isDisabled ? "opacity-60 cursor-not-allowed" : ""}`}
      >
        {btnPending ? (
          <svg className="animate-spin w-4 h-4 mr-2" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
          </svg>
        ) : null}
        <span>{label}</span>
      </button>
    );
  };

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={name} className="block text-xl font-medium mb-2 text-gray-300">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      <div
        className={`flex ${type === "textarea" ? "flex-col items-start" : "items-center"} gap-3 rounded-lg px-2 py-2 border !border-gray-700 ${type === "file" ? "bg-[#111]" : ""} group`}
      >
        {/* Icon for non-textarea */}
        {Icon && type !== "textarea" && (
          <div className="bg-[#252525] p-2 rounded">
            <Icon className="w-10 h-10 text-gray-300 group-focus-within:text-[var(--cyan-active)]" />
          </div>
        )}

        {/* Input */}
        {renderInput()}

        {/* Inline Right Button (not for textarea) */}
        {type !== "textarea" && renderRightButton()}
      </div>
    </div>
  );
};

export default ReusableForm;

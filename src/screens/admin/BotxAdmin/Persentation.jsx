import React, { useCallback } from "react";

const PDF_URL = "../../../../src/assets/bittronexaAsstes/Bittronexapdf.pdf"; // move to env/config if dynamic

const Persentation = () => {
  const handleViewPdf = useCallback(() => {
  if (!PDF_URL) {
    console.error("PDF URL not configured");
    return;
  }

  try {
    // 1️⃣ Open PDF in new tab
    window.open(PDF_URL, "_blank", "noopener,noreferrer");

    // 2️⃣ Trigger download
    const link = document.createElement("a");
    link.href = PDF_URL;
    link.download = "document.pdf"; // file name
    link.style.display = "none";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

  } catch (err) {
    console.error("Failed to open/download PDF", err);
  }
}, [PDF_URL]);


  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6">
      <h1 className="text-8xl font-bold text-gray-700">
        Persentation
      </h1>

      <button
        onClick={handleViewPdf}
        className="group relative px-8 py-3 rounded-xl font-semibold text-white
                   bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500
                   shadow-lg shadow-purple-500/30
                   transition-all duration-300 ease-out
                   hover:scale-105 hover:shadow-xl
                   active:scale-95"
      >
        <span className="relative z-10 text-3xl flex items-center gap-2">
          📄 View  & Download Pdf
        </span>

        {/* glow effect */}
        <span
          className="absolute inset-0 rounded-xl blur-lg opacity-0
                     bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500
                     transition-opacity duration-300 group-hover:opacity-70"
        />
      </button>
    </div>
  );
};

export default Persentation;

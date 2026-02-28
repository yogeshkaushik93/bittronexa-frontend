import { useState } from "react";
import PageLoader from "../../components/ui/PageLoader";
import { SwalError, SwalSuccess } from "../../utils/custom-alert";
import { raiseSupportRequest } from "../../api/user-api";
import ReusableForm from "../../components/ui/ReusableForm";
import { MessageCircleMore, User, AlertCircle } from "lucide-react";

const ComplainRaiseTicket = () => {
  const [loading, setLoading] = useState(false);
  const [payload, setPayload] = useState({
    subject: "",
    message: "",
    priority: "medium",
  });
  const [file, setFile] = useState(null);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPayload({
      ...payload,
      [name]: value,
    });
  };

  const validateForm = () => {
    if (!payload.subject.trim()) {
      SwalError.fire({
        title: "Error",
        text: "Subject is required.",
        timer: 2000,
      });
      return false;
    }
    if (!payload.message.trim()) {
      SwalError.fire({
        title: "Error",
        text: "Message is required.",
        timer: 2000,
      });
      return false;
    }
    if (!file) {
      SwalError.fire({
        title: "Error",
        text: "Image is required",
        timer: 2000,
      });
      return false;
    }
    if (file && file.size > 2 * 1024 * 1024) {
      SwalError.fire({
        title: "Error",
        text: "File size must be less than 2MB",
        // timer: 2000,
      });
      return false;
    }
    return true;
  };

  const submitSupport = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("subject", payload.subject);
      formData.append("message", payload.message);
      formData.append("priority", payload.priority);

      if (file) {
        formData.append("file", file);
      }

      await raiseSupportRequest(formData);

      SwalSuccess.fire({
        title: "Success!",
        text: "Ticket raised successfully!",
        timer: 2000,
      });

      setPayload({ subject: "", message: "", priority: "medium" });
      setFile(null);
    } catch (err) {
      SwalError.fire({
        title: "Error",
        text: err?.response?.data?.message || "Something went wrong",
        timer: 2000,
      });
    } finally {
      setLoading(false);
    }
  };


  const priorityOptions = [
    { value: "low", label: "Low", color: "text-green-400" },
    { value: "medium", label: "Medium", color: "text-yellow-400" },
    { value: "high", label: "High", color: "text-orange-400" },
    { value: "urgent", label: "Urgent", color: "text-red-500" },
  ];

  return (
    <>
      {loading && <PageLoader />}
      <div className="min-h-screen  text-white p-8">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 text-gray-300 text-xl">
            <span className="hover:text-gray-300 cursor-pointer transition-colors">Home</span>
            <span>/</span>
            <span className="hover:text-gray-300 cursor-pointer transition-colors">Support</span>
            <span>/</span>
            <span className="text-white  font-medium">Raise Ticket</span>
          </div>
          <h1 className="text-3xl font-bold mt-4">Raise a Support Ticket</h1>
        </div>

        <div className="rounded-xl p-8 border !border-gray-800 space-y-7 bg-[#111111]/50">
          <ReusableForm
            type="text"
            label="Subject"
            name="subject"
            value={payload.subject}
            onChange={handleInputChange}
            placeholder="Enter subject of your issue"
            icon={User}
            required={true}
          />

          <div className="space-y-2">
            <label className="text-xl font-medium flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              Priority <span className="text-red-500">*</span>
            </label>
            <select
              name="priority"
              value={payload.priority}
              onChange={handleInputChange}
              className="w-full bg-[#1a1a1a] border !border-gray-700 rounded-lg px-4 py-3 text-xl text-white focus:outline-none focus:border-cyan-500 transition-colors"
            >
              {priorityOptions.map((opt) => (
                <option key={opt.value} value={opt.value} className="bg-[#1a1a1a] text-xl">
                  {opt.label}
                </option>
              ))}
            </select>
            <p className="text-xl text-gray-500 mt-1">
              Current: <span className={priorityOptions.find(p => p.value === payload.priority)?.color + " font-bold text-xl"}>
                {priorityOptions.find(p => p.value === payload.priority)?.label}
              </span>
            </p>
          </div>

          <div className="space-y-2">
            <label className="text-xl font-medium">
              Image Attachment
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const selectedFile = e.target.files[0];

                if (!selectedFile) return;

                const maxSize = 2 * 1024 * 1024; // 1MB

                if (selectedFile.size > maxSize) {
                  SwalError.fire({
                    title: "File Too Large",
                    text: "File size must be less than 2MB",
                    // timer: 2000,
                  });

                  e.target.value = ""; // reset input
                  setFile(null);
                  return;
                }

                const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];

                if (!allowedTypes.includes(selectedFile.type)) {
                  SwalError.fire({
                    title: "Invalid File",
                    text: "Only JPG, PNG images are allowed",
                    timer: 2000,
                  });
                  return;
                }


                setFile(selectedFile);
              }}

              className="w-full bg-[#1a1a1a] border !border-gray-700 rounded-lg px-4 py-3 text-white text-xl"
            />

            {file && (
              <p className="text-sm text-gray-400">
                Selected: {file.name}
              </p>
            )}
          </div>


          <ReusableForm
            label="Message"
            name="message"
            type="textarea"
            value={payload.message}
            onChange={handleInputChange}
            placeholder="Describe your issue in detail..."
            icon={MessageCircleMore}
            required={true}
            rows={6}
          />

          <div className="flex justify-end pt-6">
            <button
              disabled={loading}
              onClick={submitSupport}
              className="bg-[var(--cyan-active)] hover:scale-105 disabled:opacity-70 disabled:hover:scale-100 text-white font-bold px-12 py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-cyan-500/25 text-lg"
            >
              {loading ? "Submitting..." : "Submit Ticket"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ComplainRaiseTicket;
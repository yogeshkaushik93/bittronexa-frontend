import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { activateMaintenanceMode, getMaintenanceModeSettings } from "../../api/admin-api";

const MaintenanceMode = () => {
    const [isMaintenanceMode, setIsMaintenanceMode] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleToggle = () => {
        setIsMaintenanceMode(prev => !prev);
    };

    const handleSubmit = async () => {
        const payload = { maintenanceMode: isMaintenanceMode };
        try {
            setLoading(true);
            const response = await activateMaintenanceMode(payload);
            if (response?.success) {
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: response?.message,
                    confirmButtonText: 'OK'
                });
                fetchMaintenanceModeSettings();
            }
        } catch (error) {
            console.log(error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error?.response?.data?.message || 'Failed to activate maintenance mode',
                confirmButtonText: 'OK'
            })
        } finally {
            setLoading(false);
        }
    };


    const fetchMaintenanceModeSettings = async () => {
        try {
            const response = await getMaintenanceModeSettings();
            if (response?.success) {
                setIsMaintenanceMode(response?.maintenanceSetting?.maintenanceMode);
            }
        } catch (error) {
            console.log("error in get maintenance mode setting", error);
        }
    }

    useEffect(() => {
        fetchMaintenanceModeSettings();
    }, []);

    return (
        <div className="max-w-4xl mx-auto p-5 rounded-2xl bg-gray-700/30 text-white border !border-white/10 shadow-sm mt-5">
            <h2 className="text-4xl text-center font-bold mb-10 text-cyan-500">
                Maintenance Setting
            </h2>

            {/* Login Block */}
            <ToggleRow
                label="Activate Maintenance Mode"
                active={isMaintenanceMode}
                onClick={handleToggle}
            />


            <button
                disabled={loading}
                onClick={handleSubmit}
                className="w-full mt-3 py-3 text-xl rounded-xl bg-cyan-700 hover:bg-cyan-800 transition font-semibold"
            >
                {loading ? "Updating..." : "Save Settings"}
            </button>

            <p className="text-xl text-gray-300 mt-4 text-center">
                Set the options and click <span className="font-semibold">Save</span> to apply changes.
            </p>
        </div>
    );
};

export default MaintenanceMode;


const ToggleRow = ({ label, active, onClick }) => {
    return (
        <div className="flex items-center justify-between mb-4">
            <span className="text-2xl text-white">{label}</span>

            <button
                onClick={onClick}
                className={`w-14 h-8 flex items-center rounded-full p-1 transition ${active ? "bg-green-600" : "bg-gray-600"
                    }`}
            >
                <div
                    className={`w-6 h-6 bg-white rounded-full shadow-md transform transition ${active ? "translate-x-6" : "translate-x-0"
                        }`}
                />
            </button>
        </div>
    );
};
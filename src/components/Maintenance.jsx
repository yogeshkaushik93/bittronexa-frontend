import { useNavigate } from "react-router-dom";
import { MainContent } from "../constants/content/MainContent";

const Maintenance = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-950/95 px-4">
            <div className="max-w-5xl w-full text-center">

                <div className="flex justify-center mb-6">
                    <img
                        src={MainContent.appLogo}
                        alt={MainContent.appName}
                        className="h-72 w-72 object-contain"
                    />
                </div>

                <h1 className="text-5xl font-bold text-cyan-400 mb-3">
                    We’re Under Maintenance
                </h1>

                <p className="text-gray-300 text-xl leading-relaxed mb-6">
                    Our system is currently undergoing scheduled maintenance.
                    We’re working hard to bring everything back online as soon as possible.
                    Thank you for your patience.
                </p>

                <div className="h-px bg-white/10 my-6" />
                <button
                    onClick={() => navigate("/login")}
                    className="mt-8 w-full text-xl py-3 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white font-semibold transition-all"
                >
                    Back To Login
                </button>

                <p className="mt-6 text-lg text-gray-300">
                    © {new Date().getFullYear()} {MainContent.appName}. All rights reserved.
                </p>
            </div>
        </div>
    );
};

export default Maintenance;

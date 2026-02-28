import { useEffect, useState } from "react";
import { SwalError } from "../../utils/custom-alert";
import PageLoader from "../../components/ui/PageLoader";
import { getBannerListUser } from "../../api/user-api";

const Notification = ({ banners, loading}) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [animate, setAnimate] = useState(true);
    
    

    useEffect(() => {
        if (banners.length > 1) {
            const interval = setInterval(() => {
                setAnimate(false);
                setTimeout(() => {
                    setCurrentIndex((prev) =>
                        prev === banners.length - 1 ? 0 : prev + 1
                    );
                    setAnimate(true);
                }, 300);
            }, 5000);

            return () => clearInterval(interval);
        }
    }, [banners]);

    

    if (loading) return <PageLoader />;
    if (!banners.length) return null;

    const banner = banners[currentIndex];

    return (
        <div className="relative w-full border !border-gray-700 overflow-hidden rounded-2xl shadow-2xl group">

            {/* Image */}
            <img
                src={banner.imageUrl}
                alt="banner"
                className={`w-full h-[50vh] object-cover transition-all duration-700 
          ${animate ? "scale-100 opacity-100" : "scale-110 opacity-0"}`}
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

            {/* Text */}
            <div
                className={`absolute bottom-8 left-8 max-w-xl text-white transition-all duration-700 
          ${animate ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
            >
                <h2 className="text-4xl font-extrabold mb-3 drop-shadow-lg">
                    {banner.title}
                </h2>
                <p className="text-lg text-gray-200 leading-relaxed">
                    {banner.description}
                </p>
            </div>

            {/* Progress Bar */}
            {banners.length > 1 && (
                <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20">
                    <div
                        key={currentIndex}
                        className="h-full bg-cyan-600 animate-progress"
                    ></div>
                </div>
            )}

            {/* Dots */}
            <div className="absolute bottom-4 right-6 flex gap-3">
                {banners.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setCurrentIndex(i)}
                        className={`w-3.5 h-3.5 rounded-full transition-all duration-300 
              ${i === currentIndex
                                ? "bg-cyan-400 scale-125 shadow-lg"
                                : "bg-white/60 hover:bg-white"
                            }`}
                    />
                ))}
            </div>

            <div className="absolute inset-0 pointer-events-none group-hover:shadow-[0_0_40px_rgba(34,211,238,0.6)] transition"></div>
            <style>
                {`
                    @keyframes progress {
  from { width: 0%; }
  to { width: 100%; }
}

.animate-progress {
  animation: progress 5s linear;
}

                `}
            </style>
        </div>
    );
};

export default Notification;

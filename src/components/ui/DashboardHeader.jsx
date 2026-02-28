import { useEffect, useState } from "react";
import { getUserInfo } from "../../api/auth-api";
import { getAdminInfo } from "../../api/admin-api";
import { useDispatch, useSelector } from "react-redux";
import { setUserInfo, UserInfo } from "../../redux/slice/UserInfoSlice";
import { AuthenticatedRoutes, AuthRoutes } from "../../constants/Routes";
import { useNavigate } from "react-router-dom";
import PageLoader from "./PageLoader";
import { AiOutlineLogout, AiOutlineFullscreen, AiOutlineFullscreenExit, AiOutlineUser } from "react-icons/ai";
import { BsBell } from "react-icons/bs";
import Swal from "sweetalert2";
import { getBannerListUser, clearBannerNotification } from "../../api/user-api";
import { Pin } from "lucide-react";

const DashboardHeader = ({ name }) => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state?.userInfo?.userInfo);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [bannerNotification, setBannerNotification] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showUserPopup, setShowUserPopup] = useState(false);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => setIsFullscreen(true));
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false));
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('.user-popup-container')) {
        setShowUserPopup(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleFullscreenChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  useEffect(() => {
    const role = localStorage.getItem("role");
    const fetchUserInfo = async () => {
      try {
        setLoading(true);
        const user = role === "Admin" ? await getAdminInfo() : await getUserInfo();
        dispatch(setUserInfo(user));
      } catch (error) {
        Swal.fire({
          title: "Error",
          text: error?.response?.data?.message || "Error fetching user info",
          confirmButtonText: "OK",
          timer: 3000,
        }).then(() => localStorage.clear());
      } finally {
        setLoading(false);
      }
    };

    const fetchNotification = async () => {
      try {
        const res = await getBannerListUser();
        setBannerNotification(res?.data[0]?.uploadBanner);
      } catch (error) {
        console.error("Failed to fetch banner notification:", error);
      }
    };

    fetchUserInfo();
    fetchNotification();
  }, [dispatch]);

  const logoutHandler = () => {
    const role = localStorage.getItem("role");
    if (role === "Admin") {
      localStorage.clear();
      navigate("/admin/gateway/secure/9f3a7c-admin/auth");
      window.location.reload();
    } else {
      localStorage.clear();
      navigate("/login");
      window.location.reload();
    }
  };

  const handleNotificationClick = async () => {
    try {
      await clearBannerNotification();
      setBannerNotification(false);
      navigate(AuthenticatedRoutes.NEWS_AND_NOTIF);
    } catch (error) {
      console.error("Failed to clear notification:", error);
    }
  };

  const getUserDisplayName = () => {
    if (userInfo?.user?.role === "user") return userInfo?.user?.username || "User";
    if (userInfo?.data?.role === "admin") return "Admin";
    return "User";
  };

  const getUserDisplayEmail = () => {
    if (userInfo?.user?.role === "user") return userInfo?.user?.email || "User";
    if (userInfo?.data?.role === "admin") return userInfo?.data?.email || "Admin";
    return "User";
  }

  const getUserProfileImage = () => {
    return userInfo?.user?.profileImage || "https://img.icons8.com/3d-fluency/94/guest-male--v2.png";
  };

  const adminToken = localStorage.getItem("adminToken");
  const adminRole = localStorage.getItem("adminRole");
  const backToAdmin = () => {
    if (!adminToken || !adminRole) {
      alert("Admin session not found");
      return;
    }
    localStorage.clear();
    localStorage.setItem("token", adminToken);
    localStorage.setItem("role", adminRole);

    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminRole");
    localStorage.removeItem("isImpersonating");
    window.location.reload();
  };


  return (
    <>
      {loading && <PageLoader />}
      <div className="flex justify-between items-center p-4 bg-white/5 border !border-gray-500 rounded-xl shadow-sm">
        <div className="text-3xl font-semibold text-white">{name}</div>

        <div className="flex items-center gap-4">

          {/* Notification Bell */}
          <button
            onClick={handleNotificationClick}
            className={`p-2 rounded-lg transition-all hover:bg-gray-100 hover:text-gray-700 ${bannerNotification ? "animate-pulse" : ""}`}
            title="Banner Notification"
          >
            <BsBell className="w-8 h-8" />
          </button>

          {/* Fullscreen Toggle */}
          <button
            onClick={toggleFullscreen}
            className="p-2 rounded-lg hover:bg-gray-100 hover:text-gray-700 transition-all"
            title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
          >
            {isFullscreen ? (
              <AiOutlineFullscreenExit className="w-8 h-8" />
            ) : (
              <AiOutlineFullscreen className="w-8 h-8" />
            )}
          </button>


          {/* User Profile Dropdown */}
          <div className="relative user-popup-container">
            <div
              onClick={() => setShowUserPopup(!showUserPopup)}
              className="flex items-center gap-2 p-2 rounded-xl hover:bg-gray-50 hover:text-gray-700 cursor-pointer transition-all"
            >
              <div className="w-14 h-14 rounded-full overflow-hidden border-2 !hover:border-gray-700 transition-all">
                <img
                  src={getUserProfileImage()}
                  alt="user"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Dropdown Popup */}
            {showUserPopup && (
              <div className="absolute right-0 mt-2 min-w-96 ss-card rounded-xl shadow-lg border border-gray-100 p-4 z-50 animate-fadeIn space-y-2">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-gray-200 !hover:border-gray-400 transition-all">
                    <img
                      src={getUserProfileImage()}
                      alt="profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h6 className="font-semibold text-2xl text-white">{getUserDisplayName()} {userInfo?.user?.role === "user" ? `(${userInfo?.user?.name})` : ""}</h6>
                    <p className="text-xl text-gray-300">{getUserDisplayEmail()}</p>
                  </div>
                </div>

                <hr className="my-3 border-gray-200" />

                <button
                  onClick={() => {
                    setShowUserPopup(false);
                    navigate("/user-profile");
                  }}
                  className="w-full text-left px-3 py-2 text-xl text-gray-300 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-all flex items-center gap-2"
                >
                  <AiOutlineUser className="w-6 h-6" />
                  Profile
                </button>

                <button
                  onClick={() => navigate("/activate-user-id")}
                  className="w-full text-left px-3 py-2 text-xl text-gray-300 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-all flex items-center gap-2"
                >
                  <Pin className="w-6 h-6" />
                  Pin Topup
                </button>

                {
                  adminRole === "Admin" && adminToken ? (
                    <button
                      onClick={() => {
                        setShowUserPopup(false);
                        backToAdmin();
                      }}
                      className="w-full text-left px-3 py-2 text-xl text-red-500 hover:bg-red-50 rounded-lg transition-all flex items-center gap-2"
                    >
                      <AiOutlineUser className="w-6 h-6" />
                      Back to Admin
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setShowUserPopup(false);
                        logoutHandler();
                      }}
                      className="w-full text-left px-3 py-2 text-xl text-red-500 hover:bg-red-50 rounded-lg transition-all flex items-center gap-2"
                    >
                      <AiOutlineLogout className="w-6 h-6" />
                      Logout
                    </button>
                  )
                }
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
      `}</style>
    </>
  );
};

export default DashboardHeader;
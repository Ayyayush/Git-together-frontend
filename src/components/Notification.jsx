import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import { formatDistanceToNow } from "date-fns";
import { FaHandshake, FaUserFriends } from "react-icons/fa";
import { BASE_URL } from "../utils/constants";
import { useSelector } from "react-redux";
import ShimmerCard from "./Shimmer";

const Notification = () => {
  // Use null to cleanly differentiate between "Loading" and "Empty State []"
  const [notifications, setNotifications] = useState(null);
  const { theme } = useSelector((store) => store.theme);

  const fetchNotification = useCallback(async () => {
    try {
      const response = await axios.get(`${BASE_URL}/notification`, {
        withCredentials: true,
      });
      setNotifications(response?.data?.data || []);
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
      setNotifications([]); // Fallback to empty array to remove shimmer
    }
  }, []);

  useEffect(() => {
    fetchNotification();
  }, [fetchNotification]);

  const generateMessage = (info) => {
    const firstName = info?.fromUserId?.firstName || "Someone";
    const lastName = info?.fromUserId?.lastName || "";
    const fullName = `${firstName} ${lastName}`.trim();

    if (info?.notificationType === "requestSent") {
      return `${fullName} sent you a connection request`;
    }
    return `${fullName} accepted your connection request`;
  };

  // 1. Fixed: Only show shimmer when state is strictly null (still fetching)
  if (notifications === null) {
    return <ShimmerCard />;
  }

  const isDark = theme === "dark";

  return (
    <div className={`flex-1 overflow-y-auto p-4 md:p-8 ${isDark ? "bg-[#0B0E14]" : "bg-transparent"}`}>
      <div className="flex flex-col items-center space-y-7">
        
        {/* Header Block */}
        <div className="w-full sm:w-[520px] text-center">
          <h1 className={`text-2xl font-bold tracking-tight ${isDark ? "text-gray-100" : "text-gray-900"}`}>
            Notifications
          </h1>
          <p className="text-sm mt-1 text-gray-500">
            Connection requests and updates, newest first.
          </p>
        </div>

        {/* Content Section */}
        <div className="w-full sm:w-[520px]">
          {notifications.length > 0 ? (
            <ul className="timeline timeline-vertical timeline-compact">
              {notifications.map((info, idx) => {
                const isAccept = info?.notificationType === "requestAccept";
                
                return (
                  <li key={info?._id || idx}>
                    {idx !== 0 && (
                      <hr className={isDark ? "bg-white/10" : "bg-gray-200"} />
                    )}

                    {/* Timeline Node Point */}
                    <div className="timeline-middle">
                      <div
                        className={`w-3 h-3 rounded-full ${
                          isAccept
                            ? "bg-gradient-to-br from-emerald-400 to-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.5)]"
                            : "bg-gradient-to-br from-indigo-500 to-cyan-400 shadow-[0_0_10px_rgba(99,102,241,0.5)]"
                        }`}
                      />
                    </div>

                    {/* Timeline Card Wrapper */}
                    <div className="timeline-end timeline-box border-none p-0 bg-transparent shadow-none w-full">
                      <div
                        className={`flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 p-4 rounded-2xl mb-4 transition-all duration-300 ${
                          isDark
                            ? "bg-white/[0.04] border border-white/10 backdrop-blur-xl hover:border-indigo-400/30 hover:bg-white/[0.06]"
                            : "bg-white border border-gray-100 shadow hover:shadow-md"
                        }`}
                      >
                        {/* Status Avatar Badge */}
                        <div className="w-12 h-12 shrink-0 rounded-full bg-red-100 dark:bg-red-700 flex items-center justify-center text-red-500 dark:text-red-300">
                          {isAccept ? <FaUserFriends size={18} /> : <FaHandshake size={18} />}
                        </div>

                        {/* Text Metadata Block */}
                        <div className="flex-1 text-center sm:text-left">
                          <h3 className={`font-semibold ${isDark ? "text-gray-100" : "text-gray-900"}`}>
                            {isAccept ? "You're Now Connected!" : "You have a Connection Request"}
                          </h3>
                          <p className={`text-sm mt-0.5 ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                            {generateMessage(info)}
                          </p>
                        </div>

                        {/* Timestamp Relative String */}
                        <span className={`text-xs shrink-0 ${isDark ? "text-gray-500" : "text-gray-400"}`}>
                          {info?.createdAt 
                            ? formatDistanceToNow(new Date(info.createdAt), { addSuffix: true })
                            : "Just now"}
                        </span>
                      </div>
                    </div>

                    {idx !== notifications.length - 1 && (
                      <hr className={isDark ? "bg-white/10" : "bg-gray-200"} />
                    )}
                  </li>
                );
              })}
            </ul>
          ) : (
            <h3 className={`text-center ${isDark ? "text-gray-400" : "text-gray-500"}`}>
              No notifications found
            </h3>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notification;
import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import { formatDistanceToNow, isToday, isYesterday } from "date-fns";
import { FaHandshake, FaComments } from "react-icons/fa";
import { BASE_URL } from "../utils/constants";
import { useSelector, useDispatch } from "react-redux";
import { setNotificationsData, markAllItemsAsRead, markItemAsRead } from "../utils/notificationSlice";
import { useNavigate } from "react-router-dom";
import ShimmerCard from "./Shimmer";

const Notification = () => {
  const { notifications } = useSelector((store) => store.notifications);
  const { theme } = useSelector((store) => store.theme);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const fetchNotifications = useCallback(async () => {
    try {
      const response = await axios.get(`${BASE_URL}/notifications`, {
        withCredentials: true,
      });
      if (response.data?.success) {
        dispatch(setNotificationsData({
          notifications: response.data.data.notifications,
          unreadCount: response.data.data.unreadCount
        }));
      }
    } catch (error) {
      console.error("Failed to fetch notifications cleanly:", error);
    } finally {
      setLoading(false);
    }
  }, [dispatch]);

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  const handleMarkAllAsRead = async () => {
    try {
      await axios.patch(`${BASE_URL}/notifications/read-all`, {}, { withCredentials: true });
      dispatch(markAllItemsAsRead());
    } catch (err) {
      console.error("Failed executing mass mark notifications read operation", err);
    }
  };

  const handleRowItemSelection = async (item) => {
    if (!item.isRead) {
      try {
        await axios.patch(`${BASE_URL}/notifications/${item._id}/read`, {}, { withCredentials: true });
        dispatch(markItemAsRead(item._id));
      } catch (err) {
        console.error("Error marking selected row node as read", err);
      }
    }
    navigate(item.link);
  };

  const groupNotifications = () => {
    const sections = { today: [], yesterday: [], older: [] };
    if (!notifications) return sections;

    notifications.forEach((notif) => {
      if (!notif.createdAt) {
        sections.today.push(notif);
        return;
      }
      const targetDate = new Date(notif.createdAt);
      if (isToday(targetDate)) {
        sections.today.push(notif);
      } else if (isYesterday(targetDate)) {
        sections.yesterday.push(notif);
      } else {
        sections.older.push(notif);
      }
    });

    return sections;
  };

  if (loading) {
    return <ShimmerCard />;
  }

  const isDark = theme === "dark";
  const groups = groupNotifications();

  const renderNotificationCard = (info) => {
    const isMsg = info.type === "message";

    return (
      <div
        key={info._id}
        onClick={() => handleRowItemSelection(info)}
        className={`flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 p-4 rounded-2xl border mb-3 cursor-pointer transition-all duration-300 ${
          info.isRead 
            ? (isDark ? "bg-white/[0.02] border-white/5 opacity-70 hover:bg-white/[0.04]" : "bg-gray-50/50 border-gray-100 hover:bg-gray-50")
            : (isDark ? "bg-white/[0.05] border-indigo-500/30 shadow-lg shadow-indigo-500/5 hover:border-indigo-400/50" : "bg-white border-indigo-100 shadow-md hover:shadow-lg")
        }`}
      >
        <div className="w-12 h-12 shrink-0 rounded-full relative">
          <div className="w-full h-full rounded-full bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center font-bold text-white shadow-inner overflow-hidden">
            {info.sender?.photoUrl ? (
              <img src={info.sender.photoUrl} alt="" className="w-full h-full rounded-full object-cover" />
            ) : (
              (info.sender?.firstName?.charAt(0) || "?")
            )}
          </div>
          <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-white text-[10px] shadow-md ${isMsg ? "bg-cyan-500" : "bg-indigo-500"}`}>
            {isMsg ? <FaComments size={10} /> : <FaHandshake size={10} />}
          </div>
        </div>

        <div className="flex-1 text-center sm:text-left min-w-0">
          <h3 className={`font-semibold text-sm flex items-center justify-center sm:justify-start gap-2 ${isDark ? "text-white" : "text-gray-900"}`}>
            {info.sender ? `${info.sender.firstName} ${info.sender.lastName || ""}` : "System"}
            {!info.isRead && (
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 inline-block animate-ping" />
            )}
          </h3>
          <p className={`text-xs mt-0.5 line-clamp-2 leading-relaxed ${isDark ? "text-gray-200" : "text-gray-600"}`}>
            {info.message}
          </p>
        </div>

        <span className={`text-[11px] shrink-0 font-medium ${isDark ? "text-gray-400" : "text-gray-400"}`}>
          {info.createdAt ? formatDistanceToNow(new Date(info.createdAt), { addSuffix: true }) : "Just now"}
        </span>
      </div>
    );
  };

  const hasAnyNotifs = notifications && notifications.length > 0;

  return (
    <div className={`flex-1 overflow-y-auto p-4 md:p-8 ${isDark ? "bg-[#0B0E14]" : "bg-transparent"}`}>
      <div className="flex flex-col items-center space-y-7 max-w-2xl mx-auto">
        
        <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div className="text-center sm:text-left">
            <h1 className={`text-2xl font-bold tracking-tight ${isDark ? "text-white" : "text-gray-900"}`}>
              Notifications Center
            </h1>
            <p className={`text-sm mt-0.5 ${isDark ? "text-gray-300" : "text-gray-500"}`}>
              Manage your connection requests and inbound communication pipelines.
            </p>
          </div>
          {hasAnyNotifs && (
            <button
              type="button"
              onClick={handleMarkAllAsRead}
              className="px-4 py-2 rounded-xl text-xs font-semibold tracking-wide bg-white/[0.06] border border-white/10 hover:bg-white/[0.1] text-indigo-400 hover:text-indigo-300 transition-all active:scale-95"
            >
              Mark All as Read
            </button>
          )}
        </div>

        <div className="w-full">
          {hasAnyNotifs ? (
            <div className="space-y-6">
              {groups.today.length > 0 && (
                <div>
                  <h2 className={`text-xs font-bold uppercase tracking-widest ${isDark ? "text-gray-400" : "text-gray-500"} mb-3 px-1`}>Today</h2>
                  {groups.today.map(renderNotificationCard)}
                </div>
              )}

              {groups.yesterday.length > 0 && (
                <div>
                  <h2 className={`text-xs font-bold uppercase tracking-widest ${isDark ? "text-gray-400" : "text-gray-500"} mb-3 px-1`}>Yesterday</h2>
                  {groups.yesterday.map(renderNotificationCard)}
                </div>
              )}

              {groups.older.length > 0 && (
                <div>
                  <h2 className={`text-xs font-bold uppercase tracking-widest ${isDark ? "text-gray-400" : "text-gray-500"} mb-3 px-1`}>Older</h2>
                  {groups.older.map(renderNotificationCard)}
                </div>
              )}
            </div>
          ) : (
            <div className={`py-20 text-center rounded-2xl border border-dashed ${isDark ? "border-white/10 bg-white/[0.01]" : "border-gray-200 bg-gray-50/50"}`}>
              <h3 className={`text-sm font-medium ${isDark ? "text-white" : "text-gray-500"}`}>
                Your notification log is clear
              </h3>
              <p className={`text-xs mt-1 ${isDark ? "text-gray-300" : "text-gray-400"}`}>
                We will update you here when developers make contact.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notification;
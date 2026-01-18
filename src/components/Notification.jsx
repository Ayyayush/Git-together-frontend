import axios from "axios";
import { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { FaHandshake, FaUserFriends } from "react-icons/fa";
import { BASE_URL } from "../utils/constants";
import { useSelector } from "react-redux";
import ShimmerCard from "./Shimmer";

const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const { theme } = useSelector((store) => store.theme);

  const fetchNotification = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/notification`, {
        withCredentials: true,
      });
      setNotifications(response?.data?.data);
    } catch (error) {}
  };

  useEffect(() => {
    fetchNotification();
  }, []);

  const generateMessage = (info) => {
    if (info?.notificationType === "requestSent") {
      return `${info?.fromUserId?.firstName} ${info?.fromUserId?.lastName} sent you a connection request`;
    } else {
      return `${info?.fromUserId?.firstName} ${info?.fromUserId?.lastName} accept your connection request`;
    }
  };

  if (!notifications.length) return <ShimmerCard />;

  return (
    <div className="flex-1 overflow-y-auto p-8">
      <div className="flex flex-col items-center p-6 space-y-7">
        <div className="w-full sm:w-[520px] p-4">
          <div className="flex items-center justify-center">
            <h1 className="text-2xl font-bold">Notifications</h1>
          </div>
        </div>

        <div className="w-full sm:w-[520px] mt-6">
          {notifications.length > 0 ? (
            notifications.map((info) => (
              <div
                key={info?._id}
                className={`flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 p-4 rounded-lg shadow mb-4 transition ${
                  theme === "dark" &&
                  "bg-gradient-to-r from-gray-800 to-gray-700"
                }`}
              >
                <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-700 flex items-center justify-center text-red-500 dark:text-red-300">
                  {info?.notificationType === "requestAccept" ? (
                    <FaUserFriends />
                  ) : (
                    <FaHandshake />
                  )}
                </div>

                <div className="flex-1 text-center sm:text-left">
                  <h3 className="font-semibold">
                    {info?.notificationType === "requestAccept"
                      ? "You're Now Connected!"
                      : "You have a Connection Request"}
                  </h3>
                  <p className="text-sm">{generateMessage(info)}</p>
                </div>

                <span className="text-xs">
                  {formatDistanceToNow(new Date(info?.createdAt), {
                    addSuffix: true,
                  })}
                </span>
              </div>
            ))
          ) : (
            <h3>No Notification found</h3>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notification;

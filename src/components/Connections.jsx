import { useEffect, useCallback } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { BsChatDotsFill } from "react-icons/bs";

import noConnectionsImg from "../assets/connections.png";
import { addConnections } from "../utils/connectionSlice";
import { BASE_URL } from "../utils/constants";
import ShimmerCard from "./Shimmer";

const Connections = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Assumes initialState is null. If it's [], use a separate loading state.
  const connections = useSelector((state) => state.connections);

  const fetchConnections = useCallback(async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/connections`, {
        withCredentials: true,
      });
      dispatch(addConnections(res.data?.data || []));
    } catch (err) {
      console.error(err);
      toast.error("Failed to load connections");
    }
  }, [dispatch]);

  useEffect(() => {
    fetchConnections();
  }, [fetchConnections]);

  // Loading / Skeleton State
  if (connections === null) {
    return <ShimmerCard />;
  }

  return (
    <div className="flex-1 min-h-screen bg-[#0B0E14] p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-100 tracking-tight">
            Your Connections
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            {connections.length > 0
              ? `${connections.length} developer${connections.length === 1 ? "" : "s"} you're connected with.`
              : "People you match with will show up here."}
          </p>
        </div>

        {/* Dynamic Content Grid or Empty State */}
        {connections.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {connections.map((user) => (
              <div
                key={user._id}
                onClick={() => navigate(`/profile/${user._id}`)}
                className="group cursor-pointer rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-5 flex items-center justify-between gap-3 shadow-lg shadow-black/30 transition-all duration-300 hover:border-indigo-400/30 hover:bg-white/[0.05] hover:-translate-y-0.5 hover:shadow-indigo-500/10"
              >
                {/* User Info Block */}
                <div className="flex gap-4 items-center min-w-0">
                  <img
                    src={user.photoUrl || "https://via.placeholder.com/150"} // Fallback image check
                    alt={`${user.firstName || "User"}'s profile`}
                    className="w-14 h-14 rounded-full object-cover ring-2 ring-white/10 group-hover:ring-indigo-400/40 transition-all duration-300 shrink-0"
                  />
                  <div className="min-w-0">
                    <h3 className="font-semibold text-gray-100 truncate">
                      {user.firstName} {user.lastName}
                    </h3>
                    {user.about && (
                      <p className="text-sm text-gray-500 line-clamp-1">
                        {user.about}
                      </p>
                    )}
                  </div>
                </div>

                {/* Action CTA */}
                <button
                  type="button"
                  className="shrink-0 flex items-center gap-1.5 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500 px-4 py-2 text-xs font-semibold text-white shadow-md shadow-indigo-500/25 transition-all duration-300 hover:scale-105 hover:shadow-cyan-500/35"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/chat/${user._id}`);
                  }}
                >
                  <BsChatDotsFill size={13} />
                  Chat
                </button>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State View */
          <div className="relative flex items-center justify-center h-[60vh] rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden">
            <div
              className="absolute inset-0 opacity-40"
              style={{
                backgroundImage: `url(${noConnectionsImg})`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundSize: "contain",
              }}
            />
            <div className="relative rounded-xl border border-white/10 bg-white/[0.05] backdrop-blur-xl px-7 py-5 text-center shadow-2xl shadow-black/40">
              <p className="text-lg font-semibold text-gray-100">
                You don’t have any connections yet
              </p>
              <p className="mt-1 text-sm text-gray-500">
                Keep exploring the feed to find your first match.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Connections;
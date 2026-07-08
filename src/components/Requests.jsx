import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FiCheck, FiX } from "react-icons/fi";
import { setReceivedRequests, removeReceivedRequest } from "../utils/requestSlice";
import { BASE_URL } from "../utils/constants";
import ShimmerCard from "./Shimmer";
import noRequestsImg from "../assets/requests.png";

const Requests = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const receivedRequests = useSelector((state) => state.requests.received);
  
  // Track specific request IDs currently sending an API update to prevent spam
  const [processingId, setProcessingId] = useState(null);

  const fetchRequests = useCallback(async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/requests`, {
        withCredentials: true,
      });
      dispatch(setReceivedRequests(res.data?.data || []));
    } catch (err) {
      console.error("Failed to fetch requests", err);
      dispatch(setReceivedRequests([])); // Safe fallback to empty array
    }
  }, [dispatch]);

  const handleRequest = async (requestId, status) => {
    if (processingId) return; // Prevent concurrent modifications
    
    try {
      setProcessingId(requestId);
      await axios.post(
        `${BASE_URL}/request/review/${status}/${requestId}`,
        {},
        { withCredentials: true }
      );

      dispatch(removeReceivedRequest(requestId));
    } catch (err) {
      console.error(`Request action [${status}] failed`, err);
    } finally {
      setProcessingId(null);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, [fetchRequests]);

  // Loading Skeleton State
  if (receivedRequests === null) {
    return <ShimmerCard />;
  }

  return (
    <div className="min-h-screen bg-[#0B0E14] p-4 md:p-8">
      <div className="max-w-3xl mx-auto">
        
        {/* Header Block */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-100 tracking-tight">
            Connection Requests
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            {receivedRequests.length > 0
              ? `${receivedRequests.length} pending request${receivedRequests.length === 1 ? "" : "s"}.`
              : "You're all caught up."}
          </p>
        </div>

        {/* Empty State Illustration */}
        {receivedRequests.length === 0 ? (
          <div className="relative flex items-center justify-center h-[60vh] rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden">
            <div
              className="absolute inset-0 opacity-40"
              style={{
                backgroundImage: `url(${noRequestsImg})`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundSize: "contain",
              }}
            />
            <div className="relative rounded-xl border border-white/10 bg-white/[0.05] backdrop-blur-xl px-7 py-5 text-center shadow-2xl shadow-black/40">
              <p className="text-lg font-semibold text-gray-100">
                No pending connection requests
              </p>
              <p className="mt-1 text-sm text-gray-500">
                New requests from interested developers will show up here.
              </p>
            </div>
          </div>
        ) : (
          /* Active Requests List */
          <div className="space-y-3">
            {receivedRequests.map((req) => {
              const isItemProcessing = processingId === req._id;

              return (
                <div
                  key={req._id}
                  onClick={() => req.fromUserId?._id && navigate(`/profile/${req.fromUserId._id}`)}
                  className={`group cursor-pointer rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 shadow-lg shadow-black/30 transition-all duration-300 hover:border-indigo-400/30 hover:bg-white/[0.05] ${
                    isItemProcessing ? "opacity-60 pointer-events-none" : ""
                  }`}
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <img
                      src={req.fromUserId?.photoUrl || "https://via.placeholder.com/150"}
                      alt={`${req.fromUserId?.firstName || "User"}'s profile`}
                      className="w-12 h-12 rounded-full object-cover ring-2 ring-white/10 group-hover:ring-indigo-400/40 transition-all duration-300 shrink-0"
                    />

                    <div className="min-w-0">
                      <h2 className="font-semibold text-gray-100 truncate">
                        {req.fromUserId?.firstName} {req.fromUserId?.lastName}
                      </h2>
                      <p className="text-sm text-gray-500">
                        wants to connect with you
                      </p>
                    </div>
                  </div>

                  {/* Actions CTA buttons */}
                  <div className="flex gap-3 shrink-0">
                    <button
                      type="button"
                      disabled={!!processingId}
                      className="flex items-center gap-1.5 rounded-full bg-red-500/10 text-red-400 border border-red-500/20 px-4 py-1.5 text-sm font-medium hover:bg-red-500 hover:text-white hover:shadow-lg hover:shadow-red-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRequest(req._id, "rejected");
                      }}
                    >
                      <FiX size={14} />
                      Reject
                    </button>

                    <button
                      type="button"
                      disabled={!!processingId}
                      className="flex items-center gap-1.5 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500 text-white px-4 py-1.5 text-sm font-medium shadow-md shadow-indigo-500/25 hover:scale-105 hover:shadow-cyan-500/35 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRequest(req._id, "accepted");
                      }}
                    >
                      <FiCheck size={14} />
                      Accept
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Requests;
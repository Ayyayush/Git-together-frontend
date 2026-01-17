import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  setReceivedRequests,
  removeReceivedRequest,
} from "../utils/requestSlice";
import { BASE_URL } from "../utils/constants";
import ShimmerCard from "./Shimmer";

const Requests = () => {
  const dispatch = useDispatch();

  const receivedRequests = useSelector(
    (state) => state.requests.received
  );

  const fetchRequests = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}/user/requests`,
        { withCredentials: true }
      );
      dispatch(setReceivedRequests(res.data.data));
    } catch (err) {
      console.error("Failed to fetch requests", err);
      dispatch(setReceivedRequests([])); // fail-safe
    }
  };

  const handleRequest = async (requestId, status) => {
    try {
      await axios.post(
        `${BASE_URL}/request/review/${status}/${requestId}`,
        {},
        { withCredentials: true }
      );

      dispatch(removeReceivedRequest(requestId));
    } catch (err) {
      console.error("Request action failed", err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  // ==========================
  // Loading state
  // ==========================
  if (receivedRequests === null) {
    return <ShimmerCard />;
  }

  return (
    <div className="min-h-screen bg-base-200 p-6">
      <h1 className="text-2xl font-bold mb-6">
        Connection Requests
      </h1>

      {receivedRequests.length === 0 ? (
        <p className="text-gray-500">No pending requests</p>
      ) : (
        <div className="space-y-4">
          {receivedRequests.map((req) => (
            <div
              key={req._id}
              className="card bg-base-100 shadow-md p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex items-center gap-4">
                <img
                  src={req.fromUserId.photoUrl}
                  alt="profile"
                  className="w-12 h-12 rounded-full"
                />

                <div>
                  <h2 className="font-semibold">
                    {req.fromUserId.firstName}{" "}
                    {req.fromUserId.lastName}
                  </h2>
                  <p className="text-sm text-gray-500">
                    wants to connect with you
                  </p>
                </div>
              </div>

              <div className="flex gap-3 mt-4 sm:mt-0">
                <button
                  className="btn btn-success btn-sm"
                  onClick={() =>
                    handleRequest(req._id, "accepted")
                  }
                >
                  Accept
                </button>

                <button
                  className="btn btn-error btn-sm"
                  onClick={() =>
                    handleRequest(req._id, "rejected")
                  }
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Requests;

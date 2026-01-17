import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

import { addConnections } from "../utils/connectionSlice";
import { BASE_URL } from "../utils/constants";
import ShimmerCard from "./Shimmer";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((state) => state.connections);

  const fetchConnections = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}/user/connections`,   // ✅ FIXED ROUTE
        { withCredentials: true }
      );

      dispatch(addConnections(res.data.data));
    } catch (err) {
      console.error("Failed to fetch connections", err);
      toast.error("Failed to load connections");
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  // ==========================
  // Loading state
  // ==========================
  if (connections === null) {
    return <ShimmerCard />;
  }

  return (
    <div className="flex-1 p-8">
      <h1 className="text-2xl font-bold mb-6">Your Connections</h1>

      {connections.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {connections.map((user) => (
            <div
              key={user._id}
              className="p-4 rounded-lg shadow bg-base-100 flex items-center gap-4"
            >
              <img
                src={user.photoUrl}
                alt="profile"
                className="w-14 h-14 rounded-full object-cover"
              />

              <div>
                <h3 className="font-semibold">
                  {user.firstName} {user.lastName}
                </h3>

                {user.about && (
                  <p className="text-sm text-gray-500 line-clamp-1">
                    {user.about}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">
          You don’t have any connections yet.
        </p>
      )}
    </div>
  );
};

export default Connections;

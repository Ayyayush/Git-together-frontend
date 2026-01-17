import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

import { addFeed } from "../utils/feedSlice";
import FeedCard from "./FeedCard";
import no_feed from "../assets/no_feed.jpeg";
import { BASE_URL } from "../utils/constants";
import ShimmerCard from "./Shimmer";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((state) => state.feed);

  const fetchFeed = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}/feed`,
        { withCredentials: true }
      );

      // backend sends: { message, page, limit, count, data }
      dispatch(addFeed(res.data.data));
    } catch (err) {
      console.error("Failed to fetch feed", err);
    }
  };

  useEffect(() => {
    fetchFeed();
  }, []);

  // Loading state
  if (!feed || feed.length === 0) {
    return <ShimmerCard />;
  }

  return (
    <main className="flex-1 flex items-center justify-center overflow-y-auto p-8">
      {feed.length > 0 ? (
        <FeedCard info={feed[0]} />
      ) : (
        <div className="flex flex-col items-center justify-center space-y-6 text-center">
          <img
            src={no_feed}
            alt="Empty Feed"
            className="w-80 h-60 object-cover rounded-lg shadow-md"
          />
          <div>
            <h2 className="text-2xl font-bold">Your feed is empty</h2>
            <p className="mt-2">
              Looks like there are no developers to show right now.
            </p>
          </div>
        </div>
      )}
    </main>
  );
};

export default Feed;

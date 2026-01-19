import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

import { addFeed } from "../utils/feedSlice";
import FeedCard from "./FeedCard";
import no_feed from "../assets/no_feed.jpeg";
import feedBg from "../assets/feed.png";
import { BASE_URL } from "../utils/constants";
import ShimmerCard from "./Shimmer";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((state) => state.feed.list);

  const fetchFeed = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/feed`, {
        withCredentials: true,
      });
      dispatch(addFeed(res.data.data));
    } catch (err) {
      console.error("Failed to fetch feed", err);
      toast.error("Failed to load feed");
    }
  };

  useEffect(() => {
    fetchFeed();
  }, []);

  if (feed === null) {
    return <ShimmerCard />;
  }

  return (
    <main className="relative flex-1 overflow-hidden">

      {/* ================= BACKGROUND IMAGE ================= */}
      <div
        className="absolute inset-0 bg-cover bg-center scale-105"
        style={{ backgroundImage: `url(${feedBg})` }}
      />

      {/* ===================================================== */}
      {/* 🔽🔽 THIS IS THE BLUR CONTROL LINE 🔽🔽               */}
      {/* 👉 CHANGE backdrop-blur-[0.5px] TO ADJUST BLUR       */}
      {/* ===================================================== */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-[0.5px]" />
      {/* ===================================================== */}

      {/* ================= FOREGROUND CONTENT ================= */}
      <div className="relative z-10 flex items-center justify-center h-full p-8">

        {feed.length > 0 ? (
          <FeedCard info={feed[0]} />
        ) : (
          <div className="flex flex-col items-center justify-center space-y-6 text-center animate-fadeIn">
            <img
              src={no_feed}
              alt="Empty Feed"
              className="w-80 h-60 object-cover rounded-2xl shadow-2xl bg-white/90 p-3"
            />
            <div className="bg-white/90 backdrop-blur-md px-6 py-4 rounded-xl shadow-xl">
              <h2 className="text-2xl font-bold text-gray-800">
                Your feed is empty
              </h2>
              <p className="mt-2 text-gray-500">
                Looks like there are no developers to show right now.
              </p>
            </div>
          </div>
        )}

      </div>
    </main>
  );
};

export default Feed;

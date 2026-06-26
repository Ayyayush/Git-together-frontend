import { useEffect, useCallback, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import PremiumModal from "./PremiumModal";
import { addFeed } from "../utils/feedSlice";
import FeedCard from "./FeedCard";
import no_feed from "../assets/no_feed.jpeg";
import feedBg from "../assets/feed.png";
import { BASE_URL } from "../utils/constants";
import ShimmerCard from "./Shimmer";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((state) => state.feed.list);
  const [showPremiumModal, setShowPremiumModal] = useState(false);

  const fetchFeed = useCallback(async () => {
    try {
      const res = await axios.get(`${BASE_URL}/feed`, {
        withCredentials: true,
      });

      console.log("Feed Response:", res.data);

      dispatch(addFeed(res.data.data));
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        "Failed to load feed pipeline resource nodes.";
      toast.error(message);
    }
  }, [dispatch]);

  useEffect(() => {
    if (feed?.length) return;
    fetchFeed();
  }, [fetchFeed, feed?.length]);

  if (feed === null) {
    return <ShimmerCard />;
  }

  return (
    <main className="relative flex-1 overflow-hidden bg-[#0B0E14]">
      <PremiumModal
        isOpen={showPremiumModal}
        onClose={() => setShowPremiumModal(false)}
        onBuy={() => {}}
      />

      <div
        className="absolute inset-0 bg-cover bg-center scale-105"
        style={{ backgroundImage: `url(${feedBg})` }}
      />

      <div className="absolute inset-0 bg-gradient-to-b from-[#0B0E14]/90 via-[#0B0E14]/70 to-[#0B0E14]/95 backdrop-blur-[1px]" />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute -top-24 left-1/3 w-[26rem] h-[26rem] bg-indigo-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-[22rem] h-[22rem] bg-cyan-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center h-full p-4 md:p-8 overflow-y-auto">
        <div className="absolute top-6 right-6 z-20">
          <button
            onClick={() => setShowPremiumModal(true)}
            className="px-5 py-2 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-bold text-xs shadow-lg hover:scale-105 transition-all uppercase tracking-wider"
          >
            👑 Premium Tier Tunnel
          </button>
        </div>

        {Array.isArray(feed) && feed.length > 0 ? (
          <div
            key={feed[0]._id}
            className="animate-fadeIn w-full max-w-4xl flex justify-center"
          >
            <FeedCard info={feed[0]} />
          </div>
        ) : (
          <div
            role="status"
            className="flex flex-col items-center justify-center text-center animate-fadeIn max-w-md"
          >
            <div className="relative mb-6">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-cyan-400/20 blur-xl" />

              <img
                src={no_feed}
                alt="No developers available"
                className="relative w-64 h-48 object-cover rounded-2xl ring-1 ring-white/10 shadow-2xl"
              />
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-xl px-6 py-5 shadow-2xl">
              <h2 className="text-xl font-bold text-gray-100 tracking-tight">
                Feed Pipeline Exhausted
              </h2>

              <p className="mt-2 text-xs text-gray-400 leading-relaxed">
                You've fully reviewed every engineering profile currently cached
                in your geo-routing hub node.
              </p>

              <button
                type="button"
                onClick={fetchFeed}
                className="mt-4 px-4 py-2 text-xs font-mono font-bold text-indigo-400 border border-indigo-500/30 rounded-lg hover:bg-indigo-500/10 transition-all"
              >
                Re-initialize Fetch Loop
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default Feed;
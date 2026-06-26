import { useEffect, useCallback, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import PremiumModal from "./PremiumModal";
import { addFeed } from "../utils/feedSlice";
import FeedCard from "./FeedCard";
import LeftSidebar from "./LeftSidebar";
import RightSidebar from "./RightSidebar";
import no_feed from "../assets/no_feed.jpeg";
import feedBg from "../assets/feed.png";
import { BASE_URL } from "../utils/constants";
import ShimmerCard from "./Shimmer";

import { FaBars, FaRobot, FaHome, FaUsers, FaEnvelope, FaUser } from "react-icons/fa";

const Feed = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const feed = useSelector((state) => state.feed.list);
  const [showPremiumModal, setShowPremiumModal] = useState(false);

  // Mobile/Tablet Slide-over Drawer States
  const [isLeftDrawerOpen, setIsLeftDrawerOpen] = useState(false);
  const [isRightDrawerOpen, setIsRightDrawerOpen] = useState(false);

  const currentPath = location.pathname;

  const fetchFeed = useCallback(async () => {
    try {
      const res = await axios.get(`${BASE_URL}/feed`, {
        withCredentials: true,
      });
      dispatch(addFeed(res.data.data));
    } catch (err) {
      const message = err?.response?.data?.message || "Failed to load your developer feed.";
      toast.error(message);
    }
  }, [dispatch]);

  useEffect(() => {
    if (feed?.length) return;
    fetchFeed();
  }, [fetchFeed, feed?.length]);

  // Close Drawers via Escape Key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsLeftDrawerOpen(false);
        setIsRightDrawerOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  if (feed === null) {
    return <ShimmerCard />;
  }

  return (
    <main className="relative flex-1 bg-[#0B0E14] min-h-screen w-full overflow-x-hidden pb-20 lg:pb-6">
      <PremiumModal
        isOpen={showPremiumModal}
        onClose={() => setShowPremiumModal(false)}
        onBuy={() => {}}
      />

      {/* Background Decorative Layer */}
      <div
        className="absolute inset-0 bg-cover bg-center scale-105 pointer-events-none z-0"
        style={{ backgroundImage: `url(${feedBg})` }}
      />
      {/*
        FIX (issues 2 & 3): last stop was `#0B0E14/95` — 5% transparent, which
        let a sliver of the photo's real color show through right at the seam
        with the fully opaque footer below. Making this stop fully opaque
        matches the page/footer background exactly, so the transition is seamless
        no matter how tall the feed content is.
      */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0B0E14]/90 via-[#0B0E14]/70 to-[#0B0E14] backdrop-blur-[1px] pointer-events-none z-0" />

      {/* MOBILE TRIGGER HEADER - Static rendering to prevent overlapping sticky navbar */}
      <div className="lg:hidden w-full flex items-center justify-between px-4 py-3 bg-slate-900/80 backdrop-blur-md border-b border-white/5 relative z-10">
        <button 
          onClick={() => setIsLeftDrawerOpen(true)}
          className="p-2 text-gray-300 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
          aria-label="Open Left Profile Menu"
        >
          <FaBars size={16} />
        </button>
        <span className="text-xs font-mono font-black text-indigo-400 tracking-wider">GITTOGETHER FEED</span>
        <button 
          onClick={() => setIsRightDrawerOpen(true)}
          className="p-2 text-purple-400 hover:text-purple-300 bg-purple-500/10 hover:bg-purple-500/20 rounded-lg transition-colors"
          aria-label="Open Right AI Insights Menu"
        >
          <FaRobot size={16} />
        </button>
      </div>

      {/* MOBILE / TABLET OVERLAY SLIDE DRAWER SYSTEM */}
      {/* LEFT SIDEBAR DRAWER */}
      <div className={`fixed inset-0 z-50 transition-opacity duration-300 lg:hidden ${isLeftDrawerOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsLeftDrawerOpen(false)} />
        <div className={`absolute top-0 left-0 h-full w-[85vw] max-w-sm bg-[#0B0E14] border-r border-white/10 p-4 transition-transform duration-300 z-10 flex flex-col ${isLeftDrawerOpen ? "translate-x-0" : "-translate-x-full"}`}>
          <div className="flex justify-between items-center mb-4 pt-2">
            <span className="text-xs font-mono font-bold text-gray-400 uppercase tracking-widest">Profile Node</span>
            <button onClick={() => setIsLeftDrawerOpen(false)} className="btn btn-xs btn-circle btn-outline text-gray-400">✕</button>
          </div>
          <div className="flex-1 overflow-y-auto">
            <LeftSidebar setShowPremiumModal={setShowPremiumModal} onCloseDrawer={() => setIsLeftDrawerOpen(false)} />
          </div>
        </div>
      </div>

      {/* RIGHT SIDEBAR DRAWER */}
      <div className={`fixed inset-0 z-50 transition-opacity duration-300 xl:hidden ${isRightDrawerOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsRightDrawerOpen(false)} />
        <div className={`absolute top-0 right-0 h-full w-[85vw] max-w-sm bg-[#0B0E14] border-l border-white/10 p-4 transition-transform duration-300 z-10 flex flex-col ${isRightDrawerOpen ? "translate-x-0" : "translate-x-full"}`}>
          <div className="flex justify-between items-center mb-4 pt-2">
            <span className="text-xs font-mono font-bold text-gray-400 uppercase tracking-widest">Discovery Deck</span>
            <button onClick={() => setIsRightDrawerOpen(false)} className="btn btn-xs btn-circle btn-outline text-gray-400">✕</button>
          </div>
          <div className="flex-1 overflow-y-auto">
            <RightSidebar setShowPremiumModal={setShowPremiumModal} onCloseDrawer={() => setIsRightDrawerOpen(false)} />
          </div>
        </div>
      </div>

      {/* MAIN LAYOUT WRAPPER GRID */}
      <div className="relative z-10 max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-6 grid grid-cols-1 lg:grid-cols-4 xl:grid-cols-12 gap-6 items-start">
        
        {/* LEFT SIDEBAR: Persistent on Desktop (xl) and Tablet (lg) */}
        <div className="hidden lg:block lg:col-span-1 xl:col-span-3">
          <div className="sticky top-20 z-20">
            <LeftSidebar setShowPremiumModal={setShowPremiumModal} />
          </div>
        </div>

        {/* FEED INNER CONTAINER: Centered 50% screen real-estate allocation */}
        <div className="col-span-1 lg:col-span-3 xl:col-span-6">
          <div className="w-full max-w-3xl mx-auto flex flex-col gap-6">
            
            {/* Unified Header Panel */}
            <div className="w-full flex items-center justify-between bg-white/[0.02] border border-white/5 backdrop-blur-md p-4 rounded-xl shadow-lg">
              <div className="flex flex-col">
                <h1 className="text-sm font-black text-gray-200 tracking-wide font-mono uppercase">Developer Feed</h1>
                <p className="text-[11px] text-gray-400">Discover and match with engineering profiles</p>
              </div>
              <button
                onClick={() => setShowPremiumModal(true)}
                className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black text-[10px] shadow-lg hover:scale-[1.02] active:scale-95 transition-all uppercase tracking-widest"
              >
                👑 Premium Tier
              </button>
            </div>

            {/* Dynamic Rendering List Flow */}
            {Array.isArray(feed) && feed.length > 0 ? (
              <div className="w-full flex flex-col gap-6">
                {feed.map((user) => (
                  // FIX (issue 1): added `flex justify-center` so FeedCard's fixed
                  // 360px width is actually centered instead of defaulting left.
                  <div key={user._id} className="animate-fadeIn w-full flex justify-center">
                    <FeedCard info={user} />
                  </div>
                ))}
              </div>
            ) : (
              <div role="status" className="flex flex-col items-center justify-center text-center animate-fadeIn max-w-md mx-auto mt-12">
                <div className="relative mb-6">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-cyan-400/20 blur-xl" />
                  <img src={no_feed} alt="No developers available" className="relative w-64 h-48 object-cover rounded-2xl ring-1 ring-white/10 shadow-2xl" />
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-xl px-6 py-5 shadow-2xl">
                  <h2 className="text-xl font-bold text-gray-100 tracking-tight">No New Profiles Available</h2>
                  <p className="mt-2 text-xs text-gray-400 leading-relaxed">You have reviewed all active developer profiles based on your current network reach.</p>
                  <button type="button" onClick={fetchFeed} className="mt-4 px-4 py-2 text-xs font-mono font-bold text-indigo-400 border border-indigo-500/30 rounded-lg hover:bg-indigo-500/10 transition-all">
                    Refresh Profiles
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT SIDEBAR: Persistent only on Desktop (xl) layout bounds */}
        <div className="hidden xl:block xl:col-span-3">
          <div className="sticky top-20 z-20">
            <RightSidebar setShowPremiumModal={setShowPremiumModal} />
          </div>
        </div>

      </div>

      {/* MOBILE/TABLET BOTTOM STICKY NAVIGATION BAR */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 backdrop-blur-xl border-t border-white/10 px-6 py-2 flex items-center justify-between shadow-[0_-8px_24px_rgba(0,0,0,0.6)]">
        <button 
          onClick={() => navigate("/")} 
          className={`flex flex-col items-center gap-0.5 flex-1 py-1 transition-colors ${currentPath === "/" || currentPath === "/feed" ? "text-indigo-400 font-bold" : "text-gray-400 hover:text-gray-200"}`}
        >
          <FaHome size={18} />
          <span className="text-[9px] uppercase font-mono tracking-wider">Feed</span>
        </button>
        <button 
          onClick={() => navigate("/connection")} 
          className={`flex flex-col items-center gap-0.5 flex-1 py-1 transition-colors ${currentPath === "/connection" ? "text-cyan-400 font-bold" : "text-gray-400 hover:text-gray-200"}`}
        >
          <FaUsers size={18} />
          <span className="text-[9px] uppercase font-mono tracking-wider">Network</span>
        </button>
        <button 
          onClick={() => navigate("/message")} 
          className={`flex flex-col items-center gap-0.5 flex-1 py-1 transition-colors ${currentPath === "/message" ? "text-purple-400 font-bold" : "text-gray-400 hover:text-gray-200"}`}
        >
          <FaEnvelope size={18} />
          <span className="text-[9px] uppercase font-mono tracking-wider">Chats</span>
        </button>
        <button 
          onClick={() => navigate("/profile")} 
          className={`flex flex-col items-center gap-0.5 flex-1 py-1 transition-colors ${currentPath === "/profile" ? "text-emerald-400 font-bold" : "text-gray-400 hover:text-gray-200"}`}
        >
          <FaUser size={18} />
          <span className="text-[9px] uppercase font-mono tracking-wider">Profile</span>
        </button>
      </div>
    </main>
  );
};

export default Feed;
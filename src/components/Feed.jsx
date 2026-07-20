// Feed.jsx
import { useEffect, useCallback, useState, useRef } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import PremiumModal from "./PremiumModal";
import { addFeed, appendFeed, updateFeed } from "../utils/feedSlice";
import LeftSidebar from "./LeftSidebar";
import RightSidebar from "./RightSidebar";
import no_feed from "../assets/no_feed.jpeg";
import feedBg from "../assets/feed.png";
import { BASE_URL, RECOMMENDATION_API } from "../utils/constants";
import ShimmerCard from "./Shimmer";
import DeveloperCarousel from "./DeveloperCarousel";

import { FaBars, FaRobot, FaHome, FaUsers, FaEnvelope, FaUser, FaSlidersH } from "react-icons/fa";

const FEED_PAGE_LIMIT = 10;

const Feed = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const feedList = useSelector((state) => state.feed.list);
  const feedPage = useSelector((state) => state.feed.page);
  const feedHasMore = useSelector((state) => state.feed.hasMore);
  const [showPremiumModal, setShowPremiumModal] = useState(false);

  // Pipeline Operational States
  const [loading, setLoading] = useState(true);
  const [recommendations, setRecommendations] = useState([]);

  // "recommendation" = Personalized Machine Matches | "explore" = Complete Platform Global Feed
  const [activeTab, setActiveTab] = useState("recommendation");

  // Infinite scroll state (explore/global feed only)
  const [loadingMore, setLoadingMore] = useState(false);
  const fetchingRef = useRef(false);
  const sentinelRef = useRef(null);

  // Mobile/Tablet Slide-over Drawer States
  const [isLeftDrawerOpen, setIsLeftDrawerOpen] = useState(false);
  const [isRightDrawerOpen, setIsRightDrawerOpen] = useState(false);
  const [isAiCoachModalOpen, setIsAiCoachModalOpen] = useState(false);

  const currentPath = location.pathname;

  // Single Core Synchronized Initialization Engine Data Flow
  const initializePlatformFeed = useCallback(async () => {
    try {
      setLoading(true);

      // Phase 1: Always load Recommendations first to check targeted engagement
      const recRes = await axios.get(`${BASE_URL}${RECOMMENDATION_API}`, {
        withCredentials: true,
      });

      // Phase 2: Always fetch page 1 of the Global Feed in parallel/sequence so switching tabs is instantaneous and data is ready
      const feedRes = await axios.get(`${BASE_URL}/feed`, {
        params: { page: 1, limit: FEED_PAGE_LIMIT },
        withCredentials: true,
      });

      const recData = recRes.data?.data || [];
      const globalData = feedRes.data?.data || [];
      const globalHasMore = feedRes.data?.hasMore ?? globalData.length === FEED_PAGE_LIMIT;

      setRecommendations(recData);
      dispatch(addFeed({ data: globalData, hasMore: globalHasMore, page: 1 }));

      // Automatic Routing Flow Policy Rule: Fallback right to global if machine insights have empty states
      if (recData.length === 0) {
        setActiveTab("explore");
      } else {
        setActiveTab("recommendation");
      }

      setLoading(false);
    } catch (err) {
      console.error(err);
      // Failover Safe Recovery Mode: Attempt fallback straight to core feed on any matching engine crash
      try {
        const feedRes = await axios.get(`${BASE_URL}/feed`, {
          params: { page: 1, limit: FEED_PAGE_LIMIT },
          withCredentials: true,
        });
        const globalData = feedRes.data?.data || [];
        const globalHasMore = feedRes.data?.hasMore ?? globalData.length === FEED_PAGE_LIMIT;
        dispatch(addFeed({ data: globalData, hasMore: globalHasMore, page: 1 }));
        setRecommendations([]);
        setActiveTab("explore");
      } catch (fallbackErr) {
        toast.error("Failed to sync platform developer feed stream.");
      } finally {
        setLoading(false);
      }
    }
  }, [dispatch]);

  useEffect(() => {
    initializePlatformFeed();
  }, [initializePlatformFeed]);

  // Fetch the next page of the global feed and append it to Redux.
  const fetchNextFeedPage = useCallback(async () => {
    if (fetchingRef.current || !feedHasMore) return;

    fetchingRef.current = true;
    setLoadingMore(true);

    try {
      const nextPage = (feedPage || 1) + 1;
      const res = await axios.get(`${BASE_URL}/feed`, {
        params: { page: nextPage, limit: FEED_PAGE_LIMIT },
        withCredentials: true,
      });

      const newData = res.data?.data || [];
      const hasMore = res.data?.hasMore ?? newData.length === FEED_PAGE_LIMIT;

      // Stop cleanly if the backend has nothing left to give.
      if (newData.length === 0) {
        dispatch(appendFeed({ data: [], hasMore: false, page: feedPage }));
      } else {
        dispatch(appendFeed({ data: newData, hasMore, page: nextPage }));
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to load more developers.");
    } finally {
      setLoadingMore(false);
      fetchingRef.current = false;
    }
  }, [dispatch, feedHasMore, feedPage]);

  // IntersectionObserver on the sentinel below the global feed carousel.
  useEffect(() => {
    if (activeTab !== "explore") return undefined;

    const node = sentinelRef.current;
    if (!node) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && feedHasMore && !fetchingRef.current) {
          fetchNextFeedPage();
        }
      },
      { root: null, rootMargin: "200px", threshold: 0 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [activeTab, feedHasMore, fetchNextFeedPage]);

  // Handle local dynamic list updates without triggering complete page re-fetches
  const handleRecommendationAction = useCallback((userId) => {
    setRecommendations((prev) => {
      const remaining = prev.filter((item) => item._id !== userId);
      if (remaining.length === 0) {
        setActiveTab("explore");
      }
      return remaining;
    });
  }, []);

  const handleGlobalAction = useCallback((userId) => {
    dispatch(updateFeed(userId));
  }, [dispatch]);

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

  if (loading) {
    return <ShimmerCard />;
  }

  return (
    <main className="relative flex-1 bg-[#0B0E14] min-h-screen w-full overflow-hidden pb-20 lg:pb-6">
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

      <div className="absolute inset-0 bg-gradient-to-b from-[#0B0E14]/90 via-[#0B0E14]/70 to-[#0B0E14] backdrop-blur-[1px] pointer-events-none z-0" />

      {/* MOBILE TRIGGER HEADER */}
      <div className="lg:hidden w-full flex items-center justify-between px-4 py-3 bg-slate-900/80 backdrop-blur-md border-b border-white/5 relative z-10">
        <button 
          onClick={() => setIsLeftDrawerOpen(true)}
          className="p-2 text-gray-300 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
          aria-label="Open Left Profile Menu"
        >
          <FaBars size={16} />
        </button>
        <span className="text-xs font-mono font-black text-indigo-400 tracking-wider">GitTogether FEED</span>
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
        <div className={`absolute top-0 right-0 h-full w-[85vw] max-w-sm bg-[#0B0E14] border-l border-white/10 p-4 transition-transform duration-300 z-10 flex flex-col ${isRightDrawerOpen ? "translate-x-0" : "-translate-x-full"}`}>
          <div className="flex justify-between items-center mb-4 pt-2">
            <span className="text-xs font-mono font-bold text-gray-400 uppercase tracking-widest">Discovery Deck</span>
            <button onClick={() => setIsRightDrawerOpen(false)} className="btn btn-xs btn-circle btn-outline text-gray-400">✕</button>
          </div>
          <div className="flex-1 overflow-y-auto">
            <RightSidebar 
              setShowPremiumModal={setShowPremiumModal} 
              onCloseDrawer={() => setIsRightDrawerOpen(false)}
              onAiCoachOpen={() => setIsAiCoachModalOpen(true)}
              onAiCoachClose={() => setIsAiCoachModalOpen(false)}
            />
          </div>
        </div>
      </div>

      {/* MAIN LAYOUT WRAPPER GRID */}
      <div className="relative z-10 max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-6 grid grid-cols-1 lg:grid-cols-4 xl:grid-cols-12 gap-6 items-start">
        
        {/* LEFT SIDEBAR PERSISTENT PANEL */}
        <div className="hidden lg:block lg:col-span-1 xl:col-span-3">
          <div className="sticky top-20 z-20">
            <LeftSidebar setShowPremiumModal={setShowPremiumModal} />
          </div>
        </div>

        {/* FEED INNER CONTAINER COMPONENT VIEW */}
        <div className="col-span-1 lg:col-span-3 xl:col-span-6">
          <div className="w-full max-w-3xl mx-auto flex flex-col gap-6">
            
            {/* Unified Custom Navigation Control Strip Toggle */}
            <div className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white/[0.02] border border-white/5 backdrop-blur-md p-4 rounded-xl shadow-lg">
              <div className="flex flex-col">
                <h1 className="text-sm font-black text-gray-200 tracking-wide font-mono uppercase">Discovery Engine</h1>
                <p className="text-[11px] text-gray-400">Toggle views to swipe and scan network developers</p>
              </div>
              
              {/* Premium-styled Navigation Toggle Controls */}
              <div className="flex items-center bg-black/40 p-1 rounded-xl border border-white/5 self-start sm:self-center">
                <button
                  type="button"
                  onClick={() => setActiveTab("recommendation")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold tracking-tight transition-all flex items-center gap-1.5 ${activeTab === "recommendation" ? "bg-indigo-500 text-white shadow-md shadow-indigo-500/20" : "text-gray-400 hover:text-gray-200"}`}
                >
                  ✨ Recommended {recommendations.length > 0 && `(${recommendations.length})`}
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("explore")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold tracking-tight transition-all flex items-center gap-1.5 ${activeTab === "explore" ? "bg-cyan-500 text-white shadow-md shadow-cyan-500/20" : "text-gray-400 hover:text-gray-200"}`}
                >
                  <FaSlidersH size={10} /> Global Feed {feedList?.length > 0 && `(${feedList.length})`}
                </button>
              </div>
            </div>

            {/* DYNAMIC SWIPE CAROUSEL CONTAINER RENDERING CONDITIONAL FLOW */}
            {activeTab === "recommendation" ? (
              recommendations.length > 0 ? (
                <div className="w-full flex flex-col gap-6">
                  {/* Subtitle Tracking Header Panel */}
                  <div className="w-full flex flex-col bg-gradient-to-r from-indigo-950/40 to-cyan-950/40 border border-indigo-500/20 backdrop-blur-md p-4 rounded-xl shadow-lg">
                    <h2 className="text-base font-black text-indigo-400 tracking-wide font-mono uppercase">
                      People You May Know
                    </h2>
                    <p className="text-[11px] text-gray-400 mt-0.5">
                      Developers recommended based on your profile.
                    </p>
                  </div>

                  <DeveloperCarousel 
                    developers={recommendations}
                    isRecommendation={true}
                    onActionSuccess={handleRecommendationAction}
                    hideArrows={isAiCoachModalOpen}
                  />
                </div>
              ) : (
                // Fallback Layout Panel to present explore stream directly when recommended segment clears
                <div className="w-full py-8 text-center border border-white/5 bg-white/[0.01] rounded-2xl">
                  <p className="text-xs text-gray-400 font-mono">No new matching recommendations found.</p>
                  <button 
                    onClick={() => setActiveTab("explore")}
                    className="mt-3 px-4 py-1.5 bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 rounded-xl text-xs font-mono font-bold hover:bg-cyan-500/20 transition-all"
                  >
                    View Global Explorer Feed
                  </button>
                </div>
              )
            ) : (
              /* GLOBAL FEED ROUTE PANEL */
              Array.isArray(feedList) && feedList.length > 0 ? (
                <div className="w-full flex flex-col gap-2">
                  <DeveloperCarousel 
                    developers={feedList}
                    isRecommendation={false}
                    onActionSuccess={handleGlobalAction}
                    hideArrows={isAiCoachModalOpen}
                  />

                  {/* Infinite scroll sentinel — observed via IntersectionObserver */}
                  <div ref={sentinelRef} className="w-full flex flex-col items-center py-3 min-h-[24px]">
                    {loadingMore && (
                      <div className="flex items-center gap-2 text-xs font-mono text-gray-400">
                        <span className="w-4 h-4 border-2 border-indigo-400 border-t-transparent rounded-full animate-spin" />
                        Loading more developers...
                      </div>
                    )}
                    {!feedHasMore && !loadingMore && (
                      <p className="text-xs font-mono text-gray-500 tracking-wide">
                        You've reached the end of the developer feed.
                      </p>
                    )}
                  </div>
                </div>
              ) : (
                /* ABSOLUTE EMPTY STATE: BOTH PIPELINES RETURNED ZERO DATA NODES */
                <div role="status" className="flex flex-col items-center justify-center text-center animate-fadeIn max-w-md mx-auto mt-12">
                  <div className="relative mb-6">
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-cyan-400/20 blur-xl" />
                    <img src={no_feed} alt="No developers available" className="relative w-64 h-48 object-cover rounded-2xl ring-1 ring-white/10 shadow-2xl" />
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-xl px-6 py-5 shadow-2xl">
                    <h2 className="text-xl font-bold text-gray-100 tracking-tight">No developers available.</h2>
                    <p className="mt-2 text-xs text-gray-400 leading-relaxed">You have reviewed all active developer profiles based on your current network reach.</p>
                    <p className="text-xs text-gray-400 font-mono mt-2">No more developers to discover.</p>
                    <button type="button" onClick={initializePlatformFeed} className="mt-4 px-4 py-2 text-xs font-mono font-bold text-indigo-400 border border-indigo-500/30 rounded-lg hover:bg-indigo-500/10 transition-all">
                      Refresh Profiles
                    </button>
                  </div>
                </div>
              )
            )}
          </div>
        </div>

        {/* RIGHT SIDEBAR PERSISTENT PANEL */}
        <div className="hidden xl:block xl:col-span-3">
          <div className="sticky top-20 z-20">
            <RightSidebar 
              setShowPremiumModal={setShowPremiumModal}
              onAiCoachOpen={() => setIsAiCoachModalOpen(true)}
              onAiCoachClose={() => setIsAiCoachModalOpen(false)}
            />
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
// components/RightSidebar.jsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaFire, FaUserPlus, FaRobot, FaCrown, FaCalendarAlt, FaQuoteLeft } from "react-icons/fa";
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import AiCoachModal from './AiCoachModal';

const RightSidebar = ({ setShowPremiumModal, onCloseDrawer, userProfileData }) => {
  const navigate = useNavigate();
  const [isCoachModalOpen, setIsCoachModalOpen] = useState(false);

  const handleOptimizeProfile = () => {
    if (typeof onCloseDrawer === "function") onCloseDrawer();
    setIsCoachModalOpen(true);
  };

  const handleTriggerProfileAudit = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/profile/coach",
        {},
        { withCredentials: true }
      );
      return res.data;
    } catch (error) {
      console.error(error);
      return { success: false, message: "Unable to generate suggestions right now." };
    }
  };

  const handlePremiumUpgrade = () => {
    if (typeof onCloseDrawer === "function") onCloseDrawer();
    if (typeof setShowPremiumModal === "function") {
      setShowPremiumModal(true);
    } else {
      navigate("/premium");
    }
  };

  return (
    <aside className="w-full h-[calc(100vh-6rem)] overflow-y-auto custom-scrollbar flex flex-col gap-5 pb-24 md:pb-6 pl-2">
      
      {/* TRENDING TECHNOLOGIES */}
      <div className="flex-shrink-0 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-4 shadow-2xl">
        <h3 className="text-xs font-bold text-gray-200 uppercase tracking-widest font-mono mb-3 flex items-center gap-2">
          <FaFire className="text-orange-500 animate-pulse" /> Trending Technologies
        </h3>
        <div className="flex flex-wrap gap-1.5">
          {["React", "Node.js", "MongoDB", "Next.js", "AI", "Docker", "Redis", "TypeScript", "Kubernetes"].map((tech) => (
            <span key={tech} className="text-[11px] font-medium font-mono px-2.5 py-1 rounded-lg bg-white/5 text-gray-300 border border-white/5 hover:border-indigo-500/30 hover:bg-indigo-500/10 cursor-pointer transition-all">
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* SUGGESTED DEVELOPERS */}
      <div className="flex-shrink-0 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-4 shadow-2xl">
        <h3 className="text-xs font-bold text-gray-200 uppercase tracking-widest font-mono mb-3">Suggested Developers</h3>
        <div className="flex flex-col gap-3.5">
          {[
            { name: "Alex Rivera", title: "Senior Staff Engineer", pic: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150" },
            { name: "Sarah Chen", title: "Distributed Systems Architect", pic: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150" },
            { name: "Marcus Brody", title: "DevOps Engineer", pic: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150" }
          ].map((dev, i) => (
            <div key={i} className="flex items-center justify-between gap-2 group">
              <div className="flex items-center gap-2.5 min-w-0">
                <img src={dev.pic} alt={dev.name} className="w-9 h-9 rounded-full object-cover ring-1 ring-white/10 flex-shrink-0" />
                <div className="min-w-0">
                  <h4 className="text-xs font-bold text-gray-200 group-hover:text-indigo-400 transition-colors truncate">{dev.name}</h4>
                  <p className="text-[10px] text-gray-400 font-mono truncate">{dev.title}</p>
                </div>
              </div>
              <button className="btn btn-xs bg-indigo-600 hover:bg-indigo-500 text-white border-none rounded-lg font-bold flex items-center gap-1 shadow-sm px-2 flex-shrink-0">
                <FaUserPlus size={10} /> Connect
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* DEVELOPER STATS */}
      <div className="flex-shrink-0 grid grid-cols-2 gap-2.5">
        <div className="p-3 rounded-xl border border-white/5 bg-white/[0.02] text-center">
          <div className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 font-mono">1,200+</div>
          <div className="text-[9px] text-gray-400 uppercase tracking-wider font-medium mt-0.5">Developers</div>
        </div>
        <div className="p-3 rounded-xl border border-white/5 bg-white/[0.02] text-center">
          <div className="text-lg font-bold text-emerald-400 font-mono">250+</div>
          <div className="text-[9px] text-gray-400 uppercase tracking-wider font-medium mt-0.5">Connections Today</div>
        </div>
        <div className="p-3 rounded-xl border border-white/5 bg-white/[0.02] text-center">
          <div className="text-lg font-bold text-amber-400 font-mono flex items-center justify-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping inline-block" /> 180
          </div>
          <div className="text-[9px] text-gray-400 uppercase tracking-wider font-medium mt-0.5">Online Now</div>
        </div>
        <div className="p-3 rounded-xl border border-white/5 bg-white/[0.02] text-center">
          <div className="text-lg font-bold text-purple-400 font-mono">75</div>
          <div className="text-[9px] text-gray-400 uppercase tracking-wider font-medium mt-0.5">Premium Members</div>
        </div>
      </div>

      {/* AI COACH WIDGET */}
      <div className="flex-shrink-0 relative overflow-hidden rounded-2xl border border-purple-500/20 bg-gradient-to-br from-purple-950/20 via-slate-900/40 to-indigo-950/20 backdrop-blur-xl p-4 shadow-xl flex flex-col justify-between min-h-[160px]">
        <div className="absolute -right-6 -bottom-6 w-20 h-20 bg-purple-500/10 rounded-full blur-xl pointer-events-none" />
        <div className="flex items-start gap-3 w-full overflow-hidden">
          <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20 flex-shrink-0">
            <FaRobot size={18} />
          </div>
          <div className="min-w-0">
            <h4 className="text-xs font-bold text-gray-100">AI Profile Coach</h4>
            <p className="text-[11px] text-gray-400 mt-1 leading-relaxed break-words">
              "Need help improving your profile?" Let our smart assistant give your profile a professional boost.
            </p>
          </div>
        </div>
        <div className="mt-4 pt-1 w-full relative z-10">
          <button 
            onClick={handleOptimizeProfile}
            className="w-full py-2 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-mono font-bold text-[10px] shadow-lg transition-all tracking-wide block text-center"
          >
            OPTIMIZE PROFILE
          </button>
        </div>
      </div>

      {/* PREMIUM WIDGET */}
      <div className="flex-shrink-0 relative overflow-hidden rounded-2xl border border-amber-500/20 bg-gradient-to-br from-amber-950/10 via-slate-900/40 to-orange-950/10 backdrop-blur-xl p-4 shadow-xl">
        <div className="flex items-center gap-2 text-amber-400 font-mono font-bold text-xs uppercase tracking-widest mb-2">
          <FaCrown /> Premium Upgrade
        </div>
        <p className="text-[11px] text-gray-400 mb-3">
          Unlock unlimited matching requests, direct profile search priorities, and customized networking filters.
        </p>
        <div className="flex gap-2 mb-4">
          <span className="badge badge-sm bg-white/5 text-gray-300 border-white/10 text-[9px] py-2">Silver</span>
          <span className="badge badge-sm bg-amber-500/10 text-amber-400 border-amber-500/20 text-[9px] py-2">Gold</span>
        </div>
        <button 
          onClick={handlePremiumUpgrade}
          className="w-full py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-mono font-black text-xs shadow-xl transition-all hover:brightness-110 tracking-wider"
        >
          UPGRADE NOW
        </button>
      </div>

      {/* UPCOMING HACKATHONS */}
      <div className="flex-shrink-0 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-4 shadow-2xl">
        <h3 className="text-xs font-bold text-gray-200 uppercase tracking-widest font-mono mb-3 flex items-center gap-2">
          <FaCalendarAlt className="text-indigo-400" /> Upcoming Hackathons
        </h3>
        <div className="space-y-3">
          {[
            { title: "Smart India Hackathon", date: "Jul 12 - Jul 15", prize: "₹1,00,000 Pool" },
            { title: "HackCBS", date: "Aug 02 - Aug 04", prize: "$5,000 Pool" },
            { title: "Devfolio Buildathon", date: "Sep 18 - Sep 20", prize: "MacBook Pro M3" },
            { title: "Google Solution Challenge", date: "Oct 05 - Oct 10", prize: "Mentorship & Prizes" }
          ].map((hack, index) => (
            <div key={index} className="border-l-2 border-indigo-500/40 pl-3 py-0.5">
              <h4 className="text-xs font-bold text-gray-200">{hack.title}</h4>
              <div className="flex items-center justify-between text-[10px] text-gray-400 font-mono mt-0.5">
                <span>{hack.date}</span>
                <span className="text-indigo-400">{hack.prize}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* QUOTE OF THE DAY */}
      <div className="flex-shrink-0 rounded-2xl border border-white/10 bg-white/[0.01] p-4 text-center relative">
        <FaQuoteLeft className="text-white/5 absolute top-2 left-3" size={24} />
        <p className="text-xs italic text-gray-400 font-mono relative z-10">
          "Code. Learn. Build. Repeat."
        </p>
      </div>

      <AiCoachModal 
        isOpen={isCoachModalOpen} 
        onClose={() => setIsCoachModalOpen(false)} 
        onAction={handleTriggerProfileAudit}
        dataProfile={userProfileData}
      />
    </aside>
  );
};

export default RightSidebar;
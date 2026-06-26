import React from "react";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { 
  FaUserEdit, FaUsers, FaUserPlus, FaEnvelope, 
  FaCrown, FaMapMarkerAlt, FaBriefcase,
  FaGithub, FaLinkedin, FaGlobe, FaFileAlt, FaLock
} from "react-icons/fa";
import { SiLeetcode, SiCodeforces } from "react-icons/si";

const LeftSidebar = ({ setShowPremiumModal, onCloseDrawer }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector((state) => state.user || state.user?.data || {});

  const currentPath = location.pathname;

  const suggestions = [];
  let score = 20;

  if (user.github || user.linkedin) score += 20; else suggestions.push("Add GitHub or LinkedIn");
  if (user.resume || user.portfolio) score += 20; else suggestions.push("Add Resume or Portfolio");
  if (user.projects && user.projects.length > 0) score += 20; else suggestions.push("Add Projects");
  if (user.college || user.company) score += 20; else suggestions.push("Complete Education or Work Experience");

  const profileStrength = user.profileStrength || score;

  const handleNav = (targetPath) => {
    navigate(targetPath);
    if (typeof onCloseDrawer === "function") onCloseDrawer();
  };

  const getNavStyle = (targetPath) => {
    const isActive = currentPath === targetPath;
    return `flex items-center gap-3 w-full px-4 py-2.5 rounded-xl text-xs transition-all text-left group ${
      isActive 
        ? "bg-indigo-500/10 text-white font-bold border-l-2 border-indigo-500 rounded-l-none" 
        : "text-gray-300 hover:bg-white/5 hover:text-white font-medium"
    }`;
  };

  const handlePremiumClick = () => {
    if (typeof onCloseDrawer === "function") onCloseDrawer();
    if (typeof setShowPremiumModal === "function") {
      setShowPremiumModal(true);
    } else {
      navigate("/premium");
    }
  };

  return (
    <aside className="w-80 max-w-full h-[calc(100vh-5rem)] overflow-y-auto custom-scrollbar flex flex-col gap-5 pb-24 md:pb-6 pr-2">
      {/* DEVELOPER CARD */}
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-5 shadow-2xl transition-all hover:border-indigo-500/30">
        {user.isPremium && (
          <div className="absolute top-0 right-0 bg-gradient-to-l from-amber-500 to-orange-500 text-slate-950 font-black text-[10px] px-3 py-1 rounded-bl-xl flex items-center gap-1 shadow-md uppercase tracking-wider animate-pulse">
            <FaCrown /> {user.premiumType || "PRO"}
          </div>
        )}

        <div className="flex flex-col items-center text-center mt-3">
          <div className="relative group">
            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-75 blur-sm transition duration-500 group-hover:opacity-100" />
            <img
              src={user.photoUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=256"}
              alt="Developer Avatar"
              className="relative w-24 h-24 rounded-full object-cover border-2 border-slate-900"
            />
          </div>

          <h2 className="mt-4 text-xl font-bold text-gray-100 tracking-tight flex items-center gap-2">
            {user.firstName ? `${user.firstName} ${user.lastName || ""}` : "Developer"}
          </h2>
          <p className="text-xs text-indigo-400 font-mono font-medium mt-1">
            {user.developerTitle || "Full Stack Engineer"}
          </p>
          
          {user.company && (
            <p className="text-[11px] text-gray-400 mt-0.5">
              at {user.company}
            </p>
          )}

          <div className="flex flex-wrap gap-2 justify-center mt-3">
            <span className="badge badge-sm bg-emerald-500/10 text-emerald-400 border-emerald-500/20 px-2 py-2 font-mono text-[10px]">
              🟢 {user.availability || "Available to Connect"}
            </span>
            {user.location && (
              <span className="badge badge-sm bg-white/5 text-gray-300 border-white/10 px-2 py-2 text-[10px] flex items-center gap-1">
                <FaMapMarkerAlt className="text-gray-400" /> {user.location}
              </span>
            )}
          </div>
        </div>

        {/* PROFILE STRENGTH */}
        <div className="mt-5 pt-4 border-t border-white/5 flex items-center gap-4">
          <div 
            className="radial-progress text-indigo-500 font-mono font-bold text-xs" 
            style={{ "--value": profileStrength, "--size": "3.5rem", "--thickness": "4px" }}
            role="progressbar"
          >
            {profileStrength}%
          </div>
          <div className="flex-1">
            <h4 className="text-xs font-semibold text-gray-200">Profile Strength</h4>
            <p className="text-[10px] text-gray-400 mt-0.5">Boost your platform visibility</p>
          </div>
        </div>

        {/* PROFILE SUGGESTIONS */}
        {suggestions.length > 0 && (
          <div className="mt-4 p-3 rounded-xl bg-indigo-950/20 border border-indigo-500/10">
            <p className="text-[11px] font-bold text-indigo-300 mb-1.5 uppercase tracking-wider font-mono">Recommended Actions:</p>
            <ul className="text-[11px] text-gray-400 space-y-1 list-disc list-inside">
              {suggestions.map((sug, i) => <li key={i} className="hover:text-gray-200 transition-colors">{sug}</li>)}
            </ul>
          </div>
        )}
      </div>

      {/* QUICK STATS */}
      <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-4 shadow-2xl grid grid-cols-2 gap-3">
        <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors">
          <span className="text-[10px] text-gray-400 font-medium block">Connections</span>
          <span className="text-lg font-bold text-gray-100 font-mono">{user.connectionsCount || "142"}</span>
        </div>
        <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors">
          <span className="text-[10px] text-gray-400 font-medium block">Pending Requests</span>
          <span className="text-lg font-bold text-amber-400 font-mono">{user.pendingRequestsCount || "8"}</span>
        </div>
        <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors">
          <span className="text-[10px] text-gray-400 font-medium block">Projects</span>
          <span className="text-lg font-bold text-cyan-400 font-mono">{user.projects?.length || "6"}</span>
        </div>
        <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors">
          <span className="text-[10px] text-gray-400 font-medium block">Skills</span>
          <span className="text-lg font-bold text-purple-400 font-mono">{user.skills?.length || "12"}</span>
        </div>
      </div>

      {/* QUICK NAVIGATION */}
      <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-2.5 shadow-2xl flex flex-col gap-1">
        <button onClick={() => handleNav("/profile")} className={getNavStyle("/profile")}>
          <FaUserEdit className={`${currentPath === "/profile" ? "text-white" : "text-indigo-400"} text-sm transition-colors`} /> 
          <span>Edit Profile</span>
        </button>
        <button onClick={() => handleNav("/connection")} className={getNavStyle("/connection")}>
          <FaUsers className={`${currentPath === "/connection" ? "text-white" : "text-cyan-400"} text-sm transition-colors`} /> 
          <span>My Connections</span>
        </button>
        <button onClick={() => handleNav("/request")} className={getNavStyle("/request") + " justify-between"}>
          <div className="flex items-center gap-3">
            <FaUserPlus className={`${currentPath === "/request" ? "text-white" : "text-emerald-400"} text-sm transition-colors`} /> 
            <span>Connection Requests</span>
          </div>
          <span className="badge badge-xs bg-indigo-500 border-none text-[9px] px-1.5 text-white font-bold">NEW</span>
        </button>
        <button onClick={() => handleNav("/message")} className={getNavStyle("/message")}>
          <FaEnvelope className={`${currentPath === "/message" ? "text-white" : "text-purple-400"} text-sm transition-colors`} /> 
          <span>Messages</span>
        </button>
        <button onClick={handlePremiumClick} className="flex items-center gap-3 w-full px-4 py-2.5 text-xs font-semibold text-amber-400 bg-amber-500/5 border border-amber-500/10 rounded-xl hover:bg-amber-500/10 transition-all text-left">
          <FaCrown className="text-amber-500 text-sm" /> 
          <span>Upgrade to Premium</span>
        </button>
      </div>

      {/* DEVELOPER LINKS */}
      <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-4 shadow-2xl">
        <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest font-mono mb-3">Developer Links</h4>
        <div className="flex flex-wrap gap-2">
          {user.github && (
            <a href={user.github} target="_blank" rel="noreferrer" className="btn btn-square btn-sm bg-white/5 hover:bg-white/10 text-gray-200 border-white/10">
              <FaGithub size={16} />
            </a>
          )}
          {user.linkedin && (
            <a href={user.linkedin} target="_blank" rel="noreferrer" className="btn btn-square btn-sm bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border-blue-500/20">
              <FaLinkedin size={16} />
            </a>
          )}
          {user.portfolio && (
            <a href={user.portfolio} target="_blank" rel="noreferrer" className="btn btn-square btn-sm bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border-emerald-500/20">
              <FaGlobe size={16} />
            </a>
          )}
          {user.resume && (
            <a href={user.resume} target="_blank" rel="noreferrer" className="btn btn-square btn-sm bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border-rose-500/20">
              <FaFileAlt size={16} />
            </a>
          )}
          {user.leetcode && (
            <a href={user.leetcode} target="_blank" rel="noreferrer" className="btn btn-square btn-sm bg-amber-500/10 hover:bg-amber-500/20 text-amber-500 border-amber-500/20">
              <SiLeetcode size={16} />
            </a>
          )}
          {user.codeforces && (
            <a href={user.codeforces} target="_blank" rel="noreferrer" className="btn btn-square btn-sm bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border-cyan-500/20">
              <SiCodeforces size={16} />
            </a>
          )}
          {(!user.github && !user.linkedin && !user.portfolio && !user.resume) && (
            <p className="text-[11px] text-gray-500 italic flex items-center gap-1.5">
              <FaLock size={10} /> Links not provided
            </p>
          )}
        </div>
      </div>

      {/* DEVELOPER STATUS CARD */}
      <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-4 shadow-2xl">
        <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest font-mono mb-3 flex items-center gap-2">
          <FaBriefcase className="text-indigo-400" /> Career Interests
        </h4>
        <div className="flex flex-col gap-2">
          {["Open to Jobs", "Open to Internship", "Open to Freelance", "Hackathons", "Mentorship"].map((status, index) => {
            const isMatch = user.availability?.toLowerCase().includes(status.toLowerCase().replace("open to ", "")) || index < 2;
            return (
              <div key={status} className="flex items-center justify-between text-xs py-1">
                <span className="text-gray-300 font-medium">{status}</span>
                <span className={`w-2 h-2 rounded-full ${isMatch ? "bg-emerald-500 shadow-lg shadow-emerald-500/50" : "bg-white/10"}`} />
              </div>
            );
          })}
        </div>
      </div>
    </aside>
  );
};

export default LeftSidebar;
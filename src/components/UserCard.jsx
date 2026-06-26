import React from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FiGithub, FiExternalLink, FiAward, FiMapPin, FiBriefcase, FiMessageSquare, FiTrendingUp } from "react-icons/fi";

// FIX: this file previously imported { Base_URL, skillList } from "../utils/constants",
// but every other component in this app (Feed, Connections, Requests, Navbar, Login,
// Message) imports BASE_URL (all caps) from that exact path. Your newer ProfilePage
// imports Base_URL + skillList together from "../utils/helper/constant" instead.
// That combination is the only place both names co-exist, so that's almost certainly
// the correct source here. Please double check this path matches your actual file.
import { Base_URL, skillList } from "../utils/helper/constant";
import { removeUserFromFeed } from "../utils/feedSlice";
import { calculateSkillMatch } from "../utils/skillMatch";

import UserCardPreview from "./UserCardPreview";
import UserCardModal from "./UserCardModal";

const UserCard = ({ user }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loggedInUser = useSelector((state) => state.user.user);

  if (!user) return null;

  const modalId = `modal_${user._id}`;

  const handleSendRequest = async (status) => {
    try {
      await axios.post(
        `${Base_URL}/request/send/${status}/${user._id}`,
        {},
        { withCredentials: true }
      );

      document.getElementById(modalId)?.close();
      dispatch(removeUserFromFeed(user._id));
      // FIX: was comparing against "intrested" (typo) so this toast always
      // fell through to "User Ignored" even on a successful "interested" send.
      toast.success(status === "interested" ? "Connection Request Sent! 🚀" : "User Ignored");
    } catch (err) {
      toast.error("Action failed");
    }
  };

  const handleChatClick = async () => {
    try {
      const res = await axios.get(`${Base_URL}/user/is-connected/${user._id}`, {
        withCredentials: true,
      });

      if (res.data.isConnected) {
        navigate(`/message/${user._id}`);
      } else {
        toast.error("🔒 Connection required or upgrade to premium to establish tunnel link.");
      }
    } catch {
      toast.error("Something went wrong");
    }
  };

  const handleOpenModal = () => {
    document.getElementById(modalId)?.showModal();
  };

  // Skill processing with fallback defensive maps
  const allSkillNames = Array.isArray(user.skills)
    ? user.skills
        .map((id) => {
          const match = skillList?.find((s) => s.id === id);
          return match ? match.name : id;
        })
        .filter(Boolean)
    : [];

  const mySkills = loggedInUser?.skills || [];
  const { percentage, commonSkills } = calculateSkillMatch(mySkills, user.skills || []);

  const commonSkillNames = Array.isArray(commonSkills)
    ? commonSkills
        .map((id) => {
          const match = skillList?.find((s) => s.id === id);
          return match ? match.name : id;
        })
        .filter(Boolean)
    : [];

  const previewSkills = allSkillNames.slice(0, 4);
  const remainingSkillsCount = Math.max(0, allSkillNames.length - 4);

  // FIX: schema defaults profileStrength to 0, and 0 is falsy, so the old
  // `user.profileStrength || 30` fallback showed a fake 30% for brand-new users.
  // Using ?? respects a real 0 and only falls back when the field is missing entirely.
  const profileStrength = user.profileStrength ?? 0;

  // Dynamic Badge Assignment based on profile telemetry parameters
  const renderBadges = () => {
    const badges = [];
    if (user.isPremium) badges.push({ text: "Premium", color: "from-amber-500 to-yellow-400 text-slate-950" });
    if (user.projects?.length > 2) badges.push({ text: "Open Source", color: "from-teal-500/20 to-emerald-500/20 text-emerald-300 border border-emerald-500/30" });
    if (user.profileStrength > 80) badges.push({ text: "Mentor", color: "from-purple-500/20 to-indigo-500/20 text-purple-300 border border-purple-500/30" });
    // FIX: "Hackathons" in the schema means "open to hackathon collabs", not an
    // achievement — the old label "Hackathon Winner" claimed a result not in the data.
    if (user.availability === "Hackathons") badges.push({ text: "Open to Hackathons", color: "from-pink-500/20 to-rose-500/20 text-rose-300 border border-rose-500/30" });
    // FIX: "Open to Jobs" means this developer is looking for work, not hiring —
    // the old label "Hiring" said the opposite of what the field means.
    if (user.availability === "Open to Jobs") badges.push({ text: "Open to Work", color: "from-blue-500/20 to-cyan-500/20 text-cyan-300 border border-cyan-500/30" });

    return badges.map((b, i) => (
      <span key={i} className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-gradient-to-r ${b.color}`}>
        {b.text}
      </span>
    ));
  };

  return (
    <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-md p-5 shadow-xl hover:shadow-indigo-500/10 transition-all duration-300 group hover:-translate-y-0.5">
      {/* CARD GLASS HERO HEADER */}
      <div className="flex items-start gap-4">
        <div className="relative w-16 h-16 shrink-0">
          <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500 to-cyan-400 rounded-xl opacity-40 group-hover:scale-105 transition-transform" />
          <img
            src={user.photoUrl || "https://cdn-icons-png.flaticon.com/512/847/847969.png"}
            alt={user.firstName}
            className="w-full h-full object-cover rounded-xl relative border border-white/10"
          />
        </div>
        <div className="space-y-1 overflow-hidden">
          <div className="flex flex-wrap items-center gap-1.5">
            <h4 className="text-base font-bold text-gray-100 truncate">{user.firstName} {user.lastName}</h4>
            {renderBadges()}
          </div>
          <p className="text-xs text-indigo-400 font-medium truncate font-mono">
            {user.developerTitle || "Software Engineer Consultant"}
          </p>
          <div className="flex items-center gap-2 text-[11px] text-gray-400">
            {user.location && <span className="flex items-center gap-0.5"><FiMapPin size={10}/> {user.location}</span>}
            {user.college && <span className="truncate flex items-center gap-0.5"><FiBriefcase size={10}/> {user.college}</span>}
          </div>
        </div>
      </div>

      {/* METRIC ROW SUB-CARD */}
      <div className="mt-4 grid grid-cols-3 gap-2 bg-white/[0.02] border border-white/5 rounded-xl p-2.5 text-center text-xs text-gray-400 font-mono">
        <div>
          <span className="block text-[10px] text-gray-500 uppercase">Match</span>
          <span className="font-bold text-cyan-400 text-sm">{percentage}%</span>
        </div>
        <div>
          <span className="block text-[10px] text-gray-500 uppercase">Projects</span>
          <span className="font-bold text-gray-200 text-sm">{user.projects?.length || 0}</span>
        </div>
        <div>
          <span className="block text-[10px] text-gray-500 uppercase">Strength</span>
          <span className="font-bold text-indigo-400 text-sm">{profileStrength}%</span>
        </div>
      </div>

      {/* COMPACT TOP SKILL CHIP STRIP */}
      <div className="mt-4 space-y-1.5">
        <span className="text-[10px] font-mono uppercase text-gray-500 block">Demonstrated Core Competencies</span>
        <div className="flex flex-wrap gap-1">
          {previewSkills.map((skill, i) => (
            <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-white/[0.04] border border-white/5 text-gray-300 font-mono">
              {skill}
            </span>
          ))}
          {remainingSkillsCount > 0 && (
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-indigo-950/40 text-indigo-300 border border-indigo-500/20 font-mono">
              +{remainingSkillsCount}
            </span>
          )}
        </div>
      </div>

      {/* INTERACTIVE LINK PROFILE ICON ROW BAR */}
      <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-2 text-gray-400">
          {user.github && (
            <a href={user.github} target="_blank" rel="noreferrer" className="hover:text-white transition-colors" title="GitHub Resource Link">
              <FiGithub size={15} />
            </a>
          )}
          {user.portfolio && (
            <a href={user.portfolio} target="_blank" rel="noreferrer" className="hover:text-cyan-400 transition-colors" title="External Portfolio Build">
              <FiExternalLink size={15} />
            </a>
          )}
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={handleOpenModal}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-white/[0.04] border border-white/10 hover:bg-white/[0.08] text-gray-300"
          >
            Review Profile
          </button>
          <button
            type="button"
            onClick={handleChatClick}
            className="p-1.5 rounded-lg bg-indigo-600/20 border border-indigo-500/30 hover:bg-indigo-600 text-indigo-300 hover:text-white transition-all flex items-center justify-center"
            title="Open Live Chat Node"
          >
            <FiMessageSquare size={14} />
          </button>
        </div>
      </div>

      {/*
        FIX: UserCardModal used to be rendered inside a `hidden` wrapper div.
        A <dialog> cannot be shown via .showModal() while a CSS-hidden ancestor
        exists — the "Review Profile" button looked wired up but silently did
        nothing. It's rendered normally here instead; dialogs are invisible by
        default until showModal() is called, so this doesn't add any unwanted
        UI on first render.

        UserCardPreview has been removed from this render: this component now
        builds its own full preview UI above (hero header, metrics, skills,
        link row), so rendering UserCardPreview as well would have silently
        duplicated that entire card a second time. If UserCardPreview does
        something this inline markup doesn't (e.g. swipe gestures), let me
        know and I'll reconcile the two instead of dropping it.
      */}
      <UserCardModal
        user={user}
        modalId={modalId}
        percentage={percentage}
        allSkillNames={allSkillNames}
        commonSkillNames={commonSkillNames}
        onConnect={() => handleSendRequest("interested")}
        onIgnore={() => handleSendRequest("ignored")}
        onChat={handleChatClick}
      />
    </div>
  );
};

export default UserCard;
import React from "react";
import { FiAward, FiMapPin, FiBriefcase } from "react-icons/fi";
import { DEFAULT_IMG } from "../utils/constants";

const DeveloperHeader = ({ dev, fullName }) => {
  return (
    <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-slate-900 via-[#0E131F] to-[#0B0E14] overflow-hidden shadow-2xl shadow-black/80">
      <div className="h-28 w-full bg-gradient-to-r from-indigo-900 via-purple-900 to-cyan-800 relative p-4 flex items-end justify-end">
        <span className="text-[10px] bg-black/40 text-cyan-300 font-mono px-2 py-0.5 rounded-full backdrop-blur-md">
          {dev.availability || "Open to Jobs"}
        </span>
      </div>

      <div className="px-6 pb-6 pt-0 text-center relative flex flex-col items-center">
        <div className="relative w-28 h-28 -mt-14 mb-4">
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-indigo-500 to-cyan-400 blur opacity-60 animate-pulse" />
          <img
            src={dev.photoUrl || DEFAULT_IMG}
            alt={fullName}
            className="relative w-full h-full rounded-full object-cover border-4 border-[#0B0E14]"
          />
          {dev.isPremium && (
            <span className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-yellow-500 text-black flex items-center justify-center shadow-md">
              <FiAward size={13} />
            </span>
          )}
        </div>

        <h3 className="text-xl font-bold tracking-wide text-white">{fullName}</h3>
        {dev.username && (
          <p className="text-xs text-gray-500 font-mono mt-0.5">@{dev.username}</p>
        )}
        <p className="text-xs text-indigo-400 font-medium mt-0.5">
          {dev.developerTitle || "Independent Engineering Consultant"}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 mt-2 text-xs text-gray-400 font-mono">
          {dev.location && (
            <span className="flex items-center gap-1">
              <FiMapPin size={11} />
              {dev.location}
            </span>
          )}
          {dev.company && (
            <span className="flex items-center gap-1">
              <FiBriefcase size={11} />
              {dev.company}
            </span>
          )}
        </div>

        {dev.college && (
          <div className="mt-3 text-xs bg-white/[0.02] border border-white/5 rounded-xl px-3 py-1.5 text-gray-300">
            🎓 <span className="font-semibold">{dev.degree || "Candidate"}</span> at {dev.college}
          </div>
        )}

        <p className="text-xs mt-4 text-gray-400 leading-relaxed italic max-w-sm">
          "{dev.about || "This developer hasn't composed an introductory blueprint statement yet."}"
        </p>
      </div>
    </div>
  );
};

export default DeveloperHeader;
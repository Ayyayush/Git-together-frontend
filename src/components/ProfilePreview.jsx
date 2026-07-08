import React from "react";
import { DEFAULT_IMG } from "../utils/constants";
import SocialLinks from "./SocialLinks";

const ProfilePreview = ({ formData, previewName, setShowPremiumModal }) => {
  return (
    <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-slate-900 via-[#0E131F] to-[#0B0E14] p-6 shadow-2xl text-center relative overflow-hidden flex flex-col items-center">
      <div className="absolute top-0 right-0 p-3">
        <span className="text-[9px] bg-indigo-500/20 text-indigo-300 font-mono px-2 py-0.5 rounded-full border border-indigo-500/30">
          {formData.availability}
        </span>
      </div>

      <div className="relative w-24 h-24 mt-4 mb-4">
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-indigo-500 to-cyan-400 blur opacity-40" />
        <img
          src={formData.photoUrl || DEFAULT_IMG}
          alt="Preview Avatar"
          className="relative w-full h-full rounded-full object-cover border-4 border-[#0B0E14]"
        />
      </div>

      <h3 className="text-lg font-bold text-white tracking-wide">{previewName}</h3>
      <p className="text-xs text-indigo-400 font-medium mt-0.5">
        {formData.developerTitle || "System Architect Engine"}
      </p>

      {formData.location && (
        <p className="text-[11px] text-gray-500 font-mono mt-1">📍 {formData.location}</p>
      )}

      {formData.about && (
        <p className="text-xs mt-3 text-gray-400 leading-relaxed italic max-w-xs px-2 line-clamp-3">
          "{formData.about}"
        </p>
      )}

      <SocialLinks profile={formData} />

      <div className="mt-6 pt-5 border-t border-white/5 w-full">
        <div className="rounded-xl bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 p-4 text-left">
          <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wide">👑 Premium Deployment</h4>
          <p className="text-[11px] text-gray-400 mt-1 leading-normal">
            Gain verified status badges, unlimited direct access pipes, and advanced pipeline visibility options.
          </p>
          <button
            type="button"
            onClick={() => setShowPremiumModal(true)}
            className="mt-3 w-full py-1.5 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 hover:brightness-110 text-black font-mono font-bold text-[11px] transition-all"
          >
            Execute Upgrade
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePreview;
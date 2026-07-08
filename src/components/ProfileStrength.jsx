import React from "react";
import { FiAward } from "react-icons/fi";

const ProfileStrength = ({ calculatedStrength, strengthSuggestions }) => {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-xl p-6 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
      <div className="flex-1 space-y-2 w-full">
        <div className="flex justify-between items-center text-sm">
          <span className="font-semibold flex items-center gap-2 text-indigo-400">
            <FiAward /> Profile Optimization Metric
          </span>
          <span className="font-bold text-cyan-400">{calculatedStrength}% Complete</span>
        </div>
        <div className="w-full h-3 rounded-full bg-white/10 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400 transition-all duration-500"
            style={{ width: `${calculatedStrength}%` }}
          />
        </div>
      </div>
      {strengthSuggestions.length > 0 && (
        <div className="text-xs text-gray-400 bg-white/[0.03] border border-white/5 rounded-xl p-3 w-full md:w-auto max-w-md">
          <span className="text-amber-400 font-semibold block mb-1">Recommended Actions:</span>
          <ul className="list-disc list-inside space-y-0.5 text-gray-300">
            {strengthSuggestions.slice(0, 2).map((s, idx) => (
              <li key={idx}>{s}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProfileStrength;
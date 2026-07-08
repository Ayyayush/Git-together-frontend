import React from "react";
import { FiCheck, FiGithub, FiLinkedin, FiGlobe, FiFileText } from "react-icons/fi";

const SocialLinks = ({ profile }) => {
  return (
    <div className="mt-5 w-full grid grid-cols-2 gap-2 text-left">
      <div className="text-[11px] p-2 rounded-lg bg-white/[0.02] border border-white/5 flex items-center justify-between">
        <span className="text-gray-400 flex items-center gap-1"><FiGithub /> GitHub</span>
        {profile?.github ? (
          <a href={profile.github} target="_blank" rel="noreferrer" className="text-emerald-400">
            <FiCheck />
          </a>
        ) : (
          <span className="text-gray-600 text-[10px]">Not linked</span>
        )}
      </div>
      <div className="text-[11px] p-2 rounded-lg bg-white/[0.02] border border-white/5 flex items-center justify-between">
        <span className="text-gray-400 flex items-center gap-1"><FiLinkedin /> LinkedIn</span>
        {profile?.linkedin ? (
          <a href={profile.linkedin} target="_blank" rel="noreferrer" className="text-emerald-400">
            <FiCheck />
          </a>
        ) : (
          <span className="text-gray-600 text-[10px]">Not linked</span>
        )}
      </div>
      <div className="text-[11px] p-2 rounded-lg bg-white/[0.02] border border-white/5 flex items-center justify-between">
        <span className="text-gray-400 flex items-center gap-1"><FiGlobe /> Portfolio</span>
        {profile?.portfolio ? (
          <a href={profile.portfolio} target="_blank" rel="noreferrer" className="text-emerald-400">
            <FiCheck />
          </a>
        ) : (
          <span className="text-gray-600 text-[10px]">Not linked</span>
        )}
      </div>
      <div className="text-[11px] p-2 rounded-lg bg-white/[0.02] border border-white/5 flex items-center justify-between">
        <span className="text-gray-400 flex items-center gap-1"><FiFileText /> Resume</span>
        {profile?.resume ? (
          <a href={profile.resume} target="_blank" rel="noreferrer" className="text-emerald-400">
            <FiCheck />
          </a>
        ) : (
          <span className="text-gray-600 text-[10px]">Not linked</span>
        )}
      </div>
    </div>
  );
};

export default SocialLinks;
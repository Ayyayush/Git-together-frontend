import React from "react";
import { FiGithub, FiExternalLink } from "react-icons/fi";

const DeveloperProjects = ({ projects }) => {
  if (!projects || projects.length === 0) return null;

  return (
    <div className="mt-5 w-full text-left">
      <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 mb-2">
        🚀 Projects
      </h4>
      <div className="space-y-2">
        {projects.map((proj, idx) => (
          <div
            key={idx}
            className="p-3 bg-white/[0.02] border border-white/5 rounded-xl text-xs"
          >
            <div className="flex items-center justify-between">
              <p className="font-bold text-gray-200">{proj.title}</p>
              <div className="flex gap-2">
                {proj.github && (
                  <a href={proj.github} target="_blank" rel="noreferrer" className="text-indigo-400">
                    <FiGithub size={13} />
                  </a>
                )}
                {proj.live && (
                  <a href={proj.live} target="_blank" rel="noreferrer" className="text-cyan-400">
                    <FiExternalLink size={13} />
                  </a>
                )}
              </div>
            </div>
            {proj.techStack && (
              <p className="text-gray-500 font-mono text-[10px] mt-0.5">{proj.techStack}</p>
            )}
            {proj.description && (
              <p className="text-gray-400 mt-1">{proj.description}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DeveloperProjects;
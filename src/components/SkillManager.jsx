import React from "react";
import { FiPlus, FiX } from "react-icons/fi";

const SkillManager = ({ newSkill, setNewSkill, handleAddSkill, skills, handleRemoveSkill }) => {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl shadow-2xl p-6 md:p-8">
      <h3 className="text-sm font-bold uppercase tracking-wider text-indigo-400 mb-4">
        🛠️ Core Technical Infrastructure Stack
      </h3>
      <form onSubmit={handleAddSkill} className="flex gap-2 mb-4">
        <input
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          className="flex-1 rounded-xl bg-white/[0.04] border border-white/10 px-4 py-2 text-sm text-gray-100 outline-none focus:border-indigo-500"
          placeholder="e.g. React, Node.js, Docker, Kubernetes"
        />
        <button
          type="submit"
          className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-bold text-white hover:bg-indigo-500 transition-all flex items-center gap-1"
        >
          <FiPlus /> Add
        </button>
      </form>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <span
            key={skill}
            className="flex items-center gap-1.5 text-xs px-3 py-1.5 bg-gradient-to-r from-indigo-950 to-slate-900 border border-indigo-500/30 text-indigo-200 rounded-full font-mono"
          >
            {skill}
            <button
              type="button"
              onClick={() => handleRemoveSkill(skill)}
              className="text-indigo-400 hover:text-red-400 transition-all"
            >
              <FiX size={12} />
            </button>
          </span>
        ))}
      </div>
    </div>
  );
};

export default SkillManager;
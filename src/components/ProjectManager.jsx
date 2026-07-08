import React from "react";
import { FiPlus, FiEdit2, FiTrash2, FiGithub, FiExternalLink } from "react-icons/fi";

const ProjectManager = ({
  projectForm,
  setProjectForm,
  editingProjectIndex,
  handleProjectAction,
  projects,
  handleEditProjectClick,
  handleDeleteProject,
}) => {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl shadow-2xl p-6 md:p-8 space-y-6">
      <div>
        <h3 className="text-sm font-bold uppercase tracking-wider text-cyan-400 mb-4">
          🚀 Production Deployments & Open Source Projects
        </h3>
        <form onSubmit={handleProjectAction} className="space-y-4 bg-white/[0.01] border border-white/5 rounded-xl p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-gray-400 block mb-1">Project Title *</label>
              <input
                value={projectForm.title}
                onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                className="w-full rounded-xl bg-white/[0.04] border border-white/10 px-3 py-2 text-xs text-gray-100 outline-none"
                placeholder="My Application"
              />
            </div>
            <div>
              <label className="text-xs text-gray-400 block mb-1">Tech Stack (comma separated)</label>
              <input
                value={projectForm.techStack}
                onChange={(e) => setProjectForm({ ...projectForm, techStack: e.target.value })}
                className="w-full rounded-xl bg-white/[0.04] border border-white/10 px-3 py-2 text-xs text-gray-100 outline-none"
                placeholder="MongoDB, Express, React, Node"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-gray-400 block mb-1">GitHub Link</label>
              <input
                value={projectForm.github}
                onChange={(e) => setProjectForm({ ...projectForm, github: e.target.value })}
                className="w-full rounded-xl bg-white/[0.04] border border-white/10 px-3 py-2 text-xs text-gray-100 outline-none"
                placeholder="https://github.com/..."
              />
            </div>
            <div>
              <label className="text-xs text-gray-400 block mb-1">Live Demo Link</label>
              <input
                value={projectForm.live}
                onChange={(e) => setProjectForm({ ...projectForm, live: e.target.value })}
                className="w-full rounded-xl bg-white/[0.04] border border-white/10 px-3 py-2 text-xs text-gray-100 outline-none"
                placeholder="https://..."
              />
            </div>
          </div>
          <div>
            <label className="text-xs text-gray-400 block mb-1">Project Blueprint Description</label>
            <textarea
              value={projectForm.description}
              onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
              rows={2}
              className="w-full rounded-xl bg-white/[0.04] border border-white/10 px-3 py-2 text-xs text-gray-100 outline-none resize-none"
              placeholder="Explain core system logic architectures implemented..."
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 font-bold text-xs text-white transition-all flex items-center justify-center gap-1"
          >
            {editingProjectIndex !== null ? <><FiEdit2 size={12} /> Sync Changes</> : <><FiPlus size={12} /> Add Infrastructure Block</>}
          </button>
        </form>
      </div>

      {projects.length > 0 && (
        <div className="space-y-3">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Staged Micro-Architectures</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {projects.map((proj, idx) => (
              <div key={idx} className="p-3 bg-white/[0.02] border border-white/5 rounded-xl flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start">
                    <h4 className="font-bold text-sm text-gray-200">{proj.title}</h4>
                    <div className="flex gap-1.5">
                      <button type="button" onClick={() => handleEditProjectClick(idx)} className="p-1 text-gray-400 hover:text-cyan-400"><FiEdit2 size={12} /></button>
                      <button type="button" onClick={() => handleDeleteProject(idx)} className="p-1 text-gray-400 hover:text-red-400"><FiTrash2 size={12} /></button>
                    </div>
                  </div>
                  <p className="text-[10px] text-indigo-400 font-mono mt-0.5">{proj.techStack}</p>
                  <p className="text-xs text-gray-400 mt-1 line-clamp-2">{proj.description}</p>
                </div>
                <div className="flex gap-3 mt-3 text-gray-500 border-t border-white/5 pt-2">
                  {proj.github && <a href={proj.github} target="_blank" rel="noreferrer" className="hover:text-white"><FiGithub size={13} /></a>}
                  {proj.live && <a href={proj.live} target="_blank" rel="noreferrer" className="hover:text-white"><FiExternalLink size={13} /></a>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectManager;
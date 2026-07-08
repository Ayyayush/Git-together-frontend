import React from "react";
import { FiUser, FiMapPin, FiCalendar, FiUsers, FiImage, FiAlignLeft, FiBookOpen, FiBriefcase } from "react-icons/fi";

const ProfileForm = ({ formData, handleChange, handleSubmit, loading }) => {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl shadow-2xl p-6 md:p-8">
      <h2 className="text-xl font-bold text-gray-100 mb-6 flex items-center gap-2 border-b border-white/10 pb-3">
        <span>🔧 core architecture fields</span>
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="flex items-center gap-1.5 text-xs font-medium text-gray-400 mb-1.5">
              <FiUser size={13} /> First Name
            </label>
            <input
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full rounded-xl bg-white/[0.04] border border-white/10 px-4 py-2.5 text-sm text-gray-100 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              placeholder="First name"
            />
          </div>
          <div>
            <label className="flex items-center gap-1.5 text-xs font-medium text-gray-400 mb-1.5">
              <FiUser size={13} /> Last Name
            </label>
            <input
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full rounded-xl bg-white/[0.04] border border-white/10 px-4 py-2.5 text-sm text-gray-100 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              placeholder="Last name"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="flex items-center gap-1.5 text-xs font-medium text-gray-400 mb-1.5">
              💼 Professional Title
            </label>
            <input
              name="developerTitle"
              value={formData.developerTitle}
              onChange={handleChange}
              className="w-full rounded-xl bg-white/[0.04] border border-white/10 px-4 py-2.5 text-sm text-gray-100 outline-none focus:border-indigo-500"
              placeholder="e.g. Senior Fullstack Engineer"
            />
          </div>
          <div>
            <label className="flex items-center gap-1.5 text-xs font-medium text-gray-400 mb-1.5">
              <FiMapPin size={13} /> Location
            </label>
            <input
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full rounded-xl bg-white/[0.04] border border-white/10 px-4 py-2.5 text-sm text-gray-100 outline-none focus:border-indigo-500"
              placeholder="e.g. San Francisco, CA"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="flex items-center gap-1.5 text-xs font-medium text-gray-400 mb-1.5">
              <FiCalendar size={13} /> Age
            </label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="w-full rounded-xl bg-white/[0.04] border border-white/10 px-4 py-2.5 text-sm text-gray-100 outline-none focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="flex items-center gap-1.5 text-xs font-medium text-gray-400 mb-1.5">
              <FiUsers size={13} /> Gender
            </label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full rounded-xl bg-white/[0.04] border border-white/10 px-4 py-2.5 text-sm text-gray-100 outline-none focus:border-indigo-500 [&>option]:bg-[#0B0E14]"
            >
              <option value="">Select gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Others">Others</option>
            </select>
          </div>
          <div>
            <label className="flex items-center gap-1.5 text-xs font-medium text-gray-400 mb-1.5">
              ⚡ Status Availability
            </label>
            <select
              name="availability"
              value={formData.availability}
              onChange={handleChange}
              className="w-full rounded-xl bg-white/[0.04] border border-white/10 px-4 py-2.5 text-sm text-gray-100 outline-none focus:border-indigo-500 [&>option]:bg-[#0B0E14]"
            >
              <option value="Open to Jobs">Open to Jobs</option>
              <option value="Open to Freelance">Open to Freelance</option>
              <option value="Hiring Developers">Hiring Developers</option>
              <option value="Closed / Cryptic">Closed / Cryptic</option>
            </select>
          </div>
        </div>

        <div>
          <label className="flex items-center gap-1.5 text-xs font-medium text-gray-400 mb-1.5">
            <FiImage size={13} /> Avatar Storage URL
          </label>
          <input
            name="photoUrl"
            value={formData.photoUrl}
            onChange={handleChange}
            className="w-full rounded-xl bg-white/[0.04] border border-white/10 px-4 py-2.5 text-sm text-gray-100 outline-none focus:border-indigo-500"
            placeholder="https://..."
          />
        </div>

        <div>
          <label className="flex items-center gap-1.5 text-xs font-medium text-gray-400 mb-1.5">
            <FiAlignLeft size={13} /> System About Log / Engineer Manifesto
          </label>
          <textarea
            name="about"
            value={formData.about}
            onChange={handleChange}
            rows={4}
            className="w-full rounded-xl bg-white/[0.04] border border-white/10 px-4 py-2.5 text-sm text-gray-100 outline-none focus:border-indigo-500 resize-none"
            placeholder="Describe your primary processing capabilities..."
          />
        </div>

        <div className="border-t border-white/10 pt-6 space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-1.5">
            <FiBookOpen size={13} /> Education Registry Profile
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <label className="text-xs text-gray-400 block mb-1">University / Institute</label>
              <input
                name="college"
                value={formData.college}
                onChange={handleChange}
                className="w-full rounded-xl bg-white/[0.04] border border-white/10 px-4 py-2 text-xs text-gray-100 outline-none"
                placeholder="e.g. Stanford University"
              />
            </div>
            <div>
              <label className="text-xs text-gray-400 block mb-1">Graduation Year</label>
              <input
                name="graduationYear"
                value={formData.graduationYear}
                onChange={handleChange}
                className="w-full rounded-xl bg-white/[0.04] border border-white/10 px-4 py-2 text-xs text-gray-100 outline-none"
                placeholder="2025"
              />
            </div>
          </div>
          <div>
            <label className="text-xs text-gray-400 block mb-1">Degree Blueprint Specification</label>
            <input
              name="degree"
              value={formData.degree}
              onChange={handleChange}
              className="w-full rounded-xl bg-white/[0.04] border border-white/10 px-4 py-2 text-xs text-gray-100 outline-none"
              placeholder="e.g. B.S. Computer Science"
            />
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-1.5">
            <FiBriefcase size={13} /> Professional Node Metrics
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-gray-400 block mb-1">Current Enterprise / Company</label>
              <input
                name="company"
                value={formData.company}
                onChange={handleChange}
                className="w-full rounded-xl bg-white/[0.04] border border-white/10 px-4 py-2 text-xs text-gray-100 outline-none"
                placeholder="e.g. Stripe"
              />
            </div>
            <div>
              <label className="text-xs text-gray-400 block mb-1">Experience Level Rank</label>
              <select
                name="experienceLevel"
                value={formData.experienceLevel}
                onChange={handleChange}
                className="w-full rounded-xl bg-white/[0.04] border border-white/10 px-4 py-2 text-xs text-gray-100 outline-none [&>option]:bg-[#0B0E14]"
              >
                <option value="">Select Tier Rank</option>
                <option value="Intern">Intern / Protocol Candidate</option>
                <option value="Junior">Junior Executable</option>
                <option value="Mid">Mid-Level Core</option>
                <option value="Senior">Senior Infrastructure</option>
                <option value="Lead/Principal">Lead / Principal Component</option>
              </select>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-400">🌐 Social Hyperlink Endpoints</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-gray-400 block mb-1">GitHub Endpoint</label>
              <input name="github" value={formData.github} onChange={handleChange} className="w-full rounded-xl bg-white/[0.04] border border-white/10 px-4 py-2 text-xs text-gray-100 outline-none" placeholder="https://github.com/..." />
            </div>
            <div>
              <label className="text-xs text-gray-400 block mb-1">LinkedIn Sync Pipeline</label>
              <input name="linkedin" value={formData.linkedin} onChange={handleChange} className="w-full rounded-xl bg-white/[0.04] border border-white/10 px-4 py-2 text-xs text-gray-100 outline-none" placeholder="https://linkedin.com/in/..." />
            </div>
            <div>
              <label className="text-xs text-gray-400 block mb-1">Portfolio Production Deployment</label>
              <input name="portfolio" value={formData.portfolio} onChange={handleChange} className="w-full rounded-xl bg-white/[0.04] border border-white/10 px-4 py-2 text-xs text-gray-100 outline-none" placeholder="https://..." />
            </div>
            <div>
              <label className="text-xs text-gray-400 block mb-1">Downloadable Resume Storage Link</label>
              <input name="resume" value={formData.resume} onChange={handleChange} className="w-full rounded-xl bg-white/[0.04] border border-white/10 px-4 py-2 text-xs text-gray-100 outline-none" placeholder="https://drive.google.com/..." />
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 py-3 text-sm font-bold text-white shadow-xl hover:brightness-110 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
        >
          {loading && <span className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />}
          Commit Updates to Database
        </button>
      </form>
    </div>
  );
};

export default ProfileForm;
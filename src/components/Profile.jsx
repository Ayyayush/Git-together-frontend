import axios from "axios";
import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import PremiumModal from "./PremiumModal";
import {
  FiUser,
  FiImage,
  FiCalendar,
  FiUsers,
  FiAlignLeft,
  FiCheck,
  FiX,
  FiAlertCircle,
  FiMapPin,
  FiBookOpen,
  FiBriefcase,
  FiGlobe,
  FiFileText,
  FiGithub,
  FiLinkedin,
  FiPlus,
  FiTrash2,
  FiEdit2,
  FiExternalLink,
  FiAward,
} from "react-icons/fi";
import { addUser } from "../utils/userSlice";
import { BASE_URL } from "../utils/constants";

const EMPTY_FORM = (user = {}) => ({
  firstName: user.firstName || "",
  lastName: user.lastName || "",
  photoUrl: user.photoUrl || "",
  age: user.age ?? "",
  gender: user.gender || "",
  about: user.about || "",
  developerTitle: user.developerTitle || "",
  college: user.college || "",
  degree: user.degree || "",
  graduationYear: user.graduationYear || "",
  company: user.company || "",
  experienceLevel: user.experienceLevel || "",
  location: user.location || "",
  portfolio: user.portfolio || "",
  resume: user.resume || "",
  github: user.github || "",
  linkedin: user.linkedin || "",
  leetcode: user.leetcode || "",
  codeforces: user.codeforces || "",
  codechef: user.codechef || "",
  hackerrank: user.hackerrank || "",
  twitter: user.twitter || "",
  website: user.website || "",
  availability: user.availability || "Open to Jobs",
  skills: user.skills || [],
  projects: user.projects || [],
});

const Profile = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [formData, setFormData] = useState(() => EMPTY_FORM(user));
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Skill Management Temp State
  const [newSkill, setNewSkill] = useState("");

  // Project Management Temp State
  const [editingProjectIndex, setEditingProjectIndex] = useState(null);
  const [projectForm, setProjectForm] = useState({
    title: "",
    description: "",
    github: "",
    live: "",
    techStack: "",
    image: "",
  });

  useEffect(() => {
    if (user) setFormData(EMPTY_FORM(user));
  }, [user]);

  const handleChange = (e) => {
    if (error) setError("");
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const isDirty = useMemo(() => {
    if (!user) return false;
    return Object.keys(formData).some((k) => {
      if (Array.isArray(formData[k])) {
        return JSON.stringify(formData[k]) !== JSON.stringify(user[k] || []);
      }
      return String(formData[k]) !== String(user[k] ?? "");
    });
  }, [formData, user]);

  // Profile Strength Calculator Front-end sync matching backend rules
  const calculatedStrength = useMemo(() => {
    let score = 0;
    if (formData.photoUrl && formData.photoUrl !== "https://tse2.mm.bing.net/th/id/OIP.WLB7NRb9ayKYi7EQ1dAhgAAAAA?pid=Api&P=0&h=180") score += 10;
    if (formData.about && formData.about !== "This is a default bio") score += 10;
    if (formData.skills && formData.skills.length > 0) score += 15;
    if (formData.projects && formData.projects.length > 0) score += 20;
    if (formData.resume) score += 15;
    if (formData.college || formData.degree) score += 10;
    if (formData.company || formData.experienceLevel) score += 10;
    if (formData.availability) score += 5;
    if (formData.github || formData.linkedin || formData.portfolio) score += 5;
    return Math.min(score, 100);
  }, [formData]);

  const strengthSuggestions = useMemo(() => {
    const suggestions = [];
    if (!formData.photoUrl) suggestions.push("Upload profile image URL");
    if (!formData.about) suggestions.push("Add an outstanding developer bio");
    if (!formData.github) suggestions.push("Add your GitHub profile URL");
    if (formData.skills.length === 0) suggestions.push("Add technical skill chips");
    if (formData.projects.length === 0) suggestions.push("Add a live developer project");
    if (!formData.resume) suggestions.push("Provide your downloadable resume link");
    if (!formData.college) suggestions.push("Complete your Education background");
    return suggestions;
  }, [formData]);

  const handleAddSkill = (e) => {
    e.preventDefault();
    if (!newSkill.trim()) return;
    if (formData.skills.includes(newSkill.trim())) {
      toast.error("Skill already exists");
      return;
    }
    setFormData((prev) => ({
      ...prev,
      skills: [...prev.skills, newSkill.trim()],
    }));
    setNewSkill("");
  };

  const handleRemoveSkill = (skillToRemove) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s !== skillToRemove),
    }));
  };

  const handleProjectAction = (e) => {
    e.preventDefault();
    if (!projectForm.title.trim()) {
      toast.error("Project title is required");
      return;
    }
    const updatedProjects = [...formData.projects];
    if (editingProjectIndex !== null) {
      updatedProjects[editingProjectIndex] = projectForm;
      setEditingProjectIndex(null);
      toast.success("Project updated in list");
    } else {
      updatedProjects.push(projectForm);
      toast.success("Project added to list");
    }
    setFormData((prev) => ({ ...prev, projects: updatedProjects }));
    setProjectForm({ title: "", description: "", github: "", live: "", techStack: "", image: "" });
  };

  const handleEditProjectClick = (index) => {
    setEditingProjectIndex(index);
    setProjectForm(formData.projects[index]);
  };

  const handleDeleteProject = (index) => {
    setFormData((prev) => ({
      ...prev,
      projects: prev.projects.filter((_, i) => i !== index),
    }));
    toast.success("Project removed from list");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      setLoading(true);
      const payload = {
        ...formData,
        age: formData.age !== "" ? Number(formData.age) : undefined,
        profileStrength: calculatedStrength,
      };
      const res = await axios.patch(`${BASE_URL}/profile/edit`, payload, {
        withCredentials: true,
      });
      dispatch(addUser(res.data.data || res.data.user));
      toast.success("Profile updated successfully ✨");
    } catch (err) {
      const msg = err.response?.data?.message || "Profile update failed";
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const previewName = `${formData.firstName} ${formData.lastName}`.trim() || "Your name";

  return (
    <div className="flex-1 overflow-y-auto bg-[#0B0E14] text-gray-100 p-4 md:p-10">
      <PremiumModal isOpen={showPremiumModal} onClose={() => setShowPremiumModal(false)} onBuy={() => {}} />

      <div aria-hidden="true" className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-32 left-1/4 w-[28rem] h-[28rem] bg-indigo-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-[24rem] h-[24rem] bg-cyan-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400 tracking-tight">
            Developer Workspace Upgrade
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            Construct a comprehensive engineering portfolio visible across GitTogether network.
          </p>
        </div>

        {/* Profile Strength Showcase Indicator Widget */}
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

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* PROFILE COMPILER WORKSPACE CARD */}
          <div className="lg:col-span-7 space-y-6">
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
                      ⚡ Availability Target
                    </label>
                    <select
                      name="availability"
                      value={formData.availability}
                      onChange={handleChange}
                      className="w-full rounded-xl bg-white/[0.04] border border-white/10 px-4 py-2.5 text-sm text-gray-100 outline-none focus:border-indigo-500 [&>option]:bg-[#0B0E14]"
                    >
                      <option value="Open to Jobs">Open to Jobs</option>
                      <option value="Open to Internship">Open to Internship</option>
                      <option value="Open to Freelance">Open to Freelance</option>
                      <option value="Hackathons">Hackathons</option>
                      <option value="Mentorship">Mentorship</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="flex items-center gap-1.5 text-xs font-medium text-gray-400 mb-1.5">
                    <FiImage size={13} /> Avatar Image URL
                  </label>
                  <input
                    name="photoUrl"
                    value={formData.photoUrl}
                    onChange={handleChange}
                    className="w-full rounded-xl bg-white/[0.04] border border-white/10 px-4 py-2.5 text-sm text-gray-100 outline-none focus:border-indigo-500"
                    placeholder="Image URL link"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="flex items-center gap-1.5 text-xs font-medium text-gray-400 mb-1.5">
                      <FiBookOpen size={13} /> College / University
                    </label>
                    <input
                      name="college"
                      value={formData.college}
                      onChange={handleChange}
                      className="w-full rounded-xl bg-white/[0.04] border border-white/10 px-4 py-2.5 text-sm text-gray-100 outline-none focus:border-indigo-500"
                      placeholder="University Name"
                    />
                  </div>
                  <div>
                    <label className="flex items-center gap-1.5 text-xs font-medium text-gray-400 mb-1.5">
                      🎓 Degree Name
                    </label>
                    <input
                      name="degree"
                      value={formData.degree}
                      onChange={handleChange}
                      className="w-full rounded-xl bg-white/[0.04] border border-white/10 px-4 py-2.5 text-sm text-gray-100 outline-none focus:border-indigo-500"
                      placeholder="B.Tech Computer Science"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="flex items-center gap-1.5 text-xs font-medium text-gray-400 mb-1.5">
                      Graduation Year
                    </label>
                    <input
                      name="graduationYear"
                      value={formData.graduationYear}
                      onChange={handleChange}
                      className="w-full rounded-xl bg-white/[0.04] border border-white/10 px-4 py-2.5 text-sm text-gray-100 outline-none focus:border-indigo-500"
                      placeholder="2026"
                    />
                  </div>
                  <div>
                    <label className="flex items-center gap-1.5 text-xs font-medium text-gray-400 mb-1.5">
                      <FiBriefcase size={13} /> Company Host
                    </label>
                    <input
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full rounded-xl bg-white/[0.04] border border-white/10 px-4 py-2.5 text-sm text-gray-100 outline-none focus:border-indigo-500"
                      placeholder="e.g. Vercel"
                    />
                  </div>
                  <div>
                    <label className="flex items-center gap-1.5 text-xs font-medium text-gray-400 mb-1.5">
                      Experience Rank
                    </label>
                    <input
                      name="experienceLevel"
                      value={formData.experienceLevel}
                      onChange={handleChange}
                      className="w-full rounded-xl bg-white/[0.04] border border-white/10 px-4 py-2.5 text-sm text-gray-100 outline-none focus:border-indigo-500"
                      placeholder="e.g. Mid-Level"
                    />
                  </div>
                </div>

                <div>
                  <label className="flex items-center gap-1.5 text-xs font-medium text-gray-400 mb-1.5">
                    <FiAlignLeft size={13} /> Developer Biography Overview
                  </label>
                  <textarea
                    name="about"
                    value={formData.about}
                    onChange={handleChange}
                    className="w-full rounded-xl bg-white/[0.04] border border-white/10 px-4 py-2.5 text-sm text-gray-100 outline-none resize-none focus:border-indigo-500"
                    rows={3}
                    placeholder="Describe your technical background roadmap..."
                  />
                </div>

                <div className="border-t border-white/5 pt-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-400 mb-3">
                    🌐 Connection Links & Code Profiles
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <input
                      name="github"
                      value={formData.github}
                      onChange={handleChange}
                      placeholder="GitHub Profile Link"
                      className="bg-white/[0.02] border border-white/10 rounded-lg p-2 text-xs outline-none focus:border-indigo-500"
                    />
                    <input
                      name="linkedin"
                      value={formData.linkedin}
                      onChange={handleChange}
                      placeholder="LinkedIn Profile Link"
                      className="bg-white/[0.02] border border-white/10 rounded-lg p-2 text-xs outline-none focus:border-indigo-500"
                    />
                    <input
                      name="portfolio"
                      value={formData.portfolio}
                      onChange={handleChange}
                      placeholder="Portfolio URL"
                      className="bg-white/[0.02] border border-white/10 rounded-lg p-2 text-xs outline-none focus:border-indigo-500"
                    />
                    <input
                      name="resume"
                      value={formData.resume}
                      onChange={handleChange}
                      placeholder="Resume Hosting URL"
                      className="bg-white/[0.02] border border-white/10 rounded-lg p-2 text-xs outline-none focus:border-indigo-500"
                    />
                    <input
                      name="leetcode"
                      value={formData.leetcode}
                      onChange={handleChange}
                      placeholder="LeetCode Link"
                      className="bg-white/[0.02] border border-white/10 rounded-lg p-2 text-xs outline-none focus:border-indigo-500"
                    />
                    <input
                      name="codeforces"
                      value={formData.codeforces}
                      onChange={handleChange}
                      placeholder="Codeforces Link"
                      className="bg-white/[0.02] border border-white/10 rounded-lg p-2 text-xs outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>

                {error && (
                  <div className="flex items-center gap-2 rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-2 text-sm text-red-400">
                    <FiAlertCircle size={14} /> {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading || !isDirty}
                  className="w-full rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 py-3 text-sm font-semibold text-white shadow-xl hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading && <span className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />}
                  {loading ? "Synchronizing Changes..." : "Commit Update to Server"}
                </button>
              </form>
            </div>

            {/* SKILLS CHIP HANDLER CARD */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-6 shadow-2xl">
              <h3 className="text-base font-bold mb-3 text-indigo-300">🛠️ Skill Chip Manager</h3>
              <form onSubmit={handleAddSkill} className="flex gap-2 mb-4">
                <input
                  type="text"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  placeholder="e.g. React, Docker, Rust"
                  className="flex-1 rounded-xl bg-white/[0.04] border border-white/10 px-4 py-2 text-sm outline-none focus:border-indigo-500"
                />
                <button
                  type="submit"
                  className="px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold flex items-center gap-1"
                >
                  <FiPlus /> Add
                </button>
              </form>
              <div className="flex flex-wrap gap-2">
                {formData.skills.map((skill) => (
                  <span
                    key={skill}
                    className="flex items-center gap-1 text-xs px-3 py-1.5 bg-gradient-to-r from-indigo-950 to-slate-900 border border-indigo-500/30 text-indigo-200 rounded-full font-mono"
                  >
                    {skill}
                    <button
                      type="button"
                      onClick={() => handleRemoveSkill(skill)}
                      className="text-red-400 hover:text-red-300 ml-1 font-bold"
                    >
                      &times;
                    </button>
                  </span>
                ))}
                {formData.skills.length === 0 && (
                  <span className="text-xs text-gray-500 italic">No skills registered yet. Add some above.</span>
                )}
              </div>
            </div>

            {/* PROJECTS ARRAY COMPILER */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-6 shadow-2xl space-y-4">
              <h3 className="text-base font-bold text-cyan-400">🚀 Project Portfolio Records</h3>

              <form onSubmit={handleProjectAction} className="bg-white/[0.01] border border-white/5 rounded-xl p-4 space-y-3">
                <span className="text-xs font-semibold text-gray-400 block">
                  {editingProjectIndex !== null ? "📝 Edit Selected Project" : "➕ Append New Project Workspace"}
                </span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <input
                    placeholder="Project Title *"
                    value={projectForm.title}
                    onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                    className="bg-white/[0.03] border border-white/10 rounded-lg p-2 text-xs outline-none"
                  />
                  <input
                    placeholder="Tech Stack (e.g. Next.js, Redis)"
                    value={projectForm.techStack}
                    onChange={(e) => setProjectForm({ ...projectForm, techStack: e.target.value })}
                    className="bg-white/[0.03] border border-white/10 rounded-lg p-2 text-xs outline-none"
                  />
                  <input
                    placeholder="GitHub Code Link URL"
                    value={projectForm.github}
                    onChange={(e) => setProjectForm({ ...projectForm, github: e.target.value })}
                    className="bg-white/[0.03] border border-white/10 rounded-lg p-2 text-xs outline-none"
                  />
                  <input
                    placeholder="Live Deployment Link URL"
                    value={projectForm.live}
                    onChange={(e) => setProjectForm({ ...projectForm, live: e.target.value })}
                    className="bg-white/[0.03] border border-white/10 rounded-lg p-2 text-xs outline-none"
                  />
                </div>
                <textarea
                  placeholder="Comprehensive description of architectural build implementation..."
                  value={projectForm.description}
                  onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                  className="w-full bg-white/[0.03] border border-white/10 rounded-lg p-2 text-xs outline-none resize-none"
                  rows={2}
                />
                <button
                  type="submit"
                  className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-semibold py-1.5 rounded-lg text-xs"
                >
                  {editingProjectIndex !== null ? "Save Project Modifications" : "Push Project Entry"}
                </button>
              </form>

              <div className="space-y-2">
                {formData.projects.map((proj, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-white/[0.02] border border-white/5 rounded-xl text-xs">
                    <div>
                      <p className="font-bold text-gray-200">{proj.title}</p>
                      <p className="text-gray-500 font-mono text-[10px]">{proj.techStack || "No stack specified"}</p>
                    </div>
                    <div className="flex gap-2">
                      <button type="button" onClick={() => handleEditProjectClick(idx)} className="text-indigo-400 p-1">
                        <FiEdit2 size={13} />
                      </button>
                      <button type="button" onClick={() => handleDeleteProject(idx)} className="text-red-400 p-1">
                        <FiTrash2 size={13} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* PREMIUM LIVE PREVIEW BANNER VIEWPORT SIDEBAR */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-6">
            <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-slate-900 via-[#0E131F] to-[#0B0E14] overflow-hidden shadow-2xl shadow-black/80">
              {/* Premium Interactive Developer Banner */}
              <div className="h-28 w-full bg-gradient-to-r from-indigo-900 via-purple-900 to-cyan-800 relative p-4 flex items-end justify-end">
                <span className="text-[10px] bg-black/40 text-cyan-300 font-mono px-2 py-0.5 rounded-full backdrop-blur-md">
                  {formData.availability}
                </span>
              </div>

              <div className="px-6 pb-6 pt-0 text-center relative flex flex-col items-center">
                <div className="relative w-28 h-28 -mt-14 mb-4">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-indigo-500 to-cyan-400 blur opacity-60 animate-pulse" />
                  <img
                    src={formData.photoUrl || "https://cdn-icons-png.flaticon.com/512/847/847969.png"}
                    alt="Preview"
                    className="relative w-full h-full rounded-full object-cover border-4 border-[#0B0E14]"
                  />
                </div>

                <h3 className="text-xl font-bold tracking-wide text-white">{previewName}</h3>
                <p className="text-xs text-indigo-400 font-medium mt-0.5">{formData.developerTitle || "Independent Engineering Consultant"}</p>

                <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 mt-2 text-xs text-gray-400 font-mono">
                  {formData.location && <span className="flex items-center gap-1"><FiMapPin size={11}/>{formData.location}</span>}
                  {formData.age && <span>• {formData.age} Years Old</span>}
                </div>

                {formData.college && (
                  <div className="mt-3 text-xs bg-white/[0.02] border border-white/5 rounded-xl px-3 py-1.5 text-gray-300">
                    🎓 <span className="font-semibold">{formData.degree || "Candidate"}</span> at {formData.college}
                  </div>
                )}

                <p className="text-xs mt-4 text-gray-400 leading-relaxed italic max-w-sm">
                  "{formData.about || "This developer hasn't composed an introductory blueprint statement yet."}"
                </p>

                {/* Grid link badges setup */}
                <div className="mt-5 w-full grid grid-cols-2 gap-2 text-left">
                  <div className="text-[11px] p-2 rounded-lg bg-white/[0.02] border border-white/5 flex items-center justify-between">
                    <span className="text-gray-400 flex items-center gap-1"><FiGithub/> GitHub</span>
                    {formData.github ? <FiCheck className="text-emerald-400"/> : <span className="text-amber-500 text-[10px]">Add GitHub</span>}
                  </div>
                  <div className="text-[11px] p-2 rounded-lg bg-white/[0.02] border border-white/5 flex items-center justify-between">
                    <span className="text-gray-400 flex items-center gap-1"><FiLinkedin/> LinkedIn</span>
                    {formData.linkedin ? <FiCheck className="text-emerald-400"/> : <span className="text-amber-500 text-[10px]">Add LinkedIn</span>}
                  </div>
                  <div className="text-[11px] p-2 rounded-lg bg-white/[0.02] border border-white/5 flex items-center justify-between">
                    <span className="text-gray-400 flex items-center gap-1"><FiGlobe/> Portfolio</span>
                    {formData.portfolio ? <FiCheck className="text-emerald-400"/> : <span className="text-amber-500 text-[10px]">Add Portfolio</span>}
                  </div>
                  <div className="text-[11px] p-2 rounded-lg bg-white/[0.02] border border-white/5 flex items-center justify-between">
                    <span className="text-gray-400 flex items-center gap-1"><FiFileText/> Resume</span>
                    {formData.resume ? <FiCheck className="text-emerald-400"/> : <span className="text-amber-500 text-[10px]">Add Resume</span>}
                  </div>
                </div>

                {/* PREMIUM MANAGED MODULE OVERLAY */}
                <div className="mt-6 w-full rounded-xl border border-yellow-500/20 bg-gradient-to-b from-yellow-500/[0.04] to-transparent p-4">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-yellow-400 flex items-center gap-1">👑 Premium Token Access</span>
                    <span className="text-gray-400 font-mono">{user.isPremium ? "Active" : "Standard Tier"}</span>
                  </div>
                  <p className="text-[11px] text-gray-500 mt-1 text-left">
                    Premium gives direct interaction routing networks & highlighted badges.
                  </p>
                  <button
                    onClick={() => setShowPremiumModal(true)}
                    className="mt-3 w-full rounded-lg bg-gradient-to-r from-yellow-500 to-amber-600 py-2 text-xs font-bold text-slate-950 transition-transform hover:scale-[1.01]"
                  >
                    {user.isPremium ? "Review Membership Pipeline" : "Upgrade Gateway Tier"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
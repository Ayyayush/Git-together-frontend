import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import PremiumModal from "./PremiumModal";
import { addUser } from "../utils/userSlice";
import { BASE_URL } from "../utils/constants";
import ProfileStrength from "./ProfileStrength";
import ProfileForm from "./ProfileForm";
import SkillManager from "./SkillManager";
import ProjectManager from "./ProjectManager";
import ProfilePreview from "./ProfilePreview";

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

const MyProfile = () => {
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

        <ProfileStrength
          calculatedStrength={calculatedStrength}
          strengthSuggestions={strengthSuggestions}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 space-y-6">
            <ProfileForm
              formData={formData}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              loading={loading}
            />

            <SkillManager
              newSkill={newSkill}
              setNewSkill={setNewSkill}
              handleAddSkill={handleAddSkill}
              skills={formData.skills}
              handleRemoveSkill={handleRemoveSkill}
            />

            <ProjectManager
              projectForm={projectForm}
              setProjectForm={setProjectForm}
              editingProjectIndex={editingProjectIndex}
              handleProjectAction={handleProjectAction}
              projects={formData.projects}
              handleEditProjectClick={handleEditProjectClick}
              handleDeleteProject={handleDeleteProject}
            />
          </div>

          <div className="lg:col-span-5 lg:sticky lg:top-6">
            <ProfilePreview
              formData={formData}
              previewName={previewName}
              setShowPremiumModal={setShowPremiumModal}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;

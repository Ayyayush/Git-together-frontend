import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { FiAlertCircle, FiMapPin, FiBriefcase, FiBookOpen, FiExternalLink } from "react-icons/fi";
import { FaCrown } from "react-icons/fa";
import toast from "react-hot-toast";
import { BASE_URL } from "../utils/constants";
import DeveloperHeader from "./DeveloperHeader";
import DeveloperProjects from "./DeveloperProjects";
import SocialLinks from "./SocialLinks";

const DeveloperProfile = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [dev, setDev] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionLoading, setActionLoading] = useState(false);
  const [alreadyRequested, setAlreadyRequested] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const fetchDeveloper = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await axios.get(`${BASE_URL}/user/profile/${userId}`, {
          withCredentials: true,
        });
        if (!cancelled) {
          setDev(res.data?.data || res.data?.user || res.data);
        }
      } catch (err) {
        if (!cancelled) {
          const msg =
            err.response?.data?.message ||
            "Unable to load this developer's profile.";
          setError(msg);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    if (userId) fetchDeveloper();

    return () => {
      cancelled = true;
    };
  }, [userId]);

  const handleConnect = async () => {
    if (!userId) return;
    try {
      setActionLoading(true);
      await axios.post(
        `${BASE_URL}/request/send/interested/${userId}`,
        {},
        { withCredentials: true }
      );
      toast.success("Connection request sent 🚀");
      setAlreadyRequested(true);
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to send request";
      toast.error(msg);
      if (msg.includes("Already Exists")) {
        // Already connected or already requested — stop offering "Connect"
        // so the user doesn't keep re-triggering the same 400.
        setAlreadyRequested(true);
      }
    } finally {
      setActionLoading(false);
    }
  };

  const handleMessage = () => {
    if (!userId) return;
    navigate(`/message/${userId}`);
  };

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center bg-[#0B0E14] min-h-screen">
        <div className="flex flex-col items-center gap-3">
          <span className="h-8 w-8 rounded-full border-2 border-white/20 border-t-indigo-400 animate-spin" />
          <p className="text-xs text-gray-400 font-mono">Loading developer profile...</p>
        </div>
      </div>
    );
  }

  if (error || !dev) {
    return (
      <div className="flex-1 flex items-center justify-center bg-[#0B0E14] min-h-screen p-6">
        <div className="rounded-2xl border border-red-500/20 bg-red-500/5 px-6 py-8 text-center max-w-md">
          <FiAlertCircle className="mx-auto text-red-400 mb-3" size={28} />
          <h2 className="text-lg font-bold text-gray-100">Profile Unavailable</h2>
          <p className="text-sm text-gray-400 mt-2">{error || "This developer could not be found."}</p>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="mt-5 px-4 py-2 text-xs font-mono font-bold text-indigo-400 border border-indigo-500/30 rounded-lg hover:bg-indigo-500/10 transition-all"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const fullName = `${dev.firstName || ""} ${dev.lastName || ""}`.trim() || dev.username || "Developer";

  return (
    <div className="flex-1 overflow-y-auto bg-[#0B0E14] text-gray-100 p-4 md:p-10">
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-32 left-1/4 w-[28rem] h-[28rem] bg-indigo-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-[24rem] h-[24rem] bg-cyan-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-3xl mx-auto space-y-6">
        <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-slate-900 via-[#0E131F] to-[#0B0E14] overflow-hidden shadow-2xl shadow-black/80 pb-6">
          <DeveloperHeader dev={dev} fullName={fullName} />

          <div className="px-6 flex flex-col items-center">
            {/* Professional Info Snippet */}
            <div className="w-full mt-4 space-y-2 text-sm text-gray-300 border-b border-white/5 pb-4">
              {dev.availability && (
                <div className="flex items-center gap-2">
                  <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-mono text-emerald-400 font-semibold uppercase tracking-wider bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    {dev.availability}
                  </span>
                </div>
              )}
              {dev.location && (
                <div className="flex items-center gap-2 text-gray-400 text-xs">
                  <FiMapPin size={14} className="text-gray-500" />
                  <span>{dev.location}</span>
                </div>
              )}
              {dev.company && (
                <div className="flex items-center gap-2 text-gray-400 text-xs">
                  <FiBriefcase size={14} className="text-gray-500" />
                  <span>{dev.developerTitle || "Developer"} at {dev.company} ({dev.experienceLevel || "Experienced"})</span>
                </div>
              )}
              {dev.college && (
                <div className="flex items-center gap-2 text-gray-400 text-xs">
                  <FiBookOpen size={14} className="text-gray-500" />
                  <span>{dev.degree || "Education"} from {dev.college} {dev.graduationYear ? `(Class of ${dev.graduationYear})` : ""}</span>
                </div>
              )}
              {dev.profileStrength !== undefined && (
                <div className="mt-2 w-full bg-white/5 rounded-full h-1.5 overflow-hidden border border-white/5">
                  <div 
                    className="bg-gradient-to-r from-indigo-500 to-cyan-400 h-full transition-all duration-500"
                    style={{ width: `${dev.profileStrength}%` }}
                  />
                </div>
              )}
            </div>

            {dev.skills && dev.skills.length > 0 && (
              <div className="mt-5 w-full">
                <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-400 mb-2 text-left">
                  🛠️ Skills
                </h4>
                <div className="flex flex-wrap gap-2">
                  {dev.skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-xs px-3 py-1.5 bg-gradient-to-r from-indigo-950 to-slate-900 border border-indigo-500/30 text-indigo-200 rounded-full font-mono"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Custom Project Map to satisfy specs inside safe parent mapping */}
            {dev.projects && dev.projects.length > 0 ? (
              <div className="mt-6 w-full text-left">
                <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 mb-3">
                  🚀 Projects
                </h4>
                <div className="grid grid-cols-1 gap-4">
                  {dev.projects.map((project, idx) => (
                    <div key={idx} className="p-4 rounded-xl border border-white/5 bg-white/[0.02] space-y-2">
                      <div className="flex items-center justify-between">
                        <h5 className="text-sm font-bold text-gray-200">{project.title}</h5>
                        <div className="flex gap-3 text-xs font-mono">
                          {project.github && (
                            <a href={project.github} target="_blank" rel="noreferrer" className="text-indigo-400 hover:underline inline-flex items-center gap-1">
                              Git <FiExternalLink size={10} />
                            </a>
                          )}
                          {project.live && (
                            <a href={project.live} target="_blank" rel="noreferrer" className="text-cyan-400 hover:underline inline-flex items-center gap-1">
                              Live <FiExternalLink size={10} />
                            </a>
                          )}
                        </div>
                      </div>
                      <p className="text-xs text-gray-400 leading-relaxed">{project.description}</p>
                      {project.techStack && project.techStack.length > 0 && (
                        <p className="text-[11px] font-mono text-gray-500 truncate">
                          Tech: {Array.isArray(project.techStack) ? project.techStack.join(", ") : project.techStack}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <DeveloperProjects projects={dev.projects} />
            )}

            <SocialLinks profile={dev} />

            <div className="mt-6 w-full grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={handleConnect}
                disabled={actionLoading || alreadyRequested}
                className="w-full rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 py-2.5 text-xs font-bold text-white shadow-xl hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {actionLoading && (
                  <span className="h-3.5 w-3.5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                )}
                {alreadyRequested ? "Request Sent" : "Connect"}
              </button>
              <button
                type="button"
                onClick={handleMessage}
                className="w-full rounded-xl bg-white/[0.05] border border-white/10 py-2.5 text-xs font-bold text-gray-200 hover:bg-white/10 transition-all"
              >
                Message
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeveloperProfile;
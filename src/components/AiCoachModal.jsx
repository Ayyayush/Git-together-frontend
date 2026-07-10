// components/AiCoachModal.jsx
import React, { useState, useEffect, useRef } from 'react';
import {
  FaRobot, FaTimes, FaMagic, FaCopy, FaCheck, FaSyncAlt,
  FaUserTag, FaIdCard, FaCode, FaFolderOpen, FaBriefcase, FaShareAlt, FaCogs,
  FaCheckCircle, FaExclamationTriangle, FaLightbulb, FaPlusCircle, FaPenFancy
} from 'react-icons/fa';
import toast from 'react-hot-toast';

const AiCoachModal = ({ isOpen, onClose, onAction, dataProfile }) => {
  const [suggestions, setSuggestions] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const resultsEndRef = useRef(null);

  useEffect(() => {
    if (suggestions && resultsEndRef.current) {
      resultsEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [suggestions]);

  if (!isOpen) return null;

  const handleFetchSuggestions = async () => {
    setIsLoading(true);
    setSuggestions(null);
    try {
      const response = await onAction();
      if (response && response.success && response.suggestions) {
        setSuggestions(response.suggestions);
        toast.success("AI Profile Analysis complete!");
      } else {
        setSuggestions(null);
        toast.error(response?.message || "Failed to parse AI optimization recommendations.");
      }
    } catch (err) {
      setSuggestions(null);
      toast.error("Service context returned an unreachable endpoint runtime error.");
    } finally {
      setIsLoading(false);
    }
  };

  const suggestionsAsText = (data) => {
    if (!data) return "";
    const lines = [];
    lines.push(`Overall Score: ${data.overallScore}/100`);
    lines.push("");
    lines.push(`Summary: ${data.summary}`);
    lines.push("");
    if (data.strengths?.length) {
      lines.push("Strengths:");
      data.strengths.forEach((s) => lines.push(`- ${s}`));
      lines.push("");
    }
    if (data.missingFields?.length) {
      lines.push("Missing Fields:");
      data.missingFields.forEach((s) => lines.push(`- ${s}`));
      lines.push("");
    }
    if (data.improvements?.length) {
      lines.push("Improvements:");
      data.improvements.forEach((s) => lines.push(`- ${s}`));
      lines.push("");
    }
    if (data.suggestedSkills?.length) {
      lines.push("Suggested Skills:");
      lines.push(data.suggestedSkills.join(", "));
      lines.push("");
    }
    if (data.betterBio) {
      lines.push("Suggested Bio:");
      lines.push(data.betterBio);
    }
    return lines.join("\n");
  };

  const handleCopyClipboard = async () => {
    if (!suggestions) return;
    try {
      await navigator.clipboard.writeText(suggestionsAsText(suggestions));
      setIsCopied(true);
      toast.success("Suggestions copied to clipboard!");
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      toast.error("Failed to copy text.");
    }
  };

  const scoreColor = (score) => {
    if (score >= 80) return "text-emerald-400 border-emerald-500/30 bg-emerald-500/10";
    if (score >= 50) return "text-amber-400 border-amber-500/30 bg-amber-500/10";
    return "text-red-400 border-red-500/30 bg-red-500/10";
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md transition-opacity duration-300 animate-fade-in">
      <div className="relative w-full max-w-3xl h-[85vh] flex flex-col rounded-2xl border border-white/10 bg-slate-950/80 backdrop-blur-2xl shadow-2xl overflow-hidden text-gray-100">

        {/* TOP STATUS GLOW BAR */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-pulse" />

        {/* MODAL HEADER */}
        <div className="flex items-center justify-between p-4 border-b border-white/10 bg-white/[0.02]">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-purple-500/20 text-purple-400 border border-purple-500/30 shadow-inner">
              <FaRobot size={20} className={isLoading ? "animate-spin" : "animate-bounce"} />
            </div>
            <div>
              <h2 className="text-sm font-black tracking-widest font-mono text-white flex items-center gap-2">
                AI PROFILE COACH <span className="text-[9px] uppercase px-1.5 py-0.5 font-sans rounded bg-purple-500 text-white tracking-normal font-bold shadow-md">Beta</span>
              </h2>
              <p className="text-[10px] text-gray-400 font-mono mt-0.5">Automated Neural Portfolio Optimization System</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 border border-transparent hover:border-white/10 transition-all"
          >
            <FaTimes size={16} />
          </button>
        </div>

        {/* WORKSPACE AREA */}
        <div className="flex-1 overflow-y-auto p-6 custom-scrollbar space-y-6">

          {/* STATIC PRE-INSPECTION OVERVIEW (HIDDEN ONCE SUGGESTIONS ARRIVE) */}
          {!suggestions && !isLoading && (
            <div className="space-y-5 animate-fade-in-up">
              <div className="p-5 rounded-xl bg-gradient-to-br from-indigo-950/40 via-slate-900/40 to-slate-950 border border-indigo-500/20 shadow-xl space-y-3">
                <p className="text-xs text-gray-300 leading-relaxed font-sans">
                  AI Profile Coach analyzes your developer profile and provides personalized suggestions to improve your networking profile.
                </p>
                <p className="text-xs text-gray-300 leading-relaxed font-sans font-semibold text-indigo-300">
                  It reviews your parameters across major platform dimensions:
                </p>

                {/* INTERACTIVE COMPONENT BULLET GRID */}
                <div className="grid grid-cols-2 gap-2.5 pt-1">
                  {[
                    { icon: <FaUserTag className="text-blue-400" />, text: "Professional Headline" },
                    { icon: <FaIdCard className="text-purple-400" />, text: "About Summary Bio" },
                    { icon: <FaCode className="text-emerald-400" />, text: "Skills & Tech Stacks" },
                    { icon: <FaFolderOpen className="text-amber-400" />, text: "Project Architecture" },
                    { icon: <FaBriefcase className="text-pink-400" />, text: "Experience & Workspaces" },
                    { icon: <FaShareAlt className="text-cyan-400" />, text: "Social External Anchors" },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/[0.02] border border-white/5 font-mono text-[11px] text-gray-300">
                      {item.icon} <span>{item.text}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-purple-500/10 border border-purple-500/20 font-mono text-[11px] text-purple-300 mt-2">
                  <FaCogs /> <span>Current Base Performance Profile Score: <strong>{dataProfile?.profileStrength || 0}/100</strong></span>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-amber-500/20 bg-amber-500/5 flex items-start gap-3">
                <span className="text-amber-400 text-sm mt-0.5">⚠️</span>
                <p className="text-[11px] text-gray-400 leading-relaxed">
                  <strong>Operational Notice:</strong> The AI does not modify your profile automatically. Instead it gives actionable recommendations which you can apply manually to optimize industry alignment index thresholds.
                </p>
              </div>
            </div>
          )}

          {/* LOADING WORKFLOW SPINNER */}
          {isLoading && (
            <div className="h-full flex flex-col items-center justify-center py-16 space-y-5">
              <div className="relative w-20 h-20">
                <div className="absolute inset-0 border-2 border-t-purple-500 rounded-full animate-spin"></div>
                <div className="absolute inset-1.5 border-2 border-b-blue-500 rounded-full animate-spin animation-delay-200"></div>
                <div className="absolute inset-3 border-2 border-l-pink-500 rounded-full animate-spin animation-delay-500"></div>
              </div>
              <div className="text-center space-y-1.5">
                <h4 className="text-xs font-bold font-mono tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 animate-pulse">
                  COMPUTING OPTIMIZATION MATRIX...
                </h4>
                <p className="text-[10px] text-gray-500 font-mono">Parsing developer schema vectors against global algorithmic heuristics.</p>
              </div>
            </div>
          )}

          {/* RENDERING STRUCTURED AI RESULTS */}
          {suggestions && !isLoading && (
            <div className="space-y-5 animate-fade-in-up">

              {/* OVERALL SCORE */}
              <div className={`p-5 rounded-xl border flex items-center justify-between gap-4 ${scoreColor(suggestions.overallScore)}`}>
                <div>
                  <h3 className="text-xs font-bold font-mono tracking-widest uppercase opacity-80">Overall Score</h3>
                  <p className="text-3xl font-black mt-1">{suggestions.overallScore}<span className="text-base font-bold opacity-60">/100</span></p>
                </div>
                <FaCogs size={32} className="opacity-30" />
              </div>

              {/* SUMMARY */}
              <div className="p-5 rounded-xl border border-white/5 bg-white/[0.01] shadow-inner">
                <h3 className="text-xs font-bold text-indigo-400 font-mono tracking-widest uppercase mb-2 flex items-center gap-2">
                  <FaRobot /> Summary
                </h3>
                <p className="text-xs text-gray-300 leading-relaxed">{suggestions.summary}</p>
              </div>

              {/* STRENGTHS */}
              {suggestions.strengths?.length > 0 && (
                <div className="p-5 rounded-xl border border-emerald-500/10 bg-emerald-500/[0.03]">
                  <h3 className="text-xs font-bold text-emerald-400 font-mono tracking-widest uppercase mb-3 flex items-center gap-2">
                    <FaCheckCircle /> Strengths
                  </h3>
                  <ul className="space-y-1.5">
                    {suggestions.strengths.map((item, i) => (
                      <li key={i} className="text-xs text-gray-300 leading-relaxed flex gap-2">
                        <span className="text-emerald-400">•</span> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* MISSING FIELDS */}
              {suggestions.missingFields?.length > 0 && (
                <div className="p-5 rounded-xl border border-amber-500/10 bg-amber-500/[0.03]">
                  <h3 className="text-xs font-bold text-amber-400 font-mono tracking-widest uppercase mb-3 flex items-center gap-2">
                    <FaExclamationTriangle /> Missing Fields
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {suggestions.missingFields.map((item, i) => (
                      <span key={i} className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-amber-500/10 border border-amber-500/20 text-amber-300">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* IMPROVEMENTS */}
              {suggestions.improvements?.length > 0 && (
                <div className="p-5 rounded-xl border border-blue-500/10 bg-blue-500/[0.03]">
                  <h3 className="text-xs font-bold text-blue-400 font-mono tracking-widest uppercase mb-3 flex items-center gap-2">
                    <FaLightbulb /> Improvements
                  </h3>
                  <div className="space-y-2.5">
                    {suggestions.improvements.map((item, i) => (
                      <div key={i} className="flex gap-2.5 items-start text-xs text-gray-200 leading-relaxed">
                        <span className="font-mono bg-blue-500/20 border border-blue-500/30 text-blue-400 rounded-md px-1.5 py-0.5 text-[10px] font-bold">{i + 1}</span>
                        <div className="pt-0.5">{item}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* SUGGESTED SKILLS */}
              {suggestions.suggestedSkills?.length > 0 && (
                <div className="p-5 rounded-xl border border-cyan-500/10 bg-cyan-500/[0.03]">
                  <h3 className="text-xs font-bold text-cyan-400 font-mono tracking-widest uppercase mb-3 flex items-center gap-2">
                    <FaPlusCircle /> Suggested Skills
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {suggestions.suggestedSkills.map((item, i) => (
                      <span key={i} className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-cyan-500/10 border border-cyan-500/20 text-cyan-300">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* BETTER BIO */}
              {suggestions.betterBio && (
                <div className="p-5 rounded-xl border border-purple-500/10 bg-purple-500/[0.03]">
                  <h3 className="text-xs font-bold text-purple-400 font-mono tracking-widest uppercase mb-2 flex items-center gap-2">
                    <FaPenFancy /> Suggested Bio
                  </h3>
                  <p className="text-xs text-gray-300 leading-relaxed italic">"{suggestions.betterBio}"</p>
                </div>
              )}

              <div ref={resultsEndRef} />
            </div>
          )}

        </div>

        {/* MODAL FOOTER CONTAINER CONTROL SYSTEM */}
        <div className="p-4 border-t border-white/10 bg-white/[0.02] flex items-center justify-between gap-3">
          <div>
            {suggestions && !isLoading && (
              <button
                onClick={handleCopyClipboard}
                className="btn btn-sm font-mono text-[11px] gap-1.5 border border-white/10 bg-white/5 text-gray-300 hover:text-white hover:bg-white/10 hover:border-white/20 px-4 py-2 h-auto"
              >
                {isCopied ? <FaCheck className="text-emerald-400" /> : <FaCopy />}
                {isCopied ? "COPIED" : "COPY SUGGESTIONS"}
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="btn btn-sm font-mono text-[11px] px-4 py-2 h-auto bg-transparent hover:bg-white/5 text-gray-400 hover:text-gray-200 border border-transparent hover:border-white/5"
            >
              CLOSE
            </button>

            {!suggestions ? (
              <button
                onClick={handleFetchSuggestions}
                disabled={isLoading}
                className="btn btn-sm bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white font-mono font-bold text-[11px] px-5 py-2 h-auto shadow-lg shadow-purple-900/40 border-none tracking-wide flex items-center gap-1.5"
              >
                <FaMagic /> GENERATE SUGGESTIONS
              </button>
            ) : (
              !isLoading && (
                <button
                  onClick={handleFetchSuggestions}
                  className="btn btn-sm bg-gradient-to-r from-blue-600 to-purple-600 hover:brightness-110 text-white font-mono font-bold text-[11px] px-5 py-2 h-auto border-none tracking-wide flex items-center gap-1.5"
                >
                  <FaSyncAlt /> REGENERATE
                </button>
              )
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default AiCoachModal;
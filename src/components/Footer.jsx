import React, { useState } from "react";
import logo from "../assets/logo.png";
import { FaGithub, FaLinkedin } from "react-icons/fa";

/* ================= CREATED BY ================= */

const CreatedBy = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-3 px-4 py-2 rounded-full
                   bg-white/5 backdrop-blur-md
                   border border-white/10
                   text-sm text-gray-300
                   hover:bg-white/10 hover:text-white
                   transition"
      >
        <span>Created by</span>
        <span
          className={`text-xs transition-transform ${
            open ? "rotate-180" : ""
          }`}
        >
          ▲
        </span>
      </button>

      {open && (
        <div
          className="absolute bottom-full mb-3 right-0
                     w-60 rounded-xl
                     bg-[#11151d]/95 backdrop-blur-md
                     border border-white/10
                     shadow-2xl shadow-black/40
                     p-4 z-50"
        >
          <p className="text-sm font-semibold text-white mb-3">
            Ayush Pandey
          </p>

          <div className="flex items-center gap-4">
            {/* LinkedIn */}
            <a
              href="https://linkedin.com/in/ayush-pandey-60a138255"
              target="_blank"
              rel="noreferrer"
              className="w-9 h-9 flex items-center justify-center rounded-full
                         bg-indigo-500/10 text-indigo-300
                         hover:bg-indigo-500 hover:text-white
                         transition"
              title="LinkedIn"
            >
              <FaLinkedin size={16} />
            </a>

            {/* GitHub */}
            <a
              href="https://github.com/Ayyayush"
              target="_blank"
              rel="noreferrer"
              className="w-9 h-9 flex items-center justify-center rounded-full
                         bg-white/5 text-gray-300
                         hover:bg-gray-700 hover:text-white
                         transition"
              title="GitHub"
            >
              <FaGithub size={16} />
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

/* ================= FOOTER ================= */

const Footer = () => {
  return (
    <footer className="relative bg-[#0B0E14] text-gray-400 border-t border-white/5">
      {/* Subtle Glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-violet-500/10 to-cyan-500/10 blur-3xl opacity-30 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 py-8">
        {/* TOP */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="flex items-center gap-4">
            <div className="p-2 rounded-lg bg-white/5 backdrop-blur border border-white/10">
              <img src={logo} alt="GitTogether Logo" className="w-9 h-9" />
            </div>

            <div>
              <h2 className="text-lg font-semibold text-white tracking-tight">
                GitTogether
              </h2>
              <p className="text-xs text-gray-500">
                Connecting developers, one swipe at a time.
              </p>
            </div>
          </div>

          {/* Links */}
          <div className="flex gap-6 text-sm">
            {["About", "Privacy", "Terms", "Contact"].map((item) => (
              <a
                key={item}
                className="relative cursor-pointer text-gray-400 hover:text-white transition group"
              >
                {item}
                <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-gradient-to-r from-indigo-400 to-cyan-400 transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="my-6 h-px bg-white/10" />

        {/* BOTTOM */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p className="text-gray-500">
            © {new Date().getFullYear()}{" "}
            <span className="text-white">GitTogether</span>. All rights reserved.
          </p>

          <CreatedBy />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
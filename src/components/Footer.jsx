import React from "react";
import logo from "../assets/logo.png";

const Footer = () => {
  return (
    <footer className="relative bg-[#0B1220] text-gray-400 overflow-hidden">

      {/* Subtle Glow Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 blur-3xl opacity-40 pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-6 py-12">

        {/* ================= TOP SECTION ================= */}
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-10">

          {/* Brand */}
          <div className="flex items-center gap-4 text-center md:text-left">
            <div className="p-2 rounded-xl bg-white/5 backdrop-blur border border-white/10">
              <img
                src={logo}
                alt="Gittogether Logo"
                className="w-10 h-10 object-contain"
              />
            </div>

            <div>
              <h2 className="text-xl font-bold text-white tracking-wide">
                Gittogether
              </h2>
              <p className="text-sm text-gray-400 max-w-xs">
                Where developers connect, collaborate, and grow.
              </p>
            </div>
          </div>

          {/* Links */}
          <div className="flex flex-wrap justify-center md:justify-end gap-x-8 gap-y-4 text-sm font-medium">
            {["About", "Privacy", "Terms", "Contact"].map((item) => (
              <a
                key={item}
                className="relative cursor-pointer hover:text-white transition group"
              >
                {item}
                <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-blue-400 transition-all group-hover:w-full"></span>
              </a>
            ))}
          </div>
        </div>

        {/* ================= DIVIDER ================= */}
        <div className="my-10 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

        {/* ================= BOTTOM SECTION ================= */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-center sm:text-left">

          <p className="text-gray-500">
            © {new Date().getFullYear()}{" "}
            <span className="text-white font-medium">Gittogether</span>.  
            All rights reserved.
          </p>

          <p className="flex items-center gap-2 text-gray-500">
            Built with
            <span className="text-red-500 animate-pulse">❤️</span>
            by developers, for developers
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;

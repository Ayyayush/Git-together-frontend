import React from "react";
import logo from "../assets/logo.png";

const Footer = () => {
  return (
    <footer className="bg-[#0B1220] border-t border-white/10 text-gray-400">
      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* Top Section */}
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-8">

          {/* Brand */}
          <div className="flex items-center gap-3 text-center md:text-left">
            <img
              src={logo}
              alt="Gittogether Logo"
              className="w-9 h-9 object-contain"
            />
            <div>
              <h2 className="text-lg font-semibold text-white">
                Gittogether
              </h2>
              <p className="text-sm">
                Connecting developers, one swipe at a time.
              </p>
            </div>
          </div>

          {/* Links */}
          <div className="flex flex-wrap justify-center gap-6 text-sm font-medium">
            <a className="hover:text-white transition cursor-pointer">About</a>
            <a className="hover:text-white transition cursor-pointer">Privacy</a>
            <a className="hover:text-white transition cursor-pointer">Terms</a>
            <a className="hover:text-white transition cursor-pointer">Contact</a>
          </div>
        </div>

        {/* Divider */}
        <div className="my-8 h-px bg-white/10"></div>

        {/* Bottom Section */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-center sm:text-left">
          <p>
            © {new Date().getFullYear()} Gittogether. All rights reserved.
          </p>
          <p>
            Built with <span className="text-red-500">❤️</span> for developers
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;

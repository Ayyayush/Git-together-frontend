import React, { useState } from "react";
import logo from "../assets/logo.png";
import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaRocket,
  FaComments,
  FaRobot,
} from "react-icons/fa";
import { FiMail } from "react-icons/fi";

/* ================= FEATURE CARDS ================= */

const FEATURES = [
  {
    icon: FaRocket,
    title: "Smart Developer Discovery",
    description:
      "Swipe, search and discover developers based on skills, interests and AI-powered recommendations.",
  },
  {
    icon: FaComments,
    title: "Real-Time Collaboration",
    description:
      "Connect instantly with developers using real-time messaging and seamless networking.",
  },
  {
    icon: FaRobot,
    title: "AI Powered Networking",
    description:
      "Get intelligent recommendations, AI profile coaching, and smarter developer matching.",
  },
];

const FeatureCards = () => {
  return (
    <section className="relative max-w-7xl mx-auto px-6 pt-16 pb-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {FEATURES.map(({ icon: Icon, title, description }) => (
          <div
            key={title}
            className="group relative rounded-2xl p-[1px] bg-gradient-to-br from-indigo-500/30 via-white/10 to-cyan-500/30
                       transition-all duration-300 hover:from-indigo-400/60 hover:to-cyan-400/60"
          >
            <div
              className="relative h-full rounded-2xl bg-white/[0.03] backdrop-blur-xl border border-white/10
                         p-6 overflow-hidden transition-all duration-300
                         group-hover:-translate-y-1.5 group-hover:bg-white/[0.05]"
            >
              <div className="pointer-events-none absolute -top-10 -right-10 w-32 h-32 rounded-full bg-gradient-to-br from-indigo-500/20 to-cyan-400/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500/20 to-cyan-400/20 flex items-center justify-center mb-5 border border-white/10 group-hover:from-indigo-500/30 group-hover:to-cyan-400/30 transition-all">
                <Icon className="text-cyan-300" size={20} />
              </div>

              <h3 className="relative text-base font-semibold text-white mb-2 tracking-tight">
                {title}
              </h3>
              <p className="relative text-sm text-gray-400 leading-relaxed">
                {description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

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

/* ================= FOOTER LINK COLUMN ================= */

const FooterColumn = ({ title, items }) => (
  <div className="flex flex-col items-center md:items-start">
    <h4 className="text-sm font-semibold text-white tracking-wide mb-4">
      {title}
    </h4>
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item}>
          <a className="relative cursor-pointer text-sm text-gray-400 hover:text-white transition group">
            {item}
            <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-gradient-to-r from-indigo-400 to-cyan-400 transition-all duration-300 group-hover:w-full" />
          </a>
        </li>
      ))}
    </ul>
  </div>
);

/* ================= FOOTER ================= */

const Footer = () => {
  const socials = [
    { icon: FaGithub, href: "https://github.com", label: "GitHub" },
    { icon: FaLinkedin, href: "https://linkedin.com", label: "LinkedIn" },
    { icon: FaTwitter, href: "https://twitter.com", label: "Twitter" },
    { icon: FiMail, href: "mailto:hello@gittogether.dev", label: "Mail" },
  ];

  return (
    <footer className="relative bg-[#0B0E14] text-gray-400 border-t border-white/5">
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-violet-500/10 to-cyan-500/10 blur-3xl opacity-30 pointer-events-none" />

      <FeatureCards />

      <div className="relative max-w-7xl mx-auto px-6 pb-10 pt-8">
        <div className="mb-10 h-px bg-white/10" />

        <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr_1fr] gap-10 text-center md:text-left">
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-white/5 backdrop-blur border border-white/10">
                <img src={logo} alt="GitTogether Logo" className="w-9 h-9" />
              </div>
              <h2 className="text-lg font-semibold text-white tracking-tight">
                GitTogether
              </h2>
            </div>

            <p className="text-xs text-gray-500 mt-3 max-w-[220px]">
              Connecting developers, one swipe at a time.
            </p>

            <div className="flex items-center gap-3 mt-5">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  title={label}
                  className="w-9 h-9 flex items-center justify-center rounded-full
                             bg-white/5 border border-white/10 text-gray-300
                             hover:bg-gradient-to-br hover:from-indigo-500 hover:to-cyan-500
                             hover:text-white hover:border-transparent
                             transition-all duration-300"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          <FooterColumn
            title="Quick Links"
            items={["About", "Features", "Privacy", "Terms", "Contact"]}
          />

          <FooterColumn
            title="Resources"
            items={["Documentation", "Help Center", "FAQ", "Developer Guide"]}
          />
        </div>

        <div className="my-8 h-px bg-white/10" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p className="text-gray-500 text-center sm:text-left">
            © {new Date().getFullYear()}{" "}
            <span className="text-white">GitTogether</span>. Made with{" "}
            <span className="text-red-400">❤️</span> for Developers.
          </p>

          <CreatedBy />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
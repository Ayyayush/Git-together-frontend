import { Link } from "react-router-dom";
import { FiUsers, FiMessageCircle, FiTrendingUp, FiArrowRight } from "react-icons/fi";
import hero from "../assets/hero.png";

const FEATURES = [
  {
    icon: FiUsers,
    title: "Discover developers",
    description:
      "Browse a feed of developers who match your stack, interests, and goals.",
  },
  {
    icon: FiMessageCircle,
    title: "Start real conversations",
    description:
      "Match, chat, and skip the small talk — get straight to building together.",
  },
  {
    icon: FiTrendingUp,
    title: "Grow your network",
    description:
      "Turn connections into collaborators, mentors, and co-founders over time.",
  },
];

const Landing = () => {
  return (
    <div className="flex-grow bg-[#0B0E14]">

      {/* ================= HERO ================= */}
      <main className="relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-10 px-6 lg:px-16 py-16 lg:py-24">

        {/* ambient glow */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-24 left-10 w-[28rem] h-[28rem] bg-indigo-600/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-10 w-[24rem] h-[24rem] bg-cyan-500/10 rounded-full blur-3xl" />
        </div>

        {/* LEFT CONTENT */}
        <div className="relative z-10 lg:w-1/2 flex flex-col justify-center text-center lg:text-left">

          <span className="inline-flex items-center gap-2 self-center lg:self-start text-xs font-medium tracking-widest uppercase text-cyan-300 mb-4 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20">
            A social network for developers
          </span>

          <h1 className="text-4xl md:text-6xl font-bold leading-tight text-white mb-6 tracking-tight">
            Connect with{" "}
            <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
              developers
            </span>
            <br />
            who push you forward
          </h1>

          <p className="text-gray-400 max-w-xl mb-10 leading-relaxed mx-auto lg:mx-0">
            Discover like-minded developers, build meaningful connections,
            and grow together through collaboration—not noise.
          </p>

          {/* CTA SECTION */}
          <div className="flex flex-col items-center lg:items-start gap-4">
            <Link
              to="/signup"
              className="inline-flex items-center gap-2 px-10 py-3 rounded-full
                         bg-gradient-to-r from-indigo-500 to-cyan-500 text-white font-semibold
                         shadow-lg shadow-indigo-500/30
                         hover:scale-105 hover:shadow-cyan-500/40
                         transition-all duration-300"
            >
              Get started for free
              <FiArrowRight />
            </Link>

            <p className="text-sm text-gray-400">
              Already a member?{"  "}
              <Link to="/login" className="text-cyan-400 hover:text-cyan-300 hover:underline">
                Log in
              </Link>
            </p>
          </div>

        </div>

        {/* RIGHT IMAGE */}
        <div className="relative z-10 lg:w-1/2 flex justify-center items-center">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-cyan-400/10 blur-2xl rounded-full" />
          <img
            src={hero}
            alt="Developers collaboration illustration"
            className="relative w-full max-w-md lg:max-w-lg rounded-2xl shadow-2xl shadow-black/50 ring-1 ring-white/10"
          />
        </div>

      </main>

      {/* ================= FEATURE CARDS ================= */}
      <section className="relative px-6 lg:px-16 py-16 lg:py-20 border-t border-white/5">
        <div className="max-w-6xl mx-auto">

          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
              Everything you need to build your circle
            </h2>
            <p className="text-gray-500 mt-2 max-w-md mx-auto">
              GitTogether handles the discovery and the intro, so you can focus on the work.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {FEATURES.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="group rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-7 transition-all duration-300 hover:-translate-y-1 hover:border-indigo-400/30 hover:bg-white/[0.05]"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500/20 to-cyan-400/20 flex items-center justify-center mb-5 group-hover:from-indigo-500/30 group-hover:to-cyan-400/30 transition-all">
                  <Icon className="text-cyan-300" size={22} />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {title}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {description}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

    </div>
  );
};

export default Landing;
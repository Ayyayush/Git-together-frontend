import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

const Error = () => {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#0B0E14] text-white px-6">

      {/* ambient glows */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[28rem] h-[28rem] bg-indigo-600/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-[24rem] h-[24rem] bg-cyan-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 text-center max-w-lg">
        <h1 className="text-8xl md:text-9xl font-bold tracking-tight bg-gradient-to-r from-indigo-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent">
          404
        </h1>

        <h2 className="text-2xl md:text-3xl font-semibold mt-2 mb-4 text-gray-100">
          {`Oops! The page you're looking for doesn't exist.`}
        </h2>

        <p className="text-gray-500 mb-8 leading-relaxed">
          {`It seems you've taken a wrong turn. But don't worry, we're here to
          help you get back on track!`}
        </p>

        <Link
          to={"/"}
          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500 px-7 py-3 font-semibold text-white shadow-lg shadow-indigo-500/30 transition-all duration-300 hover:scale-105 hover:shadow-cyan-500/40"
        >
          <FiArrowLeft />
          Back to home
        </Link>
      </div>

      <div className="relative z-10 mt-12 w-3/4 md:w-1/2 lg:w-1/3">
        <div className="absolute inset-0 bg-gradient-to-t from-indigo-500/15 to-transparent blur-2xl" />
        <img
          src="https://i.imgur.com/qIufhof.png"
          alt="Lost Illustration"
          className="relative w-full drop-shadow-[0_15px_35px_rgba(99,102,241,0.25)]"
        />
      </div>
    </div>
  );
};

export default Error;
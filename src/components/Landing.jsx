import { Link } from "react-router-dom";
import hero from "../assets/hero.png";

const Landing = () => {
  return (
    <main className="flex-grow flex flex-col lg:flex-row items-center justify-between px-6 lg:px-16 py-12 bg-gradient-to-br from-[#0B1220] to-[#0F172A]">
      
      {/* ================= LEFT CONTENT ================= */}
      <div className="lg:w-1/2 flex flex-col justify-center text-center lg:text-left">

        <span className="text-xs tracking-widest uppercase text-orange-400 mb-3">
          A social network for developers
        </span>

        <h1 className="text-4xl md:text-6xl font-bold leading-tight text-white mb-6">
          Connect with{" "}
          <span className="text-blue-400">developers</span>
          <br />
          who push you forward
        </h1>

        <p className="text-gray-400 max-w-xl mb-10 leading-relaxed">
          Discover like-minded developers, build meaningful connections,
          and grow together through collaboration—not noise.
        </p>

        {/* CTA SECTION */}
        <div className="flex flex-col items-center lg:items-start gap-4">
          <Link
            to="/signup"
            className="px-10 py-3 rounded-full bg-yellow-400 text-black font-semibold
                       hover:bg-yellow-300 transition shadow-lg"
          >
            Get started for free
          </Link>

          <p className="text-sm text-gray-400">
                 Already a member?{"  "}
            <Link to="/login" className="text-blue-400 hover:underline">
               Log in
            </Link>
          </p>
        </div>

      </div>

      {/* ================= RIGHT IMAGE ================= */}
      <div className="lg:w-1/2 flex justify-center items-center mt-12 lg:mt-0">
        <img
          src={hero}
          alt="Developers collaboration illustration"
          className="w-full max-w-md lg:max-w-lg rounded-xl shadow-2xl"
        />
      </div>

    </main>
  );
};

export default Landing;

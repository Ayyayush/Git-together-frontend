import { Link } from "react-router-dom";
import not_found from "../assets/not_found.gif";
import { useSelector } from "react-redux";

const NotFoundPage = () => {
  const {theme} = useSelector((store) => store.theme);

  return (
    <div
      className={`relative h-screen overflow-hidden ${
        theme == "dark" && "bg-gradient-to-b from-[#0B0E14] to-[#11151d]"
      } flex flex-col justify-center items-center text-center px-6`}
    >
      {theme == "dark" && (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-[26rem] h-[26rem] bg-indigo-600/15 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-[22rem] h-[22rem] bg-cyan-500/10 rounded-full blur-3xl" />
        </div>
      )}

      <div className="relative z-10 flex flex-col items-center">
        <h1
          className={`text-9xl font-extrabold select-none ${
            theme == "dark"
              ? "bg-gradient-to-r from-indigo-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent"
              : "text-gray-400"
          }`}
        >
          404
        </h1>

        <p className="mt-4 text-2xl font-semibold">Oops! Page not found.</p>
        <p className="mt-2 text-gray-400 max-w-lg">
          {`The page you're looking for doesn't exist, or it might have been moved. Let's get you back to safety.`}
        </p>

        <div className="mt-8 relative">
          {theme == "dark" && (
            <div className="absolute inset-0 bg-indigo-500/10 blur-2xl rounded-2xl" />
          )}
          <img
            src={not_found}
            alt="404 Illustration"
            className="relative w-64 md:w-80 lg:w-96 rounded-2xl shadow-2xl shadow-black/40 ring-1 ring-white/10"
          />
        </div>

        <div className="mt-8 space-x-4">
          <Link
            to={"/feed"}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-cyan-500 text-white px-7 py-3 rounded-full font-semibold shadow-lg shadow-indigo-500/30 hover:scale-105 hover:shadow-cyan-500/40 transition-all duration-300"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
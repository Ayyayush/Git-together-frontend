import { Link } from "react-router-dom";
import not_found from "../assets/not_found.gif";
import { useSelector } from "react-redux";

const NotFoundPage = () => {
  const {theme} = useSelector((store) => store.theme);

  return (
    <div
      className={`h-screen ${
        theme == "dark" && "bg-gradient-to-b from-gray-900 to-gray-800"
      } flex flex-col justify-center items-center text-center`}
    >
      <div className="flex flex-col items-center">
        <h1 className="text-9xl font-extrabold text-gray-500 select-none">
          404
        </h1>

        <p className="mt-4 text-2xl font-semibold">Oops! Page not found.</p>
        <p className="mt-2 text-gray-400 max-w-lg">
          {`The page you're looking for doesn't exist, or it might have been moved. Let's get you back to safety.`}
        </p>

        <div className="mt-8">
          <img
            src={not_found}
            alt="404 Illustration"
            className="w-64 md:w-80 lg:w-96 rounded-lg shadow-lg"
          />
        </div>

        <div className="mt-8 space-x-4">
          <Link
            to={"/feed"}
            className="bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:bg-blue-600 transition"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
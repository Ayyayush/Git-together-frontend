import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-blue-500 mb-4">404</h1>
        <h2 className="text-3xl font-semibold mb-6">
          {`Oops! The page you're looking for doesn't exist.`}
        </h2>
        <p className="text-gray-400 mb-8">
          {`It seems you've taken a wrong turn. But don't worry, we're here to
          help you get back on track!`}
        </p>
        <Link
          to={"/"}
          className="bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:bg-blue-600 transition"
        >
          Back to Home
        </Link>
      </div>

      <div className="mt-12 w-3/4 md:w-1/2 lg:w-1/3">
        <img
          src="https://i.imgur.com/qIufhof.png"
          alt="Lost Illustration"
          className="w-full"
        />
      </div>
    </div>
  );
};

export default Error;
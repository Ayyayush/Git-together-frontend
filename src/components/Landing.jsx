import hero from "../assets/hero.png";

const Landing = () => {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4">
      <img
        src={hero}
        alt="GitTogether Hero"
        className="w-[380px] max-w-full mb-8"
      />

      <h1 className="text-4xl font-bold text-white mb-4">
        Connect. Collaborate. Code.
      </h1>

      <p className="text-gray-400 max-w-xl">
        GitTogether helps developers find like-minded people to build amazing
        projects together.
      </p>
    </div>
  );
};

export default Landing;

import Navbar from "./components/Navbar.jsx";

function App() {
  return (
    <div className="min-h-screen bg-base-200">
      <Navbar />

      <div className="flex items-center justify-center h-[calc(100vh-64px)]">
        <h1 className="text-4xl font-bold text-primary">
          Tailwind + DaisyUI is Working 🚀
        </h1>
      </div>
    </div>
  );
}

export default App;

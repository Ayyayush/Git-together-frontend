import { SunIcon, MoonIcon } from "@radix-ui/react-icons"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { toggleTheme } from "../utils/themeSlice"

const ThemeToggle = () => {
  const dispatch = useDispatch()
  const { theme } = useSelector((state) => state.theme)

  // Single source of truth: Redux drives both the DOM attribute and localStorage.
  // Previously ThemeToggle had its own useState that was disconnected from Redux,
  // and Navbar's dropdown dispatched toggleTheme() without touching the DOM.
  // Now any toggle — whether from this button or the Navbar dropdown — flows
  // through Redux and lands here, keeping everything in sync.
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme)
    localStorage.setItem("theme", theme)
  }, [theme])

  return (
    <div
      className="tooltip tooltip-bottom font-sans"
      data-tip={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      <button
        type="button"
        aria-label="Toggle visual theme"
        onClick={() => dispatch(toggleTheme())}
        className="btn btn-ghost btn-circle btn-sm md:btn-md mx-2
                   bg-white/[0.04] border border-white/10
                   hover:bg-white/[0.08] hover:border-indigo-400/30
                   transition-all duration-300 relative group overflow-hidden"
      >
        <span className="absolute inset-0 bg-gradient-to-tr from-indigo-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />

        <div className="relative z-10 flex items-center justify-center w-full h-full">
          {theme === "light" ? (
            <MoonIcon className="size-4 text-gray-300 transition-all duration-300 transform group-hover:rotate-12 group-hover:scale-110" />
          ) : (
            <SunIcon className="size-4 text-amber-400 transition-all duration-300 transform group-hover:rotate-90 group-hover:scale-110" />
          )}
        </div>
      </button>
    </div>
  )
}

export default ThemeToggle
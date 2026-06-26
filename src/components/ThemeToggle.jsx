import { SunIcon, MoonIcon } from "@radix-ui/react-icons"
import { useEffect, useState } from "react"

const ThemeToggle = () => {
    const [theme, setTheme] =
        useState(localStorage.getItem("theme") || "dark") // Defaulting to dark theme for developer focus

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
                onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                className="btn btn-ghost btn-circle btn-sm md:btn-md mx-2 bg-gray-900/30 border border-gray-800/60 hover:bg-gray-800/60 hover:border-gray-700/80 transition-all duration-300 relative group overflow-hidden"
            >
                {/* Decorative background glow on hover */}
                <span className="absolute inset-0 bg-gradient-to-tr from-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Dual Icon Layout with micro-interactions */}
                <div className="relative z-10 flex items-center justify-center w-full h-full">
                    {theme === "light" ? (
                        <MoonIcon className="size-4 text-slate-700 transition-all duration-300 transform group-hover:rotate-12 group-hover:scale-110" />
                    ) : (
                        <SunIcon className="size-4 text-amber-400 transition-all duration-300 transform group-hover:rotate-90 group-hover:scale-110" />
                    )}
                </div>
            </button>
        </div>
    )
}

export default ThemeToggle
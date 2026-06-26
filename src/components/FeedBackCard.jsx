import { useEffect, useState } from "react"
import { STACK_USER } from "../utils/constants"

const FeedBackCard = () => {
    // 1. Reactive theme state — syncs with storage events.
    const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light")

    useEffect(() => {
        const onStorage = () => setTheme(localStorage.getItem("theme") || "light")
        window.addEventListener("storage", onStorage)
        return () => window.removeEventListener("storage", onStorage)
    }, [])

    return (
        <div className="text-center py-10 mt-10">
            <h3 className="text-lg font-semibold text-gray-300 mb-5 tracking-tight">
                Built by developers like you
            </h3>
            <div
                className={`stats flex overflow-x-auto gap-4 px-4 py-5 rounded-2xl border snap-x snap-mandatory ${
                    theme === "dark"
                        ? "bg-neutral-900 text-white border-white/10"
                        : "bg-white/[0.03] text-gray-100 border-white/10 backdrop-blur-xl shadow-2xl shadow-black/30"
                }`}
            >
                {STACK_USER.map(user => (
                    <div
                        className="stat snap-start shrink-0 w-44 rounded-xl border border-white/5 bg-white/[0.02] px-3 py-4 transition-all duration-300 hover:-translate-y-1 hover:border-indigo-400/30"
                        // 2. Use stable id instead of firstName for key.
                        key={user.id ?? user.firstName}
                    >
                        <div className="flex justify-center">
                            <img
                                className="w-20 h-20 rounded-full object-cover ring-2 ring-indigo-500/30"
                                src={user.photoUrl}
                                // 3. Descriptive alt text.
                                alt={`${user.firstName} ${user.lastName}`}
                            />
                        </div>
                        <div className="stat-desc w-full mt-3">
                            <p className="text-base font-semibold text-gray-100">
                                {user.firstName} {user.lastName}
                            </p>
                            {/* 4. Removed redundant "Skills" label — badges are self-explanatory. */}
                            <div className="flex flex-wrap justify-center gap-1 mt-2">
                                {user.skills.map((skill, idx) => (
                                    <span
                                        key={idx}
                                        className="text-[11px] px-2 py-0.5 rounded-full bg-indigo-500/15 text-indigo-300 font-medium"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default FeedBackCard
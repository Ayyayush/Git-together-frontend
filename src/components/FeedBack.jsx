import { useEffect, useState } from "react"

const FeedBack = ({ userData = [] }) => {
    // 1. React to theme changes instead of reading localStorage once at render.
    const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light")

    useEffect(() => {
        const onStorage = () => setTheme(localStorage.getItem("theme") || "light")
        window.addEventListener("storage", onStorage)
        return () => window.removeEventListener("storage", onStorage)
    }, [])

    // 2. Prop is typed as an array but only one item is used — accept a single object.
    //    Keeping array for backward compat; just document the intent clearly.
    if (!userData.length) return null

    const user = userData[0]

    const cardClass = `card w-full border transition-all duration-300 hover:-translate-y-0.5 ${
        theme === "dark"
            // 3. Fixed: dark mode should be the dark card, not white.
            ? "bg-white/[0.04] text-gray-100 border-white/10 backdrop-blur-xl shadow-2xl shadow-black/30 hover:border-indigo-400/30"
            : "bg-white text-black border-black/10 shadow-xl"
    }`

    return (
        <ul className="timeline timeline-vertical">
            <li>
                <div className="timeline-start timeline-middle">
                    <div className="w-3 h-3 rounded-full bg-gradient-to-br from-indigo-500 to-cyan-400 shadow-[0_0_10px_rgba(99,102,241,0.6)]" />
                </div>
                <div className="timeline-end timeline-box border-none p-0 bg-transparent shadow-none">
                    <div className={cardClass}>
                        <figure className="flex flex-col items-center md:flex-row gap-4 p-4">
                            <img
                                className="rounded-xl w-20 h-20 object-cover ring-2 ring-white/10 shrink-0"
                                src={user.photoUrl}
                                // 4. Descriptive alt text instead of empty string.
                                alt={`${user.firstName} ${user.lastName}`}
                            />
                            <div className="text-center md:text-left">
                                <h2 className="font-bold tracking-tight">
                                    {user.firstName} {user.lastName}
                                </h2>
                                {user.skills?.length > 0 && (
                                    <div className="flex flex-wrap justify-center md:justify-start gap-1.5 mt-2">
                                        {user.skills.map((skill, idx) => (
                                            <span
                                                key={idx}
                                                className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                                                    theme === "dark"
                                                        ? "bg-indigo-500/15 text-indigo-300"
                                                        : "bg-black/5 text-black/70"
                                                }`}
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </figure>
                    </div>
                </div>
                <hr className="bg-white/10" />
            </li>
        </ul>
    )
}

export default FeedBack
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import {
    BsTrophy,
    BsStars,
    BsShieldCheck,
    BsRocketTakeoff,
    BsCheckCircleFill
} from "react-icons/bs"

const ProfileStrength = () => {
    const user = useSelector(state => state.user.user)
    if (!user) return null

    const completion = user.profileCompletion || 0
    const isPremium = user.isPremium || false

    // ---------- 100% COMPLETE ----------
    if (completion === 100) {
        if (isPremium) {
            return (
                <div className="relative w-full rounded-2xl border border-amber-400/20 bg-white/[0.03] backdrop-blur-xl shadow-2xl shadow-black/30 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-400/10 via-transparent to-transparent"></div>

                    <div className="p-4 relative">
                        <div className="flex justify-between items-center mb-1.5">
                            <h3 className="text-xs font-extrabold flex items-center gap-1.5 text-amber-300 tracking-wide">
                                <BsStars className="text-amber-400" />
                                All-Star Profile
                            </h3>

                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400">
                                ACTIVE
                            </span>
                        </div>

                        <p className="text-[11px] text-gray-400">
                            Profile optimized. <b className="text-gray-200">3x visibility</b>.
                        </p>

                        <div className="flex items-center gap-3 mt-3 bg-white/[0.04] p-2.5 rounded-xl border border-white/10">
                            <div className="p-1.5 bg-emerald-500/15 rounded-full">
                                <BsRocketTakeoff className="text-emerald-400 text-xs" />
                            </div>

                            <div className="flex-1">
                                <p className="text-[11px] font-bold text-gray-200">Boost Active</p>
                                <div className="flex justify-between items-center">
                                    <p className="text-[10px] text-gray-500">Top 1%</p>
                                    <span className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                        <span className="relative rounded-full h-2 w-2 bg-emerald-400"></span>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }

        // ---------- FREE USER ----------
        return (
            <div className="w-full rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl shadow-2xl shadow-black/30">
                <div className="p-4">
                    <h3 className="text-sm font-bold flex items-center gap-2 text-gray-100">
                        <BsCheckCircleFill className="text-emerald-400" />
                        Profile Completed!
                    </h3>

                    <p className="text-xs text-gray-500 mt-1">
                        Excellent work! You filled all details.
                    </p>

                    <div className="mt-3 flex gap-2.5 bg-indigo-500/10 border border-indigo-400/20 p-2.5 rounded-xl">
                        <BsShieldCheck className="text-indigo-300 text-lg shrink-0" />
                        <p className="text-xs text-indigo-200">
                            Upgrade to Premium for <b>3x boost</b>.
                        </p>
                    </div>
                </div>
            </div>
        )
    }

    // ---------- INCOMPLETE ----------
    return (
        <div className="w-full rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl shadow-2xl shadow-black/30">
            <div className="p-4">
                <h3 className="text-sm font-bold flex items-center gap-2 text-gray-100">
                    <BsTrophy className="text-amber-400" />
                    Profile Strength
                </h3>

                <div className="mt-3">
                    <div className="flex justify-between text-xs mb-1.5 text-gray-500">
                        <span>Completion</span>
                        <span className="text-gray-300 font-medium">{completion}%</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2">
                        <div
                            className="bg-gradient-to-r from-indigo-500 to-cyan-400 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${completion}%` }}
                        />
                    </div>
                </div>

                <Link
                    to="/profile"
                    className="flex items-center justify-center w-full mt-4 py-1.5 rounded-full text-xs font-semibold text-indigo-300 border border-indigo-400/30 hover:bg-indigo-500/10 hover:text-indigo-200 transition-all"
                >
                    Complete Profile
                </Link>
            </div>
        </div>
    )
}

export default ProfileStrength
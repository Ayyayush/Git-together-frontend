import { Link } from "react-router-dom"
import { MdChat, MdPeople, MdPersonAdd } from "react-icons/md"
import { BsPatchCheckFill, BsShareFill } from "react-icons/bs"

import { DEFAULT_IMG, skillList } from "../utils/constants"

const SideProfileCard = ({ userData, stats, onShare }) => {
    const getSkillNames = (skills = []) => {
        if (!Array.isArray(skills)) return []

        return skills
            .map(s => {
                if (typeof s === "object") return s.name
                return skillList.find(list => list.id === s)?.name || s
            })
            .filter(Boolean)
            .slice(0, 3)
    }

    const skillNames = getSkillNames(userData?.skills)

    return (
        <div className="card bg-base-100 shadow-lg border border-base-200 w-full">
            {/* Header */}
            <div className="h-16 bg-gradient-to-r from-primary/10 to-base-200"></div>

            <div className="px-4 pb-4 -mt-10 flex flex-col items-center text-center">
                {/* Avatar */}
                <div className="avatar online">
                    <div
                        className={`w-20 lg:w-24 rounded-full ring ring-offset-2 bg-base-100 p-0.5 ${
                            userData?.isPremium ? "ring-blue-500" : "ring-base-100"
                        }`}
                    >
                        <img
                            src={userData?.photo || DEFAULT_IMG}
                            alt="Profile"
                        />
                    </div>
                </div>

                {/* Name */}
                <div className="mt-3 w-full">
                    <Link
                        to="/profile"
                        className="font-bold text-lg flex items-center justify-center gap-1 hover:text-primary"
                    >
                        {userData?.firstName} {userData?.lastName}
                        {userData?.isPremium && (
                            <BsPatchCheckFill className="text-blue-500" />
                        )}
                    </Link>

                    <p className="text-xs text-gray-500 truncate">
                        {userData?.emailId}
                    </p>
                </div>

                {/* Skills */}
                <div className="flex flex-wrap justify-center gap-1 mt-3">
                    {skillNames.length > 0 ? (
                        skillNames.map((skill, idx) => (
                            <span
                                key={idx}
                                className="badge badge-ghost badge-xs text-gray-500"
                            >
                                {skill}
                            </span>
                        ))
                    ) : (
                        <span className="text-xs text-gray-400 italic">
                            Add skills in profile
                        </span>
                    )}
                </div>
            </div>

            <div className="divider my-0"></div>

            {/* Menu */}
            <ul className="menu p-2 text-sm">
                <li>
                    <Link to="/connections" className="flex justify-between">
                        <span className="flex gap-2 items-center">
                            <MdPeople /> Connections
                        </span>
                        <span className="badge badge-ghost badge-sm">
                            {stats.connectionCount}
                        </span>
                    </Link>
                </li>

                <li>
                    <Link to="/requests" className="flex justify-between">
                        <span className="flex gap-2 items-center">
                            <MdPersonAdd /> Requests
                        </span>
                        {stats.requestCount > 0 && (
                            <span className="badge badge-secondary badge-sm">
                                {stats.requestCount}
                            </span>
                        )}
                    </Link>
                </li>

                <li>
                    <Link to="/message" className="flex justify-between">
                        <span className="flex gap-2 items-center">
                            <MdChat /> Chat
                        </span>
                        {stats.unreadCount > 0 && (
                            <span className="badge badge-error badge-sm animate-pulse">
                                {stats.unreadCount}
                            </span>
                        )}
                    </Link>
                </li>
            </ul>

            <div className="p-3 border-t">
                <button
                    onClick={onShare}
                    className="btn btn-sm btn-ghost w-full gap-2"
                >
                    <BsShareFill /> Share Profile
                </button>
            </div>
        </div>
    )
}

export default SideProfileCard

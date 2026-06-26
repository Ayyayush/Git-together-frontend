import { useEffect, useState } from "react"
import axios from "axios"
import { BsLightbulb } from "react-icons/bs"
import { BASE_URL } from "../utils/constants"

const SuggestedSkills = () => {
    const [skills, setSkills] = useState([])

    useEffect(() => {
        const fetchSuggestedSkills = async () => {
            try {
                const res = await axios.get(
                    `${BASE_URL}/user/suggested-skills`,
                    { withCredentials: true }
                )
                setSkills(res?.data?.data || [])
            } catch {
                setSkills([])
            }
        }

        fetchSuggestedSkills()
    }, [])

    if (!skills.length) return null

    return (
        <div className="card w-full bg-base-100 shadow-md border">
            <div className="card-body p-4">
                <h3 className="card-title text-sm font-bold flex items-center gap-2">
                    <BsLightbulb className="text-yellow-500" />
                    Recommended Skills
                </h3>

                <p className="text-xs text-gray-500 mb-2">
                    Add these to boost your profile visibility.
                </p>

                <div className="flex flex-wrap gap-2">
                    {skills.map(skill => (
                        <span
                            key={skill.id}
                            className="badge badge-ghost badge-sm cursor-pointer hover:bg-primary hover:text-white transition"
                        >
                            + {skill.name}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default SuggestedSkills

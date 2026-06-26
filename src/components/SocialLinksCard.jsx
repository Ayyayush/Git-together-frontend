import { Link } from "react-router-dom"
import { BsGlobe } from "react-icons/bs"
import { FaGithub, FaTwitter, FaLinkedin } from "react-icons/fa"

const SocialLinksCard = ({ userData }) => {
    return (
        <div className="card bg-base-100 shadow-lg border hidden md:block w-full">
            <div className="card-body p-4">
                <div className="flex justify-between items-center mb-2">
                    <h3 className="font-bold text-sm">Social Presence</h3>
                    <Link to="/profile" className="text-xs text-primary">
                        Edit
                    </Link>
                </div>

                <div className="flex flex-col gap-2">
                    {userData?.githubUrl ? (
                        <a href={userData.githubUrl} target="_blank" rel="noreferrer">
                            <FaGithub /> GitHub
                        </a>
                    ) : (
                        <Link to="/profile" className="opacity-60">
                            <FaGithub /> Add GitHub
                        </Link>
                    )}

                    {userData?.linkedinUrl ? (
                        <a href={userData.linkedinUrl} target="_blank" rel="noreferrer">
                            <FaLinkedin /> LinkedIn
                        </a>
                    ) : (
                        <Link to="/profile" className="opacity-60">
                            <FaLinkedin /> Add LinkedIn
                        </Link>
                    )}

                    {userData?.twitterUrl ? (
                        <a href={userData.twitterUrl} target="_blank" rel="noreferrer">
                            <FaTwitter /> Twitter
                        </a>
                    ) : (
                        <Link to="/profile" className="opacity-60">
                            <FaTwitter /> Add Twitter
                        </Link>
                    )}

                    {userData?.portfolioUrl ? (
                        <a href={userData.portfolioUrl} target="_blank" rel="noreferrer">
                            <BsGlobe /> Portfolio
                        </a>
                    ) : (
                        <Link to="/profile" className="opacity-60">
                            <BsGlobe /> Add Portfolio
                        </Link>
                    )}
                </div>
            </div>
        </div>
    )
}

export default SocialLinksCard

import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import axios from "axios"
import toast from "react-hot-toast"

import { BASE_URL } from "../utils/constants"
import { createSocketConnection } from "../utils/socket"

import SideProfileCard from "./SideProfileCard"
import SocialLinksCard from "./SocialLinksCard"
import Skeleton from "./Skeleton"

const SideProfile = () => {
    const userData = useSelector(store => store.user.user)

    const [requestData, setRequestData] = useState([])
    const [connectionData, setConnectionData] = useState([])
    const [unreadCount, setUnreadCount] = useState(0)
    const [isLoading, setIsLoading] = useState(true)

    // --- Fetch unread count ---
    const fetchUnreadCount = async () => {
        try {
            const res = await axios.get(
                `${BASE_URL}/chat/unread-count`,
                { withCredentials: true }
            )
            setUnreadCount(res?.data?.data || 0)
        } catch (err) {
            console.error(err)
        }
    }

    // --- Share profile ---
    const handleShareProfile = () => {
        const profileUrl = `${window.location.origin}/profile`
        navigator.clipboard.writeText(profileUrl)
        toast.success("Profile link copied!")
    }

    // --- Load connections & requests ---
    useEffect(() => {
        if (!userData) return

        const fetchData = async () => {
            try {
                setIsLoading(true)

                const [connRes, reqRes] = await Promise.all([
                    axios.get(`${BASE_URL}/user/connections`, { withCredentials: true }),
                    axios.get(`${BASE_URL}/user/request/received`, { withCredentials: true }),
                ])

                setConnectionData(connRes?.data?.data || [])
                setRequestData(reqRes?.data?.data || [])
                fetchUnreadCount()

            } catch (error) {
                console.error("SideProfile error:", error)
            } finally {
                setIsLoading(false)
            }
        }

        fetchData()
    }, [userData])

    // --- Socket ---
    useEffect(() => {
        if (!userData?._id) return

        const socket = createSocketConnection()
        socket.emit("userOnline", userData._id)

        const handleUnreadUpdate = () => fetchUnreadCount()
        socket.on("unreadCountUpdated", handleUnreadUpdate)

        return () => {
            socket.off("unreadCountUpdated", handleUnreadUpdate)
            socket.disconnect()
        }
    }, [userData?._id])

    if (isLoading || !userData) return <Skeleton />

    return (
        <div className="w-full flex flex-col gap-4">
            <SideProfileCard
                userData={userData}
                stats={{
                    connectionCount: connectionData.length,
                    requestCount: requestData.length,
                    unreadCount
                }}
                onShare={handleShareProfile}
            />

            <SocialLinksCard userData={userData} />
        </div>
    )
}

export default SideProfile

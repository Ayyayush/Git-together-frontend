import { io } from "socket.io-client"
import { BASE_URL } from "./constants"

let socket = null

export const createSocketConnection = () => {
    if (!socket) {
        socket = io(BASE_URL, {
            withCredentials: true,
            transports: ["websocket"], // avoids polling issues
        })
    }
    return socket
}

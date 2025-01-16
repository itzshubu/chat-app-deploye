import React, { useEffect, useContext } from "react";
import { useSoketHook } from "./SocketContext";
import { ConversationContext } from "./ConversationContext";
import sound from "../assets/sound.mp3"


const useGetSocketMessage = () => {
    console.log(useSoketHook())
    const { socket } = useSoketHook()
    const { messages, setMessages } = useContext(ConversationContext)
     const sound2 = new Audio(sound)

    useEffect(() => {
        console.log("useEffect starts")
        if (socket) {
            socket.on("newMessage", (newMessage) => {
                setMessages([...messages, newMessage])
            });
            console.log("before return")
            return () => {
                console.log("return start")
                socket.off("newMessage");
                console.log("return end")
            }
        }
    }, [socket, messages, setMessages])
}

export default useGetSocketMessage










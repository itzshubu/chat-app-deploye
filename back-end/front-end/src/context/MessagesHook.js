import React, { useState, useContext, useEffect } from "react";
import { ConversationContext } from "./ConversationContext";

const useGetmessages = () => {
    const [loading, setLoading] = useState(false)
    let { conversation, setConversation, setMessages, messages } = useContext(ConversationContext)

    useEffect(() => {
        var getmessages = async () => {
            if (conversation && conversation._id) {
                try {
                    setLoading(true)
                    const res = await fetch(`/message/get/${conversation._id}`)
                    const data = await res.json()
                    console.log(data)
                    setMessages(data)
                    setLoading(false)
                } catch (error) {
                    console.log("Error in getting messages", error)
                }
            }
        }
        getmessages()
        
    }, [conversation])


    return { loading, messages }
}

export default useGetmessages












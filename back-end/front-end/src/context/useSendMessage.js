import axios from "axios"
import react, { useContext, useState } from 'react'
import { ConversationContext } from "./ConversationContext"

const useSendMessage = () => {
    const [loading, setLoading] = useState(false)
    console.log(useContext(ConversationContext))
    const { conversation, messages, setMessages } = useContext(ConversationContext)

    const sendMessages = async (message) => {
        try {
            setLoading(true)
            const response = await axios.post(`message/send/${conversation._id}`, {
                message
            })
            console.log(response)
            setMessages([...messages, response.data.newMessage])
        } catch (error) {
            console.log("error in send messages", error)
            setLoading(false)
        }
    }

    return { loading, sendMessages }
}


export default useSendMessage

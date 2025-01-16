import Conversation from "../models/conversation.model.js"
import Message from "../models/message.model.js"
import { getReceiverSocketId ,io } from "../socket.io/server.js"

export const sendMessage = async (req, res) => {
    try {
        // console.log("hello")
        const { id } = req.params
        let receiverId = id  //receverId
        const message = req.body.message
        const senderId = req.user._id
        // console.log("start")
        // console.log(id, message, senderId)
        // console.log("end")
        let conversation = await Conversation.findOne({
            members: { $all: [senderId, receiverId] }
        })
        // console.log("conversation", conversation, Conversation)
        if (!conversation) {
            conversation = await Conversation.create({
                members: [senderId, receiverId]
            })
        }
        // console.log("nobro", conversation)
        const newMessage = await new Message({
            senderId,
            receiverId,
            message
        })
        // console.log(newMessage)
        if (newMessage) {
            conversation.messages.push(newMessage._id)
        }

        await Promise.all([conversation.save(), newMessage.save()]);

        const receverSoketId = getReceiverSocketId(receiverId)
        if (receverSoketId) {
            io.to(receverSoketId).emit("newMessage",newMessage)
        }

        res.status(201).json({ message: "message send succesfully", newMessage })

    } catch (error) {
        console.log("internal server error2")
        res.status(500).json({ error: "internal server error", error })
    }
}


export const getMessage = async (req, res) => {
    try {
        // console.log("start")
        const { id } = req.params
        let receiverId = id  //receverId
        const message = req.body.message
        const senderId = req.user._id
        // console.log("middle")
        // console.log(receiverId, message, senderId)
        // console.log("end")
        let conversation = await Conversation.findOne({
            members: { $all: [senderId, receiverId] }
        }).populate('messages');
        if (!conversation) {
            return res.status(201).json([])
        }
        // console.log("messages form conversation" , conversation)
        const messages = conversation.messages
        res.status(201).json(messages)
    } catch (error) {
        console.log("internal server error getmessage")
        res.status(500).json({ error: "internal server error", error })
    }
}


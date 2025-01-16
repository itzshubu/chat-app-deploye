import mongoose from "mongoose";
import User from "./user.model.js";
import Messages from "./message.model.js";
const conversationSchema = mongoose.Schema({
    members: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: User,
        }
    ],
    messages: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: Messages,
            default: []
        }
    ]
}, { timestamps: true })
const Conversations = mongoose.model("Conversations", conversationSchema)
export default Conversations

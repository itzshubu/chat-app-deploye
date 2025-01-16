import mongoose from "mongoose";
import User  from "./user.model.js";

// console.log(mongoose.Schema.Types.ObjectId)

let messageSchema = new mongoose.Schema({
    senderId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : User,
        required : true,
    },
    receiverId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : User,
        required : true,
    },
    message : {
         type : String,
         required : true
    }
}, {timestamps: true}) //createdAt & updatedAt
const Messages = mongoose.model('messages' ,messageSchema)
export default Messages;
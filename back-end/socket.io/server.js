import { Server } from "socket.io";
import http from "http"
import express from "express"

// console.log(http)
const app = express()

const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
})

// console.log(io)
export const getReceiverSocketId = (receiverId) => {
    return users[receiverId]
}

let users = {}
// used to listen events on server side
io.on("connection", (socket) => {
    console.log("a user connected", socket.id)
    let userId = socket.handshake.query.userId
    users[userId] = socket.id
    console.log(users)

    //used to send the events to all the connected users
    io.emit("getOnlineUsers", Object.keys(users))

    //used to listen client side events emitted by server side (server & clien)
    socket.on("disconnect", () => {
        console.log("a user disconnected", socket.id)
        delete users[userId]
        io.emit("getOnlineUsers", Object.keys(users))
    })

})

export { app, io, server }

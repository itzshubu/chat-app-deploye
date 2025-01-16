import express from "express" 
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
import userRoute from "./routes/user.route.js"
import messageRoute from "./routes/message.route.js"
import cookieParser from "cookie-parser"
import { app , server } from "./socket.io/server.js"
import path from "path"

// const app = express()
app.use(cors())
app.use(express.json())
app.use(cookieParser())
dotenv.config()
 
const port = process.env.PORT || 5000
let MONGODB_URI = process.env.MONGODB_URI

mongoose.connect(MONGODB_URI).then(() => {
    console.log('Connected to MongoDB');
  }).catch(err => {
    console.error('Connection error:', err);
  });

// Middleware to remove `/api` prefix
// app.use('*', (req, res, next) => {
//   console.log("hello" , req.url)
//   // req.url = req.url.replace(/^\/api/, '');
//   next();
// }); 

app.use("/user",userRoute)
app.use("/message",messageRoute)

// app.get('/', (req, res) => {
//     // console.log(process.env.PORT)
//   res.send('Hello World!')
// })

//--------------------- code for deployment -------------
if(process.env.NODE_ENV === "production"){ 
  const dirPath = path.resolve()
  console.log("line 36 of index.js path.resolve()",dirPath)

  app.use(express.static("./front-end/dist"))
  app.get("*",(req, res)=>{
    res.sendFile(path.resolve(dirPath ,"./front-end/dist","index.html"))
  })
}

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
import express from "express"
import {sendMessage , getMessage} from "../controller/message.controller.js"
import secureroute from '../middleware/secureRoute.js'

const router = express.Router()
router.post("/send/:id",secureroute,sendMessage)
router.get("/get/:id",secureroute,getMessage)


export default router


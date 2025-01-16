import express from "express"
import { signup } from "../controller/user.controller.js"
import { login } from "../controller/user.controller.js"
import {logout} from "../controller/user.controller.js"
import {allUsers} from "../controller/user.controller.js"
import secureRoute from "../middleware/secureRoute.js"




// console.log(express)
const router = express.Router()

router.post("/signup",signup)
router.post("/login",login)
router.post("/logout",logout)
router.get("/allusers", secureRoute,allUsers)


export default router
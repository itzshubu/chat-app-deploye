import jwt from "jsonwebtoken"
import User from "../models/user.model.js"

  const secureRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        // console.log("hello",token)
        if (!token) {
            return res.status(401).json({ error: "no token , authentication denied" });
        }
        const decoded = jwt.verify(token, process.env.JWT_TOKEN)
        // console.log(decoded)
        if (!decoded) {
            res.status(401).json({ error: "Invalid token" })
        }
        const user = await User.findById(decoded.userId).select("-password")
        if (!user) {
            res.status(401).json({ error: "user not found" })
        }
        req.user = user;
        next()
    } catch (error) {
        console.log("error in secure route", error)
        res.status(500).json({ error: "internal server error" })
    }
}

export default secureRoute




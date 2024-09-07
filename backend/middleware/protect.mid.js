import jwt from "jsonwebtoken"
import { ENV_VARS } from "../config/envVars.js"
import { User } from "../modules/user.module.js"

export const protect = async (req, res, next) => {
    try {
        const token = req.cookies["jwt_token"]

        if (!token) {
            return res.status(401).json({ success: false, message: "Unauthorizad - token not found" })
        }

        const decoded = jwt.verify(token, ENV_VARS.JWT_SECRET)

        if (!decoded) {
            return res.status(401).json({ success: false, message: "Unauthorizad - Indalid token" })
        }


        const user = await User.findById(decoded.userId).select("-password")

        if (!user) {
            return res.status(400).json({ success: false, message: "User not found" })
        }


        req.user = user

        next()
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ success: false, message: "Internal server error" })
    }
}
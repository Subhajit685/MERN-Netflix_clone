import jwt from "jsonwebtoken";
import { ENV_VARS } from "../config/envVars.js";

export const genTokenAndSetCookie = (userId, res) => {
    try {
        const token = jwt.sign({ userId }, ENV_VARS.JWT_SECRET, { expiresIn: '15d' });

        res.cookie("jwt_token", token, {
            maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days in milliseconds
            httpOnly: true, // make it not accessible by JS
            sameSite: "strict", // prevents CSRF
            secure: ENV_VARS.NODE_ENV !== "development", // use HTTPS in production
        });

        return token;
    } catch (error) {
        console.error("Error generating token or setting cookie:", error);
        // Handle the error appropriately
    }
};

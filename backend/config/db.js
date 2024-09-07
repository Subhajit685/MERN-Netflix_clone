import mongoose from "mongoose";
import { ENV_VARS } from "./envVars.js";

export const connectDB = async () =>{
    try {
        const conn = await mongoose.connect(ENV_VARS.MONGO_URL)
        console.log(conn.connection.host)
    } catch (error) {
        console.log("connectionDb Error"+error.message)
        process.exit(1) // 1 for error and 0 for success
    }
};
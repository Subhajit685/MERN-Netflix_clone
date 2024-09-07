import express from "express"
import path from "path"
import cors from "cors"


import authRoute from "./route/auth.route.js"
import movieRoute from "./route/movie.route.js"
import tvRoute from "./route/tv.route.js"
import searchRoute from "./route/search.route.js"

import { ENV_VARS } from "./config/envVars.js"
import { connectDB } from "./config/db.js"
import { protect } from "./middleware/protect.mid.js"
import cookieParser from "cookie-parser"


const app = express()
const PORT = ENV_VARS.PORT
const allowedOrigins = ['http://localhost:5173', 'https://mern-netflix-clone-ezky.onrender.com'];

app.use(cors({
    origin : "http://localhost:5173",
    credentials : true,
    optionSuccessStatus:200
}));

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin, like mobile apps or curl requests
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    }
}));


// use middleware

app.use(express.static(path.resolve("/public")))
app.use(express.json())
app.use(cookieParser())


// use different route

app.use("/auth/api/v1", authRoute)
app.use("/movie/api/v1", protect, movieRoute)
app.use("/tv/api/v1", protect, tvRoute)
app.use("/search/api/v1", protect, searchRoute)

const __dirname = path.resolve()

console.log(__dirname)

if(ENV_VARS.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "/frontend/dist")))

    app.get("*", (req, res)=>{
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))
    })
}


// server listen

app.listen(PORT , ()=>{
    console.log("server listen at post : "+PORT)
    connectDB();
})


import express from "express"
import path from "path"
// import cors from "cors"


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


// const allowedOrigins = [
//     'http://localhost:5173', 
//     'https://mern-netflix-clone-ezky.onrender.com'
//   ];
  
//   app.use(cors({
//     origin: function (origin, callback) {
//       if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
//         callback(null, true);
//       } else {
//         callback(new Error('Not allowed by CORS'));
//       }
//     },
//     credentials: true,
//     optionSuccessStatus: 200
//   }));
  



// use middleware

app.use(express.static(path.resolve("/public")))
app.use(express.json())
app.use(cookieParser())


// use different route

app.use("/api/auth/v1", authRoute)
app.use("/api/movie/v1", protect, movieRoute)
app.use("/api/tv/v1", protect, tvRoute)
app.use("/api/search/v1", protect, searchRoute)

const __dirname = path.resolve()


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


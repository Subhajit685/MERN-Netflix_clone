import express from "express"
import { fetchFromTMDB } from "../services/themoviedb.services.js"

const route = express.Router()

route.get("/trending", async (req, res)=>{
    try {
        const data = await fetchFromTMDB("https://api.themoviedb.org/3/trending/movie/day?language=en-US")
        const rendomMovie = data.results[Math.floor(Math.random() * data.results?.length)]

        return res.status(200).json({success : true, content : rendomMovie})
    } catch (error) {
        console.log("ctrationerror : "+error.message)
        return res.status(500).json({success : false, message : "Internal server error"})
    }
})

route.get("/:id/trailer", async (req, res) =>{
    const {id} = req.params
    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`)
        return res.status(200).json({success : true, trailer : data.results})
    } catch (error) {
        if(error.message.includes("404")){
            return res.status(404).send(null)
        }
        console.log(error.message)
        return res.status(500).json({success : false, message : "Internal server error"})
    }
})

route.get("/:id/details", async (req, res)=>{
    const {id} = req.params
    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}?language=en-US`)
        return res.status(200).json({success : true, details : data})
    } catch (error) {
        if(error.message.includes("404")){
            return res.status(404).send(null)
        }
        console.log(error.message)
        return res.status(500).json({success : false, message : "Internal server error"})
    }
})

route.get("/:id/similer", async (req, res) =>{
    const {id} = req.params
    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`)
        return res.status(200).json({success : true, details : data.results})
    } catch (error) {
        return res.status(500).json({success : false, message : "Internal server error"})
    }
})

route.get("/:category", async (req, res)=>{
    const {category} = req.params
    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`)
        return res.status(200).json({success : true, details : data})
    } catch (error) {
        return res.status(500).json({success : false, message : "Internal server error"})
    }
})

export default route
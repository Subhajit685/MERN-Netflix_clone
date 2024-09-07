import express from "express"
import { fetchFromTMDB } from "../services/themoviedb.services.js"
import { User } from "../modules/user.module.js"

const route = express.Router()

route.get("/person/:person", async (req, res) =>{
    const {person} = req.params
    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/search/person?query=${person}&include_adult=false&language=en-US&page=1`)

        if(data.results.length === 0){
            return res.status(404).send(null)
        }

        await User.findByIdAndUpdate(req.user._id, {
            $push : {
                searchHistory : {
                    id : data.results[0].id,
                    image : data.results[0].profile_path,
                    name : data.results[0].name,
                    searchType : "person",
                    createdAt : new Date(),
                }
            }
        })

        return res.status(200).json({success : true, content : data.results})

    } catch (error) {
        console.log("ctrationerror : "+error.message)
        return res.status(500).json({success : false, message : "Internal server error"})
    }
})


route.get("/movie/:movie", async (req, res) =>{
    const {movie} = req.params
    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/search/movie?query=${movie}&include_adult=false&language=en-US&page=1`)

        if(data.results.length === 0){
            return res.status(404).send(null)
        }

        await User.findByIdAndUpdate(req.user._id, {
            $push : {
                searchHistory : {
                    id : data.results[0].id,
                    image : data.results[0].poster_path,
                    name : data.results[0].title,
                    searchType : "movie",
                    createdAt : new Date(),
                }
            }
        })

        return res.status(200).json({success : true, content : data.results})

    } catch (error) {
        console.log("ctrationerror : "+error.message)
        return res.status(500).json({success : false, message : "Internal server error"})
    }
})

route.get("/tv/:tv", async (req, res) =>{
    const {tv} = req.params
    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/search/tv?query=${tv}&include_adult=false&language=en-US&page=1`)

        if(data.results.length === 0){
            return res.status(404).send(null)
        }

        await User.findByIdAndUpdate(req.user._id, {
            $push : {
                searchHistory : {
                    id : data.results[0].id,
                    image : data.results[0].poster_path,
                    name : data.results[0].name,
                    searchType : "tv",
                    createdAt : new Date(),
                }
            }
        })

        return res.status(200).json({success : true, content : data.results})

    } catch (error) {
        console.log("ctrationerror : "+error.message)
        return res.status(500).json({success : false, message : "Internal server error"})
    }
})

route.get("/history", async (req, res) =>{
    try {
        return res.status(200).json({success : true, history : req.user.searchHistory})
    } catch (error) {
        console.log("ctrationerror : "+error.message)
        return res.status(500).json({success : false, message : "Internal server error"})
    }
})

route.delete("/history/:id", async (req, res) =>{
    let {id} = req.params
    id = parseInt(id)
    try {
        await User.findByIdAndUpdate(req.user._id, {
            $pull : {
                searchHistory : {id : id}
            }
        })

        return res.status(200).json({success : true, message : "History delete successfully"})
    } catch (error) {
        console.log("ctrationerror : "+error.message)
        return res.status(500).json({success : false, message : "Internal server error"})
    }

})

export default route
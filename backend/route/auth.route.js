import express from "express";
import { User } from "../modules/user.module.js";
import bcryptjs from "bcryptjs"
import { genTokenAndSetCookie } from "../utils/genToken.js";
import { protect } from "../middleware/protect.mid.js";


const route = express.Router()

// different route od auth

// Sing Up

route.post("/singup", async (req, res) =>{
    try {
        const {name, email, password} = req.body;
        if(!name || !email || !password){
            return res.status(400).json({success : false, message : "All fields required"})
        }

        const emailRegex = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;

        if(!emailRegex.test(email)){
            return res.status(400).json({success : false, message : "Invalid email"})
        }

        if(password.length<8){
            return res.status(400).json({success : false, message : "Password must have 8 chracters"})
        }

        const userPassword = await User.findOne({email});
        if(userPassword){
            return res.status(400).json({success : false, message : "Email already exists"})
        }

        const salt = await bcryptjs.genSalt(10);
        const hashPassword = await bcryptjs.hash(password, salt)

        const newuser = await User({
            name,
            email,
            password : hashPassword,
            userImage : "/usericon.png"
        })
        genTokenAndSetCookie(newuser._id, res)
        await newuser.save()

        return res.status(200).json({success : true, user : {
            ...newuser._doc,
            password : ""
        }})
    } catch (error) {
        console.log("ctrationerror : "+error.message)
        return res.status(500).json({success : false, message : "Internal server error"})
    }
})

// Login 

route.post("/login", async (req, res) =>{
    try {
        const {email, password} = req.body

        if(!email || !password){
            return res.status(400).json({success : false, message : "All fields required"})
        }

        const validUser = await User.findOne({email})

        if(!validUser){
            return res.status(400).json({success : false, message : "User not found"})
        }

        const validPassword = await bcryptjs.compare(password, validUser.password)

        if(!validPassword){
            return res.status(400).json({success : false, message : "Invalid credentials"})
        }

        genTokenAndSetCookie(validUser._id, res)

        return res.status(200).json({success : true, user : {
            ...validUser._doc,
            password : ""
        }})
    } catch (error) {
        console.log("ctrationerror : "+error.message)
        return res.status(500).json({success : false, message : "Internal server error"})
    }
})

// Logout

route.get("/logout", (req, res) =>{
    try {
        res.clearCookie("jwt_token")
        return res.status(200).json({success : true, message : "logout successfully"})
        
    } catch (error) {
        console.log("logout : "+error.message)
        return res.status(500).json({success : false, message : "Internal server error"})
    }
})

// checkAuth 

route.get("/check", protect, async (req, res)=>{
    try {
        return res.status(200).json({success : true, user : req.user})
    } catch (error) {
        console.log("logout : "+error.message)
        return res.status(500).json({success : false, message : "Internal server error"})
    }
})

export default route

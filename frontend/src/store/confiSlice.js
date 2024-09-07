import { create } from 'zustand'
import axios from 'axios';
import toast from "react-hot-toast"

export const useAuthStor = create((set) =>({
    user : null,
    isSigningUP : false,
    islogout : false,
    isAuth : true,
    isLogin : false,
    singup : async (crenditial) =>{
        set({isSigningUP : true})
        try {
            const responce = await axios.post("/api/auth/v1/singup", crenditial)
            set({user : responce.data.user, isSigningUP : false})
            toast.success("Account created successfully")
        } catch (error) {
            set({user : null, isSigningUP : false})
            toast.error(error.response.data.message || "En error")
        }
    },
    login : async (crenditial) =>{
        set({isLogin : true})
        try {
            const responce = await axios.post("/api/auth/v1/login", crenditial)
            set({user : responce.data.user, isLogin : false})
            toast.success("Login successfully")
        } catch (error) {
            set({user : null, isLogin : false})
            toast.error(error.response.data.message || "En error")
        }
    },
    logout : async () =>{
        set({islogout : true})
        try {
            await axios.get("/api/auth/v1/logout")
            set({user : null, islogout : false})
            toast.success("Logged out successfully")
        } catch (error) {
            set({islogout : false})
            toast.error(error.response.data.message || "En error")
        }
    },

    checkAuth : async () =>{
        set({isAuth : true})
        try {
            const responce = await axios.get("/api/auth/v1/check")
            set({user : responce.data.user, isAuth : false})
        } catch (error) {
            set({user : null, isAuth : false})
        }
    }

}))
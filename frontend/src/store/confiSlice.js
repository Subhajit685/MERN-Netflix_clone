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
            const responce = await axios.post("http://localhost:5000/auth/api/v1/singup", crenditial, {withCredentials: true})
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
            const responce = await axios.post("http://localhost:5000/auth/api/v1/login", crenditial, {withCredentials: true})
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
            await axios.get("http://localhost:5000/auth/api/v1/logout", {withCredentials: true})
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
            const responce = await axios.get("http://localhost:5000/auth/api/v1/check", {withCredentials: true})
            set({user : responce.data.user, isAuth : false})
        } catch (error) {
            set({user : null, isAuth : false})
        }
    }

}))
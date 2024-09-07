import { create } from "zustand";

export const useContent = create((set)=>({
    contentType : "movie",
    setContentType : (type) =>{
        set({contentType : type})
    },
}))
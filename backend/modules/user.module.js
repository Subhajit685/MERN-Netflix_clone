import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
    },
    email : {
        type : String,
        required : true,
        unique : true,
    },
    password : {
        type : String,
        required : true,
    },
    searchHistory : {
        type : Array,
        default : [],
    },
    userImage : {
        type : String,
        default : ""
    },
    time : {
        type : Date,
        default : Date.now
    }
});

export const User = new mongoose.model("User", userSchema)

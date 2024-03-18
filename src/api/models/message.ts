import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    username: { type: String, require: true },
    userId: { type: String, require: true },
    userEmail: { type: String, require: true },
    anonymousName: { type: String, require: true },
    anonymousLink:{type:String, require:true},
    messageBox:{type:Array}
})

export const messageModel = mongoose.model("message", messageSchema)
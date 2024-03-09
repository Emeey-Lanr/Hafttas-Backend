import mongoose from "mongoose";

const userSchema = new  mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    img_url:{type:String}
})

export const userModel = mongoose.model("users", userSchema)
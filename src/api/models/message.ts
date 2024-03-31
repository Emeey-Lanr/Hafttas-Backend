import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  username: { type: String, require: true },
  email: { type: String, require: true },
  title: { type: String, require: true },
  description: { type: String, require: true },
  limit: { type: String, require: true },
  link: { type: String, require: true },
  messageBox: { type: Array },
});

export const messageModel = mongoose.model("message", messageSchema)
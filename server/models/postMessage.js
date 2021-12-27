import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  title: String,
  message: String,
  userId: String,
  creatorId: String,
  tags: [String],
  selectedFile: String,
  likes: [String],
  createdAt: { type: Date, default: new Date().getTime() },
});

const postMessage = mongoose.model("PostMessage", postSchema);
export default postMessage;

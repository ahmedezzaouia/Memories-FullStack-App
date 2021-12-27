import postMessage from "../models/postMessage.js";
import mongoose from "mongoose";

export const getPosts = async (req, res) => {
  try {
    const posts = await postMessage.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

export const createPost = async (req, res) => {
  console.log("creatPost in server");
  try {
    console.log(req.body);
    const userId = req.userId;
    if (!userId) return res.status(400).json({ message: "unauthorization user" });
    const post = req.body;
    const newPost = new postMessage({ ...post, creatorId: userId });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  const post = req.body;
  const { id: _id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("no post with that id");

    const updatedPost = await postMessage.findByIdAndUpdate(_id, post, {
      new: true,
    });
    res.status(201).json(updatedPost);
  } catch (error) {
    console.log(error);
  }
};

export const deletePost = async (req, res) => {
  const { id: _id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("no post with that id");
    await postMessage.findByIdAndRemove(_id);
    res.json({ message: "post deleted successfully" });
  } catch (error) {
    console.log(error);
  }
};

export const likePost = async (req, res) => {
  try {
    const userId = req.userId;
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ message: "post not found with that id" });
    const post = await postMessage.findById(id);
    const index = post.likes.findIndex((like) => like === userId);
    if (index === -1) post.likes.push(userId);
    else post.likes.splice(index, 1);
    const updatedpost = await post.save();
    res.status(201).json(updatedpost);
  } catch (error) {
    res.json(error);
  }
};

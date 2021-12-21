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
  const post = req.body;
  // if (!post) throw "post is empty";
  const newPost = new postMessage(post);
  try {
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
    if (!mongoose.Types.ObjectId.isValid(_id))
      return res.status(404).send("no post with that id");

    const updatedPost = await postMessage.findByIdAndUpdate(_id, post, {
      new: true,
    });
    res.json(updatedPost);
  } catch (error) {
    console.log(error);
  }
};

export const deletePost = async (req, res) => {
  const { id: _id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(_id))
      return res.status(404).send("no post with that id");
    await postMessage.findByIdAndRemove(_id);
    res.json({ message: "post deleted successfully" });
  } catch (error) {
    console.log(error);
  }
};

export const likePost = async (req, res) => {
  try {
    const { id: _id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(_id))
      return res.send("No post with that id ");
    const post = await postMessage.findById(_id);
    const updatedLikes = await postMessage.findByIdAndUpdate(
      _id,
      { likesCount: post.likesCount + 1 },
      { new: true }
    );
    res.json(updatedLikes);
  } catch (error) {
    console.log(error);
  }
};

import userModel from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const signUp = async (req, res) => {
  try {
    const userData = req.body;
    const existUser = await userModel.findOne({ email: userData.email });
    if (existUser) return res.status(400).send("user already exist,login instead");
    userData.name = userData.firstName + " " + userData.lastName;
    const password = userData.password;
    const hashedPassword = await bcrypt.hash(password, 12);
    const createdUser = new userModel({ ...userData, password: hashedPassword });
    await createdUser.save();
    const token = jwt.sign({ email: createdUser.email, id: createdUser._id }, "user", { expiresIn: "1h" });
    res.status(201).json({ token, result: createdUser });
  } catch (error) {
    res.status(500).json({ message: "somthing went wrong check signUp in Controller model at server" });
    console.log(error);
  }
};

export const signIn = async (req, res) => {
  try {
    console.log("signIn in server run");
    const { password, email } = req.body;
    const existUser = await userModel.findOne({ email });
    if (!existUser) return res.status(404).json({ message: "email not found" });
    const validPassword = await bcrypt.compare(password, existUser.password);
    if (!validPassword) return res.status(400).json({ message: "password not correct" });
    const token = jwt.sign({ email: existUser.email, id: existUser._id }, "user", { expiresIn: "1h" });
    res.status(200).json({ token, result: existUser });
  } catch (error) {
    res.status(500).json({ message: "somthing went wrong check signin in Controller model at server" });
  }
};

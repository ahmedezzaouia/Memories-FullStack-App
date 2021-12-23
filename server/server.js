import cors from "cors";
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import postRoutes from "./routes/posts.js";
import dotenv from "dotenv";
import userRoutes from "./routes/user.js";

const PORT = process.env.PORT || 5000;
dotenv.config();
const app = express();

mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT);
    console.log(`server running on port ${PORT}`);
  })
  .catch((error) => {
    console.log(error.message);
  });
// mongoose.set("useFindAndModify", false);
app.use(cors());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.get("/", (req, res) => {
  res.send("Home Page");
});
app.use("/user", userRoutes);
app.use("/posts", postRoutes);

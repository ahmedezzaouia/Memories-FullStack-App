import cors from "cors";
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import postRoutes from "./routes/posts.js";
import dotenv from "dotenv";

const PORT = process.env.PORT || 5000;
dotenv.config();
const app = express();
// const CONNECTION_URL =
//   "mongodb+srv://ahmed:superNova20@cluster0.fvksi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

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
app.use("/posts", postRoutes);

import jwt, { decode } from "jsonwebtoken";

const auth = (req, res, next) => {
  //   console.log(req);
  try {
    const token = req.authorization.split(" ")[1];
    if (!token) return res.status(400).json({ message: "you should add token to requist" });
    let decodedData;
    if (token.length < 500) {
      decodedData = jwt.verify(token, "user");
      req.userId = decodedData?.id;
    } else {
      decodedData = decode(token);
      req.userId = decodedData?.sub;
    }
    if (decodedData) {
      next();
    } else res.status(500).json({ message: "somthing went wrong with auth midllware" });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export default auth;

import jwt, { decode } from "jsonwebtoken";

const auth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    console.log("authorization = " + token);
    if (!token) return res.status(400).json({ message: "you should add token to requist" });
    let decodedData;

    if (token.length < 500) {
      decodedData = jwt.verify(token, "user");
      req.userId = decodedData?.id;
      console.log("decodedData " + decodedData);
    } else {
      decodedData = decode(token);
      req.userId = decodedData?.sub;
      console.log("decodedData " + decodedData);
    }

    if (decodedData) {
      next();
    } else res.status(400).json({ message: "somthing went wrong with auth midllware" });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export default auth;

import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      throw new Error("Authorization token missing");
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    if (!decodedToken) {
      throw new Error("Invalid token");
    }

    const userId = decodedToken.userId;

    const currentTimestamp = Math.floor(Date.now() / 1000);
    if (decodedToken.exp < currentTimestamp) {
      throw new Error("Token expired");
    }

    req.auth = {
      userId: userId,
    };

    next();
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

export default authMiddleware;

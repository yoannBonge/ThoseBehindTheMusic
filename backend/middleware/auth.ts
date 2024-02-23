import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

interface AuthRequest extends Request {
  auth?: {
    userId: string;
  };
}

const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token: string | undefined = req.headers.authorization?.split(" ")[1];

    if (!token) {
      throw new Error("Authorization token missing");
    }

    const decodedToken: any = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    );

    if (!decodedToken) {
      throw new Error("Invalid token");
    }

    const userId: string = decodedToken.userId;

    req.auth = {
      userId: userId,
    };

    next();
  } catch (error: any) {
    res.status(401).json({ error: error.message });
  }
};

export default authMiddleware;

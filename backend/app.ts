import express, { Application, Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import path from "path";
import dotenv from "dotenv";

import composersRoutes from "./routes/composers";
import userRoutes from "./routes/user";

dotenv.config();

const app: Application = express();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log("Connexion à MongoDB réussie !");
  } catch (error) {
    console.error("Connexion à MongoDB échouée :", error);
    process.exit(1);
  }
};

connectDB();

app.use(express.json());

app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/api/composers", composersRoutes);
app.use("/api/auth", userRoutes);

export default app;

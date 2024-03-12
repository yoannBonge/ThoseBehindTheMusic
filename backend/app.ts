import express, { Application, Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import path from "path";
import dotenv from "dotenv";
import cors from "cors";

import composersRoutes from "./routes/composers";
import userRoutes from "./routes/user";
import errorHandler from "./middleware/errorHandler";

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
app.use(cors());

app.options("*", cors());

app.use("/api/composers", composersRoutes);
app.use("/api/auth", userRoutes);
app.use(errorHandler);

export default app;

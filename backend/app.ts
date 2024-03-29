import cors from "cors";
import dotenv from "dotenv";
import express, { Application } from "express";
import mongoose from "mongoose";

import errorHandler from "./middleware/errorHandler";
import composersRoutes from "./routes/composers";
import mailRoutes from "./routes/mail";
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

app.use(express.json({ limit: "5mb" }));
app.use(cors());

app.options("*", cors());

app.use("/api/composers", composersRoutes);
app.use("/api/auth", userRoutes);
app.use("/api/mail", mailRoutes);

app.use(errorHandler);

export default app;

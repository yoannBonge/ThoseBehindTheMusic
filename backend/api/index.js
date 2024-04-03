import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";

import errorHandler from "../middleware/errorHandler";
import composersRoutes from "./routes/composersRoutes";
import mailRoutes from "./routes/mailRoutes";
import userRoutes from "./routes/userRoutes";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: ["https://those-behind-the-music.vercel.app"],
    methods: ["GET", "POST", "PUT", "OPTIONS"],
    credentials: true,
  })
);

app.use(express.json());

const connectDB = () => {
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
      console.log("Connexion à MongoDB réussie !");
    })
    .catch((error) => {
      console.error("Connexion à MongoDB échouée :", error);
      process.exit(1);
    });
};

connectDB();

app.use("/api/composers", composersRoutes);
app.use("/api/auth", userRoutes);
app.use("/api/mail", mailRoutes);

app.use(errorHandler);

module.exports = app;

export default app;

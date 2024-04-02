import cors from "cors";
import dotenv from "dotenv";
import express, { Application, Request, Response } from "express";
import mongoose from "mongoose";

import errorHandler from "./middleware/errorHandler";
import composersRoutes from "./routes/composers";
import mailRoutes from "./routes/mail";
import userRoutes from "./routes/user";

dotenv.config();

const app: Application = express();

app.use(
  cors({
    origin: ["https://those-behind-the-music.vercel.app"],
    methods: ["GET", "POST", "PUT"],
    credentials: true,
  })
);

app.use(express.json());

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

app.get("/", (req: Request, res: Response) => {
  res.send("Backend is up and running!");
});

app.use("/api/composers", composersRoutes);
app.use("/api/auth", userRoutes);
app.use("/api/mail", mailRoutes);

app.use(errorHandler);

export default app;

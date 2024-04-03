import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";

import errorHandler from "./middleware/errorHandler";
import composersRoutes from "./routes/composers";
import mailRoutes from "./routes/mail";
import userRoutes from "./routes/user";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: ["https://those-behind-the-music.vercel.app"],
    methods: ["GET", "POST", "PUT"],
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

app.get("/", (req, res) => {
  res.json("Backend is up and running!");
});

app.use("/api/composers", composersRoutes);
app.use("/api/auth", userRoutes);
app.use("/api/mail", mailRoutes);

app.use(errorHandler);

app.listen(3000, () => {
  console.log("Server is running");
});

export default app;

const cors = require("cors");
const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");

const errorHandler = require("../middleware/errorHandler");
const composersRoutes = require("../routes/composers");
const mailRoutes = require("../routes/mail");
const userRoutes = require("../routes/user");

dotenv.config();

const app = express();

app.use(
  cors({
    // origin: ["http://localhost:5173"],
    origin: ["https://those-behind-the-music.vercel.app"],
    methods: ["GET", "POST", "PUT", "OPTIONS"],
    credentials: true,
  })
);

app.use(express.json({ limit: "5mb" }));

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

app.use("/composers", composersRoutes);
app.use("/auth", userRoutes);
app.use("/mail", mailRoutes);

app.use(errorHandler);

module.exports = app;

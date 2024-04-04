const cors = require("cors");
const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");

const errorHandler = require("../middleware/errorHandler");
const composersRoutes = require("./routes/composersRoutes");
const mailRoutes = require("./routes/mailRoutes");
const userRoutes = require("./routes/userRoutes");

dotenv.config();

const app = express();

app.use(
  cors({
    origin: ["https://those-behind-the-music.vercel.app"],
    methods: ["GET", "POST", "PUT", "OPTIONS"],
    credentials: true,
  })
);
//
// http://localhost:5173

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

app.get("/api/test", (req, res) => {
  console.log("Endpoint /api/test atteint !");
  res
    .status(200)
    .json({ message: "L'application backend fonctionne correctement !" });
});

app.use("/api/composers", composersRoutes);
app.use("/api/auth", userRoutes);
app.use("/api/mail", mailRoutes);

app.use(errorHandler);

app.listen(process.env.PORT || 5173, () => {
  console.log(`Serveur démarré sur le port ${process.env.PORT || 5173}`);
});

module.exports = app;

// export default app;

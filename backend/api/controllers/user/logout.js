const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

dotenv.config();

const logout = (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Vous n'êtes pas authentifié." });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    res.status(200).json({ message: "Déconnexion réussie." });
  } catch (error) {
    res.status(401).json({
      message:
        "Votre connexion a probablement expiré, vous êtes donc déjà déconnecté(e)",
    });
  }
};

module.exports = logout;

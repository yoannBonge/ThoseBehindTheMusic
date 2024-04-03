import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

import User from "../../models/User";

export const signup = (req, res) => {
  User.findOne({ email: req.body.email })
    .then((existingUser) => {
      if (existingUser) {
        return res.status(400).json({
          message: "Un compte est déjà affilié à cette adresse mail.",
        });
      }

      bcrypt
        .hash(req.body.password, 10)
        .then((hash) => {
          const user = new User({
            email: req.body.email,
            password: hash,
            admin: false,
          });
          user
            .save()
            .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
            .catch((error) => res.status(400).json({ error }));
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

export const login = (req, res) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res
          .status(401)
          .json({ message: "Paire email/mot de passe incorrecte" });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res
              .status(401)
              .json({ message: "Paire email/mot de passe incorrecte" });
          }

          const isAdmin = user.admin;

          const token = jwt.sign(
            {
              userId: user._id,
              isAdmin: isAdmin,
            },
            process.env.JWT_SECRET,
            { expiresIn: "4H" }
          );

          const tokenExpiration = new Date(
            new Date().getTime() + 4 * 60 * 60 * 1000
          ).toISOString();

          res.status(200).json({
            userId: user._id,
            token: token,
            tokenExpiration: tokenExpiration,
            email: user.email,
            isAdmin: isAdmin,
          });
          // console.log(token);
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

export const logout = (req, res) => {
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

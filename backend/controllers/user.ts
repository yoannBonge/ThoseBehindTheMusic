import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

import User from "../models/User";

export const signup = (req: Request, res: Response) => {
  User.findOne({ email: req.body.email })
    .then((existingUser: any) => {
      if (existingUser) {
        return res.status(400).json({
          message: "Un compte est déjà affilié à cette adresse mail.",
        });
      }

      bcrypt
        .hash(req.body.password, 10)
        .then((hash: string) => {
          const user = new User({
            email: req.body.email,
            password: hash,
            admin: false,
          });
          user
            .save()
            .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
            .catch((error: any) => res.status(400).json({ error }));
        })
        .catch((error: any) => res.status(500).json({ error }));
    })
    .catch((error: any) => res.status(500).json({ error }));
};

export const login = (req: Request, res: Response) => {
  User.findOne({ email: req.body.email })
    .then((user: any) => {
      if (!user) {
        return res
          .status(401)
          .json({ message: "Paire email/mot de passe incorrecte" });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid: boolean) => {
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
            process.env.JWT_SECRET!,
            { expiresIn: "2H" }
          );

          res.status(200).json({
            userId: user._id,
            token: token,
            isAdmin: isAdmin,
          });
          // console.log(token);
        })
        .catch((error: any) => res.status(500).json({ error }));
    })
    .catch((error: any) => res.status(500).json({ error }));
};

export const logout = (req: Request, res: Response) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Vous n'êtes pas authentifié." });
  }

  try {
    const decodedToken: any = jwt.verify(token, process.env.JWT_SECRET!);
    res.status(200).json({ message: "Déconnexion réussie." });
  } catch (error) {
    res.status(401).json({
      message:
        "Votre connexion a probablement expiré, vous êtes donc déjà déconnecté(e)",
    });
  }
};

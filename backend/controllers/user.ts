import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

import User from "../models/User";

export const signup = (req: Request, res: Response) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash: string) => {
      const user = new User({
        email: req.body.email,
        password: hash,
      });
      user
        .save()
        .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
        .catch((error: any) => res.status(400).json({ error }));
    })
    .catch((error: any) => res.status(500).json({ error }));
};

export const login = (req: Request, res: Response) => {
  User.findOne({ email: req.body.email })
    .then((user: any) => {
      if (!user) {
        return res
          .status(401)
          .json({ message: "Paire login/mot de passe incorrecte" });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid: boolean) => {
          if (!valid) {
            return res
              .status(401)
              .json({ message: "Paire login/mot de passe incorrecte" });
          }
          res.status(200).json({
            userId: user._id,
            token: jwt.sign(
              {
                userId: user._id,
              },
              process.env.JWT_SECRET!,
              { expiresIn: "2H" }
            ),
          });
        })
        .catch((error: any) => res.status(500).json({ error }));
    })
    .catch((error: any) => res.status(500).json({ error }));
};

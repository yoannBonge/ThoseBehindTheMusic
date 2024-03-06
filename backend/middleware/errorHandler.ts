import { Request, Response, NextFunction } from "express";

const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error("Une erreur s'est produite :", err);

  // Envoi d'une réponse au client avec le statut 500
  res.status(500).json({
    error: "Une erreur s'est produite sur le serveur.",
  });
};

export default errorHandler;

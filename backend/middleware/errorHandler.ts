import { NextFunction, Request, Response } from "express";

const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error("Une erreur s'est produite :", err);

  res.status(500).json({
    error: "Une erreur s'est produite sur le serveur.",
  });
};

export default errorHandler;

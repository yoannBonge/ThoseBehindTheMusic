import { NextFunction, Request, Response } from "express";

const allowCrossDomain = (req: Request, res: Response, next: NextFunction) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://those-behind-the-music.vercel.app/"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");

  if (req.method === "OPTIONS") {
    res.sendStatus(204);
  } else {
    next();
  }
};

export default allowCrossDomain;

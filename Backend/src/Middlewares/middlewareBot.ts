import { Request, Response, NextFunction } from "express";
import { HASH_SECRET } from "../conf";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { hash } = req.headers;

    if (!hash) {
      return res.status(401).json(["No token, authorization denied"]);
    }

    if (hash !== HASH_SECRET) {
      return res.status(401).json(["No token, authorization denied"]);
    }
    next();
  } catch (error) {
    return res.status(500).json(["Internal Server Error"]);
  }
};

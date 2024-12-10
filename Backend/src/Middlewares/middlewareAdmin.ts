import jwt, { JwtPayload, VerifyErrors } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { TOKEN_SECRET } from "../conf";
import { TokenPayload } from "../types";
import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).json(["No token, authorization denied"]);
    }

    jwt.verify(
      token,
      TOKEN_SECRET,
      async (
        err: VerifyErrors | null,
        decoded: JwtPayload | string | undefined
      ) => {
        if (err) {
          console.log(err);
          return res.status(401).json(["Token is not valid"]);
        }

        const userFound = await prisma.user.findUnique({
          where:{
            id: (decoded as TokenPayload).id
          }
        })

        if (userFound?.role === "USER") {
          return res.status(401).json(["Acceso Denegado"]);
        }

        req.userId = (decoded as TokenPayload).id;
        next();
      }
    );
  } catch (error) {
    return res.status(500).json(["Internal Server Error"]);
  }
};

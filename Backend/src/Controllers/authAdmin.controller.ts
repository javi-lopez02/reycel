import {Request, Response} from 'express'
import {PrismaClient} from '@prisma/client'
import bcryptjs from 'bcryptjs'
import {createToken} from '../Libs/jwt'
import jwt from 'jsonwebtoken'
import { TokenPayload } from '../types'
import { TOKEN_SECRET } from '../conf'

const prisma = new PrismaClient()


export const loginAdmin = async (req: Request, res: Response) => {
  try {
    const { userName, password } = req.body;

    if (!userName || !password) {
      return res
        .status(401)
        .json(["Nesecita email y contraseña para logearce"]);
    }

    const user = await prisma.user.findFirst({
      where: {
        username: userName,
      },
    });

    if (!user || user.role === "USER") {
      return res.status(401).json(["Usuario no Valido"]);
    }

    const isMatch = await bcryptjs.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json(["Credenciales Incorrentas"]);
    }

    const token = await createToken(String(user.id));

    res.cookie("token", token, {
      httpOnly: false,
      secure: true,
      sameSite: "none",
    });
    res.json({
      username: user.username,
      userRole: user.role,
      userId: user.id,
      image: user.image
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(["Error del servidor"]);
  }
};


export const verifyTokenAdmin = async (req: Request, res: Response) => {
  try {
    const { token } = req.cookies;
    if (!token) return res.status(401);

    const decode = jwt.verify(token, TOKEN_SECRET) as TokenPayload;
    if (!decode) return res.status(401);

    const userFound = await prisma.user.findUnique({
      where: { id: decode.id },
    });

    if (!userFound || userFound.role === "USER") return res.status(401).json(["User Not Valid"]);

    return res.json({
      userId: userFound.id,
      username: userFound.username,
      userRole: userFound.role,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(["Error del servidor"]);
  }
};


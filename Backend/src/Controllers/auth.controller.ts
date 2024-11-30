import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcryptjs from "bcryptjs";
import { createToken } from "../Libs/jwt";
import { TOKEN_SECRET } from "../conf";
import jwt from "jsonwebtoken";
import { type TokenPayload } from "../types";
import { sendEmail } from "../Libs/mail.conf";

const prisma = new PrismaClient();

export const register = async (req: Request, res: Response) => {
  try {
    const { username, password, email } = req.body;

    const emailfind = await prisma.user.findFirst({ where: { email } });
    const userfind = await prisma.user.findFirst({ where: { username } });

    if (emailfind || userfind) {
      return res.status(500).json(["Email o Username en uso"]);
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        status: false,
      },
    });

    const token = await createToken(String(newUser.id));

    //await sendEmail(email, username, token);

    res.cookie("token", token, {
      httpOnly: false,
      secure: true,
      sameSite: "none",
    });

    res.json({
      userId: newUser.id,
      usermane: newUser.username,
      status: newUser.status,
      email: newUser.email,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json(["Server Error"]);
  }
};

export const confirmEmail = async (req: Request, res: Response) => {
  try {
    const { token } = req.params;

    if (!token) {
      return res.status(401).json(["Usuario no validado"]);
    }

    const decode = jwt.verify(token, TOKEN_SECRET) as TokenPayload;

    const user = await prisma.user.findUnique({
      where: {
        id: decode.id,
      },
    });

    if (!user) {
      return res.status(404).json(["Usuario no encontrado"]);
    }

    await prisma.user.update({
      where: {
        id: decode.id,
      },
      data: {
        status: true,
      },
    });

    res.cookie("token", token, {
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: "none",
      secure: true,
      httpOnly: true,
    });

    return res.json(["Usuario Verificado "]);
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      console.error("Error de JWT", error);
      return res.status(401).json(["Token is not valid"]);
    } else {
      console.error("Error interno del servidor ", error);
      return res.status(500).json(["Internal server error"]);
    }
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(401)
        .json(["Nesecita email y contraseña para logearce"]);
    }

    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (!user) {
      return res.status(401).json(["Usuario no encontrado"]);
    }

    const isMatch = await bcryptjs.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json(["Contraseña incorrecta"]);
    }

    const token = await createToken(String(user.id));

    res.cookie("token", token, {
      httpOnly: false,
      secure: true,
      sameSite: "none",
    });
    res.json({
      username: user.username,
      email: user.email,
      status: user.status,
      userId: user.id,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(["Error del servidor"]);
  }
};

export const verifyToken = async (req: Request, res: Response) => {
  try {
    const { token } = req.cookies;
    if (!token) return res.send(false);

    const decode = jwt.verify(token, TOKEN_SECRET) as TokenPayload;
    if (!decode) return res.status(401);

    const userFound = await prisma.user.findUnique({
      where: { id: decode.id },
    });

    if (!userFound) return res.status(401).json(["User Not found"]);

    return res.json({
      userId: userFound.id,
      username: userFound.username,
      status: userFound.status,
      email: userFound.email,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(["Error del servidor"]);
  }
};

export const logout = (req: Request, res: Response) => {
  res.cookie("token", "", {
    httpOnly: false,
    secure: true,
    sameSite: "none",
  });
  return res.status(200).json({ message: "logout" });
};

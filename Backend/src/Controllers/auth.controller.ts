import e, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcryptjs from "bcryptjs";
import { createToken } from "../Libs/jwt";
import { TOKEN_SECRET } from "../conf";
import jwt from "jsonwebtoken";
import { type TokenPayload } from "../types";
import { sendEmail, sendPasswordResetEmail } from "../Libs/mail.conf";

const prisma = new PrismaClient();

export const register = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;

    const userfind = await prisma.user.findFirst({
      where: {
        OR: [
          {
            username: username,
          },
          {
            email: email,
          },
        ],
      },
    });

    if (userfind) {
      console.log("email en uso");
      return res.status(400).json(["Email o Username en uso"]);
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        status: false,
        orders: {
          create: {
            totalAmount: 0,
          },
        },
      },
    });

    const token = await createToken(String(newUser.id));

    await sendEmail(email, username, token);

    res.json({ message: "Usuario creado, verifique su email" });
  } catch (error) {
    console.log(error);

    res.status(500).json(["Server Error"]);
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(401)
        .json(["Nesecita user name y contraseña para logearce"]);
    }

    const user = await prisma.user.findFirst({
      where: {
        username: username,
      },
      select: {
        id: true,
        username: true,
        status: true,
        role: true,
        image: true,
        notification: true,
        password: true,
      },
    });

    if (user?.status === false) {
      return res.status(401).json(["Usuario no verificado"]);
    }

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
      status: user.status,
      userId: user.id,
      notifications: user.notification.reverse(),
      userRole: user.role,
      image: user.image,
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
      select: {
        id: true,
        username: true,
        status: true,
        notification: true,
      },
    });

    if (!userFound) return res.status(401).json(["User Not found"]);

    return res.json({
      userId: userFound.id,
      notifications: userFound.notification.reverse(),
      username: userFound.username,
      status: userFound.status,
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
      httpOnly: false,
      secure: true,
      sameSite: "none",
    });
    res.json({
      username: user.username,
      status: user.status,
      userId: user.id,
      userRole: user.role,
      image: user.image,
    });
  } catch (error) {
    console.log(error);
    if (error instanceof jwt.JsonWebTokenError) {
      console.error("Error de JWT", error);
      return res.status(401).json(["Token is not valid"]);
    } else {
      console.error("Error interno del servidor ", error);
      return res.status(500).json(["Internal server error"]);
    }
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(401).json(["Email no valido"]);
    }

    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      return res.status(404).json(["Usuario no encontrado"]);
    }

    const token = await createToken(String(user.id));

    await sendPasswordResetEmail(email, user.username, token);

    res.json({ message: "Email enviado" });
  } catch (error) {
    console.log(error);
    res.status(500).json(["Error del servidor"]);
  }
}

export const confirmResetPassword = async (req: Request, res: Response) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    if (!token) {
      return res.status(401).json(["Token no validado"]);
    }

    console.log(token)

    const decode = jwt.verify(token, TOKEN_SECRET) as TokenPayload;

    const user = await prisma.user.findUnique({
      where: {
        id: decode.id,
      },
    });

    if (!user) {
      return res.status(404).json(["Usuario no encontrado"]);
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    await prisma.user.update({
      where: {
        id: decode.id,
      },
      data: {
        password: hashedPassword,
      },
    });

    res.cookie("token", token, {
      httpOnly: false,
      secure: true,
      sameSite: "none",
    });
    res.json({
      username: user.username,
      status: user.status,
      userId: user.id,
      userRole: user.role,
      image: user.image,
    });
  } catch (error) {
    console.log(error);
    if (error instanceof jwt.JsonWebTokenError) {
      console.error("Error de JWT", error);
      return res.status(401).json(["Token is not valid"]);
    } else {
      console.error("Error interno del servidor ", error);
      return res.status(500).json(["Internal server error"]);
    }
  }
};

export const updatePassword = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { password } = req.body;

    if (!userId) {
      return res.status(401).json(["Usuario no validado"]);
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        password: hashedPassword,
      },
    });

    res.json({ message: "Contraseña actualizada" });
  } catch (error) {
    console.log(error);
    if (error instanceof jwt.JsonWebTokenError) {
      console.error("Error de JWT", error);
      return res.status(401).json(["Token is not valid"]);
    } else {
      console.error("Error interno del servidor ", error);
      return res.status(500).json(["Internal server error"]);
    }
  }
}


import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcryptjs from "bcryptjs";

const prisma = new PrismaClient();

export const getUserOrder = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;

    const productOrder = await prisma.user.findUnique({
      where: {
        id: userId,
        isDeleted: false,
      },
      select: {
        orders: {
          where: {
            pending: true,
          },
          select: {
            _count: true,
            id: true,
            orderItems: true,
            totalAmount: true,
          },
        },
      },
    });

    res.status(200).json({
      data: productOrder,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al agregar el rating." });
  }
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      where: {
        isDeleted: false,
      },
      select: {
        id: true,
        username: true,
        image: true,
        status: true,
        role: true,
        _count: {
          select: {
            orders: true,
          },
        },
        createdAt: true,
        Sede: {
          select: {
            direction: true,
          },
        },
      },
    });

    res.status(200).json({
      data: users,
    });
  } catch (error) {
    console.log("Error:", error);
    res.status(500).send("Internal Server Error");
  }
};

export const getUserID = async (req: Request, res: Response) => {
  try {
    const userID = req.params.id as string;

    if (!userID) {
      return res.status(403).json({ message: "Falta el id del usuario" });
    }

    const userFind = await prisma.user.findUnique({
      where: {
        id: userID,
        isDeleted: false,
      },
      select: {
        id: true,
        username: true,
        image: true,
        status: true,
        role: true,
        orders: {
          select: {
            _count: true,
          },
        },
        createdAt: true,
        sedeId: true,
        Sede: {
          select: {
            direction: true,
          },
        },
      },
    });

    if (!userFind) {
      return res.status(404).json({ message: "Usuario no encontrado." });
    }

    res.status(200).json({
      data: userFind,
    });
  } catch (error) {
    console.log("Error:", error);
    res.status(500).send("Internal Server Error");
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const { username, password, image, role, sedeId } = req.body;

    const hashedPassword = await bcryptjs.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        status: false,
        username,
        role,
        image,
        sedeId,
        password: hashedPassword,
      },
      include: {
        _count: {
          select: {
            orders: true,
          },
        },
      },
    });
    res.status(201).json({
      data: user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear el usuario." });
  }
};

export const editUserAdmin = async (req: Request, res: Response) => {
  try {
    const { username, password, image, role } = req.body;

    const { id } = req.params;

    const hashedPassword = await bcryptjs.hash(password, 10);

    const user = await prisma.user.update({
      where: {
        id,
        isDeleted: false,
      },
      data: {
        status: false,
        username,
        role,
        image,
        password: hashedPassword,
      },
      include: {
        _count: {
          select: {
            orders: true,
          },
        },
      },
    });

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.status(201).json({
      data: user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al actualizar el usuario." });
  }
};

export const editUser = async (req: Request, res: Response) => {
  try {
    const { username, password, image } = req.body;
    const userId = req.userId;

    const hashedPassword = await bcryptjs.hash(password, 10);

    const user = await prisma.user.update({
      where: {
        id: userId,
        isDeleted: false,
      },
      data: {
        username,
        image,
        password: hashedPassword,
      },
    });

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.status(200).json({
      data: user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al editar el usuario." });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.user.update({
      where: {
        id,
      },
      data: {
        isDeleted: true,
      },
    });
    res.status(200).json({
      message: "Usuario eliminado con exito",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al eliminar el usuario." });
  }
};

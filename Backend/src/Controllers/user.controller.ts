import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcryptjs from "bcryptjs";

const prisma = new PrismaClient();

export const getUserOrder = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;

    const client = await prisma.client.findUnique({
      where: {
        id: userId,
      },
      select: {
        baseUser: {
          select: {
            isDeleted: true
          }
        },
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

    if (!client || client.baseUser.isDeleted) {
      return res.status(404).json({ error: "Cliente no encontrado o eliminado." });
    }

    res.status(200).json({
      data: {
        orders: client.orders
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener las órdenes del cliente." });
  }
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const clients = await prisma.client.findMany({
      where: {
        baseUser: {
          isDeleted: false,
        },
      },
      select: {
        id: true,
        baseUser: {
          select: {
            username: true,
            image: true,
            status: true,
            createdAt: true,
          }
        },
        _count: {
          select: {
            orders: true,
          },
        },
      },
    });

    res.json(clients.map(client => ({
      id: client.id,
      username: client.baseUser.username,
      image: client.baseUser.image,
      status: client.baseUser.status,
      orderCount: client._count.orders,
      createdAt: client.baseUser.createdAt
    })));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener los clientes." });
  }
};

export const getWorkers = async (req: Request, res: Response) => {
  try {
    const workers = await prisma.administrator.findMany({
      where: {
        baseUser: {
          isDeleted: false,
        },
      },
      select: {
        id: true,
        baseUser: {
          select: {
            username: true,
            image: true,
            status: true,
            createdAt: true,
          }
        },
      },
    });

    res.status(200).json({
      data: workers
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener los trabajadores." });
  }
};

export const getUserID = async (req: Request, res: Response) => {
  try {
    const userID = req.params.id as string;

    if (!userID) {
      return res.status(403).json({ message: "Falta el id del usuario" });
    }

    const client = await prisma.client.findUnique({
      where: {
        id: userID,
      },
      select: {
        id: true,
        baseUser: {
          select: {
            username: true,
            image: true,
            status: true,
            createdAt: true,
            isDeleted: true
          }
        },
        _count: {
          select: {
            orders: true,
          },
        },
      },
    });

    if (!client || client.baseUser.isDeleted) {
      return res.status(404).json({ message: "Usuario no encontrado." });
    }

    res.status(200).json({
      data: {
        id: client.id,
        username: client.baseUser.username,
        image: client.baseUser.image,
        status: client.baseUser.status,
        orderCount: client._count.orders,
        createdAt: client.baseUser.createdAt
      }
    });
  } catch (error) {
    console.log("Error:", error);
    res.status(500).send("Internal Server Error");
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const { username, password, image, email } = req.body;

    const hashedPassword = await bcryptjs.hash(password, 10);

    const baseUser = await prisma.baseUser.create({
      data: {
        email,
        username,
        password: hashedPassword,
        image,
        status: false,
        client: {
          create: {
            orders: {
              create: {
                totalAmount: 0,
              },
            },
          },
        },
      },
      include: {
        client: {
          include: {
            _count: {
              select: {
                orders: true,
              },
            },
          },
        },
      },
    });

    if (!baseUser.client) {
      throw new Error("Error al crear el cliente");
    }

    res.status(201).json({
      data: {
        id: baseUser.client.id,
        username: baseUser.username,
        image: baseUser.image,
        status: baseUser.status,
        orderCount: baseUser.client._count.orders,
        createdAt: baseUser.createdAt
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear el usuario." });
  }
};

export const editUserAdmin = async (req: Request, res: Response) => {
  try {
    const { username, password, image } = req.body;
    const { id } = req.params;

    const client = await prisma.client.findUnique({
      where: { id },
      include: {
        baseUser: true
      }
    });

    if (!client || client.baseUser.isDeleted) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const hashedPassword = password ? await bcryptjs.hash(password, 10) : undefined;

    const updatedBaseUser = await prisma.baseUser.update({
      where: {
        id: client.baseUser.id,
      },
      data: {
        username: username || undefined,
        image: image || undefined,
        password: hashedPassword,
      },
      include: {
        client: {
          include: {
            _count: {
              select: {
                orders: true,
              },
            },
          },
        },
      },
    });

    if (!updatedBaseUser.client) {
      throw new Error("Error al actualizar el cliente");
    }

    res.status(200).json({
      data: {
        id: updatedBaseUser.client.id,
        username: updatedBaseUser.username,
        image: updatedBaseUser.image,
        status: updatedBaseUser.status,
        orderCount: updatedBaseUser.client._count.orders,
        createdAt: updatedBaseUser.createdAt
      }
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

    const client = await prisma.client.findUnique({
      where: { id: userId },
      include: {
        baseUser: true
      }
    });

    if (!client || client.baseUser.isDeleted) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const hashedPassword = password ? await bcryptjs.hash(password, 10) : undefined;

    const updatedBaseUser = await prisma.baseUser.update({
      where: {
        id: client.baseUser.id,
      },
      data: {
        username: username || undefined,
        image: image || undefined,
        password: hashedPassword,
      },
    });

    res.status(200).json({
      data: {
        id: client.id,
        username: updatedBaseUser.username,
        image: updatedBaseUser.image,
        status: updatedBaseUser.status,
        createdAt: updatedBaseUser.createdAt
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al editar el usuario." });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const client = await prisma.client.findUnique({
      where: { id },
      include: {
        baseUser: true
      }
    });

    if (!client || client.baseUser.isDeleted) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    await prisma.baseUser.update({
      where: {
        id: client.baseUser.id,
      },
      data: {
        isDeleted: true,
      },
    });

    res.status(200).json({
      message: "Usuario eliminado con éxito",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al eliminar el usuario." });
  }
};

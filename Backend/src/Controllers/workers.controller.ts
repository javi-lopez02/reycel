import { Request, Response } from "express";
import { PrismaClient, Role } from "@prisma/client";
import bcryptjs from "bcryptjs";
import { SERVER_URL } from "../conf";

const prisma = new PrismaClient();

export const getWorkersSedes = async (req: Request, res: Response) => {
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
          },
        },
      },
    });

    res.status(200).json({
      data: workers,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener los trabajadores." });
  }
};

export const getWorkersById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const worker = await prisma.administrator.findUnique({
      where: {
        id: id,
        baseUser: {
          isDeleted: false,
        },
      },
      select: {
        id: true,
        salary: true,
        mouthSalary: true,
        role: true,
        sedeId: true,
        baseUser: {
          select: {
            username: true,
            image: true,
            status: true,
            createdAt: true,
            email: true,
          },
        },
        _count: {
          select: {
            orders: true,
          },
        },
      },
    });

    if (!worker) {
      res.status(404).json({ message: "Trabajador no encontrado" });
      return;
    }

    res.status(200).json({
      id: worker.id,
      username: worker.baseUser.username,
      image: worker.baseUser.image,
      status: worker.baseUser.status,
      orderCount: worker._count.orders,
      createdAt: worker.baseUser.createdAt,
      sedeId: worker.sedeId,
      email: worker.baseUser.email,
      salary: worker.salary,
      mouthSalary: worker.mouthSalary,
      role: worker.role,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener los trabajadores." });
  }
};

export const getWorkers = async (req: Request, res: Response) => {
  try {
    const worker = await prisma.administrator.findMany({
      where: {
        AND: [
          {
            baseUser: {
              isDeleted: false,
            },
          },
          { role: "MODERATOR" },
        ],
      },
      select: {
        id: true,
        salary: true,
        mouthSalary: true,
        role: true,
        baseUser: {
          select: {
            username: true,
            image: true,
            status: true,
            createdAt: true,
            email: true,
          },
        },
        _count: {
          select: {
            orders: true,
          },
        },
      },
    });

    res.json(
      worker.map((worker) => ({
        id: worker.id,
        username: worker.baseUser.username,
        image: worker.baseUser.image,
        status: worker.baseUser.status,
        orderCount: worker._count.orders,
        createdAt: worker.baseUser.createdAt,
        email: worker.baseUser.email,
        salary: worker.salary,
        mouthSalary: worker.mouthSalary,
        role: worker.role,
      }))
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener los trabajadores." });
  }
};

export const createWorker = async (req: Request, res: Response) => {
  try {
    const { username, password, sedeId, salary } = req.body;

    const hashedPassword = await bcryptjs.hash(password, 10);

    const baseUser = await prisma.baseUser.create({
      data: {
        username,
        password: hashedPassword,
        image: `${SERVER_URL}/public/logo.webp`,
        status: true,
        administrator: {
          create: {
            role: "MODERATOR",
            salary: Number(salary),
            mouthSalary: Number(salary),
            orders: {
              create: {
                totalAmount: 0,
              },
            },
            sede: {
              connect: { id: sedeId },
            },
          },
        },
      },
      include: {
        administrator: {
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

    if (!baseUser.administrator) {
      throw new Error("Error al crear el trabajador");
    }

    res.status(201).json({
      data: {
        id: baseUser.administrator.id,
        username: baseUser.username,
        image: baseUser.image,
        status: baseUser.status,
        orderCount: baseUser.administrator._count.orders,
        createdAt: baseUser.createdAt,
        email: baseUser.email,
        salary: baseUser.administrator.salary,
        mouthSalary: baseUser.administrator.mouthSalary,
        role: baseUser.administrator.role,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear el trabajador." });
  }
};

export const editWorker = async (req: Request, res: Response) => {
  try {
    const { username, password, salary, sedeId } = req.body;
    const { id } = req.params;

    const worker = await prisma.administrator.findUnique({
      where: { id },
      include: {
        baseUser: true,
      },
    });

    if (!worker || worker.baseUser.isDeleted) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const hashedPassword = password
      ? await bcryptjs.hash(password, 10)
      : undefined;

    const updatedBaseUser = await prisma.baseUser.update({
      where: {
        id: worker.baseUser.id,
      },
      data: {
        username: username || undefined,
        password: hashedPassword,
        administrator: {
          update:{
            salary,
            sedeId
          }
        }
      },
      include: {
        administrator: {
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

    if (!updatedBaseUser.administrator) {
      throw new Error("Error al actualizar el cliente");
    }

    res.status(200).json({
      data: {
        id: updatedBaseUser.administrator.id,
        username: updatedBaseUser.username,
        image: updatedBaseUser.image,
        status: updatedBaseUser.status,
        orderCount: updatedBaseUser.administrator._count.orders,
        createdAt: updatedBaseUser.createdAt,
        email: updatedBaseUser.email,
        salary: updatedBaseUser.administrator.salary,
        mouthSalary: updatedBaseUser.administrator.mouthSalary,
        role: updatedBaseUser.administrator.role,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al actualizar el trabajador." });
  }
};

export const deleteWorker = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const worker = await prisma.administrator.findUnique({
      where: { id },
      include: {
        baseUser: true,
      },
    });

    if (!worker || worker.baseUser.isDeleted) {
      return res.status(404).json({ message: "Trabajador no encontrado" });
    }

    await prisma.baseUser.update({
      where: {
        id: worker.baseUser.id,
      },
      data: {
        isDeleted: true,
      },
    });

    res.status(200).json({
      message: "Trabajador eliminado con éxito",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al eliminar el trabajador." });
  }
};

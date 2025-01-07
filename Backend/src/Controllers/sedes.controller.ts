import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getSedes = async (req: Request, res: Response) => {
  try {
    const sedes = await prisma.sede.findMany({
      select: {
        id: true,
        direction: true,
        image: true,
        phone: true,
        warker: {
          select: {
            id: true,
            username: true,
            image: true
          },
        },
      },
    });

    res.status(200).json({
      data: sedes,
    });
  } catch (error) {
    console.log("Error:", error);
    res.status(500).send("Internal Server Error");
  }
};

export const getSedeId = async (req: Request, res: Response) => {
  try {
    const id = req.query.idSede as string;

    if (!id) {
      return res.status(404).json("Id no encontrada.");
    }

    const sedes = await prisma.sede.findFirst({
      where: {
        id: id,
      },
      select: {
        id: true,
        direction: true,
        image: true,
        phone: true,
        warker: {
          select: {
            id: true,
            username: true,
            image: true
          },
        },
      },
    });

    if (!sedes) {
      return res.status(404).json("Sede no encontrada.");
    }

    res.status(200).json({
      data: sedes,
    });
  } catch (error) {
    console.log("Error:", error);
    res.status(500).send("Internal Server Error");
  }
};

export const createSede = async (req: Request, res: Response) => {
  const { phone, image, direction, workers } = req.body;

  try {
    if (!phone || !direction || !Array.isArray(workers) || image) {
      return res.status(400).json({ error: "Datos inválidos o incompletos" });
    }

    const existingWorkers = await prisma.user.findMany({
      where: {
        id: { in: workers },
      },
    });

    if (existingWorkers.length !== workers.length) {
      return res
        .status(404)
        .json({ error: "Algunos trabajadores no existen o están inactivos" });
    }

    const newSede = await prisma.sede.create({
      data: {
        phone,
        image,
        direction,
        warker: {
          connect: workers.map((workerId: string) => ({ id: workerId })),
        },
      },
    });

    return res.status(201).json({
      data: newSede,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Ocurrió un error al crear la sede",
    });
  }
};

export const updateSede = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { phone, image,direction, workers } = req.body;

  try {
    const existingSede = await prisma.sede.findUnique({ where: { id } });
    if (!existingSede) {
      return res.status(404).json({ error: "Sede no encontrada" });
    }

    let connectedWorkers: Array<{ id: string }> = [];
    if (workers && Array.isArray(workers)) {
      const existingWorkers = await prisma.user.findMany({
        where: {
          id: { in: workers },
        },
      });

      if (existingWorkers.length !== workers.length) {
        return res
          .status(404)
          .json({ error: "Algunos trabajadores no existen o están inactivos" });
      }

      connectedWorkers = workers.map((workerId: string) => ({ id: workerId }));
    }

    const updatedSede = await prisma.sede.update({
      where: { id },
      data: {
        phone,
        image,
        direction,
        warker: {
          set: connectedWorkers,
        },
      },
    });

    return res.status(200).json({
      message: "Sede actualizada exitosamente",
      sede: updatedSede,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Ocurrió un error al actualizar la sede",
    });
  }
};

export const deleteSede = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const existingSede = await prisma.sede.findUnique({ where: { id } });
    if (!existingSede) {
      return res.status(404).json({ error: "Sede no encontrada" });
    }

    await prisma.sede.delete({ where: { id } });

    return res.status(200).json({ message: "Sede eliminada exitosamente" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Ocurrió un error al eliminar la sede",
    });
  }
};

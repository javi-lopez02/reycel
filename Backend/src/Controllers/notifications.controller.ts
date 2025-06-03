import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const notificationRead = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const notification = await prisma.notification.update({
      where: {
        id,
      },
      data: {
        isRead: true,
      },
    });

    if (!notification) {
      return res.status(400).json(["Notificación no encontrada"]);
    }

    res.status(200).json({
      message: "Notificación leída",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json(["Error al leer la notificación."]);
  }
};

export const notificationReadAll = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;
    const notifications = await prisma.notification.updateMany({
      where: {
        clientId: userId,
        isRead: false,
      },
      data: {
        isRead: true,
      },
    });

    if (notifications.count === 0) {
      return res.status(400).json(["Notificaciones no encontradas"]);
    }

    res.status(200).json({
      message: "Notificaciones leídas",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json(["Error al leer las notificaciones."]);
  }
};

export const notificationDelete = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const notification = await prisma.notification.delete({
      where: {
        id,
      },
    });

    if (!notification) {
      return res.status(400).json(["Notificación no encontrada"]);
    }

    res.status(200).json({
      message: "Notificación eliminada",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json(["Error al eliminar la notificación."]);
  }
};

export const notificationDeleteAll = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;
    const notifications = await prisma.notification.deleteMany({
      where: {
        clientId: userId,
      },
    });

    if (notifications.count === 0) {
      return res.status(400).json(["Notificaciones no encontradas"]);
    }

    res.status(200).json({
      message: "Notificaciones eliminadas",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json(["Error al eliminar las notificaciones."]);
  }
};

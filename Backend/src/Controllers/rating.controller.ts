import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


export const ratingProductCreate = (async (req: Request, res: Response) => {
  const { id } = req.params;
  const { value } = req.body;

  if (value < 1 || value > 5) {
    return res.status(400).json({ error: 'El rating debe estar entre 1 y 5.' });
  }

  try {
    // Verificar si el dispositivo existe
    const product = await prisma.product.findUnique({ where: { id: id } });
    if (!product) {
      return res.status(404).json({ error: 'Dispositivo no encontrado.' });
    }

    // Crear el rating
    const rating = await prisma.rating.create({
      data: {
        value,
        productID: id,
        userID: req.userId
      },
    });

    res.status(201).json(rating);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al agregar el rating.' });
  }
});

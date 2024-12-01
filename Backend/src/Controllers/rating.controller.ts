import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export const ratingProductCreate = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { value } = req.body;

  if (value < 1 || value > 5) {
    return res.status(400).json({ error: "El rating debe estar entre 1 y 5." });
  }

  try {
    const product = await prisma.product.findUnique({
      where: { id: id },
      include: { Rating: true },
    });

    if (!product) {
      return res.status(404).json({ error: "Producto no encontrado." });
    }

    const userRating = product.Rating.find((r) => r.userID === req.userId);

    if (userRating) {
      await prisma.rating.updateMany({
        where: {
          userID: req.userId,
          productID: id,
        },
        data: {
          value: parseInt(value),
        },
      });
    } else {
      await prisma.rating.create({
        data: {
          value: parseInt(value),
          productID: id,
          userID: req.userId,
        },
      });
    }

    const updatedProduct = await prisma.product.findUnique({
      where: { id: id },
      include: { Rating: true },
    });

    if (!updatedProduct) {
      return res
        .status(404)
        .json({ error: "Producto no encontrado después de actualizar." });
    }

    const ratingSum = updatedProduct.Rating.reduce(
      (sum, r) => sum + r.value,
      0
    );
    const ratingAverage = ratingSum / updatedProduct.Rating.length;

    return res.status(200).json({ ratingAverage });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al agregar el rating." });
  }
};

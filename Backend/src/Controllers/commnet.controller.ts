import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createComment = async (req: Request, res: Response) => {
  try {
    const productId = (req.query.p || "") as string;

    const content = req.body.content as string
    const userId = req.userId

    if (content.length <= 3) {
      return res.status(400).json(["Debe tener más de 4 caracteres"])
    }

    await prisma.comment.create({
      data:{
        content,
        productId,
        userId
      }
    })

    res.status(200)
  } catch (error) {
    console.error(error);
    res.status(500).json(["Error al agregar el comentario." ]);
  }
};

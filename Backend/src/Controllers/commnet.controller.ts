import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createComment = async (req: Request, res: Response) => {
  try {
    const productId = (req.query.p || "") as string;

    const content = req.body.content as string;
    const userId = req.userId;
    console.log(content);
    if (content.length <= 3 || content === undefined) {
      return res.status(400).json(["Debe tener más de 4 caracteres"]);
    }

    const newComment = await prisma.comment.create({
      data: {
        content,
        productId,
        userId,
      },
      select: {
        id: true,
        content: true,
        updatedAt: true,
        createdAt: true,
        client: {
          select: {
            baseUser: {
              select: {
                username: true,
              },
            },
          },
        },
      },
    });

    res.status(200).json({
      data: {
        id: newComment.id,
        content: newComment.content,
        updatedAt: newComment.updatedAt,
        createdAt: newComment.createdAt,
        client: {
          baseUser: {
            username: newComment.client.baseUser.username,
          },
        },
      },
      message: "Commentario creado",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json(["Error al agregar el comentario."]);
  }
};

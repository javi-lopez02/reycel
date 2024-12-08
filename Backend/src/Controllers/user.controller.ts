import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export const getUserOrder = async (req: Request, res: Response) => {
  try {

    const userId = req.userId

    const productOrder = await prisma.user.findUnique({
      where:{
        id: userId
      },
      select:{
        orders:{
          where:{
            pending: true
          },
          select:{
            _count: true,
            id: true,
            orderItems: true,
            totalAmount: true,
          }
        }
      }
    })

    res.status(200).json({
      data: productOrder
    })

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al agregar el rating." });
  }
};

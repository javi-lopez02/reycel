import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const addOrderItem = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;
    const productID = (req.query.p || "") as string;
    const quantity = parseInt(req.body.quantity) || 1;

    const priceProduct = await prisma.product.findUnique({
      where: {
        id: productID,
      },
      select: {
        price: true,
      },
    });

    if (!priceProduct) {
      return res.status(404).json(["Producto no encontrado"]);
    }

    const priceTotal = priceProduct?.price * quantity;

    const orderFind = await prisma.order.findFirst({
      where: {
        userId: userId,
        pending: true,
      },
    });

    if (!orderFind) {
      return res.status(404).json(["No se encontro la orden"]);
    }

    await prisma.order.update({
      where: {
        id: orderFind?.id,
      },
      data: {
        orderItems: {
          create: {
            quantity,
            price: priceTotal,
            productId: productID,
          },
        },
      },
    });

    res.status(200).json(["Producto añadido al carrito."]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al agregar el Producto al carrito." });
  }
};

export const getOrderItems = async (req: Request, res: Response) => {
  try {
    const userId =  req.userId

    const items = await prisma.order.findMany({
      where: {
        userId: userId,
        pending: true
      },
      include:{
        orderItems: {
          include: {
            product:true
          }
        }
      }
    })

    const orderItems = items.flatMap((item)=> item.orderItems)
    res.status(200).json({
      data: orderItems
    })
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al agregar el rating." });
  }
};

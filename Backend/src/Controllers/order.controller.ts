import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import prismaNew from "../Middlewares/prisma";
const prisma = new PrismaClient();

export const addOrderItem = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;
    const productID = (req.query.p || "") as string;
    const quantity = parseInt(req.body.quantity) || 1;

    const productFiend = await prisma.product.findUnique({
      where: {
        id: productID,
      },
      select: {
        price: true,
        inventoryCount: true,
      },
    });

    if (!productFiend) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    if (productFiend.inventoryCount === 0) {
      return res
        .status(202)
        .json({ message: "Lo sentimos este producto no esta en stock" });
    }

    const priceTotal = productFiend?.price * quantity;

    let orderFind = await prisma.order.findFirst({
      where: {
        userId: userId,
        pending: true,
      },
      include: {
        orderItems: true,
      },
    });

    const productfind = orderFind?.orderItems.find(
      (product) => product.productId === productID
    );

    if (productfind) {
      return res.status(203).json({ message: "Producto repetido" });
    }

    if (!orderFind) {
      orderFind = await prisma.order.create({
        data: {
          userId: userId,
          pending: true,
          totalAmount: 0,
        },
        include: {
          orderItems: true,
        },
      });
    }

    await prisma.order.update({
      where: {
        id: orderFind.id,
      },
      data: {
        orderItems: {
          create: {
            quantity,
            price: priceTotal,
            productId: productID,
          },
        },
        totalAmount: orderFind.totalAmount + priceTotal,
      },
    });

    res.status(200).json({ message: "Producto añadido al carrito." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al agregar el Producto al carrito." });
  }
};

export const getOrderItems = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;

    const items = await prisma.order.findMany({
      where: {
        userId: userId,
        pending: true,
      },
      select: {
        _count: true,
        totalAmount: true,
        id: true,
        orderItems: {
          orderBy: {
            createdAt: "asc",
          },
          select: {
            id: true,
            price: true,
            quantity: true,
            product: {
              include: {
                category: {
                  select: {
                    name: true,
                    id: true,
                  },
                },
              },
            },
          },
        },
      },
    });
    res.status(200).json({
      data: items[0],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al agregar el rating." });
  }
};

export const updateOrderItem = async (req: Request, res: Response) => {
  try {
    const orderID = (req.query.p || "") as string;
    const quantity = parseInt(req.body.quantity) || 1;
    const price = parseInt(req.body.price) || 1;

    const newPrice = price * quantity;

    const orderItem = await prismaNew.orderItem.update({
      where: {
        id: orderID,
      },
      data: {
        price: newPrice,
        quantity: quantity,
      },
      include: {
        product: true,
      },
    });

    console.log(orderItem);

    res.status(200).json({
      data: orderItem,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al agregar el Producto al carrito." });
  }
};

export const deleteOrderItem = async (req: Request, res: Response) => {
  try {
    const orderID = (req.query.p || "") as string;

    const orderItem = await prismaNew.orderItem.delete({
      where: {
        id: orderID,
      },
    });

    res.status(200).json({
      data: orderItem,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al agregar el Producto al carrito." });
  }
};

export const getOrder = async (req: Request, res: Response) => {
  try {
    const orders = await prisma.order.findMany({
      select: {
        _count: {
          select: {
            orderItems: true,
          },
        },
        createdAt: true,
        id: true,
        totalAmount: true,
        pending: true,
        user: {
          select: {
            id: true,
            image: true,
            role: true,
            username: true,
          },
        },
      },
    });

    res.status(200).json({
      data: orders,
    });
  } catch (error) {
    console.log("Error:", error);
    res.status(500).send("Internal Server Error");
  }
};

export const getOrderItemsAdmin = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "El id es requerido" });
    }

    const order = await prisma.order.findUnique({
      where: {
        id: Number(id),
      },
      select: {
        id: true,
        createdAt: true,
        totalAmount: true,
        _count: {
          select: {
            orderItems: true,
          },
        },
        orderItems: {
          select: {
            id: true,
            createdAt: true,
            price: true,
            quantity: true,
            product: {
              select: {
                imagen: true,
                name: true,
                ratingAverage: true,
                inventoryCount: true,
              },
            },
          },
          orderBy: {
            createdAt: "asc",
          },
        },
      },
    });

    const items = order?.orderItems;

    if (!items) {
      return res.status(404).json({ message: "Productos no encontrados" });
    }

    return res.status(200).json({
      data: order,
    });
  } catch (error) {
    console.log("Error:", error);
    res.status(500).send("Internal Server Error");
  }
};

export const addOrderItemAdmin = async (req: Request, res: Response) => {
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
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    const priceTotal = priceProduct?.price * quantity;

    let orderFind = await prisma.order.findFirst({
      where: {
        userId: userId,
        pending: true,
      },
      include: {
        orderItems: true,
      },
    });

    const productfind = orderFind?.orderItems.find(
      (product) => product.productId === productID
    );

    if (productfind) {
      return res.status(203).json({ message: "Producto repetido" });
    }

    if (!orderFind) {
      orderFind = await prisma.order.create({
        data: {
          userId: userId,
          pending: true,
          totalAmount: 0,
        },
        include: {
          orderItems: true,
        },
      });
    }

    const data = await prisma.order.update({
      where: {
        id: orderFind.id,
      },
      data: {
        orderItems: {
          create: {
            quantity,
            price: priceTotal,
            productId: productID,
          },
        },
        totalAmount: orderFind.totalAmount + priceTotal,
      },
    });

    res
      .status(200)
      .json({ data: data, message: "Producto añadido a la orden." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al agregar el Producto a la orden." });
  }
};

export const deleteOrderItemAdmin = async (req: Request, res: Response) => {
  try {
    const orderID = (req.query.p || "") as string;

    const orderItem = await prismaNew.orderItem.delete({
      where: {
        id: orderID,
      },
    });

    res.status(200).json({
      data: orderItem,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al agregar el Producto al carrito." });
  }
};

export const updateOrderItemAdmin = async (req: Request, res: Response) => {
  try {
    const orderID = (req.query.p || "") as string;
    const quantity = parseInt(req.body.quantity) || 1;
    const price = parseInt(req.body.price) || 1;

    const newPrice = price * quantity;

    const orderItem = await prismaNew.orderItem.update({
      where: {
        id: orderID,
      },
      data: {
        price: newPrice,
        quantity: quantity,
      },
      include: {
        product: true,
      },
    });

    console.log(orderItem);

    res.status(200).json({
      data: orderItem,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al agregar el Producto al carrito." });
  }
};

import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { io, userSockets } from "../Libs/socketServer";
import { FASTAPI_URL } from "../conf";

const prisma = new PrismaClient();

export const confirmTransaction = async (req: Request, res: Response) => {
  const { transactionId, paymentId } = req.body;
  try {
    const payment = await prisma.payment.update({
      where: {
        id: parseInt(paymentId),
      },
      data: {
        paymentStatus: "COMPLETED",
      },
      select: {
        order: {
          select: {
            totalAmount: true,
            id: true,
            clientId: true,
            orderItems: {
              select: {
                productId: true,
                quantity: true,
                product: {
                  select: {
                    name: true,
                    price: true,
                    imagen: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    const notification = await prisma.notification.create({
      data: {
        clientId: payment.order.clientId,
        message: "Tu pago ha sido confirmado.",
        type: "PAYMENT_SUCCESS",
      },
      select: {
        id: true,
        message: true,
        type: true,
        createdAt: true,
        client: {
          select: {
            baseUser: {
              select: {
                email: true,
                username: true,
                id: true,
              },
            },
          },
        },
      },
    });

    const socketID = userSockets.get(transactionId);

    if (socketID) {
      io.to(socketID).emit("transactionStatus", {
        transactionId,
        notification,
        status: "confirmed",
      });
    }

    //enviar el email
    /* sendOrderConfirmationEmail({
        email: notification.client?.baseUser.email,
        name: notification.client?.baseUser.username,
        orderNumber: payment.order.id,
        orderDate: getCurrentDate(),
        estimatedDelivery: "Tiempo estimado 3 dias",
        total: payment.order.totalAmount,
        products: orderItems.slice(0, 5),
      }); */

    res.status(200).json({
      message: "Pago confirmado exitosamente",
    });
  } catch (error) {
    console.error("Error al confirmar el pago: ", error);
    const socketID = userSockets.get(transactionId);
    if (socketID) {
      io.to(socketID).emit("transactionStatus", {
        transactionId,
        status: "error",
      });
    }
    res.status(500).json({
      message: "Error al confirmar el pago",
    });
  }
};

export const deniedTransaction = async (req: Request, res: Response) => {
  const { transactionId, paymentId } = req.body;
  try {
    const payment = await prisma.payment.update({
      where: {
        id: parseInt(paymentId),
      },
      data: {
        paymentStatus: "FAILED",
      },
      select: {
        order: {
          select: {
            clientId: true,
            orderItems: {
              select: {
                productId: true,
                quantity: true,
              },
            },
          },
        },
      },
    });

    const orderItems = payment.order.orderItems;
    //sumar el stock
    for (const item of orderItems) {
      const product = await prisma.product.update({
        where: {
          id: item.productId,
        },
        data: {
          inventoryCount: {
            increment: item.quantity,
          },
        },
      });
    }

    const notification = await prisma.notification.create({
      data: {
        clientId: payment.order.clientId,
        message: "Tu pago ha sido denegado.",
        type: "PAYMENT_FAILED",
      },
    });

    const socketID = userSockets.get(transactionId);

    if (socketID) {
      io.to(socketID).emit("transactionStatus", {
        transactionId,
        notification,
        status: "denied",
      });
    }

    //enviar el email
    res.status(200).json({
      message: "Pago denegado exitosamente",
    });
  } catch (error) {
    console.error("Error al denegar el pago: ", error);
    const socketID = userSockets.get(transactionId);
    if (socketID) {
      io.to(socketID).emit("transactionStatus", {
        transactionId,
        status: "error",
      });
    }
    res.status(500).json({
      message: "Error al denegar el pago",
    });
  }
};

export const validateTransaction = async (req: Request, res: Response) => {
  try {
    const { orderID } = req.body;

    const userId = req.userId;

    // Verificar si ya existe una reserva para este usuario/orden
    const existingReservations = await prisma.tempInventoryReservation.findMany(
      {
        where: {
          userId,
          orderId: parseInt(orderID), // Asumiendo que tienes el ID de la orden
        },
      }
    );

    if (existingReservations.length > 0) {
      return res.status(200).json({
        message: "Confirmacion exitosa",
      });
    }

    const orderItems = await prisma.order.findUnique({
      where: {
        id: orderID,
      },
      select: {
        orderItems: {
          select: {
            productId: true,
            quantity: true,
          },
        },
      },
    });

    if (!orderItems) {
      return res.status(404).json({
        message: "Orden no encontrada",
      });
    }

    const items = orderItems?.orderItems;
    const productsIds = items?.map((item) => item.productId);
    const productsQuantities = items?.reduce((acc, item) => {
      acc[item.productId] = item.quantity;
      return acc;
    }, {} as Record<string, number>);

    const products = await prisma.product.findMany({
      where: {
        id: {
          in: productsIds,
        },
      },
      select: {
        id: true,
        inventoryCount: true,
        imagen: true,
        name: true,
      },
    });

    if (products.length !== productsIds?.length) {
      const missingProducts = productsIds?.filter(
        (id) => !products.some((p) => p.id === id)
      );
      return res.status(400).json({
        message: `Los siguientes productos no existen: ${missingProducts?.join(
          ", "
        )}`,
      });
    }

    const outOfStockProducts = products.filter(
      (product) =>
        product.inventoryCount < (productsQuantities[product.id] || 0)
    );

    if (outOfStockProducts.length > 0) {
      const errorMessages = outOfStockProducts.map(
        (product) =>
          `Producto "${product.name}" (ID: ${product.id}): Solo hay ${
            product.inventoryCount
          } unidades, pero se solicitaron ${productsQuantities[product.id]}`
      );
      return res.status(400).json({
        data: outOfStockProducts,
        message: errorMessages.join("\n"),
      });
    }

    products.map(
      async (product) =>
        await prisma.product.update({
          where: { id: product.id },
          data: {
            inventoryCount: {
              decrement: productsQuantities[product.id],
            },
          },
        })
    );

    // Crear reservas temporales
    const reservationExpiry = new Date();
    reservationExpiry.setHours(reservationExpiry.getHours() + 1); // Expira en 1 hora

    products.map(async (product) => {
      await prisma.tempInventoryReservation.create({
        data: {
          userId,
          orderId: orderID,
          productId: product.id,
          quantity: productsQuantities[product.id],
          expiresAt: reservationExpiry,
        },
      });
    });

    return res.status(200).json({
      message: "Confirmacion exitosa",
    });
  } catch (error) {
    console.error("Error al validar el pago: ", error);
    res.status(500).json({
      message: "Error al validar el pago",
    });
  }
};

export const sendMessageBot = async (req: Request, res: Response) => {
  try {
    const {
      orderID,
      price,
      productCount,
      transactionID,
      paymentMethodId,
      fastDelivery,
      address,
      town,
    } = req.body;

    const userID = req.userId;

    const existingReservations = await prisma.tempInventoryReservation.deleteMany({
      where: {
        userId: userID,
        orderId: parseInt(orderID),
      },
    });

    if (existingReservations.count === 0) {
      return res.status(400).json({
        message: "Chequea tu carrito y vuelve a intentarlo, ha pasado el tiempo de la reserva.",
      });
    }

    await prisma.order.update({
      where: {
        id: orderID,
      },
      data: {
        pending: false,
      },
    });

    const order = await prisma.order.create({
      data: {
        clientId: userID,
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

    const payment = await prisma.payment.create({
      data: {
        orderId: orderID,
        amount: price,
        transactionID,
        paymentMethodId,
        userId: userID,
        fastDelivery,
      },
    });
    //hacer la peticion a la otra api par enviar el mensaje a telegram

    fetch(`${FASTAPI_URL}/send_message_bot`, {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        transactionID: transactionID,
        productCount: productCount,
        price: price,
        fastDelivery: fastDelivery,
        address: address,
        town: town,
        paymentID: payment.id.toString(),
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json(); // Parsea la respuesta JSON
      })
      .then((data) => {
        console.log(data);
        res.status(200).send({
          order,
          message:
            "Su pago a sido realizado con exito espere a que se confirme.",
        });
      })
      .catch((error) => {
        throw new Error(`HTTP error: ${error}`);
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error al hacer el pago.",
    });
  }
};

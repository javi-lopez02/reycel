import { Response, Request } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const addPayment = async (req: Request, res: Response) => {
  try {
    const id = req.body.transactionID;
    const orderId = req.body.orderId;
    const amount = req.body.amount;
    const paymentMethod = req.body.paymentMethod;

    const userId = req.userId;

    const orderfind = await prisma.order.findUnique({
      where: {
        id: orderId,
      },
    });

    if (!orderfind) {
      return res.status(404).send("Order not found");
    }

    await prisma.payment.create({
      data: {
        id,
        orderId,
        amount,
        paymentMethodId: paymentMethod,
        userId,
      },
    });

    return res.status(200).send("Payment added successfully");
  } catch (error) {
    console.log("Error:", error);
    res.status(500).send("Internal Server Error");
  }
};

export const getPayments = async (req: Request, res: Response) => {
  try {
    const payments = await prisma.payment.findMany({
      include: {
        User: {
          select: {
            username: true,
            image: true,
            role: true,
          },
        },
        PaymentMethod: {
          select: {
            paymentOptions: true,
          },
        },
        order: {
          select: {
            _count: {
              select: {
                orderItems: true,
              },
            },
          },
        },
      },
    });

    res.status(200).json({
      data: payments,
    });
  } catch (error) {
    console.log("Error:", error);
    res.status(500).send("Internal Server Error");
  }
};

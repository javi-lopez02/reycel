import { Response, Request } from "express";
import { PrismaClient } from "@prisma/client";
import { PrismaSortParams, SortParams } from "../types";

const prisma = new PrismaClient();

export const addPayment = async (req: Request, res: Response) => {
  try {
    const id = req.body.transactionID;
    const orderId = req.body.orderId;
    const amount = req.body.amount;
    const fastDelivery = req.body.fastDelivery;
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
        fastDelivery,
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
    const filterValue = req.query.filterValue as string;
    const sortDescriptor = req.query.sortDescriptor as string;
    const page = parseInt(req.query.page as string) || 1;
    const pageSize = parseInt(req.query.rowsPerPage as string) || 10;

    function convertToPrismaSort(
      sortDescriptor?: string
    ): PrismaSortParams | undefined {
      if (!sortDescriptor || sortDescriptor === "undefined") return undefined;

      const frontendSort = JSON.parse(sortDescriptor) as SortParams;

      return {
        column: frontendSort.column,
        direction: frontendSort.direction === "ascending" ? "asc" : "desc",
      };
    }

    const skip = (page - 1) * pageSize;
    const take = pageSize;

    const prismaSortParam = convertToPrismaSort(sortDescriptor);

    const allowedColumns = ["amount", "createdAt", "fastDelivery", "paymentStatus"];
    const defaultSort = { column: "createdAt", direction: "asc" as const };

    const column =
      prismaSortParam?.column && allowedColumns.includes(prismaSortParam.column)
        ? prismaSortParam.column
        : defaultSort.column;

    const direction = prismaSortParam?.direction || defaultSort.direction;

    const payments = await prisma.payment.findMany({
      where: {
        OR: [
          {
            admin: {
              baseUser: {
                username: {
                  contains: filterValue,
                  mode: "insensitive",
                },
              },
            },
          },
          {
            client: {
              baseUser: {
                username: {
                  contains: filterValue,
                  mode: "insensitive",
                },
              },
            },
          },
          {
            PaymentMethod: {
              label: {
                contains: filterValue,
                mode: "insensitive",
              },
            },
          },
        ],
      },
      orderBy: {
        [column]: direction,
      },
      skip: skip,
      take: take,
      include: {
        client: {
          select: {
            baseUser: {
              select: {
                username: true,
                image: true,
                email: true,
              },
            },
          },
        },
        admin: {
          select: {
            baseUser: {
              select: {
                username: true,
                image: true,
                email: true,
              },
            },
          },
        },
        PaymentMethod: {
          select: {
            label: true,
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


    const totalPayment = await prisma.order.count({
      where: {
        OR: [
          {
            admin: {
              baseUser: {
                username: {
                  contains: filterValue,
                  mode: "insensitive",
                },
              },
            },
          },
          {
            client: {
              baseUser: {
                username: {
                  contains: filterValue,
                  mode: "insensitive",
                },
              },
            },
          },
        ],
      },
    });

    const totalPages = Math.ceil(totalPayment / pageSize);

    res.status(200).json({
      data: payments,
      meta: {
        totalPayment,
        page,
        totalPages,
        pageSize,
      },
    });
  } catch (error) {
    console.log("Error:", error);
    res.status(500).send("Internal Server Error");
  }
};

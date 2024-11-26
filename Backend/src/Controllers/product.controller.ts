import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getProduct = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;

    const pageSize = parseInt(req.query.pageSize as string) || 20;

    const skip = (page - 1) * pageSize;
    const take = pageSize;

    const products = await prisma.product.findMany({
      skip: skip,
      take: take,
      select: {
        id: true,
        imagen: true,
        name: true,
        price: true,
        description: true,
      },
    });


    const totalPost = await prisma.product.count();
    const totalPages = Math.ceil(totalPost / pageSize);

    res.status(200).json({
      data: products,
      meta: {
        totalPost,
        page,
        totalPages,
        pageSize,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(["Internal server error"]);
  }
};

export const searchProduct = async (req: Request, res: Response) => {
  try {
    const search = req.query.s as string;

    const page = parseInt(req.query.page as string) || 1;

    const pageSize = parseInt(req.query.pageSize as string) || 20;

    const skip = (page - 1) * pageSize;
    const take = pageSize;

    const result = await prisma.product.findMany({
      where: {
        OR: [
          {
            name: {
              contains: search,
              mode: "insensitive",
            },
          },
          {
            description: {
              contains: search,
              mode: "insensitive",
            },
          },
        ],
      },
      skip: skip,
      take: take,
    });

    const totalProduct = await prisma.product.count({
      where: {
        OR: [
          {
            name: {
              contains: search,
              mode: "insensitive",
            },
          },
          {
            description: {
              contains: search,
              mode: "insensitive",
            },
          },
        ],
      },
    });

    const totalPages = Math.ceil(totalProduct / pageSize);

    res.status(200).json({
      data: result,
      meta: {
        totalProduct,
        page,
        totalPages,
        pageSize,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(["Internal server error"]);
    console.log(error);
    res.status(500).json(["Internal server error"]);
  }
};

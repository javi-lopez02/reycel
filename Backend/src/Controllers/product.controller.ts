import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import json from "../Data/moviles.json";

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


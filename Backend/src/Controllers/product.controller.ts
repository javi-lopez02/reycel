import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface SortItem {
  field: "createdAt" | "price" | "rating"; // Los campos permitidos
  order: "asc" | "desc"; // Los valores permitidos
}

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
    const search = (req.query.s || "") as string;

    const page = parseInt(req.query.page as string) || 1;
    const pageSize = parseInt(req.query.pageSize as string) || 15;

    //filters
    const minPrice = parseInt(req.query.minPrice as string) || 0;

    const maxPrice = parseInt(req.query.maxPrice as string) || 2000;

    const category = (req.query.category as string) || undefined;

    const rating = parseInt(req.query.rating as string) || undefined;

    const color = (req.query.color as string) || undefined;

    
    //sort
    const sortQuery = req.query.sort && typeof req.query.sort === "string" ? req.query.sort : "[]";

    const sortArray: SortItem[] = JSON.parse(sortQuery);

    // Validar y construir el objeto orderBy para Prisma
    const orderBy = sortArray.map((sortItem: SortItem) => {
      const { field, order } = sortItem;
      return { [field]: order }; // Formato esperado por Prisma
    });

    const skip = (page - 1) * pageSize;
    const take = pageSize;

    const result = await prisma.product.findMany({
      where:  {
        OR: [
          {
            name: {
              contains: search,
              mode: "insensitive",
            },
          },
          {
            description:  {
              contains: search,
              mode: "insensitive",
            },
          },
        ],
        AND: [
          {
            price: {
              gte: minPrice,
              lte: maxPrice,
            },
          },
          {
            category: {
              id: category,
            },
          },
          {
            rating: rating,
          },
          {
            color: color,
          },
        ],
      },
      orderBy,
      skip: skip,
      take: take,
    });

    const totalProduct = await prisma.product.count({
      where:  {
        OR: [
          {
            name: {
              contains: search,
              mode: "insensitive"
            },
          },
          {
            description:  {
              contains: search,
              mode: "insensitive",
            },
          },
        ],
        AND: [
          {
            price: {
              gte: minPrice,
              lte: maxPrice,
            },
          },
          {
            category: {
              id: category,
            },
          },
          {
            rating: rating,
          },
          {
            color: color,
          },
        ],
      },
    });;

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
  }
};

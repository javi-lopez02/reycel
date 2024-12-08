import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { SortItem } from "../types";

const prisma = new PrismaClient();

export const getProductID = async (req: Request, res: Response) => {
  try {
    const productID = (req.query.p || "") as string;

    const product = await prisma.product.findUnique({
      where: { id: productID },
      include: {
        Rating: true,
        comment: {
          select: {
            content: true,
            createdAt: true,
            updatedAt: true,
            id: true,
            User: {
              select: {
                username: true,
              },
            },
          },
        },
        category: {
          select:{
            name: true,
            id: true
          }
        }
      }, // Incluye los ratings asociados
    });

    if (!product) {
      return res.status(404).json(["Dispositivo no encontrado."]);
    }

    const averageRating =
      product?.Rating.length > 0
        ? product.Rating.reduce((sum, rating) => sum + rating.value, 0) /
          product.Rating.length
        : 0;

    //product.rating = averageRating

    res.status(200).json({
      data: product,
      averageRating,
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

    const color = (req.query.color as string) || undefined;

    const rating = parseInt(req.query.rating as string) || undefined;

    //sort
    const sortQuery =
      req.query.sort && typeof req.query.sort === "string"
        ? req.query.sort
        : "[]";

    const sortArray: SortItem[] = JSON.parse(sortQuery);

    // Validar y construir el objeto orderBy para Prisma
    const orderBy = sortArray.map((sortItem: SortItem) => {
      const { field, order } = sortItem;
      return { [field]: order }; // Formato esperado por Prisma
    });

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
          {
            category:{
              name:{
                contains: search,
                mode: "insensitive"
              }
            }
          }
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
            color: color,
          },
          {
            ratingAverage: rating
          }
        ],
      },
      include: {
        Rating: true,
        category: {
          select:{
            name: true,
            id: true
          }
        }
      },
      orderBy,
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
          {
            category:{
              name:{
                contains: search,
                mode: "insensitive"
              }
            }
          }
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
            color: color,
          },
          {
            ratingAverage: rating
          }
        ],
      },
    });

    const productWithRatings = result.map((product) => ({
      ...product,
      rating:
        product.Rating.length > 0
          ? (
              product.Rating.reduce((sum, rating) => sum + rating.value, 0) /
              product.Rating.length
            ).toFixed(1)
          : 0,
    }));

    const totalPages = Math.ceil(totalProduct / pageSize);

    res.status(200).json({
      data: productWithRatings,
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

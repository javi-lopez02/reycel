import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface MonthlyData {
  month: string;
  total: number;
}

export const generalData = async (req: Request, res: Response) => {
  try {
    const functionPromise = (tabla: string) => {
      const query = `
        SELECT
            TO_CHAR("createdAt", 'Month') AS month,
            COUNT(*) AS total
        FROM
            "${tabla}"
        GROUP BY
            TO_CHAR("createdAt", 'Month')
        ORDER BY
            MIN("createdAt");
      `;
      return prisma.$queryRawUnsafe(query);
    };

    const [product, users, order] = (await Promise.all([
      functionPromise("Product"),
      functionPromise("User"),
      functionPromise("Order"),
    ])) as { month: string; total: string }[][];

    const functionFormatData = (
      data: Array<{ month: string; total: string }>
    ) => {
      return data.map((row) => ({
        month: row.month.trim(),
        total: parseInt(row.total),
      }));
    };

    const functionGrowth = (data: Array<MonthlyData>) => {
      const lastMonth = data[data.length - 1];
      const previousMonth = data[data.length - 2];

      let growthData = 0;
      if (previousMonth && lastMonth) {
        growthData =
          ((lastMonth.total - previousMonth.total) / previousMonth.total) * 100;
      }
      return growthData;
    };

    const formattedProduct = functionFormatData(product);
    const formattedUser = functionFormatData(users);
    const formattedOrder = functionFormatData(order);

    const growthProduct = functionGrowth(formattedProduct);
    const growthUser = functionGrowth(formattedUser);
    const growthOrder = functionGrowth(formattedOrder);

    res.status(200).json({
      dataProductsByMonth: formattedProduct,
      dataUsersByMonth: formattedUser,
      dataCategoriesByMonth: formattedOrder,
      growthProducts: growthProduct,
      growthUsers: growthUser,
      growthCategories: growthOrder,
      totalProduct: 166,
      totalUser: 13,
      totalCategory: 3,
    });
  } catch (error) {
    console.log("Error:", error);
    res.status(500).send("Internal Server Error");
  }
};

export const functionName = async (req: Request, res: Response) => {
  const { startDate, endDate } = req.body;

  if (!startDate || !endDate) {
    return res
      .status(400)
      .json({ error: "Both startDate and endDate are required." });
  }

  try {
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return res.status(400).json({ error: "Invalid date format." });
    }

    const functionPromise = async (startDate: string, endDate: string) => {
      const query = `
      WITH months AS (
        SELECT generate_series(
        date_trunc('month', '${startDate}'::date),
        date_trunc('month', '${endDate}'::date),
        interval '1 month'
        ) AS month
      )
      SELECT
        TO_CHAR(months.month, 'Month') AS date,
        COALESCE(SUM("Payment".amount), 0) AS total
      FROM
        months
      LEFT JOIN
        "Payment"
      ON
        date_trunc('month', "Payment"."createdAt") = months.month
        AND "Payment"."paymentStatus" = 'COMPLETED'
      GROUP BY
        months.month
      ORDER BY
        months.month;
      `;
      return await prisma.$queryRawUnsafe(query);
    };

    const data = (await functionPromise(startDate, endDate)) as {
      date: string;
      total: string;
    }[];

    const functionFormatData = (
      data: Array<{ date: string; total: string }>
    ) => {
      return data.map((row) => ({
        date: row.date.trim(),
        total: parseInt(row.total),
      }));
    };

    res.status(200).json({
      chartData: functionFormatData(data),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error." });
  }
};

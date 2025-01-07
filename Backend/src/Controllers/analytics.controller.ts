import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface MonthlyData {
  month: string;
  total: number;
}

export const generalData = async (req: Request, res: Response) => {
  try {
    const productsByMonth = await prisma.product.groupBy({
      by: ["createdAt"],
      _count: {
        id: true,
      },
    });

    const userByMonth = await prisma.user.groupBy({
      by: ["createdAt"],
      _count: {
        id: true,
      },
    });

    const categoriesByMonth = await prisma.category.groupBy({
      by: ["createdAt"],
      _count: {
        id: true,
      },
    });

    function transformToMonthlyData<
      T extends { createdAt: Date; _count: { id: number } }
    >(data: T[]): MonthlyData[] {
      return data.reduce<MonthlyData[]>((acc, item) => {
        const month = new Date(item.createdAt).toLocaleString("es-ES", {
          month: "long",
          timeZone: "UTC",
        });
        const existingMonth = acc.find((entry) => entry.month === month);
        if (existingMonth) {
          existingMonth.total += item._count.id;
        } else {
          acc.push({ month, total: item._count.id });
        }
        return acc;
      }, []);
    }

    function calculateLastMonthGrowth(data: MonthlyData[]) {
      if (data.length < 2) return null;

      const lastMonthData = data[0];
      const previousMonthData = data[1];

      const growth = (previousMonthData.total * 100) / lastMonthData.total;

      return parseFloat(growth.toFixed(2));
    }

    const dataProductsByMonth = transformToMonthlyData(productsByMonth);
    const dataUsersByMonth = transformToMonthlyData(userByMonth);
    const dataCategoriesByMonth = transformToMonthlyData(categoriesByMonth);

    const growthProducts = calculateLastMonthGrowth(dataProductsByMonth);
    const growthUsers = calculateLastMonthGrowth(dataUsersByMonth);
    const growthCategories = calculateLastMonthGrowth(dataCategoriesByMonth);

    res.status(200).json({
      dataProductsByMonth: dataProductsByMonth.reverse(),
      dataUsersByMonth: dataUsersByMonth.reverse(),
      dataCategoriesByMonth: dataCategoriesByMonth.reverse(),
      growthProducts,
      growthUsers,
      growthCategories,
      totalProduct: productsByMonth.length,
      totalUser: userByMonth.length,
      totalCategory: categoriesByMonth.length,
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

    const startMonth = start.toLocaleString("default", {
      month: "long",
      timeZone: "UTC",
    });
    const endMonth = end.toLocaleString("default", {
      month: "long",
      timeZone: "UTC",
    });

    const payments = await prisma.payment.findMany({
      where: {
        paymentStatus: "COMPLETED",
        createdAt: {
          gte: new Date(start.getFullYear(), start.getMonth(), 1),
          lt: new Date(end.getFullYear(), end.getMonth() + 1, 1),
        },
      },
    });

    const groupedData: { [key: number]: { [key: string]: number } } = {};

    payments.forEach((payment) => {
      const day = payment.createdAt.getUTCDate();
      const month = payment.createdAt.toLocaleString("default", {
        month: "long",
        timeZone: "UTC",
      });

      if (!groupedData[day]) {
        groupedData[day] = {};
      }

      if (!groupedData[day][month]) {
        groupedData[day][month] = 0;
      }

      groupedData[day][month] += payment.amount;
    });

    const chartData = Object.keys(groupedData).map((day) => {
      return {
        date: day,
        [startMonth]: groupedData[parseInt(day)][startMonth] || 0,
        [endMonth]: groupedData[parseInt(day)][endMonth] || 0,
      };
    });

    res.status(200).json({
      chartData,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error." });
  }
};

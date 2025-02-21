import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface MonthlyData {
  month: string;
  total: number;
}

interface Metric {
  month: string;
  total: string;
  growth?: string; // Solo para el crecimiento, será opcional
}

export const generalData = async (req: Request, res: Response) => {
  try {
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
  
    // Consultas para obtener las métricas de productos, usuarios y categorías
    const productsPromise = prisma.product.groupBy({
      by: ['createdAt'],
      where: {
        createdAt: {
          gte: oneYearAgo, // Filtrar productos creados en el último año
        },
      },
      _count: {
        id: true, // Contar productos
      },
      orderBy: {
        createdAt: 'asc',
      },
    });
  
    const usersPromise = prisma.user.groupBy({
      by: ['createdAt'],
      where: {
        createdAt: {
          gte: oneYearAgo, // Filtrar usuarios creados en el último año
        },
      },
      _count: {
        id: true, // Contar usuarios
      },
      orderBy: {
        createdAt: 'asc',
      },
    });
  
    const categoriesPromise = prisma.category.groupBy({
      by: ['createdAt'],
      where: {
        createdAt: {
          gte: oneYearAgo, // Filtrar categorías creadas en el último año
        },
      },
      _count: {
        id: true, // Contar categorías
      },
      orderBy: {
        createdAt: 'asc',
      },
    });
  
    // Ejecutar las consultas en paralelo
    const [products, users, categories] = await Promise.all([productsPromise, usersPromise, categoriesPromise]);
  
    // Función para calcular el porcentaje de crecimiento
    const calculateGrowth = (current: number, previous: number): string => {
      if (previous === 0) return "0%"; // Si el valor anterior es 0, no podemos calcular el crecimiento
      const growth = ((current - previous) / previous) * 100;
      return `${growth.toFixed(2)}%`; // Formatear a 2 decimales
    };
  
    // Función para formatear los resultados y calcular el crecimiento
    const formatResult = (data: any[]): { totals: Metric[]; growthPercentages: Metric[] } => {
      const totals: Metric[] = [];
      const growthPercentages: Metric[] = [];
  
      // Agrupar por mes y año
      const groupedByMonth = data.reduce((acc: any, item: any) => {
        const month = item.createdAt.getMonth() + 1; // Mes en formato 1-12
        const year = item.createdAt.getFullYear(); // Año en formato yyyy
        const monthYear = `${year}-${month < 10 ? `0${month}` : month}`; // Formato YYYY-MM
  
        if (!acc[monthYear]) acc[monthYear] = { total: 0, month: monthYear };
  
        acc[monthYear].total += item._count.id;
        return acc;
      }, {});
  
      // Convertir los datos agrupados en arrays de métricas
      const groupedData = Object.values(groupedByMonth).sort((a: any, b: any) => new Date(a.month) - new Date(b.month));
  
      groupedData.forEach((item: any, index: number) => {
        const currentMonthTotal = item.total; // Cantidad actual del mes
        const previousMonthTotal = index > 0 ? groupedData[index - 1].total : 0; // Cantidad del mes anterior (0 si es el primer mes)
  
        const growth = calculateGrowth(currentMonthTotal, previousMonthTotal);
        const monthName = new Date(item.month).toLocaleString('es-ES', { month: 'long' }); // Obtener el nombre del mes en español
  
        // Añadir a `totals`
        totals.push({
          month: monthName, // Mes en nombre
          total: currentMonthTotal.toString(),
        });
  
        // Añadir a `growthPercentages`
        growthPercentages.push({
          month: monthName, // Mes en nombre
          total: currentMonthTotal.toString(),
          growth, // Crecimiento respecto al mes anterior
        });
      });
  
      return { totals, growthPercentages };
    };
  
    // Formatear los resultados de productos, usuarios y categorías
    const { totals: productTotals, growthPercentages: productGrowth } = formatResult(products);
    const { totals: userTotals, growthPercentages: userGrowth } = formatResult(users);
    const { totals: categoryTotals, growthPercentages: categoryGrowth } = formatResult(categories);
  
    // Devolver todo junto

    res.status(200).json({
      dataProductsByMonth: productTotals,
      dataUsersByMonth: userTotals,
      dataCategoriesByMonth: categoryTotals,
      growthProducts: productGrowth,
      growthUsers: userGrowth,
      growthCategories: categoryGrowth,
      totalProduct: products.length,
      totalUser: users.length,
      totalCategory: categories.length,
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

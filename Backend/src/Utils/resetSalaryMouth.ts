import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function resetSalaryMouth() {
  const today = new Date();

  // Solo ejecutar si es domingo
  if (today.getDay() === 1) {
    const admins = await prisma.administrator.findMany({
      where: {
        salary: {
          not: null,
        },
      },
      select: {
        id: true,
        salary: true,
      },
    });

    for (const admin of admins) {
      await prisma.administrator.update({
        where: { id: admin.id },
        data: {
          mouthSalary: admin.salary!,
        },
      });
    }

    await prisma.sede.updateMany({
      data: {
        losses: 0,
        netProfits: 0,
      },
    });

    console.log(
      `✅ mouthSalary actualizado correctamente para ${admins.length} administradores.`
    );
  } else if (today.getDay() === 0) {
    console.log("Actualizando Ganancia Neta Semanal");
    const sedes = await prisma.sede.findMany({
      where: {
        losses: {
          not: undefined,
        },
        netProfits: {
          not: undefined,
        },
      },
      select: {
        id: true,
        losses: true,
        netProfits: true,
      },
    });
    for (const sede of sedes) {
      let netProfit = sede.netProfits - sede.losses;

      await prisma.sede.update({
        where: { id: sede.id },
        data: {
          netProfits: netProfit,
        },
      });
    }
  }
}

resetSalaryMouth()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error("❌ Error al actualizar mouthSalary:", e);
    await prisma.$disconnect();
    process.exit(1);
  });

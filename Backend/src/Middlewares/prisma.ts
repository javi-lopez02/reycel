import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

// Middleware actualizado con la nueva funcionalidad
prisma.$use(async (params: Prisma.MiddlewareParams, next: (params: Prisma.MiddlewareParams) => Promise<any>) => {
    if (params.model === 'OrderItem' && (params.action === 'update' || params.action === 'delete')) {
        let orderItemId: string | undefined;
        let updatedTotalAmount: number | null = null;

        // Asigna el ID del OrderItem dependiendo de la acción
        if (params.action === 'update' || params.action === 'delete') {
            orderItemId = params.args.where.id;
        }

        // Asegúrate de que el ID exista antes de continuar
        if (!orderItemId) {
            throw new Error('El ID del OrderItem no se proporcionó.');
        }

        // Si es una acción de eliminación, captura el precio y el OrderId antes de eliminar
        let orderItemData;
        if (params.action === 'delete') {
            orderItemData = await prisma.orderItem.findUnique({
                where: { id: orderItemId },
                select: { price: true, orderId: true },
            });

            if (!orderItemData) {
                throw new Error('No se encontró el OrderItem para eliminar.');
            }
        }

        // Ejecuta la operación original
        const result = await next(params);

        // Si es una eliminación, resta el precio del `OrderItem` eliminado
        if (params.action === 'delete' && orderItemData) {
            const updatedOrder = await prisma.order.update({
                where: { id: orderItemData.orderId },
                data: {
                    totalAmount: {
                        decrement: orderItemData.price, // Resta el precio del total
                    },
                },
                select: { totalAmount: true },
            });
            updatedTotalAmount = updatedOrder.totalAmount;
        } else if (params.action === 'update') {
            // Si es una actualización, recalcula el totalAmount
            const orderItem = await prisma.orderItem.findUnique({
                where: { id: orderItemId },
                select: { orderId: true },
            });

            if (orderItem) {
                const totalAmount = await prisma.orderItem.aggregate({
                    where: { orderId: orderItem.orderId },
                    _sum: { price: true },
                });

                const updatedOrder = await prisma.order.update({
                    where: { id: orderItem.orderId },
                    data: { totalAmount: totalAmount._sum.price || 0 },
                    select: { totalAmount: true },
                });
                updatedTotalAmount = updatedOrder.totalAmount;
            }
        }

        // Agregar el valor de totalAmount al resultado devuelto
        return { ...result, totalAmount: updatedTotalAmount };
    }

    // Si no es una operación de OrderItem, continúa con la operación
    return next(params);
});

export default prisma;

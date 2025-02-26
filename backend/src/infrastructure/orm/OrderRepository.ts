import { PrismaClient } from '@prisma/client';
import { Order } from '../../domain/entities/Order';
import { OrderItem } from '../../domain/entities/OrderItem';

const prisma = new PrismaClient();

export class OrderRepository {
    async getAllOrders() {
        return await prisma.order.findMany({
            include: {
                order_items: true,
            },
        });
    }

    async getOrderById(id: number) {
        return await prisma.order.findUnique({
            where: {
                id: id,
            },
            include: {
                order_items: true,
            },
        });
    }

    async addOrder(order: Order) {
        return await prisma.order.create({
            data: {
                user_id: order.getUserId(),
                tax: order.getTaxRate(),
                total_amount: order.getTotalAmount(),
                status: order.getStatus(),
                supplier: order.getSupplier(),
                delivery_due_date: order.getDeliveryDueDate(),
                order_items: {
                    create: order.getOrderItems().map((orderItem: OrderItem) => {
                        return {
                            quantity: orderItem.getQuantity(),
                            unit_price: orderItem.getUnitPrice(),
                            total_price: orderItem.getTotalPrice(),
                            article_id: orderItem.getArticleId(),
                        };
                    }),
                },
            },
        });
    }

    async updateOrder(order: Order) {
        return await prisma.order.update({
            where: {
                id: order.getId(),
            },
            data: {
                user_id: order.getUserId(),
                tax: order.getTaxRate(),
                total_amount: order.getTotalAmount(),
                status: order.getStatus(),
                supplier: order.getSupplier(),
                delivery_due_date: order.getDeliveryDueDate(),
                order_items: {
                    deleteMany: {},
                    create: order.getOrderItems().map((orderItem: OrderItem) => {
                        return {
                            quantity: orderItem.getQuantity(),
                            unit_price: orderItem.getUnitPrice(),
                            total_price: orderItem.getTotalPrice(),
                            article_id: orderItem.getArticleId(),
                        };
                    }),
                },
            },
        });
    }

    async deleteOrder(id: number) {
        return await prisma.order.delete({
            where: {
                id: id,
            },
        });
    }
}

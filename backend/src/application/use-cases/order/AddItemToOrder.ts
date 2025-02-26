import { OrderRepository } from '../../../infrastructure/orm/OrderRepository';
import { OrderItem } from '../../../domain/entities/OrderItem';
import { Decimal } from '@prisma/client/runtime/library';

export class AddItemToOrder {
    private orderRepository: OrderRepository;

    constructor(orderRepository: OrderRepository) {
        this.orderRepository = orderRepository;
    }

    async execute(data: {
        orderId: number;
        articleId: number;
        quantity: number;
        unitPrice: Decimal;
    }) {
        const orderData = await this.orderRepository.getOrderById(data.orderId);
        if (!orderData) {
            throw new Error('Commande introuvable.');
        }

        if (data.quantity < 0) {
            throw new Error('La quantité ne peut pas être négative.');
        }

        if (data.unitPrice.lessThan(0)) {
            throw new Error('Le prix unitaire ne peut pas être négatif.');
        }

        const orderItem = new OrderItem(
            0,
            data.orderId,
            data.articleId,
            data.unitPrice,
            data.quantity,
            data.unitPrice.mul(data.quantity)
        );

        const totalAmount = orderData.order_items.reduce(
            (acc, orderItem) => acc.add(orderItem.getTotalPrice()), new Decimal(0)
        );

        orderData.setTotalAmount(totalAmount);

        return await this.orderRepository.updateOrder(orderData);
    }
}

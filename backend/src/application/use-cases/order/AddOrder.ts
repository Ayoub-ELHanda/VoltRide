import { Order } from '../../../domain/entities/Order';
import { OrderItem } from '../../../domain/entities/OrderItem';
import { OrderRepository } from '../../../infrastructure/orm/OrderRepository';
import { CreateOrderDTO } from '../../dtos/OrderDTO';

export class AddOrder {
    private orderRepository: OrderRepository;

    constructor(orderRepository: OrderRepository) {
        this.orderRepository = orderRepository;
    }

    async execute(data: CreateOrderDTO) {
        if (data.totalAmount.lessThan(0)) {
            throw new Error("Le montant total doit être supérieur à 0.");
        }

        if (data.taxRate.lessThan(0)) {
            throw new Error("Le taux de taxe ne peut pas être négatif.");
        }

        if (data.status !== "DRAFT" && data.status !== "SENT" && data.status !== "RECEIVED") {
            throw new Error('Le statut doit être "brouillon", "envoyée" ou "reçue".');
        }

        if (data.supplier === "") {
            throw new Error("Le fournisseur ne peut pas être vide.");
        }

        const orderItems: OrderItem[] = [];

        const order = new Order(
            0,
            data.userId,
            data.taxRate,
            data.totalAmount,
            data.status,
            data.supplier,
            data.deliveryDueDate,
            orderItems
        );

        return await this.orderRepository.addOrder(order);
    }
}

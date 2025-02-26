import { OrderItem } from './OrderItem';

export class Article {
    constructor(
        private readonly id: number,
        private name: string,
        private stockQuantity: number,
        private orderItems: OrderItem[]
    ) {
        if (stockQuantity < 0) {
            throw new Error('La quantité en stock ne peut pas être négative.');
        }
    }

    getId(): number {
        return this.id;
    }

    getName(): string {
        return this.name;
    }

    setName(name: string): void {
        this.name = name;
    }

    getStockQuantity(): number {
        return this.stockQuantity;
    }

    setStockQuantity(stockQuantity: number): void {
        this.stockQuantity = stockQuantity;
    }

    getOrderItems(): OrderItem[] {
        return this.orderItems;
    }
}

import { Decimal } from '@prisma/client/runtime/library';

export class OrderItem {
    constructor(
        private readonly id: number,
        private orderId: number,
        private articleId: number,
        private unitPrice: Decimal,
        private quantity: number,
        private totalPrice: Decimal
    ) {
        if (unitPrice.lessThan(0)) {
            throw new Error('Le prix unitaire ne peut pas être négatif.');
        }
        if (quantity < 0) {
            throw new Error('La quantité ne peut pas être négative.');
        }
        if (totalPrice.lessThan(0)) {
            throw new Error('Le prix total ne peut pas être négatif.');
        }
    }

    getId(): number {
        return this.id;
    }

    getOrderId(): number {
        return this.orderId;
    }

    setOrderId(orderId: number): void {
        this.orderId = orderId;
    }

    getArticleId(): number {
        return this.articleId;
    }

    setArticleId(articleId: number): void {
        this.articleId = articleId;
    }

    getUnitPrice(): Decimal {
        return this.unitPrice;
    }

    setUnitPrice(unitPrice: Decimal): void {
        this.unitPrice = unitPrice;
    }

    getQuantity(): number {
        return this.quantity;
    }

    setQuantity(quantity: number): void {
        this.quantity = quantity;
    }

    getTotalPrice(): Decimal {
        return this.totalPrice;
    }

    setTotalPrice(totalPrice: Decimal): void {
        this.totalPrice = totalPrice;
    }

    computeTotalPrice(): void {
        this.totalPrice = this.unitPrice.mul(new Decimal(this.quantity));
    }

    updateQuantity(quantity: number): void {
        this.quantity = quantity;
        this.computeTotalPrice();
    }

    updateUnitPrice(unitPrice: Decimal): void {
        this.unitPrice = unitPrice;
        this.computeTotalPrice();
    }
}

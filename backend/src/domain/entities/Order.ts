import { Decimal } from '@prisma/client/runtime/library';
import { OrderItem } from './OrderItem';
import { User } from './User';

export class Order {
    constructor(
        private readonly id: number,
        private userId: number,
        private taxRate: Decimal,
        private totalAmount: Decimal,
        private status: string,
        private supplier: string,
        private deliveryDueDate: Date,
        private readonly orderItems: OrderItem[]
    ) {
        if (taxRate.lessThan(new Decimal(0))) {
            throw new Error('Le taux de taxe ne peut pas être négatif.');
        }
        if (totalAmount.lessThan(new Decimal(0))) {
            throw new Error('Le montant total ne peut pas être négatif.');
        }
        if (status !== 'DRAFT' && status !== 'SENT' && status !== 'RECEIVED') {
            throw new Error('Le statut doit être "brouillon", "envoyée" ou "reçue".');
        }
        if (supplier === '') {
            throw new Error('Le fournisseur ne peut pas être vide.');
        }
    }

    getId(): number {
        return this.id;
    }

    getUserId(): number {
        return this.userId;
    }

    setUserId(userId: number): void {
        this.userId = userId;
    }

    getTaxRate(): Decimal {
        return this.taxRate;
    }

    setTaxRate(taxRate: Decimal): void {
        this.taxRate = taxRate;
    }

    getTotalAmount(): Decimal {
        return this.totalAmount;
    }

    setTotalAmount(totalAmount: Decimal): void {
        this.totalAmount = totalAmount;
    }

    getStatus(): string {
        return this.status;
    }

    setStatus(status: string): void {
        this.status = status;
    }

    getSupplier(): string {
        return this.supplier;
    }

    setSupplier(supplier: string): void {
        this.supplier = supplier;
    }

    getDeliveryDueDate(): Date {
        return this.deliveryDueDate;
    }

    setDeliveryDueDate(deliveryDueDate: Date): void {
        this.deliveryDueDate = deliveryDueDate;
    }

    getOrderItems(): OrderItem[] {
        return this.orderItems;
    }
}

import { Decimal } from "@prisma/client/runtime/library";

export interface OrderDTO {
    id?: number;
    userId: number;
    taxRate: Decimal;
    totalAmount: Decimal;
    status: string;
    supplier: string;
    deliveryDueDate: Date;
}

export interface CreateOrderDTO {
    userId: number;
    taxRate: Decimal;
    totalAmount: Decimal;
    status: string;
    supplier: string;
    deliveryDueDate: Date;
}

export interface UpdateOrderDTO {
    id: number;
    userId?: number;
    taxRate?: Decimal;
    totalAmount?: Decimal;
    status?: string;
    supplier?: string;
    deliveryDueDate?: Date;
}

export interface AddItemToOrderDTO {
    orderId: number;
    articleId: number;
    quantity: number;
    unitPrice: Decimal;
}
export interface NotificationDTO {
    id?: string;
    message: string;
    recipient: string;
    type: string;
    status: string;
    triggerDate: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface CreateNotificationDTO {
    message: string;
    recipient: string;
    type: string;
    status?: string;
    triggerDate: string;
    subject?: string;
}

export interface UpdateNotificationDTO {
    id: string;
    message?: string;
    recipient?: string;
    type?: string;
    status?: string;
    triggerDate?: string;
}

export interface SendEmailDTO {
    recipient: string;
    subject: string;
    message: string;
}

export interface SendSmsDTO {
    recipient: string;
    message: string;
}

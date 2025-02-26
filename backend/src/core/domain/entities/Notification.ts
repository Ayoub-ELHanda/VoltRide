/**
 * Notification Entity
 * Represents a notification in the system with its properties and business rules
 */
export class Notification {
    private id?: string;
    private message: string;
    private recipient: string;
    private type: NotificationType;
    private status: NotificationStatus;
    private triggerDate: Date;
    private createdAt?: Date;
    private updatedAt?: Date;

    constructor(
        message: string,
        recipient: string,
        type: string,
        triggerDate: Date | string,
        status: string,
        id?: string,
        createdAt?: Date,
        updatedAt?: Date
    ) {
        this.validateMessage(message);
        this.validateRecipient(recipient);
        this.validateType(type);
        this.validateStatus(status);

        this.id = id;
        this.message = message;
        this.recipient = recipient;
        this.type = type as NotificationType;
        this.status = status as NotificationStatus;
        this.triggerDate = typeof triggerDate === 'string' ? new Date(triggerDate) : triggerDate;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    /**
     * Validates that the message is not empty
     * @param message The message to validate
     */
    private validateMessage(message: string): void {
        if (!message || message.trim().length === 0) {
            throw new Error("Le message de notification ne peut pas être vide.");
        }
    }

    /**
     * Validates that the recipient is not empty and has a valid format
     * @param recipient The recipient to validate
     */
    private validateRecipient(recipient: string): void {
        if (!recipient || recipient.trim().length === 0) {
            throw new Error("Le destinataire de la notification ne peut pas être vide.");
        }

        // If it's an email, validate the format
        if (this.type === NotificationType.EMAIL) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(recipient)) {
                throw new Error("Le format de l'adresse email est invalide.");
            }
        }

        // If it's a phone number, validate the format
        if (this.type === NotificationType.SMS) {
            const phoneRegex = /^\+?[0-9]{10,15}$/;
            if (!phoneRegex.test(recipient)) {
                throw new Error("Le format du numéro de téléphone est invalide.");
            }
        }
    }

    /**
     * Validates that the type is one of the allowed values
     * @param type The type to validate
     */
    private validateType(type: string): void {
        const validTypes = Object.values(NotificationType);
        if (!validTypes.includes(type as NotificationType)) {
            throw new Error(`Le type de notification doit être l'un des suivants: ${validTypes.join(', ')}.`);
        }
    }

    /**
     * Validates that the status is one of the allowed values
     * @param status The status to validate
     */
    private validateStatus(status: string): void {
        const validStatuses = Object.values(NotificationStatus);
        if (!validStatuses.includes(status as NotificationStatus)) {
            throw new Error(`Le statut de notification doit être l'un des suivants: ${validStatuses.join(', ')}.`);
        }
    }

    /**
     * Marks the notification as sent
     */
    markAsSent(): void {
        this.status = NotificationStatus.SENT;
        this.updatedAt = new Date();
    }

    /**
     * Marks the notification as failed
     */
    markAsFailed(): void {
        this.status = NotificationStatus.FAILED;
        this.updatedAt = new Date();
    }

    /**
     * Checks if the notification is due to be sent
     * @returns True if the notification is due, false otherwise
     */
    isDue(): boolean {
        const now = new Date();
        return this.triggerDate <= now && this.status === NotificationStatus.PENDING;
    }

    /**
     * Checks if the notification is of type email
     * @returns True if the notification is of type email, false otherwise
     */
    isEmail(): boolean {
        return this.type === NotificationType.EMAIL;
    }

    /**
     * Checks if the notification is of type SMS
     * @returns True if the notification is of type SMS, false otherwise
     */
    isSMS(): boolean {
        return this.type === NotificationType.SMS;
    }

    /**
     * Checks if the notification is of type push
     * @returns True if the notification is of type push, false otherwise
     */
    isPush(): boolean {
        return this.type === NotificationType.PUSH;
    }

    // Getters
    getId(): string | undefined {
        return this.id;
    }

    getMessage(): string {
        return this.message;
    }

    getRecipient(): string {
        return this.recipient;
    }

    getType(): NotificationType {
        return this.type;
    }

    getStatus(): NotificationStatus {
        return this.status;
    }

    getTriggerDate(): Date {
        return this.triggerDate;
    }

    getCreatedAt(): Date | undefined {
        return this.createdAt;
    }

    getUpdatedAt(): Date | undefined {
        return this.updatedAt;
    }

    // Setters with validation
    setId(id: string): void {
        this.id = id;
    }

    setMessage(message: string): void {
        this.validateMessage(message);
        this.message = message;
        this.updatedAt = new Date();
    }

    setRecipient(recipient: string): void {
        this.validateRecipient(recipient);
        this.recipient = recipient;
        this.updatedAt = new Date();
    }

    setType(type: string): void {
        this.validateType(type);
        this.type = type as NotificationType;
        this.updatedAt = new Date();
    }

    setStatus(status: string): void {
        this.validateStatus(status);
        this.status = status as NotificationStatus;
        this.updatedAt = new Date();
    }

    setTriggerDate(triggerDate: Date | string): void {
        this.triggerDate = typeof triggerDate === 'string' ? new Date(triggerDate) : triggerDate;
        this.updatedAt = new Date();
    }
}

/**
 * Enum representing the possible types of notification
 */
export enum NotificationType {
    EMAIL = 'EMAIL',
    SMS = 'SMS',
    PUSH = 'PUSH'
}

/**
 * Enum representing the possible statuses of a notification
 */
export enum NotificationStatus {
    PENDING = 'PENDING',
    SENT = 'SENT',
    FAILED = 'FAILED'
}

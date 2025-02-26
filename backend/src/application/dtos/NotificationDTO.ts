/**
 * Data Transfer Object for Notification
 * Used to transfer data between the application layer and the interface layer
 */
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

/**
 * Data Transfer Object for creating a new Notification
 */
export interface CreateNotificationDTO {
  message: string;
  recipient: string;
  type: string;
  status?: string;
  triggerDate: string;
  subject?: string; // Optional field for email notifications
}

/**
 * Data Transfer Object for updating a Notification
 */
export interface UpdateNotificationDTO {
  id: string;
  message?: string;
  recipient?: string;
  type?: string;
  status?: string;
  triggerDate?: string;
}

/**
 * Data Transfer Object for sending an Email
 */
export interface SendEmailDTO {
  recipient: string;
  subject: string;
  message: string;
}

/**
 * Data Transfer Object for sending an SMS
 */
export interface SendSmsDTO {
  recipient: string;
  message: string;
}

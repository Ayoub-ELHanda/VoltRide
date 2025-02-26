import nodemailer from 'nodemailer';

export class NotificationService {
    private emailTransporter;

    constructor() {
        this.emailTransporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD
            }
        });
    }

    // Send Email
    async sendEmail(to: string, subject: string, message: string) {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to,
            subject,
            text: message
        };

        try {
            await this.emailTransporter.sendMail(mailOptions);
            console.log("Email sent successfully");
        } catch (error) {
            console.error("Error sending email:", error);
            throw new Error("Erreur lors de l'envoi de l'email");
        }
    }

    // Send SMS using Nodemailer and Nexmo
    async sendSMS(to: string, message: string) {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: `${to}@sms.vonage.com`,
            subject: 'SMS Notification',
            text: message
        };

        try {
            await this.emailTransporter.sendMail(mailOptions);
            console.log("SMS sent successfully");
        } catch (error) {
            console.error("Error sending SMS:", error);
            throw new Error("Erreur lors de l'envoi du SMS");
        }
    }
}

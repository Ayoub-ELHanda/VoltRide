import nodemailer from 'nodemailer';
import { Twilio } from 'twilio';

export class NotificationService {
    private emailTransporter;
    private twilioClient;

    constructor() {
        this.emailTransporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD
            }
        });

        this.twilioClient = new Twilio(
            process.env.TWILIO_ACCOUNT_SID,
            process.env.TWILIO_AUTH_TOKEN
        );
    }

    async sendEmail(to: string, subject: string, message: string) {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to,
            subject,
            text: message
        };

        await this.emailTransporter.sendMail(mailOptions);
    }

    async sendSMS(to: string, message: string) {
        await this.twilioClient.messages.create({
            body: message,
            from: process.env.TWILIO_PHONE_NUMBER,
            to
        });
    }
}

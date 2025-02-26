export class Notification {
    public message: string;
    public recipient: string;
    public type: string;
    public triggerDate: string;  // Expect string here
    public status: string;

    constructor(
        message: string,
        recipient: string,
        type: string,
        triggerDate: string,  // Expect string
        status: string
    ) {
        this.message = message;
        this.recipient = recipient;
        this.type = type;
        this.triggerDate = triggerDate;
        this.status = status;
    }
}

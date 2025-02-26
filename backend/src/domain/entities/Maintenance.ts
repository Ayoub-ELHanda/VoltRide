export class Maintenance {
    private id!: number; // Use '!' to indicate definite assignment
    private type: string;
    private date: Date;
    private cost: number;
    private comment: string;
    private technician_name: string;
    private scooter_id: number;

    constructor(
        type: string,
        date: Date,
        cost: number,
        comment: string,
        technician_name: string,
        scooter_id: number
    ) {
        this.type = type;
        this.date = date;
        this.cost = cost;
        this.comment = comment;
        this.technician_name = technician_name;
        this.scooter_id = scooter_id;
    }

    getId() {
        return this.id;
    }

    setId(id: number) {
        this.id = id;
    }

    getType() {
        return this.type;
    }

    getDate() {
        return this.date;
    }

    getCost() {
        return this.cost;
    }

    getComment() {
        return this.comment;
    }

    getTechnicianName() {
        return this.technician_name;
    }

    getScooterId() {
        return this.scooter_id;
    }
}

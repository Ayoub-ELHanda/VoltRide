/**
 * Maintenance Entity
 * Represents a maintenance operation performed on a scooter
 */
export class Maintenance {
    private id?: number;
    private type: MaintenanceType;
    private date: Date;
    private cost: number;
    private comment: string;
    private technicianName: string;
    private scooterId: number;
    private parts: MaintenancePart[] = [];

    constructor(
        type: string,
        date: Date,
        cost: number,
        comment: string,
        technicianName: string,
        scooterId: number,
        id?: number
    ) {
        this.validateType(type);
        this.validateDate(date);
        this.validateCost(cost);
        this.validateTechnicianName(technicianName);
        this.validateScooterId(scooterId);

        this.type = type as MaintenanceType;
        this.date = date;
        this.cost = cost;
        this.comment = comment;
        this.technicianName = technicianName;
        this.scooterId = scooterId;
        this.id = id;
    }

    /**
     * Validates that the maintenance type is one of the allowed values
     * @param type The type to validate
     */
    private validateType(type: string): void {
        const validTypes = Object.values(MaintenanceType);
        if (!validTypes.includes(type as MaintenanceType)) {
            throw new Error(`Le type de maintenance doit être l'un des suivants: ${validTypes.join(', ')}.`);
        }
    }

    /**
     * Validates that the date is not in the future
     * @param date The date to validate
     */
    private validateDate(date: Date): void {
        const today = new Date();
        if (date > today) {
            throw new Error("La date de maintenance ne peut pas être dans le futur.");
        }
    }

    /**
     * Validates that the cost is positive
     * @param cost The cost to validate
     */
    private validateCost(cost: number): void {
        if (cost < 0) {
            throw new Error("Le coût de maintenance ne peut pas être négatif.");
        }
    }

    /**
     * Validates that the technician name is not empty
     * @param technicianName The technician name to validate
     */
    private validateTechnicianName(technicianName: string): void {
        if (!technicianName || technicianName.trim().length === 0) {
            throw new Error("Le nom du technicien ne peut pas être vide.");
        }
    }

    /**
     * Validates that the scooter ID is positive
     * @param scooterId The scooter ID to validate
     */
    private validateScooterId(scooterId: number): void {
        if (scooterId <= 0) {
            throw new Error("L'ID du scooter doit être un nombre positif.");
        }
    }

    /**
     * Adds a part used in the maintenance
     * @param part The part to add
     */
    addPart(part: MaintenancePart): void {
        this.parts.push(part);
        // Recalculate total cost
        this.recalculateCost();
    }

    /**
     * Removes a part from the maintenance
     * @param partId The ID of the part to remove
     */
    removePart(partId: number): void {
        const index = this.parts.findIndex(part => part.id === partId);
        if (index !== -1) {
            this.parts.splice(index, 1);
            // Recalculate total cost
            this.recalculateCost();
        }
    }

    /**
     * Recalculates the total cost of the maintenance based on labor and parts
     */
    private recalculateCost(): void {
        // Base cost (labor)
        let totalCost = this.cost;
        
        // Add cost of parts
        for (const part of this.parts) {
            totalCost += part.price * part.quantity;
        }
        
        this.cost = totalCost;
    }

    /**
     * Checks if the maintenance is preventive
     * @returns True if the maintenance is preventive, false otherwise
     */
    isPreventive(): boolean {
        return this.type === MaintenanceType.PREVENTIVE;
    }

    /**
     * Checks if the maintenance is corrective
     * @returns True if the maintenance is corrective, false otherwise
     */
    isCorrective(): boolean {
        return this.type === MaintenanceType.CORRECTIVE;
    }

    // Getters
    getId(): number | undefined {
        return this.id;
    }

    setId(id: number): void {
        this.id = id;
    }

    getType(): MaintenanceType {
        return this.type;
    }

    getDate(): Date {
        return this.date;
    }

    getCost(): number {
        return this.cost;
    }

    getComment(): string {
        return this.comment;
    }

    getTechnicianName(): string {
        return this.technicianName;
    }

    getScooterId(): number {
        return this.scooterId;
    }

    getParts(): MaintenancePart[] {
        return [...this.parts]; // Return a copy to prevent direct modification
    }

    // Setters with validation
    setType(type: string): void {
        this.validateType(type);
        this.type = type as MaintenanceType;
    }

    setDate(date: Date): void {
        this.validateDate(date);
        this.date = date;
    }

    setCost(cost: number): void {
        this.validateCost(cost);
        this.cost = cost;
    }

    setComment(comment: string): void {
        this.comment = comment;
    }

    setTechnicianName(technicianName: string): void {
        this.validateTechnicianName(technicianName);
        this.technicianName = technicianName;
    }
}

/**
 * Enum representing the possible types of maintenance
 */
export enum MaintenanceType {
    PREVENTIVE = 'PREVENTIVE',
    CORRECTIVE = 'CORRECTIVE'
}

/**
 * Interface representing a part used in maintenance
 */
export interface MaintenancePart {
    id: number;
    name: string;
    price: number;
    quantity: number;
}

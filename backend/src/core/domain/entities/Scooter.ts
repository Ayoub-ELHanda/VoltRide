import { ScooterModel } from './ScooterModel';

/**
 * Scooter Entity
 * Represents a scooter in the system with its properties and business rules
 */
export class Scooter {
    private readonly id: number;
    private licensePlate: string;
    private status: ScooterStatus;
    private dealerId?: number;
    private partnerId?: number;
    private readonly scooterModel: ScooterModel;
    private lastMaintenanceDate?: Date;

    constructor(
        id: number,
        licensePlate: string,
        status: string,
        scooterModel: ScooterModel,
        dealerId?: number,
        partnerId?: number,
        lastMaintenanceDate?: Date
    ) {
        this.validateLicensePlate(licensePlate);
        this.validateStatus(status);

        this.id = id;
        this.licensePlate = licensePlate;
        this.status = status as ScooterStatus;
        this.scooterModel = scooterModel;
        this.dealerId = dealerId;
        this.partnerId = partnerId;
        this.lastMaintenanceDate = lastMaintenanceDate;
    }

    /**
     * Validates that the license plate follows the required format
     * @param licensePlate The license plate to validate
     */
    private validateLicensePlate(licensePlate: string): void {
        if (!licensePlate || licensePlate.trim().length === 0) {
            throw new Error("La plaque d'immatriculation ne peut pas être vide.");
        }
        
        // Additional validation rules could be added here
        // For example, checking format, length, etc.
    }

    /**
     * Validates that the status is one of the allowed values
     * @param status The status to validate
     */
    private validateStatus(status: string): void {
        const validStatuses = Object.values(ScooterStatus);
        if (!validStatuses.includes(status as ScooterStatus)) {
            throw new Error(`Le statut du scooter doit être l'un des suivants: ${validStatuses.join(', ')}.`);
        }
    }

    /**
     * Checks if the scooter needs maintenance based on its model's maintenance interval
     * @returns True if maintenance is needed, false otherwise
     */
    needsMaintenance(): boolean {
        if (!this.lastMaintenanceDate) {
            return true;
        }

        const maintenanceIntervalDays = this.scooterModel.getMaintenanceInterval();
        const today = new Date();
        const daysSinceLastMaintenance = Math.floor(
            (today.getTime() - this.lastMaintenanceDate.getTime()) / (1000 * 60 * 60 * 24)
        );

        return daysSinceLastMaintenance >= maintenanceIntervalDays;
    }

    /**
     * Sets the scooter status to MAINTENANCE
     * @throws Error if the scooter is already in maintenance
     */
    sendToMaintenance(): void {
        if (this.status === ScooterStatus.MAINTENANCE) {
            throw new Error("Le scooter est déjà en maintenance.");
        }
        this.status = ScooterStatus.MAINTENANCE;
    }

    /**
     * Sets the scooter status to AVAILABLE after maintenance
     * @param maintenanceDate The date when maintenance was performed
     * @throws Error if the scooter is not in maintenance
     */
    completeMaintenanceAndMakeAvailable(maintenanceDate: Date): void {
        if (this.status !== ScooterStatus.MAINTENANCE) {
            throw new Error("Le scooter n'est pas en maintenance.");
        }
        this.status = ScooterStatus.AVAILABLE;
        this.lastMaintenanceDate = maintenanceDate;
    }

    /**
     * Assigns the scooter to a dealer
     * @param dealerId The ID of the dealer
     */
    assignToDealer(dealerId: number): void {
        if (dealerId <= 0) {
            throw new Error("L'ID du concessionnaire doit être un nombre positif.");
        }
        this.dealerId = dealerId;
        this.partnerId = undefined; // A scooter can't be assigned to both a dealer and a partner
    }

    /**
     * Assigns the scooter to a partner
     * @param partnerId The ID of the partner
     */
    assignToPartner(partnerId: number): void {
        if (partnerId <= 0) {
            throw new Error("L'ID du partenaire doit être un nombre positif.");
        }
        this.partnerId = partnerId;
        this.dealerId = undefined; // A scooter can't be assigned to both a dealer and a partner
    }

    // Getters
    getId(): number {
        return this.id;
    }

    getLicensePlate(): string {
        return this.licensePlate;
    }

    getStatus(): ScooterStatus {
        return this.status;
    }

    getDealerId(): number | undefined {
        return this.dealerId;
    }

    getPartnerId(): number | undefined {
        return this.partnerId;
    }

    getScooterModel(): ScooterModel {
        return this.scooterModel;
    }

    getLastMaintenanceDate(): Date | undefined {
        return this.lastMaintenanceDate;
    }

    // Setters with validation
    setLicensePlate(licensePlate: string): void {
        this.validateLicensePlate(licensePlate);
        this.licensePlate = licensePlate;
    }

    setStatus(status: string): void {
        this.validateStatus(status);
        this.status = status as ScooterStatus;
    }
}

/**
 * Enum representing the possible statuses of a scooter
 */
export enum ScooterStatus {
    AVAILABLE = 'AVAILABLE',
    MAINTENANCE = 'MAINTENANCE',
    RESERVED = 'RESERVED',
    IN_USE = 'IN_USE',
    OUT_OF_SERVICE = 'OUT_OF_SERVICE'
}

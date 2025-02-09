import { ScooterModel } from './ScooterModel';

export class Scooter {
    constructor(
        private readonly id: string,
        private licensePlate: string,
        private status: string,
        private dealerId: string,
        private partnerId: string,
        private readonly scooterModel: ScooterModel
    ) {
        if (status !== 'AVAILABLE' && status !== 'MAINTENANCE') {
            throw new Error("Le statut du scooter doit être 'AVAILABLE' ou 'MAINTENANCE'.");
        }
    }

    getId(): string {
        return this.id;
    }

    getLicensePlate(): string {
        return this.licensePlate;
    }

    setLicensePlate(licensePlate: string): void {
        this.licensePlate = licensePlate;
    }

    getStatus(): string {
        return this.status;
    }

    setStatus(status: string): void {
        this.status = status;
    }

    getDealerId(): string {
        return this.dealerId;
    }

    setDealerId(dealerId: string): void {
        this.dealerId = dealerId;
    }

    getPartnerId(): string {
        return this.partnerId;
    }

    setPartnerId(partnerId: string): void {
        this.partnerId = partnerId;
    }

    getScooterModel(): ScooterModel {
        return this.scooterModel;
    }
}

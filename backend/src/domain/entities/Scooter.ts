import { ScooterModel } from './ScooterModel';

export class Scooter {
    constructor(
        private readonly id: number,
        private licensePlate: string,
        private status: string,
        private dealerId: number,
        private partnerId: number,
        private readonly scooterModel: ScooterModel
    ) {
        if (status !== 'AVAILABLE' && status !== 'MAINTENANCE') {
            throw new Error("Le statut du scooter doit être 'AVAILABLE' ou 'MAINTENANCE'.");
        }
    }

    getId(): number {
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

    getDealerId(): number {
        return this.dealerId;
    }

    setDealerId(dealerId: number): void {
        this.dealerId = dealerId;
    }

    getPartnerId(): number {
        return this.partnerId;
    }

    setPartnerId(partnerId: number): void {
        this.partnerId = partnerId;
    }

    getScooterModel(): ScooterModel {
        return this.scooterModel;
    }
}

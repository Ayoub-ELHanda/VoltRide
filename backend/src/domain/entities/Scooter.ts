export class Scooter {
    constructor(
        private readonly id: string,
        private readonly model: string,
        private batteryLevel: number,
        private isAvailable: boolean = true
    ) {
        if (batteryLevel < 0 || batteryLevel > 100) {
            throw new Error("Le niveau de batterie doit être entre 0 et 100.");
        }
    }

    getId(): string {
        return this.id;
    }

    getModel(): string {
        return this.model;
    }

    getBatteryLevel(): number {
        return this.batteryLevel;
    }

    isScooterAvailable(): boolean {
        return this.isAvailable;
    }

    updateBatteryLevel(level: number): void {
        if (level < 0 || level > 100) {
            throw new Error("Le niveau de batterie doit être entre 0 et 100.");
        }
        this.batteryLevel = level;
    }

    toggleAvailability(): void {
        this.isAvailable = !this.isAvailable;
    }
}

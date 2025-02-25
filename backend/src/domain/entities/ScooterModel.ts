export class ScooterModel {
    constructor(
        private readonly id: number,
        private name: string = "",
        private batteryRange: number = 0,
        private maintenanceInterval: number = 0
    ) {
        if (batteryRange < 0) {
            throw new Error("La portée de la batterie doit être supérieure à 0.");
        }
        if (maintenanceInterval < 0) {
            throw new Error("L'intervalle de maintenance doit être supérieur à 0.");
        }
    }

    getId(): number {
        return this.id;
    }

    getName(): string {
        return this.name;
    }

    setName(name: string): void {
        this.name = name;
    }

    getBatteryRange(): number {
        return this.batteryRange;
    }

    setBatteryRange(batteryRange: number): void {
        this.batteryRange = batteryRange;
    }

    getMaintenanceInterval(): number {
        return this.maintenanceInterval;
    }

    setMaintenanceInterval(maintenanceInterval: number): void {
        this.maintenanceInterval = maintenanceInterval;
    }
}

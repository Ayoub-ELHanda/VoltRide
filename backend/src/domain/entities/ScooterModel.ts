export class ScooterModel {
    private id: number;
    private name: string;
    private batteryRange: number;
    private maintenanceInterval: number;

    constructor(
        id: number,
        name: string = "",
        batteryRange: number = 0,
        maintenanceInterval: number = 0
    ) {
        this.id = id;
        this.name = name;
        this.batteryRange = batteryRange;
        this.maintenanceInterval = maintenanceInterval;

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

    setId(id: number): void {
        this.id = id;
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

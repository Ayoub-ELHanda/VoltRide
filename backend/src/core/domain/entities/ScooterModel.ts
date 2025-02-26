/**
 * ScooterModel Entity
 * Represents a model of scooter with its properties and business rules
 */
export class ScooterModel {
    private readonly id: number;
    private name: string;
    private batteryRange: number;
    private maintenanceInterval: number;

    constructor(
        id: number,
        name: string,
        batteryRange: number,
        maintenanceInterval: number
    ) {
        this.validateName(name);
        this.validateBatteryRange(batteryRange);
        this.validateMaintenanceInterval(maintenanceInterval);

        this.id = id;
        this.name = name;
        this.batteryRange = batteryRange;
        this.maintenanceInterval = maintenanceInterval;
    }

    /**
     * Validates that the name is not empty
     * @param name The name to validate
     */
    private validateName(name: string): void {
        if (!name || name.trim().length === 0) {
            throw new Error("Le nom du modèle ne peut pas être vide.");
        }
    }

    /**
     * Validates that the battery range is positive
     * @param batteryRange The battery range to validate
     */
    private validateBatteryRange(batteryRange: number): void {
        if (batteryRange <= 0) {
            throw new Error("La portée de la batterie doit être supérieure à 0.");
        }
    }

    /**
     * Validates that the maintenance interval is positive
     * @param maintenanceInterval The maintenance interval to validate
     */
    private validateMaintenanceInterval(maintenanceInterval: number): void {
        if (maintenanceInterval <= 0) {
            throw new Error("L'intervalle de maintenance doit être supérieur à 0.");
        }
    }

    /**
     * Calculates the estimated range based on battery condition
     * @param batteryConditionPercentage The current battery condition as a percentage
     * @returns The estimated range in kilometers
     */
    calculateEstimatedRange(batteryConditionPercentage: number): number {
        if (batteryConditionPercentage < 0 || batteryConditionPercentage > 100) {
            throw new Error("Le pourcentage de condition de la batterie doit être entre 0 et 100.");
        }
        return (this.batteryRange * batteryConditionPercentage) / 100;
    }

    // Getters
    getId(): number {
        return this.id;
    }

    getName(): string {
        return this.name;
    }

    getBatteryRange(): number {
        return this.batteryRange;
    }

    getMaintenanceInterval(): number {
        return this.maintenanceInterval;
    }

    // Setters with validation
    setName(name: string): void {
        this.validateName(name);
        this.name = name;
    }

    setBatteryRange(batteryRange: number): void {
        this.validateBatteryRange(batteryRange);
        this.batteryRange = batteryRange;
    }

    setMaintenanceInterval(maintenanceInterval: number): void {
        this.validateMaintenanceInterval(maintenanceInterval);
        this.maintenanceInterval = maintenanceInterval;
    }
}

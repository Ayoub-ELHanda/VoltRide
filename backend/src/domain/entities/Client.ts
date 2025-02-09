import { ScooterModel } from './ScooterModel';

export class Client {
    constructor(
        private readonly id: string,
        private firstName: string,
        private lastName: string,
        private email: string,
        private phoneNumber: string,
        private driverLicense: string,
        private preferedScooterModel: ScooterModel
    ) {
        if (phoneNumber.length !== 10) {
            throw new Error("Le numéro de téléphone doit contenir 10 chiffres.");
        }
    }

    getId(): string {
        return this.id;
    }

    getFirstName(): string {
        return this.firstName;
    }

    setFirstName(firstName: string): void {
        this.firstName = firstName;
    }

    getLastName(): string {
        return this.lastName;
    }

    setLastName(lastName: string): void {
        this.lastName = lastName;
    }

    getEmail(): string {
        return this.email;
    }

    setEmail(email: string): void {
        this.email = email;
    }

    getPhoneNumber(): string {
        return this.phoneNumber;
    }

    setPhoneNumber(phoneNumber: string): void {
        this.phoneNumber = phoneNumber
    }

    getDriverLicense(): string {
        return this.driverLicense;
    }

    setDriverLicense(driverLicense: string): void {
        this.driverLicense = driverLicense;
    }

    getPreferedScooterModel(): ScooterModel {
        return this.preferedScooterModel;
    }
    
    setPreferedScooterModel(preferedScooterModel: ScooterModel): void {
        this.preferedScooterModel = preferedScooterModel;
    }
}

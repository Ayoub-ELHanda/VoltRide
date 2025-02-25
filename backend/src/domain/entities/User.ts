export class User {
    constructor(
        private readonly id: number,
        private email: string,
        private password: string,
        private role: string
    ) {
        if (role !== 'ADMIN' && role !== 'PARTNER' && role !== 'DEALER') {
            throw new Error("Le rôle de l'utilisateur doit être 'ADMIN', 'PARTNER' ou 'DEALER'.");
        }
    }

    getId(): number {
        return this.id;
    }

    getEmail(): string {
        return this.email;
    }

    setEmail(email: string): void {
        this.email = email;
    }

    getPassword(): string {
        return this.password;
    }

    setPassword(password: string): void {
        this.password = password;
    }

    getRole(): string {
        return this.role;
    }

    setRole(role: string): void {
        this.role = role;
    }
}

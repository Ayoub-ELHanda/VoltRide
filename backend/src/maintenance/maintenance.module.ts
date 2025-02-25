// ✅ Importation de `Module` depuis @nestjs/common
import { Module } from '@nestjs/common';
import { MaintenanceController } from './maintenance.controller';

// ✅ Déclaration du module `MaintenanceModule`
@Module({
  // ===========================================
  // ✅ Enregistrement des contrôleurs
  // ===========================================
  controllers: [MaintenanceController]
})
export class MaintenanceModule {}

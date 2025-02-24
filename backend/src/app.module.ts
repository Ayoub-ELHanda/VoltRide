import { Module } from '@nestjs/common';
import { MaintenanceModule } from './maintenance/maintenance.module';
import { NotificationModule } from './notifications/notifications.module';

@Module({
    imports: [MaintenanceModule, NotificationModule]
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MaintenanceModule } from './maintenance/maintenance.module';
import { NotificationModule } from './notifications/notifications.module';

@Module({
  imports: [
    // Connexion à MongoDB pour les Notification
    MongooseModule.forRoot('mongodb://localhost:27017/voltride'),
    
    // Modules fonctionnels
    MaintenanceModule,  // Utilise Prisma avec Postgres
    NotificationModule  // Utilise Mongoose avec MongoDB
  ]
})
export class AppModule {}

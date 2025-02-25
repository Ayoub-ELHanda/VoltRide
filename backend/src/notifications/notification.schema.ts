// 💡 Importation des modules nécessaires de NestJS Mongoose
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

// 💡 Déclaration du type du document pour MongoDB
// Ici, `NotificationDocument` représente un document MongoDB basé sur la classe `Notification`
export type NotificationDocument = Notification & Document;

// 💡 Déclaration du Schema pour MongoDB
// Utilisation du décorateur `@Schema()` pour indiquer à Mongoose que cette classe représente un schéma MongoDB
@Schema({ timestamps: true }) // timestamps: true ajoute automatiquement createdAt et updatedAt
export class Notification {
  
  // 💡 Propriété `message` de la notification
  // Utilisation de `@Prop()` pour indiquer à Mongoose que c'est un champ du document
  @Prop({ required: true }) // `required: true` signifie que ce champ est obligatoire
  message: string = 'Aucune notification';   // 👈 Valeur par défaut pour éviter les erreurs si aucune valeur n'est fournie

  // 💡 Propriété `maintenance_id` pour associer la notification à une maintenance
  @Prop({ required: true }) // `required: true` signifie que ce champ est obligatoire
  maintenance_id: number = 0;                // 👈 Valeur par défaut pour éviter les erreurs si aucune valeur n'est fournie
}

// 💡 Création du schéma Mongoose à partir de la classe `Notification`
// `SchemaFactory.createForClass()` transforme la classe TypeScript en schéma Mongoose compatible avec MongoDB
export const NotificationSchema = SchemaFactory.createForClass(Notification);

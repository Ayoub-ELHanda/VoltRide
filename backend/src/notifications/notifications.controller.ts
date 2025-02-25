// ✅ Importation des modules nécessaires de NestJS et Mongoose
import { Controller, Get, Post, Delete, Body, Param, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Notification, NotificationDocument } from './notification.schema';

// ✅ Déclaration du contrôleur avec le décorateur `@Controller`
@Controller('notifications')
export class NotificationController {

  // ✅ Utilisation de `@InjectModel` uniquement dans le constructeur
  constructor(
    @InjectModel(Notification.name) 
    private readonly notificationModel: Model<NotificationDocument>  // ✅ Injection correcte
  ) {}

  // ===========================================
  // ✅ Endpoint GET pour obtenir toutes les notifications
  // ===========================================
  /**
   * @description Récupère toutes les notifications
   * @returns {Promise<Notification[]>} Liste des notifications
   */
  @Get()
  async getAll(): Promise<Notification[]> {
    try {
      const notifications = await this.notificationModel.find().exec();
      return notifications;
    } catch (error) {
      throw new InternalServerErrorException('Erreur lors de la récupération des notifications');
    }
  }

  // ===========================================
  // ✅ Endpoint GET pour obtenir une notification par ID
  // ===========================================
  /**
   * @param {string} id - L'identifiant de la notification
   * @returns {Promise<Notification>} La notification trouvée ou une erreur 404 si non trouvée
   */
  @Get(':id')
  async getById(@Param('id') id: string): Promise<Notification> {
    try {
      const notification = await this.notificationModel.findById(id).exec();
      if (!notification) {
        throw new NotFoundException(`Notification avec l'id ${id} non trouvée`);
      }
      return notification;
    } catch (error) {
      throw new InternalServerErrorException('Erreur lors de la récupération de la notification');
    }
  }

  // ===========================================
  // ✅ Endpoint POST pour créer une notification
  // ===========================================
  /**
   * @param {any} data - Les données de la nouvelle notification
   * @returns {Promise<Notification>} La notification créée
   */
  @Post()
  async create(@Body() data: any): Promise<Notification> {
    try {
      const newNotification = await this.notificationModel.create(data);
      return newNotification;
    } catch (error) {
      throw new InternalServerErrorException('Erreur lors de la création de la notification');
    }
  }

  // ===========================================
  // ✅ Endpoint DELETE pour supprimer une notification par ID
  // ===========================================
  /**
   * @param {string} id - L'identifiant de la notification à supprimer
   * @returns {Promise<Notification>} La notification supprimée ou une erreur 404 si non trouvée
   */
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Notification> {
    try {
      const deletedNotification = await this.notificationModel.findByIdAndDelete(id).exec();
      if (!deletedNotification) {
        throw new NotFoundException(`Notification avec l'id ${id} non trouvée`);
      }
      return deletedNotification;
    } catch (error) {
      throw new InternalServerErrorException('Erreur lors de la suppression de la notification');
    }
  }
}

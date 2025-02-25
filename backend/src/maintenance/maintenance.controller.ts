// ✅ Importation des modules nécessaires de NestJS et Prisma
import { Controller, Get, Post, Patch, Delete, Body, Param } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

// ✅ Création d'une instance de PrismaClient
const prisma = new PrismaClient();

// =========================================
// ✅ Déclaration du Contrôleur Maintenance
// =========================================
@Controller('maintenances')   // 👈 Route de base pour ce contrôleur
export class MaintenanceController {

  // =========================================
  // ✅ GET /maintenances
  // Récupérer toutes les maintenances
  // =========================================
  @Get()
  async getAll() {
    // ✅ Utilisation de Prisma pour récupérer toutes les maintenances
    return await prisma.maintenance.findMany();
  }

  // =========================================
  // ✅ GET /maintenances/:id
  // Récupérer une maintenance par ID
  // =========================================
  @Get(':id')
  async getById(@Param('id') id: number) {
    // ✅ Conversion de l'ID en nombre et recherche dans la base de données
    return await prisma.maintenance.findUnique({
      where: { id: Number(id) }   // 👈 Conversion explicite en nombre
    });
  }

  // =========================================
  // ✅ POST /maintenances
  // Créer une nouvelle maintenance
  // =========================================
  @Post()
  async create(@Body() data: any) {
    // ✅ Utilisation de Prisma pour créer une nouvelle entrée de maintenance
    return await prisma.maintenance.create({
      data: {
        technician_name: data.technician_name,   // 👈 Nom du technicien
        type: data.type,                         // 👈 Type de maintenance (ex: préventive, corrective)
        status: data.status,                     // 👈 Statut de la maintenance (ex: planifiée, en cours, terminée)
        date_planned: new Date(data.date_planned), // 👈 Date de planification (convertie en Date)
        date_completed: data.date_completed ? new Date(data.date_completed) : null, // 👈 Date de complétion (ou null)
        cost: data.cost,                         // 👈 Coût de la maintenance
        comment: data.comment,                   // 👈 Commentaires supplémentaires
        scooter_id: data.scooter_id               // 👈 Référence au scooter concerné
      }
    });
  }

  // =========================================
  // ✅ PATCH /maintenances/:id
  // Mettre à jour une maintenance existante
  // =========================================
  @Patch(':id')
  async update(@Param('id') id: number, @Body() data: any) {
    // ✅ Mise à jour d'une maintenance existante par ID
    return await prisma.maintenance.update({
      where: { id: Number(id) },
      data: {
        technician_name: data.technician_name,
        type: data.type,
        status: data.status,
        date_planned: new Date(data.date_planned),
        date_completed: data.date_completed ? new Date(data.date_completed) : null,
        cost: data.cost,
        comment: data.comment,
        scooter_id: data.scooter_id
      }
    });
  }

  // =========================================
  // ✅ DELETE /maintenances/:id
  // Supprimer une maintenance par ID
  // =========================================
  @Delete(':id')
  async delete(@Param('id') id: number) {
    // ✅ Suppression d'une maintenance existante par ID
    return await prisma.maintenance.delete({
      where: { id: Number(id) }
    });
  }
}

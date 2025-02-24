import { Controller, Get, Post, Patch, Delete, Body, Param } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Controller('maintenances')
export class MaintenanceController {
  
  @Get()
  async getAll() {
    return await prisma.maintenance.findMany();
  }

  @Get(':id')
  async getById(@Param('id') id: number) {
    return await prisma.maintenance.findUnique({
      where: { id: Number(id) }
    });
  }

  @Post()
  async create(@Body() data: any) {
    return await prisma.maintenance.create({
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

  @Patch(':id')
  async update(@Param('id') id: number, @Body() data: any) {
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

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return await prisma.maintenance.delete({
      where: { id: Number(id) }
    });
  }
}

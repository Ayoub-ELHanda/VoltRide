import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Controller('notifications')
export class NotificationController {

  @Get()
  async getAll() {
    return await prisma.notification.findMany();
  }

  @Get(':id')
  async getById(@Param('id') id: number) {
    return await prisma.notification.findUnique({
      where: { id: Number(id) }
    });
  }

  @Post()
  async create(@Body() data: any) {
    return await prisma.notification.create({
      data: {
        message: data.message,
        maintenance_id: data.maintenance_id
      }
    });
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return await prisma.notification.delete({
      where: { id: Number(id) }
    });
  }
}

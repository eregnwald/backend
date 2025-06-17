// src/notifications/notifications.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { Notification } from './entities/notification.entity';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(Notification)
    private readonly notificationRepo: Repository<Notification>,
  ) {}

  async create(dto: CreateNotificationDto) {
    const notification = this.notificationRepo.create({
      title: dto.title,
      message: dto.message,
      due_date: dto.due_date,
      user: { user_id: dto.userId },
      task: dto.taskId ? { task_id: dto.taskId } : null,
      type: dto.type,
      is_read: false,
    });
    return await this.notificationRepo.save(notification);
  }

  async findAllForUser(userId: number) {
    return await this.notificationRepo.find({
      where: {
        user: { user_id: userId },
        is_read: false, // Учитываем только непрочитанные уведомления
      },
      relations: ['task'],
      order: { due_date: 'ASC' },
    });
  }

  async markAsRead(notificationId: number): Promise<void> {
    await this.notificationRepo.update(notificationId, { is_read: true });
  }

  async hasNotification(taskId: number, type: "today" | "5min" | "overdue"): Promise<boolean> {
    const count = await this.notificationRepo.count({
      where: {
        task: { task_id: taskId },
        type,
        is_read: false, // Учитываем только непрочитанные уведомления
      },
    });
    return count > 0;
  }
}
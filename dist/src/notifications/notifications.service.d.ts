import { Repository } from 'typeorm';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { Notification } from './entities/notification.entity';
export declare class NotificationsService {
    private readonly notificationRepo;
    constructor(notificationRepo: Repository<Notification>);
    create(dto: CreateNotificationDto): Promise<Notification>;
    findAllForUser(userId: number): Promise<Notification[]>;
    markAsRead(notificationId: number): Promise<void>;
    hasNotification(taskId: number, type: "today" | "5min" | "overdue"): Promise<boolean>;
}

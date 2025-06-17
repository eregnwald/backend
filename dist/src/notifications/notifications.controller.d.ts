import { NotificationsService } from './notifications.service';
export declare class NotificationsController {
    private readonly notificationsService;
    constructor(notificationsService: NotificationsService);
    getNotifications(req: any): Promise<import("./entities/notification.entity").Notification[]>;
    markAsRead(id: number): Promise<{
        message: string;
    }>;
}

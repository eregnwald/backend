// create-notification.dto.ts
export class CreateNotificationDto {
  userId: number;
  taskId?: number | null;
  title: string;
  message: string;
  due_date: Date;
  type: "today" | "5min" | "overdue";
}
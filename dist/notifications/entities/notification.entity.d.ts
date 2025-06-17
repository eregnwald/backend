import { User } from 'src/users/entities/user.entity';
import { Task } from 'src/tasks/entities/task.entity';
export declare class Notification {
    id: number;
    title: string;
    message: string;
    due_date: Date;
    is_read: boolean;
    created_at: Date;
    user: User;
    task: Task | null;
    type: "today" | "5min" | "overdue";
}

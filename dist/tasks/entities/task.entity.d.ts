import { User } from '../../users/entities/user.entity';
import { Contact } from '../../contacts/entities/contact.entity';
import { Account } from '../../accounts/entities/account.entity';
import { TaskStatus } from '../../task-statuses/entities/task-status.entity';
import { TaskPriority } from '../../task-priorities/entities/task-priority.entity';
export declare class Task {
    task_id: number;
    title: string;
    description: string;
    due_date: Date;
    created_at: Date;
    updated_at: Date;
    is_urgent: boolean;
    status: TaskStatus;
    priority: TaskPriority;
    assignedUser: User | null;
    contact: Contact | null;
    account: Account | null;
    is_deleted: boolean;
}

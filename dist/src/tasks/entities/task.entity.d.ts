import { User } from '../../users/entities/user.entity';
import { Contact } from '../../contacts/entities/contact.entity';
import { Account } from '../../accounts/entities/account.entity';
import { TaskStatus } from '../../task-statuses/entities/task-status.entity';
import { TaskPriority } from '../../task-priorities/entities/task-priority.entity';
import { Opportunity } from '../../opportunities/entities/opportunity.entity';
import { TaskType } from '../../task-type/entities/task-type.entity';
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
    opportunity_id: number | null;
    opportunity: Opportunity | null;
    is_closed: boolean;
    is_deleted: boolean;
    task_type_id: number | null;
    type: TaskType | null;
    account_id: number | null;
    account: Account | null;
    result: string | null;
}

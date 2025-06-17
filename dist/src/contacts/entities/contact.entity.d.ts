import { User } from '../../users/entities/user.entity';
import { Account } from '../../accounts/entities/account.entity';
import { Interaction } from '../../interactions/entities/interaction.entity';
import { Task } from '../../tasks/entities/task.entity';
export declare class Contact {
    contact_id: number;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    job_title: string;
    account_id: number | null;
    account: Account | null;
    owner_id: number | null;
    owner: User | null;
    created_at: Date;
    updated_at: Date;
    is_primary: boolean;
    is_deleted: boolean;
    interactions: Interaction[];
    tasks: Task[];
}

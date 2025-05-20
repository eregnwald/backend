import { User } from '../../users/entities/user.entity';
import { Account } from '../../accounts/entities/account.entity';
import { Interaction } from '../../interactions/entities/interaction.entity';
import { AccountContact } from '../../account-contacts/entities/account-contact.entity';
import { Task } from '../../tasks/entities/task.entity';
export declare class Contact {
    contact_id: number;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    job_title: string;
    account: Account | null;
    owner: User | null;
    created_at: Date;
    updated_at: Date;
    is_primary: boolean;
    is_deleted: boolean;
    interactions: Interaction[];
    accountContacts: AccountContact[];
    tasks: Task[];
}

import { User } from '../../users/entities/user.entity';
import { Contact } from '../../contacts/entities/contact.entity';
import { Opportunity } from '../../opportunities/entities/opportunity.entity';
import { Interaction } from '../../interactions/entities/interaction.entity';
import { AccountContact } from '../../account-contacts/entities/account-contact.entity';
import { Task } from '../../tasks/entities/task.entity';
export declare class Account {
    account_id: number;
    account_name: string;
    industry: string;
    website: string;
    phone: string;
    annual_revenue: number;
    employee_count: number;
    billing_address: any;
    shipping_address: any;
    owner: User | null;
    created_at: Date;
    updated_at: Date;
    is_deleted: boolean;
    contacts: Contact[];
    opportunities: Opportunity[];
    interactions: Interaction[];
    accountContacts: AccountContact[];
    tasks: Task[];
}

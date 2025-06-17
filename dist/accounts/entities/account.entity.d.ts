import { User } from '../../users/entities/user.entity';
import { Contact } from '../../contacts/entities/contact.entity';
import { Interaction } from 'src/interactions/entities/interaction.entity';
export declare class Account {
    account_id: number;
    account_name: string;
    website: string;
    phone: string;
    annual_revenue: number;
    created_at: Date;
    updated_at: Date;
    is_deleted: boolean;
    owner_id: number;
    owner: User | null;
    contact_id: number;
    contact: Contact | null;
    address: string;
    email: string;
    contacts: Contact[];
    interactions: Interaction[];
}

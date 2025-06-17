import { Account } from '../../accounts/entities/account.entity';
import { Contact } from '../../contacts/entities/contact.entity';
import { User } from '../../users/entities/user.entity';
import { InteractionType } from '../../interaction-types/entities/interaction-type.entity';
import { InteractionDetail } from '../../interaction-details/entities/interaction-detail.entity';
export declare class Interaction {
    interaction_id: number;
    subject: string;
    type: InteractionType;
    account: Account;
    contact: Contact | null;
    user: User | null;
    start_time: Date;
    end_time: Date;
    description: string;
    outcome: string;
    created_at: Date;
    interactionDetails: InteractionDetail[];
}

import { Account } from '../../accounts/entities/account.entity';
import { Contact } from '../../contacts/entities/contact.entity';
import { OpportunityStage } from '../../opportunity-stages/entities/opportunity-stage.entity';
import { User } from '../../users/entities/user.entity';
export declare class Opportunity {
    opportunity_id: number;
    opportunity_name: string;
    amount: number;
    contact_id: number;
    owner_id: number;
    is_deleted: boolean;
    close_date: Date;
    created_at: Date;
    updated_at: Date;
    account: Account | null;
    contact: Contact | null;
    stage: OpportunityStage;
    owner: User;
    is_closed: boolean;
}

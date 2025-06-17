import { Account } from '../../accounts/entities/account.entity';
import { Contact } from '../../contacts/entities/contact.entity';
import { Opportunity } from '../../opportunities/entities/opportunity.entity';
import { Interaction } from '../../interactions/entities/interaction.entity';
import { Task } from '../../tasks/entities/task.entity';
import { Document } from '../../documents/entities/document.entity';
import { AuditLog } from '../../audit-log/entities/audit-log.entity';
import { Role } from 'src/roles/entities/role.entity';
export declare class User {
    user_id: number;
    username: string;
    email: string;
    password_hash: string;
    first_name: string;
    last_name: string;
    is_active: boolean;
    last_login: Date;
    created_at: Date;
    updated_at: Date;
    accounts: Account[];
    contacts: Contact[];
    opportunities: Opportunity[];
    interactions: Interaction[];
    tasks: Task[];
    documents: Document[];
    auditLogs: AuditLog[];
    role: Role;
}

import { UserRole } from '../../user-roles/entities/user-role.entity';
import { Account } from '../../accounts/entities/account.entity';
import { Contact } from '../../contacts/entities/contact.entity';
import { Opportunity } from '../../opportunities/entities/opportunity.entity';
import { Interaction } from '../../interactions/entities/interaction.entity';
import { Task } from '../../tasks/entities/task.entity';
import { Document } from '../../documents/entities/document.entity';
import { AuditLog } from '../../audit-log/entities/audit-log.entity';
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
    userRoles: UserRole[];
    accounts: Account[];
    contacts: Contact[];
    opportunities: Opportunity[];
    interactions: Interaction[];
    tasks: Task[];
    documents: Document[];
    auditLogs: AuditLog[];
}

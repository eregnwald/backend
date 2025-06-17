import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { AuditLog } from './audit-log/entities/audit-log.entity';
import { AuditLogSubscriber } from './audit-log/subscribers/auditlogsubscriber';
import { User } from './users/entities/user.entity';
import { UserRole } from './user-roles/entities/user-role.entity';
import { Role } from './roles/entities/role.entity';
import { RolePermission } from './role-permissions/entities/role-permission.entity';
import { Permission } from './permissions/entities/permission.entity';
import { Account } from './accounts/entities/account.entity';
import { Contact } from './contacts/entities/contact.entity';
import { Interaction } from './interactions/entities/interaction.entity';
import { InteractionType } from './interaction-types/entities/interaction-type.entity';
import { InteractionDetail } from './interaction-details/entities/interaction-detail.entity';
import { Task } from './tasks/entities/task.entity';
import { TaskStatus } from './task-statuses/entities/task-status.entity';
import { TaskType } from './task-type/entities/task-type.entity';
import { TaskPriority } from './task-priorities/entities/task-priority.entity';
import { OpportunityTask } from './opportunitytask/entitites/opportunitytask.entity';
import { Opportunity } from './opportunities/entities/opportunity.entity';
import { OpportunityStage } from './opportunity-stages/entities/opportunity-stage.entity';
import { SalesFunnel } from './salesfunnel/funnel.entity';
import { SalesFunnelStage } from './salesfunnelstages/funnel-stage.entity';
import { Document } from './documents/entities/document.entity';
import { DocumentLink } from './document-links/entities/document-link.entity';
import { EntityTag } from './entity-tags/entities/entity-tag.entity';
import { Tag } from './tags/entities/tag.entity';



config(); 

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true, 
  logging: false,
  entities: [
    AuditLog,
    User,
    UserRole,
    Role,
    RolePermission,
    Permission,
    Account,
    Contact,
    Interaction,
    InteractionDetail,
    InteractionType,
    Task,
    TaskPriority,
    TaskStatus,
    TaskType,
    OpportunityTask,
    Opportunity,
    OpportunityStage,
    SalesFunnel,
    SalesFunnelStage,
    Document,
    DocumentLink,
    EntityTag,
    Tag,
],
  subscribers: [AuditLogSubscriber],
});

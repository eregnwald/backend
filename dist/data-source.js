"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const dotenv_1 = require("dotenv");
const audit_log_entity_1 = require("./audit-log/entities/audit-log.entity");
const auditlogsubscriber_1 = require("./audit-log/subscribers/auditlogsubscriber");
const user_entity_1 = require("./users/entities/user.entity");
const user_role_entity_1 = require("./user-roles/entities/user-role.entity");
const role_entity_1 = require("./roles/entities/role.entity");
const role_permission_entity_1 = require("./role-permissions/entities/role-permission.entity");
const permission_entity_1 = require("./permissions/entities/permission.entity");
const account_entity_1 = require("./accounts/entities/account.entity");
const contact_entity_1 = require("./contacts/entities/contact.entity");
const interaction_entity_1 = require("./interactions/entities/interaction.entity");
const interaction_type_entity_1 = require("./interaction-types/entities/interaction-type.entity");
const interaction_detail_entity_1 = require("./interaction-details/entities/interaction-detail.entity");
const task_entity_1 = require("./tasks/entities/task.entity");
const task_status_entity_1 = require("./task-statuses/entities/task-status.entity");
const task_type_entity_1 = require("./task-type/entities/task-type.entity");
const task_priority_entity_1 = require("./task-priorities/entities/task-priority.entity");
const opportunitytask_entity_1 = require("./opportunitytask/entitites/opportunitytask.entity");
const opportunity_entity_1 = require("./opportunities/entities/opportunity.entity");
const opportunity_stage_entity_1 = require("./opportunity-stages/entities/opportunity-stage.entity");
const funnel_entity_1 = require("./salesfunnel/funnel.entity");
const funnel_stage_entity_1 = require("./salesfunnelstages/funnel-stage.entity");
const document_entity_1 = require("./documents/entities/document.entity");
const document_link_entity_1 = require("./document-links/entities/document-link.entity");
const entity_tag_entity_1 = require("./entity-tags/entities/entity-tag.entity");
const tag_entity_1 = require("./tags/entities/tag.entity");
(0, dotenv_1.config)();
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5432', 10),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: false,
    entities: [
        audit_log_entity_1.AuditLog,
        user_entity_1.User,
        user_role_entity_1.UserRole,
        role_entity_1.Role,
        role_permission_entity_1.RolePermission,
        permission_entity_1.Permission,
        account_entity_1.Account,
        contact_entity_1.Contact,
        interaction_entity_1.Interaction,
        interaction_detail_entity_1.InteractionDetail,
        interaction_type_entity_1.InteractionType,
        task_entity_1.Task,
        task_priority_entity_1.TaskPriority,
        task_status_entity_1.TaskStatus,
        task_type_entity_1.TaskType,
        opportunitytask_entity_1.OpportunityTask,
        opportunity_entity_1.Opportunity,
        opportunity_stage_entity_1.OpportunityStage,
        funnel_entity_1.SalesFunnel,
        funnel_stage_entity_1.SalesFunnelStage,
        document_entity_1.Document,
        document_link_entity_1.DocumentLink,
        entity_tag_entity_1.EntityTag,
        tag_entity_1.Tag,
    ],
    subscribers: [auditlogsubscriber_1.AuditLogSubscriber],
});
//# sourceMappingURL=data-source.js.map
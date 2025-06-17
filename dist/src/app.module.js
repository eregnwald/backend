"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const users_module_1 = require("./users/users.module");
const typeorm_1 = require("@nestjs/typeorm");
const accounts_module_1 = require("./accounts/accounts.module");
const contacts_module_1 = require("./contacts/contacts.module");
const opportunities_module_1 = require("./opportunities/opportunities.module");
const tasks_module_1 = require("./tasks/tasks.module");
const task_priorities_module_1 = require("./task-priorities/task-priorities.module");
const task_statuses_module_1 = require("./task-statuses/task-statuses.module");
const interaction_details_module_1 = require("./interaction-details/interaction-details.module");
const interactions_module_1 = require("./interactions/interactions.module");
const interaction_types_module_1 = require("./interaction-types/interaction-types.module");
const opportunity_stages_module_1 = require("./opportunity-stages/opportunity-stages.module");
const role_permissions_module_1 = require("./role-permissions/role-permissions.module");
const user_roles_module_1 = require("./user-roles/user-roles.module");
const permissions_module_1 = require("./permissions/permissions.module");
const roles_module_1 = require("./roles/roles.module");
const permissions_service_1 = require("./permissions/permissions.service");
const permissions_controller_1 = require("./permissions/permissions.controller");
const document_links_module_1 = require("./document-links/document-links.module");
const documents_module_1 = require("./documents/documents.module");
const entity_tags_module_1 = require("./entity-tags/entity-tags.module");
const tags_module_1 = require("./tags/tags.module");
const auth_module_1 = require("./auth/auth.module");
const config_2 = require("@nestjs/config");
const funnel_module_1 = require("./salesfunnel/funnel.module");
const funnel_stage_controller_1 = require("./salesfunnelstages/funnel-stage.controller");
const funnel_stage_module_1 = require("./salesfunnelstages/funnel-stage.module");
const task_types_module_1 = require("./task-type/task-types.module");
const notifications_module_1 = require("./notifications/notifications.module");
const schedule_1 = require("@nestjs/schedule");
const notes_module_1 = require("./notes/notes.module");
const opportunity_stage_history_module_1 = require("./opportunity-stage-history/opportunity-stage-history.module");
const note_entity_1 = require("./notes/entities/note.entity");
const report_module_1 = require("./reports/report.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            users_module_1.UsersModule,
            typeorm_1.TypeOrmModule.forRootAsync({
                useFactory: (configService) => ({
                    type: 'postgres',
                    host: configService.get('DB_HOST'),
                    port: configService.get('DB_PORT', 5432),
                    username: configService.get('DB_USERNAME'),
                    password: configService.get('DB_PASSWORD'),
                    database: configService.get('DB_NAME'),
                    entities: [__dirname + '/**/*.entity{.ts,.js}', note_entity_1.Note],
                    synchronize: configService.get('DB_SYNCHRONIZE', true),
                    autoLoadEntities: true,
                    logging: configService.get('DB_LOGGING', false),
                }),
                inject: [config_2.ConfigService],
            }),
            report_module_1.ReportsModule,
            opportunity_stage_history_module_1.OpportunityStageHistoryModule,
            notes_module_1.NotesModule,
            schedule_1.ScheduleModule.forRoot(),
            notifications_module_1.NotificationsModule,
            accounts_module_1.AccountsModule,
            contacts_module_1.ContactsModule,
            opportunities_module_1.OpportunitiesModule,
            tasks_module_1.TasksModule,
            interactions_module_1.InteractionsModule,
            documents_module_1.DocumentsModule,
            roles_module_1.RolesModule,
            permissions_module_1.PermissionsModule,
            user_roles_module_1.UserRolesModule,
            role_permissions_module_1.RolePermissionsModule,
            opportunity_stages_module_1.OpportunityStagesModule,
            interaction_types_module_1.InteractionTypesModule,
            interaction_details_module_1.InteractionDetailsModule,
            task_statuses_module_1.TaskStatusesModule,
            task_priorities_module_1.TaskPrioritiesModule,
            document_links_module_1.DocumentLinksModule,
            tags_module_1.TagsModule,
            entity_tags_module_1.EntityTagsModule,
            auth_module_1.AuthModule,
            funnel_module_1.SalesFunnelsModule,
            funnel_stage_module_1.SalesFunnelStagesModule,
            task_types_module_1.TaskTypesModule,
        ],
        controllers: [app_controller_1.AppController, permissions_controller_1.PermissionsController, funnel_stage_controller_1.FunnelStageController],
        providers: [app_service_1.AppService, permissions_service_1.PermissionsService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map
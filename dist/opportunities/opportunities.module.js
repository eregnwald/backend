"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpportunitiesModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const opportunities_controller_1 = require("./opportunities.controller");
const opportunities_service_1 = require("./opportunities.service");
const opportunity_entity_1 = require("./entities/opportunity.entity");
const opportunity_stage_entity_1 = require("../opportunity-stages/entities/opportunity-stage.entity");
const account_entity_1 = require("../accounts/entities/account.entity");
const contact_entity_1 = require("../contacts/entities/contact.entity");
const user_entity_1 = require("../users/entities/user.entity");
const opportunitytask_entity_1 = require("../opportunitytask/entitites/opportunitytask.entity");
const task_entity_1 = require("../tasks/entities/task.entity");
const funnel_stage_entity_1 = require("../salesfunnelstages/funnel-stage.entity");
const note_entity_1 = require("../notes/entities/note.entity");
const notes_module_1 = require("../notes/notes.module");
const opportunity_stage_history_module_1 = require("../opportunity-stage-history/opportunity-stage-history.module");
let OpportunitiesModule = class OpportunitiesModule {
};
exports.OpportunitiesModule = OpportunitiesModule;
exports.OpportunitiesModule = OpportunitiesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                opportunity_entity_1.Opportunity,
                opportunity_stage_entity_1.OpportunityStage,
                account_entity_1.Account,
                contact_entity_1.Contact,
                user_entity_1.User,
                opportunitytask_entity_1.OpportunityTask,
                task_entity_1.Task,
                funnel_stage_entity_1.SalesFunnelStage,
                note_entity_1.Note,
            ]),
            notes_module_1.NotesModule,
            opportunity_stage_history_module_1.OpportunityStageHistoryModule,
        ],
        controllers: [opportunities_controller_1.OpportunitiesController],
        providers: [opportunities_service_1.OpportunitiesService],
        exports: [typeorm_1.TypeOrmModule.forFeature([opportunity_entity_1.Opportunity]), opportunities_service_1.OpportunitiesService,],
    })
], OpportunitiesModule);
//# sourceMappingURL=opportunities.module.js.map
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SalesFunnelsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const funnel_entity_1 = require("./funnel.entity");
const funnel_stage_entity_1 = require("../salesfunnelstages/funnel-stage.entity");
const funnel_service_1 = require("./funnel.service");
const funnel_controller_1 = require("./funnel.controller");
const passport_1 = require("@nestjs/passport");
const funnel_stage_module_1 = require("../salesfunnelstages/funnel-stage.module");
let SalesFunnelsModule = class SalesFunnelsModule {
};
exports.SalesFunnelsModule = SalesFunnelsModule;
exports.SalesFunnelsModule = SalesFunnelsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([funnel_entity_1.SalesFunnel, funnel_stage_entity_1.SalesFunnelStage]),
            passport_1.PassportModule.register({ defaultStrategy: 'jwt' }),
            funnel_stage_module_1.SalesFunnelStagesModule,
        ],
        controllers: [funnel_controller_1.FunnelController],
        providers: [funnel_service_1.SalesFunnelsService],
        exports: [funnel_service_1.SalesFunnelsService],
    })
], SalesFunnelsModule);
//# sourceMappingURL=funnel.module.js.map
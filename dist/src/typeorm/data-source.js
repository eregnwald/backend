"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const opportunity_entity_1 = require("../opportunities/entities/opportunity.entity");
const funnel_entity_1 = require("../salesfunnel/funnel.entity");
const funnel_stage_entity_1 = require("../salesfunnelstages/funnel-stage.entity");
exports.default = new typeorm_1.DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'admin',
    database: 'crm',
    schema: 'public',
    synchronize: false,
    logging: true,
    entities: [opportunity_entity_1.Opportunity, funnel_entity_1.SalesFunnel, funnel_stage_entity_1.SalesFunnelStage],
    migrations: [__dirname + '/../migrations/*.ts'],
    subscribers: [],
});
//# sourceMappingURL=data-source.js.map
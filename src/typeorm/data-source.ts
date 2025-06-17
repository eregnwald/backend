import { DataSource } from 'typeorm';
import { Opportunity } from '../opportunities/entities/opportunity.entity';
import { SalesFunnel } from '../salesfunnel/funnel.entity';
import { SalesFunnelStage } from '../salesfunnelstages/funnel-stage.entity';

export default new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'admin',
  database: 'crm',
  schema: 'public',
  synchronize: false,
  logging: true,
  entities: [Opportunity, SalesFunnel, SalesFunnelStage],
  migrations: [__dirname + '/../migrations/*.ts'],
  subscribers: [],
});
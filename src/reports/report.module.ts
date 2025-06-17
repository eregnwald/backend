import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Opportunity } from '../opportunities/entities/opportunity.entity';
import { SalesFunnelStage } from '../salesfunnelstages/funnel-stage.entity';
import { ReportController } from './report.controller';
import { ReportService } from './report.service';
import { OpportunityStageHistory } from 'src/opportunity-stage-history/entities/opportunity-stage-history.entity';
@Module({
  imports: [
    TypeOrmModule.forFeature([Opportunity, SalesFunnelStage, OpportunityStageHistory]),
  ],
  providers: [ReportService],
  controllers: [ReportController],
  exports: [ReportService],
})
export class ReportsModule {}
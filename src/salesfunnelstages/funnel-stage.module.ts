import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SalesFunnelStage } from './funnel-stage.entity';
import { SalesFunnelStagesService } from './funnel-stage.service';
import { FunnelStageController } from './funnel-stage.controller';
import { OpportunitiesModule } from 'src/opportunities/opportunities.module';
@Module({
  imports: [
    TypeOrmModule.forFeature([SalesFunnelStage]),
    OpportunitiesModule,
  ],
  providers: [SalesFunnelStagesService],
  exports: [SalesFunnelStagesService], 
  controllers: [FunnelStageController],
})
export class SalesFunnelStagesModule {}
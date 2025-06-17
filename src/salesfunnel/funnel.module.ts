import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SalesFunnel } from './funnel.entity';
import { SalesFunnelStage } from '../salesfunnelstages/funnel-stage.entity';
import { SalesFunnelsService } from './funnel.service';
import { SalesFunnelStagesService } from '../salesfunnelstages/funnel-stage.service';
import { FunnelController } from './funnel.controller';
import { FunnelStageController } from '../salesfunnelstages/funnel-stage.controller';
import { PassportModule } from '@nestjs/passport';
import { SalesFunnelStagesModule } from '../salesfunnelstages/funnel-stage.module';
@Module({
  imports: [
    TypeOrmModule.forFeature([SalesFunnel, SalesFunnelStage]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    SalesFunnelStagesModule, // ✅ Теперь Guard работает
  ],
  controllers: [FunnelController],
  providers: [SalesFunnelsService],
  exports: [SalesFunnelsService],
})
export class SalesFunnelsModule {}
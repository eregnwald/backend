// opportunity-stage-history.module.ts
import { Module } from '@nestjs/common';
import { OpportunityStageHistoryService } from './opportunity-stage-history.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OpportunityStageHistory } from './entities/opportunity-stage-history.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      OpportunityStageHistory, // ✅ Регистрируем сущность
    ]),
  ],
  providers: [
    OpportunityStageHistoryService, // ✅ Регистрируем сервис
  ],
  exports: [
    OpportunityStageHistoryService, // ✅ Экспортируем, если будешь использовать в других модулях
  ],
})
export class OpportunityStageHistoryModule {}
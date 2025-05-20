import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OpportunityStagesController } from './opportunity-stages.controller';
import { OpportunityStagesService } from './opportunity-stages.service';
import { OpportunityStage } from './entities/opportunity-stage.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OpportunityStage])],
  controllers: [OpportunityStagesController],
  providers: [OpportunityStagesService],
})
export class OpportunityStagesModule {}
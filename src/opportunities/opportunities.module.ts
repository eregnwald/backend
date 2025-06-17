import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OpportunitiesController } from './opportunities.controller';
import { OpportunitiesService } from './opportunities.service';
import { Opportunity } from './entities/opportunity.entity';
import { OpportunityStage } from '../opportunity-stages/entities/opportunity-stage.entity';
import { Account } from '../accounts/entities/account.entity';
import { Contact } from '../contacts/entities/contact.entity';
import { User } from '../users/entities/user.entity';
import { OpportunityTask } from 'src/opportunitytask/entitites/opportunitytask.entity';
import { Task } from 'src/tasks/entities/task.entity';
import { SalesFunnelStage } from 'src/salesfunnelstages/funnel-stage.entity';
import { Note } from 'src/notes/entities/note.entity';
import { NotesModule } from 'src/notes/notes.module';
import { OpportunityStageHistoryModule } from 'src/opportunity-stage-history/opportunity-stage-history.module';
@Module({
  imports: [
    TypeOrmModule.forFeature([
      Opportunity,
      OpportunityStage,
      Account,
      Contact,
      User,
      OpportunityTask,
      Task,
      SalesFunnelStage,
      Note,
      
    ]),
    NotesModule,
    OpportunityStageHistoryModule,
  ],
  controllers: [OpportunitiesController],
  providers: [OpportunitiesService],
  exports: [TypeOrmModule.forFeature([Opportunity]), OpportunitiesService,],
})
export class OpportunitiesModule {}
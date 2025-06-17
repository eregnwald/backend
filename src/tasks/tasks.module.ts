import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { Task } from './entities/task.entity';
import { TaskStatus } from '../task-statuses/entities/task-status.entity';
import { TaskPriority } from '../task-priorities/entities/task-priority.entity';
import { Contact } from '../contacts/entities/contact.entity';
import { Account } from '../accounts/entities/account.entity';
import { User } from '../users/entities/user.entity';
import { Opportunity } from '../opportunities/entities/opportunity.entity';
import { OpportunityTask } from 'src/opportunitytask/entitites/opportunitytask.entity';
import { NotificationsModule } from '../notifications/notifications.module';
import { NotificationsService } from 'src/notifications/notifications.service';
import { Notification } from 'src/notifications/entities/notification.entity';
@Module({
  imports: [
    TypeOrmModule.forFeature([
      Task,
      TaskStatus,
      TaskPriority,
      Contact,
      Account,
      User,
      Opportunity,
      OpportunityTask,
      NotificationsModule,
      Notification,
    ]),
  ],
  controllers: [TasksController],
  providers: [TasksService, NotificationsService],
})
export class TasksModule {}
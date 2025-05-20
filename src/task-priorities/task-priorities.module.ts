import { Module } from '@nestjs/common';
import { TaskPrioritiesService } from './task-priorities.service';
import { TaskPrioritiesController } from './task-priorities.controller';

@Module({
  controllers: [TaskPrioritiesController],
  providers: [TaskPrioritiesService],
})
export class TaskPrioritiesModule {}

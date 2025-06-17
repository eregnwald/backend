import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  Req,
  
} from '@nestjs/common';

import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { SoonTaskDto } from './dto/soon-task.dto';
import { Between } from 'typeorm';
import { UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Cron } from '@nestjs/schedule';




@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}


  

  @UseGuards(AuthGuard('jwt'))
  @Get('soon')
async getSoonTasks(@Req() req): Promise<SoonTaskDto[]> {
  console.log('req.user:', req.user);
  const userId = req.user.userId;
  const now = new Date();
  const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);

  const tasks = await this.tasksService.find({
    where: {
      assignedUser: { user_id: userId },
      is_closed: false,
      due_date: Between(now, tomorrow),
    },
    relations: ['assignedUser'], 
  });

  return tasks.map(task => ({
    task_id: task.task_id,
    title: task.title,
    due_date: task.due_date,
    assigned_to: task.assignedUser?.user_id || null, 
  }));
}

  @Post()
  create(@Body() dto: CreateTaskDto) {
    return this.tasksService.create(dto);
  }
  
 @UseGuards(AuthGuard('jwt'))
@Get()
findAll(@Request() req) {
  return this.tasksService.findAll(req.user);
}

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tasksService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateTaskDto) {
    return this.tasksService.update(+id, dto);
  }

  @Delete(':id/soft')
  softDelete(@Param('id') id: string) {
    return this.tasksService.softDelete(+id);
  }

  @Patch(':id/restore')
  restore(@Param('id') id: string) {
    return this.tasksService.restore(+id);
  }
  
  @Get('check-soon')
async checkSoon() {
  await this.tasksService.checkSoonTasks();
}

  @Cron('0 * * * *') 
async handleCron() {
  await this.tasksService.checkSoonTasks();
}

@UseGuards(AuthGuard('jwt'))
@Get('overdue/count')
async getOverdueCount(@Request() req) {
  const userId = req.user.userId;
  const count = await this.tasksService.countOverdueTasks(userId);
  return { count };
}

}
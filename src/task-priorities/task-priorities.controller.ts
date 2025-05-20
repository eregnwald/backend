import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TaskPrioritiesService } from './task-priorities.service';
import { CreateTaskPriorityDto } from './dto/create-task-priority.dto';
import { UpdateTaskPriorityDto } from './dto/update-task-priority.dto';

@Controller('task-priorities')
export class TaskPrioritiesController {
  constructor(private readonly taskPrioritiesService: TaskPrioritiesService) {}

  @Post()
  create(@Body() createTaskPriorityDto: CreateTaskPriorityDto) {
    return this.taskPrioritiesService.create(createTaskPriorityDto);
  }

  @Get()
  findAll() {
    return this.taskPrioritiesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.taskPrioritiesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskPriorityDto: UpdateTaskPriorityDto) {
    return this.taskPrioritiesService.update(+id, updateTaskPriorityDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.taskPrioritiesService.remove(+id);
  }
}

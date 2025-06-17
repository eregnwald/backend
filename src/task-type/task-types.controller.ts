// src/task-types/task-types.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TaskTypesService } from './task-types.service';
import { CreateTaskTypeDto } from './dto/create-task-type.dto';
import { UpdateTaskTypeDto } from './dto/update-task-type.dto';
import { TaskType } from './entities/task-type.entity';

@Controller('task-types')
export class TaskTypesController {
  constructor(private readonly taskTypesService: TaskTypesService) {}

  @Post()
  create(@Body() dto: CreateTaskTypeDto): Promise<TaskType> {
    return this.taskTypesService.create(dto);
  }

  @Get()
  findAll(): Promise<TaskType[]> {
    return this.taskTypesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<TaskType> {
    return this.taskTypesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() dto: UpdateTaskTypeDto,
  ): Promise<TaskType> {
    return this.taskTypesService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.taskTypesService.remove(id);
  }
}
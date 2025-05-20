import { Injectable } from '@nestjs/common';
import { CreateTaskStatusDto } from './dto/create-task-status.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';

@Injectable()
export class TaskStatusesService {
  create(createTaskStatusDto: CreateTaskStatusDto) {
    return 'This action adds a new taskStatus';
  }

  findAll() {
    return `This action returns all taskStatuses`;
  }

  findOne(id: number) {
    return `This action returns a #${id} taskStatus`;
  }

  update(id: number, updateTaskStatusDto: UpdateTaskStatusDto) {
    return `This action updates a #${id} taskStatus`;
  }

  remove(id: number) {
    return `This action removes a #${id} taskStatus`;
  }
}

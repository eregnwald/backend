import { Injectable } from '@nestjs/common';
import { CreateTaskPriorityDto } from './dto/create-task-priority.dto';
import { UpdateTaskPriorityDto } from './dto/update-task-priority.dto';

@Injectable()
export class TaskPrioritiesService {
  create(createTaskPriorityDto: CreateTaskPriorityDto) {
    return 'This action adds a new taskPriority';
  }

  findAll() {
    return `This action returns all taskPriorities`;
  }

  findOne(id: number) {
    return `This action returns a #${id} taskPriority`;
  }

  update(id: number, updateTaskPriorityDto: UpdateTaskPriorityDto) {
    return `This action updates a #${id} taskPriority`;
  }

  remove(id: number) {
    return `This action removes a #${id} taskPriority`;
  }
}

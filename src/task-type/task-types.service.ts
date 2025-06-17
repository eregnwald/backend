// src/task-types/task-types.service.ts
import { Injectable, NotFoundException } from '@nestjs/common'; // ✅ Добавили NotFoundException
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TaskType } from './entities/task-type.entity';
import { CreateTaskTypeDto } from './dto/create-task-type.dto';
import { UpdateTaskTypeDto } from './dto/update-task-type.dto';

@Injectable()
export class TaskTypesService {
  constructor(
    @InjectRepository(TaskType)
    private taskTypeRepository: Repository<TaskType>,
  ) {}

  async findAll(): Promise<TaskType[]> {
    return await this.taskTypeRepository.find();
  }

  async findOne(id: number): Promise<TaskType> {
    const taskType = await this.taskTypeRepository.findOneBy({ task_type_id: id });
    if (!taskType) {
      throw new NotFoundException(`TaskType with ID ${id} not found`);
    }
    return taskType;
  }

  async create(dto: CreateTaskTypeDto): Promise<TaskType> {
    const newType = this.taskTypeRepository.create(dto);
    return await this.taskTypeRepository.save(newType);
  }

  async update(id: number, dto: UpdateTaskTypeDto): Promise<TaskType> {
    const result = await this.taskTypeRepository.update(id, dto);

    if (result.affected === 0) {
      throw new NotFoundException(`TaskType with ID ${id} not found`);
    }

    return this.findOne(id); // ✅ Теперь мы уверены, что получим TaskType
  }

  async remove(id: number): Promise<void> {
    const result = await this.taskTypeRepository.softDelete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`TaskType with ID ${id} not found`);
    }
  }
}
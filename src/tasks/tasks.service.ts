import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { User } from '../users/entities/user.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(dto: CreateTaskDto): Promise<Task> {
    const task = new Task();

    if (dto.title !== undefined) task.title = dto.title;
    if (dto.description !== undefined) task.description = dto.description || '';
    if (dto.due_date !== undefined) task.due_date = dto.due_date;
    if (dto.is_urgent !== undefined) task.is_urgent = dto.is_urgent;

    if (dto.assigned_to) {
      const user = await this.userRepository.findOneBy({ user_id: dto.assigned_to });
      if (user) task.assignedUser = user;
    }

    return await this.taskRepository.save(task);
  }

  async findAll(): Promise<Task[]> {
    return await this.taskRepository.find({
      where: { is_deleted: false },
      relations: ['assignedUser', 'status', 'priority'],
    });
  }

  async findOne(id: number): Promise<Task> {
    const task = await this.taskRepository.findOne({
      where: { task_id: id },
      relations: ['assignedUser', 'status', 'priority'],
    });

    if (!task) throw new Error(`Задача с ID ${id} не найдена`);

    return task;
  }

  async softDelete(id: number): Promise<void> {
    const task = await this.findOne(id);
    task.is_deleted = true;
    await this.taskRepository.save(task);
  }

  async restore(id: number): Promise<void> {
    const task = await this.findOne(id);
    task.is_deleted = false;
    await this.taskRepository.save(task);
  }

  async update(id: number, dto: UpdateTaskDto): Promise<Task> {
    const task = await this.findOne(id);

    if (dto.title !== undefined) task.title = dto.title;
    if (dto.description !== undefined) task.description = dto.description || '';
    if (dto.due_date !== undefined) task.due_date = dto.due_date;
    if (dto.is_urgent !== undefined) task.is_urgent = dto.is_urgent;

    if (dto.assigned_to !== undefined) {
      if (dto.assigned_to === null) {
        task.assignedUser = null;
      } else if (dto.assigned_to !== undefined && dto.assigned_to !== null) {
        const user = await this.userRepository.findOneBy({ user_id: dto.assigned_to });
        if (user) task.assignedUser = user;
      }
    }

    return await this.taskRepository.save(task);
  }

  async remove(id: number): Promise<void> {
    const result = await this.taskRepository.delete(id);
    if (result.affected === 0) {
      throw new Error(`Задача с ID ${id} не найдена`);
    }
  }
}
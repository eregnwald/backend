import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { User } from '../users/entities/user.entity';
export declare class TasksService {
    private readonly taskRepository;
    private readonly userRepository;
    constructor(taskRepository: Repository<Task>, userRepository: Repository<User>);
    create(dto: CreateTaskDto): Promise<Task>;
    findAll(): Promise<Task[]>;
    findOne(id: number): Promise<Task>;
    softDelete(id: number): Promise<void>;
    restore(id: number): Promise<void>;
    update(id: number, dto: UpdateTaskDto): Promise<Task>;
    remove(id: number): Promise<void>;
}

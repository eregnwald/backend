import { Repository } from 'typeorm';
import { TaskType } from './entities/task-type.entity';
import { CreateTaskTypeDto } from './dto/create-task-type.dto';
import { UpdateTaskTypeDto } from './dto/update-task-type.dto';
export declare class TaskTypesService {
    private taskTypeRepository;
    constructor(taskTypeRepository: Repository<TaskType>);
    findAll(): Promise<TaskType[]>;
    findOne(id: number): Promise<TaskType>;
    create(dto: CreateTaskTypeDto): Promise<TaskType>;
    update(id: number, dto: UpdateTaskTypeDto): Promise<TaskType>;
    remove(id: number): Promise<void>;
}

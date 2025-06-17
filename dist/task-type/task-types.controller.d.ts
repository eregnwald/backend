import { TaskTypesService } from './task-types.service';
import { CreateTaskTypeDto } from './dto/create-task-type.dto';
import { UpdateTaskTypeDto } from './dto/update-task-type.dto';
import { TaskType } from './entities/task-type.entity';
export declare class TaskTypesController {
    private readonly taskTypesService;
    constructor(taskTypesService: TaskTypesService);
    create(dto: CreateTaskTypeDto): Promise<TaskType>;
    findAll(): Promise<TaskType[]>;
    findOne(id: number): Promise<TaskType>;
    update(id: number, dto: UpdateTaskTypeDto): Promise<TaskType>;
    remove(id: number): Promise<void>;
}

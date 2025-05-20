import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
export declare class TasksController {
    private readonly tasksService;
    constructor(tasksService: TasksService);
    create(dto: CreateTaskDto): Promise<import("./entities/task.entity").Task>;
    findAll(): Promise<import("./entities/task.entity").Task[]>;
    findOne(id: string): Promise<import("./entities/task.entity").Task>;
    update(id: string, dto: UpdateTaskDto): Promise<import("./entities/task.entity").Task>;
    softDelete(id: string): Promise<void>;
    restore(id: string): Promise<void>;
}

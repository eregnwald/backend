import { TaskStatusesService } from './task-statuses.service';
import { CreateTaskStatusDto } from './dto/create-task-status.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
export declare class TaskStatusesController {
    private readonly taskStatusesService;
    constructor(taskStatusesService: TaskStatusesService);
    create(createTaskStatusDto: CreateTaskStatusDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateTaskStatusDto: UpdateTaskStatusDto): string;
    remove(id: string): string;
}

import { TaskPrioritiesService } from './task-priorities.service';
import { CreateTaskPriorityDto } from './dto/create-task-priority.dto';
import { UpdateTaskPriorityDto } from './dto/update-task-priority.dto';
export declare class TaskPrioritiesController {
    private readonly taskPrioritiesService;
    constructor(taskPrioritiesService: TaskPrioritiesService);
    create(createTaskPriorityDto: CreateTaskPriorityDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateTaskPriorityDto: UpdateTaskPriorityDto): string;
    remove(id: string): string;
}

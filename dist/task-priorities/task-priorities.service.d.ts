import { CreateTaskPriorityDto } from './dto/create-task-priority.dto';
import { UpdateTaskPriorityDto } from './dto/update-task-priority.dto';
export declare class TaskPrioritiesService {
    create(createTaskPriorityDto: CreateTaskPriorityDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateTaskPriorityDto: UpdateTaskPriorityDto): string;
    remove(id: number): string;
}

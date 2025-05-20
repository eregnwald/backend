import { CreateTaskStatusDto } from './dto/create-task-status.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
export declare class TaskStatusesService {
    create(createTaskStatusDto: CreateTaskStatusDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateTaskStatusDto: UpdateTaskStatusDto): string;
    remove(id: number): string;
}

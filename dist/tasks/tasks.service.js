"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TasksService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const task_entity_1 = require("./entities/task.entity");
const user_entity_1 = require("../users/entities/user.entity");
let TasksService = class TasksService {
    taskRepository;
    userRepository;
    constructor(taskRepository, userRepository) {
        this.taskRepository = taskRepository;
        this.userRepository = userRepository;
    }
    async create(dto) {
        const task = new task_entity_1.Task();
        if (dto.title !== undefined)
            task.title = dto.title;
        if (dto.description !== undefined)
            task.description = dto.description || '';
        if (dto.due_date !== undefined)
            task.due_date = dto.due_date;
        if (dto.is_urgent !== undefined)
            task.is_urgent = dto.is_urgent;
        if (dto.assigned_to) {
            const user = await this.userRepository.findOneBy({ user_id: dto.assigned_to });
            if (user)
                task.assignedUser = user;
        }
        return await this.taskRepository.save(task);
    }
    async findAll() {
        return await this.taskRepository.find({
            where: { is_deleted: false },
            relations: ['assignedUser', 'status', 'priority'],
        });
    }
    async findOne(id) {
        const task = await this.taskRepository.findOne({
            where: { task_id: id },
            relations: ['assignedUser', 'status', 'priority'],
        });
        if (!task)
            throw new Error(`Задача с ID ${id} не найдена`);
        return task;
    }
    async softDelete(id) {
        const task = await this.findOne(id);
        task.is_deleted = true;
        await this.taskRepository.save(task);
    }
    async restore(id) {
        const task = await this.findOne(id);
        task.is_deleted = false;
        await this.taskRepository.save(task);
    }
    async update(id, dto) {
        const task = await this.findOne(id);
        if (dto.title !== undefined)
            task.title = dto.title;
        if (dto.description !== undefined)
            task.description = dto.description || '';
        if (dto.due_date !== undefined)
            task.due_date = dto.due_date;
        if (dto.is_urgent !== undefined)
            task.is_urgent = dto.is_urgent;
        if (dto.assigned_to !== undefined) {
            if (dto.assigned_to === null) {
                task.assignedUser = null;
            }
            else if (dto.assigned_to !== undefined && dto.assigned_to !== null) {
                const user = await this.userRepository.findOneBy({ user_id: dto.assigned_to });
                if (user)
                    task.assignedUser = user;
            }
        }
        return await this.taskRepository.save(task);
    }
    async remove(id) {
        const result = await this.taskRepository.delete(id);
        if (result.affected === 0) {
            throw new Error(`Задача с ID ${id} не найдена`);
        }
    }
};
exports.TasksService = TasksService;
exports.TasksService = TasksService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(task_entity_1.Task)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], TasksService);
//# sourceMappingURL=tasks.service.js.map
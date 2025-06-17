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
exports.TaskTypesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const task_type_entity_1 = require("./entities/task-type.entity");
let TaskTypesService = class TaskTypesService {
    taskTypeRepository;
    constructor(taskTypeRepository) {
        this.taskTypeRepository = taskTypeRepository;
    }
    async findAll() {
        return await this.taskTypeRepository.find();
    }
    async findOne(id) {
        const taskType = await this.taskTypeRepository.findOneBy({ task_type_id: id });
        if (!taskType) {
            throw new common_1.NotFoundException(`TaskType with ID ${id} not found`);
        }
        return taskType;
    }
    async create(dto) {
        const newType = this.taskTypeRepository.create(dto);
        return await this.taskTypeRepository.save(newType);
    }
    async update(id, dto) {
        const result = await this.taskTypeRepository.update(id, dto);
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`TaskType with ID ${id} not found`);
        }
        return this.findOne(id);
    }
    async remove(id) {
        const result = await this.taskTypeRepository.softDelete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`TaskType with ID ${id} not found`);
        }
    }
};
exports.TaskTypesService = TaskTypesService;
exports.TaskTypesService = TaskTypesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(task_type_entity_1.TaskType)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], TaskTypesService);
//# sourceMappingURL=task-types.service.js.map
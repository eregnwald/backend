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
const common_2 = require("@nestjs/common");
const typeorm_2 = require("typeorm");
const task_entity_1 = require("./entities/task.entity");
const user_entity_1 = require("../users/entities/user.entity");
const contact_entity_1 = require("../contacts/entities/contact.entity");
const account_entity_1 = require("../accounts/entities/account.entity");
const opportunity_entity_1 = require("../opportunities/entities/opportunity.entity");
const opportunitytask_entity_1 = require("../opportunitytask/entitites/opportunitytask.entity");
const typeorm_3 = require("typeorm");
const notifications_service_1 = require("../notifications/notifications.service");
let TasksService = class TasksService {
    taskRepository;
    userRepository;
    contactRepository;
    accountRepository;
    opportunityRepository;
    opportunityTaskRepository;
    notificationsService;
    constructor(taskRepository, userRepository, contactRepository, accountRepository, opportunityRepository, opportunityTaskRepository, notificationsService) {
        this.taskRepository = taskRepository;
        this.userRepository = userRepository;
        this.contactRepository = contactRepository;
        this.accountRepository = accountRepository;
        this.opportunityRepository = opportunityRepository;
        this.opportunityTaskRepository = opportunityTaskRepository;
        this.notificationsService = notificationsService;
    }
    async create(dto) {
        const task = new task_entity_1.Task();
        task.title = dto.title;
        task.due_date = dto.due_date;
        task.assignedUser = await this.userRepository.findOneBy({ user_id: dto.assigned_to });
        task.task_type_id = dto.task_type_id;
        task.description = dto.description ?? '';
        task.is_urgent = dto.is_urgent ?? false;
        if (dto.related_contact && !isNaN(Number(dto.related_contact))) {
            task.contact = await this.contactRepository.findOneBy({
                contact_id: Number(dto.related_contact),
            }) || null;
        }
        else {
            task.contact = null;
        }
        if (dto.account_id && !isNaN(Number(dto.account_id))) {
            task.account = await this.accountRepository.findOneBy({
                account_id: Number(dto.account_id),
            }) || null;
        }
        else {
            task.account = null;
        }
        if (dto.opportunity_id && !isNaN(Number(dto.opportunity_id))) {
            task.opportunity_id = Number(dto.opportunity_id);
        }
        else {
            task.opportunity_id = null;
        }
        const savedTask = await this.taskRepository.save(task);
        if (task.opportunity_id) {
            const link = this.opportunityTaskRepository.create({
                opportunity_id: task.opportunity_id,
                task_id: savedTask.task_id,
            });
            await this.opportunityTaskRepository.save(link);
        }
        return savedTask;
    }
    async findAll(currentUser) {
        const isUser = currentUser.roles.includes('user');
        const queryBuilder = this.taskRepository.createQueryBuilder('task')
            .leftJoinAndSelect('task.assignedUser', 'assignedUser')
            .leftJoinAndSelect('task.status', 'status')
            .leftJoinAndSelect('task.priority', 'priority')
            .leftJoinAndSelect('task.contact', 'contact')
            .where('task.is_deleted = :isDeleted', { isDeleted: false });
        if (isUser) {
            queryBuilder.andWhere('task.assigned_to = :userId', { userId: currentUser.userId });
        }
        return await queryBuilder.getMany();
    }
    async findOne(id) {
        const task = await this.taskRepository.findOne({
            where: { task_id: id },
            relations: ['assignedUser', 'status', 'priority', 'contact'],
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
        const parseId = (value) => {
            return value === '' || value === null || value === undefined ? null : Number(value);
        };
        if (dto.title !== undefined)
            task.title = dto.title;
        if (dto.description !== undefined)
            task.description = dto.description ?? '';
        if (dto.due_date !== undefined)
            task.due_date = dto.due_date;
        if (dto.is_urgent !== undefined)
            task.is_urgent = dto.is_urgent;
        if (dto.is_closed !== undefined)
            task.is_closed = dto.is_closed;
        if (dto.result !== undefined)
            task.result = dto.result;
        if (dto.assigned_to !== undefined) {
            const assignedTo = parseId(dto.assigned_to);
            if (assignedTo !== null) {
                const user = await this.userRepository.findOneBy({ user_id: assignedTo });
                if (user)
                    task.assignedUser = user;
            }
            else {
                task.assignedUser = null;
            }
        }
        if (dto.related_contact !== undefined) {
            const contactId = parseId(dto.related_contact);
            if (contactId !== null) {
                const contact = await this.contactRepository.findOneBy({ contact_id: contactId });
                if (contact)
                    task.contact = contact;
            }
            else {
                task.contact = null;
            }
        }
        if (dto.account_id !== undefined) {
            const accountId = parseId(dto.account_id);
            if (accountId !== null) {
                const account = await this.accountRepository.findOneBy({ account_id: accountId });
                if (account)
                    task.account = account;
            }
            else {
                task.account = null;
            }
        }
        if (dto.opportunity_id !== undefined) {
            const opportunityId = parseId(dto.opportunity_id);
            task.opportunity_id = opportunityId;
        }
        if (dto.task_type_id !== undefined) {
            task.task_type_id = dto.task_type_id;
        }
        const updatedTask = await this.taskRepository.save(task);
        if (task.opportunity_id) {
            const existingLink = await this.opportunityTaskRepository.findOne({
                where: {
                    opportunity_id: task.opportunity_id,
                    task_id: updatedTask.task_id,
                },
            });
            if (!existingLink) {
                const link = this.opportunityTaskRepository.create({
                    opportunity_id: task.opportunity_id,
                    task_id: updatedTask.task_id,
                });
                await this.opportunityTaskRepository.save(link);
            }
        }
        return updatedTask;
    }
    async remove(id) {
        const result = await this.taskRepository.delete(id);
        if (result.affected === 0) {
            throw new Error(`Задача с ID ${id} не найдена`);
        }
    }
    async checkSoonTasks() {
        const now = new Date();
        const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);
        const fiveMinutesLater = new Date(now.getTime() + 5 * 60 * 1000);
        const oneHourLater = new Date(now.getTime() + 60 * 60 * 1000);
        const tasks = await this.taskRepository.find({
            where: {
                is_closed: false,
                due_date: (0, typeorm_3.Between)(now, tomorrow),
            },
            relations: ['assignedUser'],
        });
        for (const task of tasks) {
            const user = task.assignedUser;
            if (!user) {
                console.warn(`⚠️ Задача ID ${task.task_id} не имеет назначенного пользователя`);
                continue;
            }
            const timeDiffMinutes = (task.due_date.getTime() - now.getTime()) / (1000 * 60);
            console.log(`⏰ "${task.title}" — до дедлайна ${timeDiffMinutes.toFixed(2)} минут`);
            let types = [];
            if (timeDiffMinutes <= 5) {
                types.push({ type: '5min', message: `"${task.title}" истекает через 5 минут`, due_date: task.due_date });
            }
            else if (timeDiffMinutes <= 1440) {
                types.push({ type: 'today', message: `"${task.title}" завтра`, due_date: task.due_date });
            }
            if (task.due_date < now) {
                types.push({ type: 'overdue', message: `"${task.title}" просрочена`, due_date: oneHourLater });
            }
            for (const { type, message, due_date } of types) {
                const hasNotif = await this.notificationsService.hasNotification(task.task_id, type);
                if (!hasNotif) {
                    console.log(`🔔 Создаю уведомление: "${message}"`);
                    await this.notificationsService.create({
                        userId: user.user_id,
                        taskId: task.task_id,
                        title: 'Задача скоро истекает',
                        message,
                        due_date,
                        type,
                    });
                }
            }
        }
    }
    async find(options) {
        return this.taskRepository.find(options);
    }
    async countOverdueTasks(userId) {
        const now = new Date();
        return await this.taskRepository.count({
            where: {
                due_date: (0, typeorm_2.LessThan)(now),
                is_closed: false,
                is_deleted: false,
                assignedUser: { user_id: userId },
            },
        });
    }
};
exports.TasksService = TasksService;
exports.TasksService = TasksService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(task_entity_1.Task)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(2, (0, typeorm_1.InjectRepository)(contact_entity_1.Contact)),
    __param(3, (0, typeorm_1.InjectRepository)(account_entity_1.Account)),
    __param(4, (0, typeorm_1.InjectRepository)(opportunity_entity_1.Opportunity)),
    __param(5, (0, typeorm_1.InjectRepository)(opportunitytask_entity_1.OpportunityTask)),
    __param(6, (0, common_2.Inject)(notifications_service_1.NotificationsService)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        notifications_service_1.NotificationsService])
], TasksService);
//# sourceMappingURL=tasks.service.js.map
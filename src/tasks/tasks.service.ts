import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {Inject} from '@nestjs/common';
import { Repository, LessThan } from 'typeorm';
import { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { User } from '../users/entities/user.entity';
import { Contact } from '../contacts/entities/contact.entity';
import { Account } from '../accounts/entities/account.entity';
import { Opportunity } from '../opportunities/entities/opportunity.entity';
import { OpportunityTask } from '../opportunitytask/entitites/opportunitytask.entity';
import { Between } from 'typeorm'; 
import { NotificationsService } from 'src/notifications/notifications.service';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Contact)
    private readonly contactRepository: Repository<Contact>,

    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,

    @InjectRepository(Opportunity)
    private readonly opportunityRepository: Repository<Opportunity>,

   
    @InjectRepository(OpportunityTask)
    private readonly opportunityTaskRepository: Repository<OpportunityTask>,
    
    
    @Inject(NotificationsService)
    private readonly notificationsService: NotificationsService,
  ) {}

  async create(dto: CreateTaskDto): Promise<Task> {
  const task = new Task();

 
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
  } else {
    task.contact = null;
  }

  
  if (dto.account_id && !isNaN(Number(dto.account_id))) {
    task.account = await this.accountRepository.findOneBy({
      account_id: Number(dto.account_id),
    }) || null;
  } else {
    task.account = null;
  }


  if (dto.opportunity_id && !isNaN(Number(dto.opportunity_id))) {
    task.opportunity_id = Number(dto.opportunity_id);
  } else {
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

 async findAll(currentUser: any): Promise<Task[]> {
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

  async findOne(id: number): Promise<Task> {
    const task = await this.taskRepository.findOne({
      where: { task_id: id },
      relations: ['assignedUser', 'status', 'priority', 'contact'],
    });

    if (!task) throw new Error(`Задача с ID ${id} не найдена`);

    return task;
  }

  async softDelete(id: number): Promise<void> {
    const task = await this.findOne(id);
    task.is_deleted = true;
    await this.taskRepository.save(task);
  }

  async restore(id: number): Promise<void> {
    const task = await this.findOne(id);
    task.is_deleted = false;
    await this.taskRepository.save(task);
  }

 async update(id: number, dto: UpdateTaskDto): Promise<Task> {
  const task = await this.findOne(id);

  // Конвертация пустых строк в null
  const parseId = (value: any) => {
    return value === '' || value === null || value === undefined ? null : Number(value);
  };

  // Обновляем только те поля, которые пришли в DTO
  if (dto.title !== undefined) task.title = dto.title;
  if (dto.description !== undefined) task.description = dto.description ?? '';
  if (dto.due_date !== undefined) task.due_date = dto.due_date;
  if (dto.is_urgent !== undefined) task.is_urgent = dto.is_urgent;
  if (dto.is_closed !== undefined) task.is_closed = dto.is_closed;
  if (dto.result !== undefined) task.result = dto.result;

  // assigned_to - пользователь
  if (dto.assigned_to !== undefined) {
    const assignedTo = parseId(dto.assigned_to);
    if (assignedTo !== null) {
      const user = await this.userRepository.findOneBy({ user_id: assignedTo });
      if (user) task.assignedUser = user;
    } else {
      task.assignedUser = null;
    }
  }

  // related_contact - контакт
  if (dto.related_contact !== undefined) {
    const contactId = parseId(dto.related_contact);
    if (contactId !== null) {
      const contact = await this.contactRepository.findOneBy({ contact_id: contactId });
      if (contact) task.contact = contact;
    } else {
      task.contact = null;
    }
  }

  // account_id - аккаунт
  if (dto.account_id !== undefined) {
    const accountId = parseId(dto.account_id);
    if (accountId !== null) {
      const account = await this.accountRepository.findOneBy({ account_id: accountId });
      if (account) task.account = account;
    } else {
      task.account = null;
    }
  }

  // opportunity_id
  if (dto.opportunity_id !== undefined) {
    const opportunityId = parseId(dto.opportunity_id);
    task.opportunity_id = opportunityId;
  }

  // task_type_id
  if (dto.task_type_id !== undefined) {
    task.task_type_id = dto.task_type_id;
  }

  // Сохраняем обновлённую задачу
  const updatedTask = await this.taskRepository.save(task);

  // Если указано opportunity_id — создаём связь
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

  async remove(id: number): Promise<void> {
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
        due_date: Between(now, tomorrow),
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

      let types: { type: "today" | "5min" | "overdue"; message: string; due_date: Date }[] = [];

      if (timeDiffMinutes <= 5) {
        types.push({ type: '5min', message: `"${task.title}" истекает через 5 минут`, due_date: task.due_date });
      } else if (timeDiffMinutes <= 1440) {
        types.push({ type: 'today', message: `"${task.title}" завтра`, due_date: task.due_date });
      }

      // Проверка просроченных задач
      if (task.due_date < now) {
        // Уведомление о просроченной задаче через час
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




  async find(options: any): Promise<Task[]> {
  return this.taskRepository.find(options);
}

async countOverdueTasks(userId: number): Promise<number> {
  const now = new Date();
  return await this.taskRepository.count({
    where: {
      due_date: LessThan(now),
      is_closed: false,
      is_deleted: false,
      assignedUser: { user_id: userId },
    },
  });
}


}
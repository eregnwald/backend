import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Contact } from '../../contacts/entities/contact.entity';
import { Account } from '../../accounts/entities/account.entity';
import { TaskStatus } from '../../task-statuses/entities/task-status.entity';
import { TaskPriority } from '../../task-priorities/entities/task-priority.entity';

@Entity('tasks')
export class Task {
  @PrimaryGeneratedColumn('increment')
  task_id: number;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'timestamptz' })
  due_date: Date;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamptz', nullable: true })
  updated_at: Date;

  @Column({ type: 'boolean', default: false })
  is_urgent: boolean;

  // Внешний ключ на статус задачи
  @ManyToOne(() => TaskStatus)
  @JoinColumn({ name: 'status_id' })
  status: TaskStatus;

  // Приоритет
  @ManyToOne(() => TaskPriority)
  @JoinColumn({ name: 'priority_id' })
  priority: TaskPriority;

  // Кто назначен
 @ManyToOne(() => User, { nullable: true }) // ✅ Указываем, что связь может быть null
  @JoinColumn({ name: 'assigned_to' })
  assignedUser: User | null; // ✅ Тип должен быть Union
  // Связь с контактом
  @ManyToOne(() => Contact, (contact) => contact.tasks) // ✅ Обратная связь
  @JoinColumn({ name: 'related_contact' })
  contact: Contact | null;

  // Связь с аккаунтом
  @ManyToOne(() => Account, (account) => account.tasks) // ✅ Обратная связь
  @JoinColumn({ name: 'related_account' })
  account: Account | null;

  @Column({ type: 'boolean', default: false })
  is_deleted: boolean;
  
}
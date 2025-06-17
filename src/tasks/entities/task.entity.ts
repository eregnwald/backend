import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Contact } from '../../contacts/entities/contact.entity';
import { Account } from '../../accounts/entities/account.entity';
import { TaskStatus } from '../../task-statuses/entities/task-status.entity';
import { TaskPriority } from '../../task-priorities/entities/task-priority.entity';
import { Opportunity } from '../../opportunities/entities/opportunity.entity';
import { TaskType } from '../../task-type/entities/task-type.entity';

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
  @JoinColumn({ name: 'status_id', })
  status: TaskStatus;

  // Приоритет
  @ManyToOne(() => TaskPriority)
  @JoinColumn({ name: 'priority_id' })
  priority: TaskPriority;

  
 @ManyToOne(() => User, { nullable: true }) // 
  @JoinColumn({ name: 'assigned_to' })
  assignedUser: User | null; 
 
  @ManyToOne(() => Contact, (contact) => contact.tasks) 
  @JoinColumn({ name: 'related_contact' })
  contact: Contact | null;

 @Column({ type: 'int', nullable: true }) 
  opportunity_id: number | null;

  @ManyToOne(() => Opportunity, { nullable: true }) 
  @JoinColumn({ name: 'opportunity_id' })
  opportunity: Opportunity | null; 
  
  @Column({ type: 'boolean', default: false })
  is_closed: boolean;

  @Column({ type: 'boolean', default: false })
  is_deleted: boolean;


  @Column({ type: 'int', nullable: true })
task_type_id: number | null;

@ManyToOne(() => TaskType, { nullable: true })
@JoinColumn({ name: 'task_type_id' })
type: TaskType | null;
  

@Column({ type: 'int', nullable: true }) 
  account_id: number | null;

  @ManyToOne(() => Account, { nullable: true }) 
  @JoinColumn({ name: 'account_id' })
  account: Account | null; 




  @Column({ type: 'text', nullable: true })
  result: string | null;
}
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Account } from '../../accounts/entities/account.entity';
import { Contact } from '../../contacts/entities/contact.entity';
import { OpportunityStage } from '../../opportunity-stages/entities/opportunity-stage.entity';
import { User } from '../../users/entities/user.entity';
import { SalesFunnel } from 'src/salesfunnel/funnel.entity';
import { SalesFunnelStage } from 'src/salesfunnelstages/funnel-stage.entity';
import { Task } from '../../tasks/entities/task.entity'; 
import { Note } from '../../notes/entities/note.entity';

@Entity('opportunities')
export class Opportunity {
  @PrimaryGeneratedColumn('increment')
  opportunity_id: number;

  @Column({ type: 'varchar', length: 255, })
  opportunity_name: string;

  @Column({ type: 'numeric', precision: 18, scale: 2 })
  amount: number;

  @Column({ type: 'int', nullable: true })
  contact_id: number;

  @Column({ type: 'int', nullable: true })
  owner_id: number;

 @Column({ type: 'boolean', default: false })
  is_deleted: boolean;

  @Column({ type: 'date', nullable: true })
  close_date: Date | null;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP',nullable:true, onUpdate: 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @Column({ type: 'int', nullable: true })
  account_id: number;


  // Внешний ключ на таблицу accounts
  @ManyToOne(() => Account, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'account_id' })
  account: Account | null;

  // Внешний ключ на таблицу contacts
  @ManyToOne(() => Contact, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'contact_id' })
  contact: Contact | null;

  


  // Внешний ключ на пользователя (владелец)
  @ManyToOne(() => User)
  @JoinColumn({ name: 'owner_id' })
  owner: User;

  @Column({ type: 'boolean', default: false })
  is_closed: boolean;

  @Column({ type: 'integer', nullable: false })
  stage_id: number;

 

  @ManyToOne(() => SalesFunnelStage)
  @JoinColumn({ name: 'stage_id' })
  stage: SalesFunnelStage;


  @Column({ type: 'integer', nullable: true })
  funnel_id: number; // ✅ важно для связи с воронкой


   @Column({ type: 'int', nullable: true }) // task_id может быть null
  task_id: number | null;

  // --- Связь с задачей ---
  @ManyToOne(() => Task, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'task_id' }) // внешний ключ
  task: Task | null;


  @Column({ type: 'boolean', default: false })
  is_won: boolean;
  
  @Column({ type: 'text', nullable: true })
lost_reason: string | null;

  // В классе Opportunity добавь:

@Column({ type: 'date', nullable: true })
won_date: Date | null;

@Column({ type: 'date', nullable: true })
lost_date: Date | null;
}
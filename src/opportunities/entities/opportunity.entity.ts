import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Account } from '../../accounts/entities/account.entity';
import { Contact } from '../../contacts/entities/contact.entity';
import { OpportunityStage } from '../../opportunity-stages/entities/opportunity-stage.entity';
import { User } from '../../users/entities/user.entity';

@Entity('opportunities')
export class Opportunity {
  @PrimaryGeneratedColumn('increment')
  opportunity_id: number;

  @Column({ type: 'varchar', length: 255 })
  opportunity_name: string;

  @Column({ type: 'numeric', precision: 18, scale: 2 })
  amount: number;

  @Column({ type: 'int', nullable: true })
  contact_id: number;

  @Column({ type: 'int', nullable: true })
  owner_id: number;

 @Column({ type: 'boolean', default: false })
  is_deleted: boolean;

  @Column({ type: 'date' })
  close_date: Date;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamptz', nullable: true })
  updated_at: Date;

  // Внешний ключ на таблицу accounts
  @ManyToOne(() => Account, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'account_id' })
  account: Account | null;

  // Внешний ключ на таблицу contacts
  @ManyToOne(() => Contact, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'contact_id' })
  contact: Contact | null;

  // Внешний ключ на стадию сделки
  @ManyToOne(() => OpportunityStage)
  @JoinColumn({ name: 'stage_id' })
  stage: OpportunityStage;

  // Внешний ключ на пользователя (владелец)
  @ManyToOne(() => User)
  @JoinColumn({ name: 'owner_id' })
  owner: User;

  @Column({ type: 'boolean', default: false })
  is_closed: boolean;
}
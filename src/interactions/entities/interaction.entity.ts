import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Account } from '../../accounts/entities/account.entity';
import { Contact } from '../../contacts/entities/contact.entity';
import { User } from '../../users/entities/user.entity';
import { InteractionType } from '../../interaction-types/entities/interaction-type.entity';
import { InteractionDetail } from '../../interaction-details/entities/interaction-detail.entity';

@Entity('interactions')
export class Interaction {
  @PrimaryGeneratedColumn('increment')
  interaction_id: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  subject: string;

  @ManyToOne(() => InteractionType, interactionType => interactionType.interactions, { nullable: false })
  @JoinColumn({ name: 'type_id' })
  type: InteractionType;

  @ManyToOne(() => Account, account => account.interactions, { onDelete: 'CASCADE', nullable: false })
  @JoinColumn({ name: 'account_id' })
  account: Account;

  @ManyToOne(() => Contact, contact => contact.interactions, { onDelete: 'SET NULL', nullable: true })
  @JoinColumn({ name: 'contact_id' })
  contact: Contact | null;

  @ManyToOne(() => User, user => user.interactions, { onDelete: 'SET NULL', nullable: true })
  @JoinColumn({ name: 'user_id' })
  user: User | null;

  @Column({ type: 'timestamptz', nullable: false })
  start_time: Date;

  @Column({ type: 'timestamptz', nullable: true })
  end_time: Date;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'text', nullable: true })
  outcome: string;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @OneToMany(() => InteractionDetail, interactionDetail => interactionDetail.interaction)
  interactionDetails: InteractionDetail[];
}
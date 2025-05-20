import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Contact } from '../../contacts/entities/contact.entity';
import { Opportunity } from '../../opportunities/entities/opportunity.entity';
import { Interaction } from '../../interactions/entities/interaction.entity';
import { AccountContact } from '../../account-contacts/entities/account-contact.entity';
import { Task } from '../../tasks/entities/task.entity';

@Entity('accounts')
export class Account {
  @PrimaryGeneratedColumn('increment')
  account_id: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  account_name: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  industry: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  website: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  phone: string;

  @Column({ type: 'numeric', precision: 15, scale: 2, nullable: true })
  annual_revenue: number;

  @Column({ type: 'int', nullable: true })
  employee_count: number;

  @Column({ type: 'jsonb', nullable: true })
  billing_address: any;

  @Column({ type: 'jsonb', nullable: true })
  shipping_address: any;

  @ManyToOne(() => User, user => user.accounts, { onDelete: 'SET NULL', nullable: true })
  @JoinColumn({ name: 'owner_id' })
  owner: User | null;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamptz', nullable: true })
  updated_at: Date;

  @Column({ type: 'boolean', default: false })
  is_deleted: boolean;

  @OneToMany(() => Contact, contact => contact.account)
  contacts: Contact[];

  @OneToMany(() => Opportunity, opportunity => opportunity.account)
  opportunities: Opportunity[];

  @OneToMany(() => Interaction, interaction => interaction.account)
  interactions: Interaction[];

  @OneToMany(() => AccountContact, accountContact => accountContact.account)
  accountContacts: AccountContact[];

  @OneToMany(() => Task, (task) => task.account) // ✅ Обратная связь
  tasks: Task[];
}
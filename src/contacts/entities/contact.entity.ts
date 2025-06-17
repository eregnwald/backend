import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Account } from '../../accounts/entities/account.entity';
import { Interaction } from '../../interactions/entities/interaction.entity';
import { Task } from '../../tasks/entities/task.entity';

@Entity('contacts')
export class Contact {
  @PrimaryGeneratedColumn('increment')
  contact_id: number;

  @Column({ type: 'varchar', length: 100, nullable: false })
  first_name: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  last_name: string;

  @Column({ type: 'varchar', length: 255, unique: true, nullable: true })
  email: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  phone: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  job_title: string;

@Column({ type: 'integer', nullable: true })
account_id: number | null;

@ManyToOne(() => Account, account => account.contacts, { onDelete: 'SET NULL', nullable: true })
@JoinColumn({ name: 'account_id' })
account: Account | null;

 // contact.entity.ts

@Column({ type: 'integer', nullable: true })
owner_id: number | null;

@ManyToOne(() => User, user => user.contacts, { onDelete: 'SET NULL', nullable: true })
@JoinColumn({ name: 'owner_id' })
owner: User | null;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamptz', nullable: true })
  updated_at: Date;

  @Column({ type: 'boolean', default: false })
  is_primary: boolean;

  @Column({ type: 'boolean', default: false })
  is_deleted: boolean;

  // Взаимодействия, связанные с этим контактом
  @OneToMany(() => Interaction, interaction => interaction.contact)
  interactions: Interaction[];

  // Задачи, связанные с этим контактом
  @OneToMany(() => Task, task => task.contact)
  tasks: Task[];
}
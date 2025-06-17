import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { UserRole } from '../../user-roles/entities/user-role.entity';
import { Account } from '../../accounts/entities/account.entity';
import { Contact } from '../../contacts/entities/contact.entity';
import { Opportunity } from '../../opportunities/entities/opportunity.entity';
import { Interaction } from '../../interactions/entities/interaction.entity';
import { Task } from '../../tasks/entities/task.entity';
import { Document } from '../../documents/entities/document.entity';
import { AuditLog } from '../../audit-log/entities/audit-log.entity';
import { Role } from 'src/roles/entities/role.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('increment')
  user_id: number;

  @Column({ type: 'varchar', length: 255, unique: true, nullable: false })
  username: string;

  @Column({ type: 'varchar', length: 255, unique: true, nullable: false })
  email: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  password_hash: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  first_name: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  last_name: string;

  @Column({ type: 'boolean', default: true })
  is_active: boolean;

  @Column({ type: 'timestamptz', nullable: true })
  last_login: Date;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamptz', nullable: true })
  updated_at: Date;

  

  @OneToMany(() => Account, account => account.owner)
  accounts: Account[];

  @OneToMany(() => Contact, contact => contact.owner)
  contacts: Contact[];

  @OneToMany(() => Opportunity, opportunity => opportunity.owner)
  opportunities: Opportunity[];

  @OneToMany(() => Interaction, interaction => interaction.user)
  interactions: Interaction[];

  @OneToMany(() => Task, (task) => task.assignedUser) 
  tasks: Task[];

  @OneToMany(() => Document, document => document.uploaded_by)
  documents: Document[];

  @OneToMany(() => AuditLog, auditLog => auditLog.user)
  auditLogs: AuditLog[];


  @ManyToOne(() => Role, role => role.users)
  @JoinColumn({ name: 'role_id' }) 
  role: Role;

}
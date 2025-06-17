import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Contact } from '../../contacts/entities/contact.entity';
import { Interaction } from 'src/interactions/entities/interaction.entity';
@Entity('accounts')
export class Account {
  @PrimaryGeneratedColumn('increment')
  account_id: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  account_name: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  website: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  phone: string;

  @Column({ type: 'numeric', precision: 15, scale: 2, nullable: true })
  annual_revenue: number;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamptz', nullable: true })
  updated_at: Date;

  @Column({ type: 'boolean', default: false })
  is_deleted: boolean;

  @Column({ type: 'integer', nullable: false })
  owner_id: number;

  @ManyToOne(() => User, user => user.accounts, { onDelete: 'SET NULL', nullable: true })
  @JoinColumn({ name: 'owner_id' })
  owner: User | null;

  @Column({ type: 'integer', nullable: true })
  contact_id: number;

  @ManyToOne(() => Contact, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'contact_id' })
  contact: Contact | null;

  @Column({ type: 'varchar', length: 250, nullable: true })
  address: string;

  @Column({ type: 'varchar', length: 255, nullable: true }) 
  email: string;

   // Связь один-ко-многим: аккаунт может иметь много контактов
  @OneToMany(() => Contact, contact => contact.account)
  contacts: Contact[];

  // Связь один-ко-многим: аккаунт может иметь много взаимодействий
  @OneToMany(() => Interaction, interaction => interaction.account)
  interactions: Interaction[];
}
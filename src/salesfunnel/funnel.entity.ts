import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../users/entities/user.entity';

@Entity('sales_funnels')
export class SalesFunnel {
  @PrimaryGeneratedColumn()
  funnel_id: number;

  @Column({ type: 'varchar', length: 255 })
  funnel_name: string;

  @Column({ type: 'integer', nullable: true }) // null для общей воронки
  owner_id: number | null; // ✅ Добавлено | null

  @ManyToOne(() => User)
  owner: User;

  @Column({ type: 'boolean', default: false }) // новое поле
  is_shared: boolean;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
}
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('task_statuses')
export class TaskStatus {
  @PrimaryGeneratedColumn()
  status_id: number;

  @Column({ type: 'varchar', length: 60 })
  status_name: string;

  @Column({ type: 'integer' })
  status_integer: number;
}
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('task_priorities')
export class TaskPriority {
  @PrimaryGeneratedColumn()
  priority_id: number;

  @Column({ type: 'varchar', length: 60 })
  priority_name: string;
}
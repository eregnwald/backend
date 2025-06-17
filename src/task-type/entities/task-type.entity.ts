import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('task_types')
export class TaskType {
  @PrimaryGeneratedColumn()
  task_type_id: number;

  @Column({
    type: 'varchar',
    length: 50,
    unique: true,
    nullable: false,
  })
  name: string; 

  @Column({
    type: 'text',
    nullable: true,
  })
  description?: string;

  @Column({
    type: 'boolean',
    default: true,
  })
  is_active: boolean;
}
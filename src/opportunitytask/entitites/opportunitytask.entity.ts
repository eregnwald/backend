// opportunity-task.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Opportunity } from '../../opportunities/entities/opportunity.entity'
import { Task } from '../../tasks/entities/task.entity';

@Entity('opportunity_tasks')
export class OpportunityTask {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  opportunity_id: number;

  @Column({ type: 'int' })
  task_id: number;

  @ManyToOne(() => Opportunity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'opportunity_id' })
  opportunity: Opportunity;

  @ManyToOne(() => Task, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'task_id' })
  task: Task;
}
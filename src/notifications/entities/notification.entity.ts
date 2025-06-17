// notification.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Task } from 'src/tasks/entities/task.entity';

@Entity()
export class Notification {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  message: string;

  @Column({ type: 'timestamp' })
  due_date: Date;

  @Column({ default: false })
  is_read: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  // Связь с пользователем
  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  user: User;

  // Необязательно: связь с задачей
  @ManyToOne(() => Task, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'taskTaskId' }) // ✅ Указываем точное имя колонки
  task: Task | null;

   @Column({
    type: 'enum',
    enum: ['today', '5min', 'overdue'],
  })
  type: "today" | "5min" | "overdue";
}
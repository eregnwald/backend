import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Opportunity } from 'src/opportunities/entities/opportunity.entity';

@Entity('notes')
export class Note {
  @PrimaryGeneratedColumn()
  note_id: number;

  @Column({ type: 'text' })
  content: string;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @Column({ type: 'int' }) 
  opportunity_id: number;

  
  
}
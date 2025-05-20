import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Interaction } from '../../interactions/entities/interaction.entity';

@Entity('interaction_details')
export class InteractionDetail {
  @PrimaryGeneratedColumn('increment')
  detail_id: number;

  @ManyToOne(() => Interaction, interaction => interaction.interactionDetails, { onDelete: 'CASCADE', nullable: false })
  @JoinColumn({ name: 'interaction_id' })
  interaction: Interaction;

  @Column({ type: 'text', nullable: false })
  content: string;

  @Column({ type: 'jsonb', nullable: true })
  attachments: any;
}
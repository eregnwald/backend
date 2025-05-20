import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Interaction } from '../../interactions/entities/interaction.entity';

@Entity('interaction_types')
export class InteractionType {
  @PrimaryGeneratedColumn('increment')
  type_id: number;

  @Column({ type: 'varchar', length: 100, nullable: false })
  type_name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @OneToMany(() => Interaction, interaction => interaction.type)
  interactions: Interaction[];
}
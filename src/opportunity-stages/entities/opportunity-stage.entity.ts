import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Opportunity } from '../../opportunities/entities/opportunity.entity';

@Entity('opportunity_stages')
export class OpportunityStage {
  @PrimaryGeneratedColumn('increment')
  stage_id: number;

  @Column({ type: 'varchar', length: 100, nullable: false })
  stage_name: string;

  @Column({ type: 'numeric', precision: 5, scale: 2, nullable: false })
  probability: number;

  @Column({ type: 'boolean', default: false })
  is_closed: boolean;

  @OneToMany(() => Opportunity, opportunity => opportunity.stage)
  opportunities: Opportunity[];
}
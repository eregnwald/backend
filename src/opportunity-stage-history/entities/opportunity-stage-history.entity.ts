// src/opportunity-stage-history/entities/opportunity-stage-history.entity.ts

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Opportunity } from '../../opportunities/entities/opportunity.entity';
import { SalesFunnelStage } from 'src/salesfunnelstages/funnel-stage.entity';

@Entity('opportunity_stage_history')
export class OpportunityStageHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  changed_at: Date;

  @Column({ type: 'int' })
  opportunity_id: number;


  @Column({ type: 'int', nullable: true })
  old_stage_id: number | null;

  @ManyToOne(() => SalesFunnelStage, { nullable: true })
  @JoinColumn({ name: 'old_stage_id' })
  old_stage: SalesFunnelStage | null;

  @Column({ type: 'int' })
  new_stage_id: number;

  @ManyToOne(() => SalesFunnelStage)
  @JoinColumn({ name: 'new_stage_id' })
  new_stage: SalesFunnelStage;
}
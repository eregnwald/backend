import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { SalesFunnel } from '../salesfunnel/funnel.entity';
import { Opportunity } from '../opportunities/entities/opportunity.entity';

@Entity('sales_funnel_stages')
export class SalesFunnelStage {
  @PrimaryGeneratedColumn()
  stage_id: number;

  @Column({ type: 'varchar', length: 255 })
  stage_name: string;

  @Column({ type: 'numeric', precision: 5, scale: 2, default: 0 })
  probability: number;

  @Column({ type: 'boolean', default: false })
  is_closed: boolean;

  @Column({ type: 'boolean', default: false })
  is_won: boolean;

  @Column({ type: 'integer' })
  funnel_id: number;

  @Column({ type: 'integer' })
  position: number;

  @ManyToOne(() => SalesFunnel)
  @JoinColumn({ name: 'funnel_id' })
  funnel: SalesFunnel;

  @OneToMany(() => Opportunity, opportunity => opportunity.stage)
  opportunities: Opportunity[];
}
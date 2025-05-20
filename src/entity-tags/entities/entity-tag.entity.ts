import { Entity, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Tag } from '../../tags/entities/tag.entity';

@Entity('entity_tags')
export class EntityTag {
  @PrimaryColumn({ type: 'varchar', length: 50 })
  entity_type: string;

  @PrimaryColumn({ type: 'int' })
  entity_id: number;

  @PrimaryColumn({ type: 'int' })
  tag_id: number;

  @ManyToOne(() => Tag, tag => tag.entityTags)
  @JoinColumn({ name: 'tag_id' })
  tag: Tag;
}
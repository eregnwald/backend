import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { EntityTag } from '../../entity-tags/entities/entity-tag.entity';

@Entity('tags')
export class Tag {
  @PrimaryGeneratedColumn('increment')
  tag_id: number;

  @Column({ type: 'varchar', length: 100, unique: true, nullable: false })
  tag_name: string;

  @Column({ type: 'varchar', length: 7, nullable: true })
  color_code: string;

  @OneToMany(() => EntityTag, entityTag => entityTag.tag)
  entityTags: EntityTag[];
}
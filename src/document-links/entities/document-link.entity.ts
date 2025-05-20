import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Document } from '../../documents/entities/document.entity';

@Entity('document_links')
export class DocumentLink {
  @PrimaryGeneratedColumn('increment')
  link_id: number;

  @ManyToOne(() => Document, document => document.documentLinks, { onDelete: 'CASCADE', nullable: false })
  @JoinColumn({ name: 'document_id' })
  document: Document;

  @Column({ type: 'varchar', length: 50, nullable: false })
  entity_type: string;

  @Column({ type: 'int', nullable: false })
  entity_id: number;
}
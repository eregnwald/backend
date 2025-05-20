import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { DocumentLink } from '../../document-links/entities/document-link.entity';

@Entity('documents')
export class Document {
  @PrimaryColumn('uuid')
  document_id: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  file_name: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  mime_type: string;

  @Column({ type: 'bigint', nullable: true })
  file_size: number;

  @ManyToOne(() => User, user => user.documents, { onDelete: 'SET NULL', nullable: true })
  @JoinColumn({ name: 'uploaded_by' })
  uploaded_by: User | null;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  uploaded_at: Date;

  @Column({ type: 'varchar', length: 512, nullable: false })
  storage_path: string;

  @Column({ type: 'boolean', default: false })
  is_encrypted: boolean;

  @OneToMany(() => DocumentLink, documentLink => documentLink.document)
  documentLinks: DocumentLink[];
}
import { User } from '../../users/entities/user.entity';
import { DocumentLink } from '../../document-links/entities/document-link.entity';
export declare class Document {
    document_id: string;
    file_name: string;
    mime_type: string;
    file_size: number;
    uploaded_by: User | null;
    uploaded_at: Date;
    storage_path: string;
    is_encrypted: boolean;
    documentLinks: DocumentLink[];
}

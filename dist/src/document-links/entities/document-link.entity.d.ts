import { Document } from '../../documents/entities/document.entity';
export declare class DocumentLink {
    link_id: number;
    document: Document;
    entity_type: string;
    entity_id: number;
}

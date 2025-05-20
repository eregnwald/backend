import { CreateDocumentLinkDto } from './dto/create-document-link.dto';
import { UpdateDocumentLinkDto } from './dto/update-document-link.dto';
export declare class DocumentLinksService {
    create(createDocumentLinkDto: CreateDocumentLinkDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateDocumentLinkDto: UpdateDocumentLinkDto): string;
    remove(id: number): string;
}

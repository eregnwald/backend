import { DocumentLinksService } from './document-links.service';
import { CreateDocumentLinkDto } from './dto/create-document-link.dto';
import { UpdateDocumentLinkDto } from './dto/update-document-link.dto';
export declare class DocumentLinksController {
    private readonly documentLinksService;
    constructor(documentLinksService: DocumentLinksService);
    create(createDocumentLinkDto: CreateDocumentLinkDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateDocumentLinkDto: UpdateDocumentLinkDto): string;
    remove(id: string): string;
}

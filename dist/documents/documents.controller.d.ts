import { DocumentsService } from './documents.service';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';
export declare class DocumentsController {
    private readonly documentsService;
    constructor(documentsService: DocumentsService);
    create(createDocumentDto: CreateDocumentDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateDocumentDto: UpdateDocumentDto): string;
    remove(id: string): string;
}

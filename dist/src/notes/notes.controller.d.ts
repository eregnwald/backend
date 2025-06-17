import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
export declare class NotesController {
    private readonly notesService;
    constructor(notesService: NotesService);
    create(dto: CreateNoteDto): Promise<import("./entities/note.entity").Note>;
    findAllByOpportunityId(id: number): Promise<import("./entities/note.entity").Note[]>;
    findOne(id: number): Promise<import("./entities/note.entity").Note>;
    update(id: number, dto: UpdateNoteDto): Promise<import("./entities/note.entity").Note>;
    remove(id: number): Promise<void>;
}

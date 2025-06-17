import { Repository } from 'typeorm';
import { Note } from './entities/note.entity';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
export declare class NotesService {
    private noteRepository;
    constructor(noteRepository: Repository<Note>);
    create(dto: CreateNoteDto): Promise<Note>;
    findAllByOpportunityId(opportunityId: number): Promise<Note[]>;
    findOne(id: number): Promise<Note>;
    update(id: number, dto: UpdateNoteDto): Promise<Note>;
    remove(id: number): Promise<void>;
}

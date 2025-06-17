import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Note } from './entities/note.entity'
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto} from './dto/update-note.dto'
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Note)
    private noteRepository: Repository<Note>,
  ) {}

  async create(dto: CreateNoteDto): Promise<Note> {
    const note = this.noteRepository.create(dto);
    return await this.noteRepository.save(note);
  }

  async findAllByOpportunityId(opportunityId: number): Promise<Note[]> {
    return await this.noteRepository.find({
      where: { opportunity_id: opportunityId },
      order: { created_at: 'DESC' },
    });
  }

  async findOne(id: number): Promise<Note> {
  const note = await this.noteRepository.findOneBy({ note_id: id });
  if (!note) {
    throw new NotFoundException(`Заметка с ID ${id} не найдена`);
  }
  return note;
}

async update(id: number, dto: UpdateNoteDto): Promise<Note> {
  await this.noteRepository.update(id, dto);
  return await this.findOne(id); // или просто вернуть обновлённый DTO
}

async remove(id: number): Promise<void> {
  await this.noteRepository.delete(id);
}
}
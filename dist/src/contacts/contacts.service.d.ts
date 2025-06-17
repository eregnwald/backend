import { Repository } from 'typeorm';
import { Contact } from './entities/contact.entity';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
export declare class ContactsService {
    private readonly contactsRepository;
    constructor(contactsRepository: Repository<Contact>);
    create(createContactDto: CreateContactDto): Promise<Contact>;
    findAll(): Promise<Contact[]>;
    findOne(id: number): Promise<Contact>;
    update(id: number, updateContactDto: UpdateContactDto): Promise<Contact>;
    remove(id: number): Promise<void>;
    softDelete(id: number): Promise<void>;
    restore(id: number): Promise<void>;
}

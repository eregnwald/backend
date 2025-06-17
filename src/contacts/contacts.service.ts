import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contact } from './entities/contact.entity';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';

@Injectable()
export class ContactsService {
  constructor(
    @InjectRepository(Contact)
    private readonly contactsRepository: Repository<Contact>,
  ) {}

  async create(createContactDto: CreateContactDto): Promise<Contact> {
    const contact = this.contactsRepository.create(createContactDto);
    return await this.contactsRepository.save(contact);
  }

  async findAll(): Promise<Contact[]> {
  return await this.contactsRepository.find({
    where: { is_deleted: false },
    relations: ['account'],
  });
}

  async findOne(id: number): Promise<Contact> {
    const contact = await this.contactsRepository.findOneBy({ contact_id: id });
    if (!contact) {
      throw new Error(`Contact with ID ${id} not found`);
    }
    return contact;
  }

  async update(id: number, updateContactDto: UpdateContactDto): Promise<Contact> {
    const contact = await this.contactsRepository.findOneBy({ contact_id: id });
    if (!contact) {
      throw new Error(`Contact with ID ${id} not found`);
    }
    // Обновляем только те поля, которые пришли в DTO
    Object.assign(contact, updateContactDto);
    return await this.contactsRepository.save(contact);
  }

  async remove(id: number): Promise<void> {
    const result = await this.contactsRepository.delete(id);
    if (result.affected === 0) {
      throw new Error(`Contact with ID ${id} not found`);
    }
  }

  async softDelete(id: number): Promise<void> {
  const contact = await this.contactsRepository.findOneBy({ contact_id: id });
  if (!contact) {
    throw new Error(`Contact with ID ${id} not found`);
  }
  contact.is_deleted = true;
  await this.contactsRepository.save(contact);
}


async restore(id: number): Promise<void> {
  const contact = await this.contactsRepository.findOneBy({ contact_id: id });
  if (!contact) {
    throw new Error(`Contact with ID ${id} not found`);
  }
  contact.is_deleted = false;
  await this.contactsRepository.save(contact);
}

}
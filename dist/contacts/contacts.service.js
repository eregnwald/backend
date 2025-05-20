"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const contact_entity_1 = require("./entities/contact.entity");
let ContactsService = class ContactsService {
    contactsRepository;
    constructor(contactsRepository) {
        this.contactsRepository = contactsRepository;
    }
    async create(createContactDto) {
        const contact = this.contactsRepository.create(createContactDto);
        return await this.contactsRepository.save(contact);
    }
    async findAll() {
        return await this.contactsRepository.find({
            where: { is_deleted: false },
        });
    }
    async findOne(id) {
        const contact = await this.contactsRepository.findOneBy({ contact_id: id });
        if (!contact) {
            throw new Error(`Contact with ID ${id} not found`);
        }
        return contact;
    }
    async update(id, updateContactDto) {
        const contact = await this.contactsRepository.findOneBy({ contact_id: id });
        if (!contact) {
            throw new Error(`Contact with ID ${id} not found`);
        }
        Object.assign(contact, updateContactDto);
        return await this.contactsRepository.save(contact);
    }
    async remove(id) {
        const result = await this.contactsRepository.delete(id);
        if (result.affected === 0) {
            throw new Error(`Contact with ID ${id} not found`);
        }
    }
    async softDelete(id) {
        const contact = await this.contactsRepository.findOneBy({ contact_id: id });
        if (!contact) {
            throw new Error(`Contact with ID ${id} not found`);
        }
        contact.is_deleted = true;
        await this.contactsRepository.save(contact);
    }
    async restore(id) {
        const contact = await this.contactsRepository.findOneBy({ contact_id: id });
        if (!contact) {
            throw new Error(`Contact with ID ${id} not found`);
        }
        contact.is_deleted = false;
        await this.contactsRepository.save(contact);
    }
};
exports.ContactsService = ContactsService;
exports.ContactsService = ContactsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(contact_entity_1.Contact)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ContactsService);
//# sourceMappingURL=contacts.service.js.map
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
exports.AccountsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const account_entity_1 = require("./entities/account.entity");
let AccountsService = class AccountsService {
    accountRepository;
    constructor(accountRepository) {
        this.accountRepository = accountRepository;
    }
    create(createAccountDto) {
        return this.accountRepository.save(createAccountDto);
    }
    update(id, updateAccountDto) {
        return this.accountRepository.update(id, updateAccountDto);
    }
    remove(id) {
        return this.accountRepository.delete(id);
    }
    async findAll() {
        return await this.accountRepository.find({
            where: { is_deleted: false },
        });
    }
    async findOne(id) {
        const account = await this.accountRepository.findOneBy({
            account_id: id,
            is_deleted: false,
        });
        if (!account) {
            throw new common_1.NotFoundException(`Компания с ID ${id} не найдена`);
        }
        return account;
    }
    async softDelete(id) {
        const account = await this.accountRepository.findOneBy({ account_id: id });
        if (!account) {
            throw new common_1.NotFoundException(`Компания с ID ${id} не найдена`);
        }
        account.is_deleted = true;
        await this.accountRepository.save(account);
    }
    async restore(id) {
        const account = await this.accountRepository.findOneBy({ account_id: id });
        if (!account) {
            throw new common_1.NotFoundException(`Компания с ID ${id} не найдена`);
        }
        account.is_deleted = false;
        await this.accountRepository.save(account);
    }
};
exports.AccountsService = AccountsService;
exports.AccountsService = AccountsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(account_entity_1.Account)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], AccountsService);
//# sourceMappingURL=accounts.service.js.map
import { Repository } from 'typeorm';
import { Account } from './entities/account.entity';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
export declare class AccountsService {
    private readonly accountRepository;
    constructor(accountRepository: Repository<Account>);
    create(createAccountDto: CreateAccountDto): Promise<CreateAccountDto & Account>;
    update(id: number, updateAccountDto: UpdateAccountDto): Promise<import("typeorm").UpdateResult>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
    findAll(): Promise<Account[]>;
    findOne(id: number): Promise<Account>;
    softDelete(id: number): Promise<void>;
    restore(id: number): Promise<void>;
}

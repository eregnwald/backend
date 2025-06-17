import { AccountsService } from './accounts.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
export declare class AccountsController {
    private readonly accountService;
    constructor(accountService: AccountsService);
    create(createAccountDto: CreateAccountDto): Promise<CreateAccountDto & import("./entities/account.entity").Account>;
    findAll(): Promise<import("./entities/account.entity").Account[]>;
    findOne(id: string): Promise<import("./entities/account.entity").Account>;
    update(id: string, updateAccountDto: UpdateAccountDto): Promise<import("typeorm").UpdateResult>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
    softDelete(id: string): Promise<void>;
    restore(id: string): Promise<void>;
}

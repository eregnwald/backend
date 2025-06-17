import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Account } from './entities/account.entity';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';

@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
  ) {}

  create(createAccountDto: CreateAccountDto) {
    return this.accountRepository.save(createAccountDto);
  }

 

  update(id: number, updateAccountDto: UpdateAccountDto) {
    return this.accountRepository.update(id, updateAccountDto);
  }

  remove(id: number) {
    return this.accountRepository.delete(id);
  }

  async findAll(): Promise<Account[]> {
  return await this.accountRepository.find({
    where: { is_deleted: false },
  });
}

async findOne(id: number): Promise<Account> {
  const account = await this.accountRepository.findOneBy({
    account_id: id,
    is_deleted: false,
  });
  if (!account) {
    throw new NotFoundException(`Компания с ID ${id} не найдена`);
  }
  return account;
}

  async softDelete(id: number): Promise<void> {
  const account = await this.accountRepository.findOneBy({ account_id: id });
  if (!account) {
    throw new NotFoundException(`Компания с ID ${id} не найдена`);
  }
  account.is_deleted = true;
  await this.accountRepository.save(account);
}

async restore(id: number): Promise<void> {
  const account = await this.accountRepository.findOneBy({ account_id: id });
  if (!account) {
    throw new NotFoundException(`Компания с ID ${id} не найдена`);
  }
  account.is_deleted = false;
  await this.accountRepository.save(account);
}






}
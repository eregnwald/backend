import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRole } from '../user-roles/entities/user-role.entity';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(UserRole)
    private userRolesRepository: Repository<UserRole>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const user = this.usersRepository.create({
      ...createUserDto,
      password_hash: hashedPassword,
    });
    return this.usersRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find({
      relations: ['userRoles', 'userRoles.role'],
    });
  }

  async findProfileById(userId: number): Promise<User> {
  const user = await this.usersRepository.findOne({
    where: { user_id: userId },
    select: ['user_id', 'username', 'first_name', 'last_name', 'email'],
  });

  if (!user) throw new Error(`Пользователь не найден`);

  return user;
}

  async findOne(id: number): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { user_id: id },
      relations: ['userRoles', 'userRoles.role'],
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    await this.usersRepository.update(id, updateUserDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const user = await this.findOne(id);
    await this.usersRepository.delete(id);
  }

  // ✅ Основной метод для авторизации
  async findByEmail(email: string): Promise<User | null> {
    const user = await this.usersRepository.findOne({
      where: { email },
      relations: ['userRoles', 'userRoles.role'], // 🔁 Загрузка ролей
    });

    return user || null;
  }

  // Метод для назначения роли пользователю
  async assignRoleToUser(userId: number, roleId: number): Promise<User> {
    await this.userRolesRepository.save({ user_id: userId, role_id: roleId });
    return this.findOne(userId); // вернёт пользователя с обновлёнными ролями
  }
}
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRole } from '../user-roles/entities/user-role.entity';
import { SalesFunnelsService } from '../salesfunnel/funnel.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { Role } from 'src/roles/entities/role.entity';
import { HttpException, HttpStatus, NotFoundException } from '@nestjs/common';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,

    private readonly funnelService: SalesFunnelsService,

    @InjectRepository(UserRole)
    private userRolesRepository: Repository<UserRole>,

    @InjectRepository(Role)
    private rolesRepository: Repository<Role>,
  ) {}

  // Общий метод для создания пользователя (можно использовать и в админке)
  async create(userData: Partial<User>): Promise<User> {
    console.log('[UsersService] Creating user with data:', userData);
    const user = this.usersRepository.create(userData);
    const savedUser = await this.usersRepository.save(user);
    console.log('[UsersService] User created and saved:', savedUser);
    return savedUser;
  }

  async register(dto: CreateUserDto): Promise<User> {
    if (!dto.password) {
      throw new Error('Пароль не указан');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    // Загружаем роль по ID
    const role = await this.rolesRepository.findOneBy({ role_id: dto.role_id });
    if (!role) {
      throw new HttpException('Роль не найдена', HttpStatus.NOT_FOUND);
    }

    const user = await this.create({
      username: dto.username,
      email: dto.email,
      first_name: dto.first_name,
      last_name: dto.last_name,
      password_hash: hashedPassword,
      role, 
    });

    if (user?.user_id) {
      await this.funnelService.createDefaultFunnel(user.user_id);
    }

    return user;
  }


async findAll(currentUser: any): Promise<User[]> {
  const currentUserRoles = currentUser?.roles || [];
  const isUser = currentUserRoles.includes('user');
  const userId = currentUser?.sub;

  const queryBuilder = this.usersRepository.createQueryBuilder('user')
    .leftJoinAndSelect('user.role', 'role');

  if (!currentUserRoles.includes('admin')) {
    queryBuilder.where('role.role_name != :adminRole', { adminRole: 'admin' });
  }

 
  if (isUser && userId) {
    queryBuilder.andWhere('user.user_id = :userId', { userId });
  }

  return await queryBuilder.getMany();
}


  async findOne(id: number): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { user_id: id },
      relations: ['role'],
    });

    if (!user) {
      throw new NotFoundException(`Пользователь с ID ${id} не найден`);
    }

    return user;
  }



  async findProfileById(userId: number): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { user_id: userId },
      select: ['user_id', 'username', 'first_name', 'last_name', 'email'],
    });

    if (!user) {
      throw new NotFoundException('Пользователь не найден');
    }

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
  const user = await this.findOne(id);

  if (updateUserDto.role_id !== undefined) {
    const role = await this.rolesRepository.findOneBy({ role_id: updateUserDto.role_id });
    if (!role) {
      throw new HttpException('Роль не найдена', HttpStatus.NOT_FOUND);
    }
    user.role = role; 
    delete updateUserDto.role_id; 
  }

  Object.assign(user, updateUserDto); 

  return await this.usersRepository.save(user);
}

  async remove(id: number): Promise<void> {
    const result = await this.usersRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Пользователь с ID ${id} не найден`);
    }
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.usersRepository.findOne({
      where: { email },
      relations: ['role'],
    });

    return user || null;
  }

  async assignRoleToUser(userId: number, roleId: number): Promise<User> {
    await this.userRolesRepository.insert({ user_id: userId, role_id: roleId });
    return this.findOne(userId); // Не проверяем права при внутреннем вызове
  }
}
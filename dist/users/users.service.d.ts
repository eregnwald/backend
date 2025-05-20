import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRole } from '../user-roles/entities/user-role.entity';
export declare class UsersService {
    private usersRepository;
    private userRolesRepository;
    constructor(usersRepository: Repository<User>, userRolesRepository: Repository<UserRole>);
    create(createUserDto: CreateUserDto): Promise<User>;
    findAll(): Promise<User[]>;
    findProfileById(userId: number): Promise<User>;
    findOne(id: number): Promise<User>;
    update(id: number, updateUserDto: UpdateUserDto): Promise<User>;
    remove(id: number): Promise<void>;
    findByEmail(email: string): Promise<User | null>;
    assignRoleToUser(userId: number, roleId: number): Promise<User>;
}

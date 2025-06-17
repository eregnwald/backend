import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRole } from '../user-roles/entities/user-role.entity';
import { SalesFunnelsService } from '../salesfunnel/funnel.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { Role } from 'src/roles/entities/role.entity';
export declare class UsersService {
    private usersRepository;
    private readonly funnelService;
    private userRolesRepository;
    private rolesRepository;
    constructor(usersRepository: Repository<User>, funnelService: SalesFunnelsService, userRolesRepository: Repository<UserRole>, rolesRepository: Repository<Role>);
    create(userData: Partial<User>): Promise<User>;
    register(dto: CreateUserDto): Promise<User>;
    findAll(currentUser: any): Promise<User[]>;
    findOne(id: number): Promise<User>;
    findProfileById(userId: number): Promise<User>;
    update(id: number, updateUserDto: UpdateUserDto): Promise<User>;
    remove(id: number): Promise<void>;
    findByEmail(email: string): Promise<User | null>;
    assignRoleToUser(userId: number, roleId: number): Promise<User>;
}

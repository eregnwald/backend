import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { AssignRoleDto } from './dto/assign-role.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getMe(request: any): Promise<User>;
    assignRole(id: number, dto: AssignRoleDto): Promise<User>;
    create(createUserDto: CreateUserDto): Promise<User>;
    findAll(): Promise<User[]>;
    findOne(id: string): Promise<User>;
    remove(id: string): Promise<void>;
    assignRoleToUser(userId: string, roleId: string): Promise<any>;
    update(id: string, dto: any): Promise<User>;
}

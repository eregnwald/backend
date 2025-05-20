import { UserRolesService } from './user-roles.service';
import { CreateUserRoleDto } from './dto/create-user-role.dto';
import { UpdateUserRoleDto } from './dto/update-user-role.dto';
export declare class UserRolesController {
    private readonly userRolesService;
    constructor(userRolesService: UserRolesService);
    create(createUserRoleDto: CreateUserRoleDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateUserRoleDto: UpdateUserRoleDto): string;
    remove(id: string): string;
}

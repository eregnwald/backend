import { CreateUserRoleDto } from './dto/create-user-role.dto';
import { UpdateUserRoleDto } from './dto/update-user-role.dto';
export declare class UserRolesService {
    create(createUserRoleDto: CreateUserRoleDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateUserRoleDto: UpdateUserRoleDto): string;
    remove(id: number): string;
}

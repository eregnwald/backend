import { RolePermission } from '../../role-permissions/entities/role-permission.entity';
export declare class Permission {
    permission_id: number;
    permission_code: string;
    description: string;
    rolePermissions: RolePermission[];
}

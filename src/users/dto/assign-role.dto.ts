// src/users/dto/assign-role.dto.ts
import { IsNumber } from 'class-validator';

export class AssignRoleDto {
  @IsNumber()
  roleId: number;
}
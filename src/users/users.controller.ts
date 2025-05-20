import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { AssignRoleDto } from './dto/assign-role.dto';
import { Patch, Request } from '@nestjs/common';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}


    @Get('me')
  @UseGuards(AuthGuard('jwt'))
  async getMe(@Request() request: any): Promise<User> {
  const userId = request.user.user_id;
    return this.usersService.findProfileById(userId);
  }

   @Patch(':id/role')
  async assignRole(@Param('id') id: number, @Body() dto: AssignRoleDto) {
    return this.usersService.assignRoleToUser(id, dto.roleId);
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<User> {
    return this.usersService.findOne(+id);
  }

  

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.usersService.remove(+id);
  }

  @Post(':userId/roles/:roleId')
  assignRoleToUser(@Param('userId') userId: string, @Param('roleId') roleId: string): Promise<any> {
    return this.usersService.assignRoleToUser(+userId, +roleId);
  }


  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: any) {
    return await this.usersService.update(+id, dto);
  }

  // src/users/users.controller.ts



}

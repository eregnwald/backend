import { Controller, Get, Post, Put, Delete, Body, Param, UsePipes, ValidationPipe, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { AssignRoleDto } from './dto/assign-role.dto';
import { Patch } from '@nestjs/common';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
@UseGuards(AuthGuard('jwt'))
async getMe(@Request() req) {
  const userId = req.user.sub; 
  return this.usersService.findOne(userId);
}

  @Patch(':id/role')
  async assignRole(
    @Param('id') id: number,
    @Body() dto: AssignRoleDto
  ) {
    return this.usersService.assignRoleToUser(id, dto.roleId);
  }

  @Get()
  @UseGuards(AuthGuard('jwt')) 
  findAll(@Request() req): Promise<User[]> {
    return this.usersService.findAll(req.user); 
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt')) 
  findOne(@Param('id') id: string, @Request() req): Promise<User> {
    return this.usersService.findOne(+id); 
  }
 

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.usersService.remove(+id);
  }

  @Post(':userId/roles/:roleId')
  assignRoleToUser(
    @Param('userId') userId: string,
    @Param('roleId') roleId: string
  ): Promise<any> {
    return this.usersService.assignRoleToUser(+userId, +roleId);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: any) {
    return await this.usersService.update(+id, dto);
  }

  @Post()
  @UsePipes(new ValidationPipe())
  async register(@Body() dto: CreateUserDto) {
    return this.usersService.register(dto);
  }
}
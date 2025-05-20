// src/auth/auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';



@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    // ❗ Используем существующий метод findByEmail(), который загружает роли
    const user = await this.usersService.findByEmail(email);

    if (user && (await bcrypt.compare(password, user.password_hash))) {
      const { password_hash, ...result } = user;
      return result;
    }

    throw new UnauthorizedException('Неверные учетные данные');
  }

  async login(user: any) {
  console.log('Raw User:', JSON.stringify(user, null, 2)); // 👈 Посмотри, есть ли role
  console.log('User Roles:', user.userRoles); // 👈 Посмотри, есть ли связанные роли

    const payload = {
      email: user.email,
      sub: user.user_id,
      first_name: user.first_name,
      roles: user.userRoles?.map((ur) => ur.role.role_name), // ✅ Получаем role_name
    };

    console.log('JWT Payload:', JSON.stringify(payload, null, 2)); // 👈 Проверь в консоли

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
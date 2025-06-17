import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
    private jwtService: JwtService,
  
  
  ) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const user = await this.authService.validateUser(loginDto.email, loginDto.password);
    return this.authService.login(user);
  }

  @Post('refresh')
async refresh(@Body() body: { refresh_token: string }) {
  const payload = this.jwtService.verify(body.refresh_token, {
    secret: process.env.JWT_REFRESH_SECRET,
  });

  const userId = payload.sub; 

 
  const user = await this.usersService.findOne(userId);

 
  const newPayload = {
    sub: user.user_id,
    email: user.email,
    first_name: user.first_name,
    roles: user.role ? [user.role.role_name] : [],
  };

  const newAccessToken = this.jwtService.sign(newPayload, {
    secret: process.env.JWT_ACCESS_SECRET,
    expiresIn: '1m',
  });

  return {
    access_token: newAccessToken,
    refresh_token: body.refresh_token,
  };
}

}

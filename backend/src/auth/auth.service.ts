import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from 'src/jwt/jwt.service';
import { UsersService } from 'src/users/users.service';
import { ChangePasswordDto } from './dto/change-password.dto';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const user = await this.usersService.findOneWithPassword({
      email: loginDto.email,
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    const isValidPassword = await bcrypt.compare(
      loginDto.password,
      user.password,
    );

    if (!isValidPassword) {
      throw new UnauthorizedException();
    }
    return { access_token: this.jwtService.sign(user.id) };
  }

  async changePassword(userId: string, changePasswordDto: ChangePasswordDto) {
    const user = await this.usersService.findOneWithPassword({
      id: userId,
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    const isValidPassword = await bcrypt.compare(
      changePasswordDto.oldPassword,
      user.password,
    );

    if (!isValidPassword) {
      throw new UnauthorizedException();
    }
    return this.usersService.updatePassword(userId, {
      password: changePasswordDto.newPassword,
    });
  }

  async register(userData: RegisterDto) {
    await this.usersService.create(userData);
  }
}

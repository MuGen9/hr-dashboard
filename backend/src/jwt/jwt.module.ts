import { Module } from '@nestjs/common';
import { JwtModule as NestJwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/model/user.entity';
import { JWT_SECRET } from './constants';
import { JwtService } from './jwt.service';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    NestJwtModule.register({
      secret: JWT_SECRET,
      signOptions: { expiresIn: '3600s' },
    }),
    TypeOrmModule.forFeature([User]),
  ],
  providers: [JwtService, JwtStrategy],
  exports: [JwtService],
})
export class JwtModule {}

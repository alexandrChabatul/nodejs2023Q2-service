import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { TokenService } from './token.service';
import { JwtStrategy } from '../strategy';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [AuthController],
  providers: [AuthService, TokenService, JwtStrategy],
  imports: [UsersModule, JwtModule],
})
export class AuthModule {}

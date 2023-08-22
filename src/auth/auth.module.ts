import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { TokenService } from './token.service';
import { JwtStrategy } from '../strategy';
import { JwtModule } from '@nestjs/jwt';
import { Token } from './entities/token.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [AuthController],
  providers: [AuthService, TokenService, JwtStrategy],
  imports: [UsersModule, JwtModule, TypeOrmModule.forFeature([Token])],
})
export class AuthModule {}

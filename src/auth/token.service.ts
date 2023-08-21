import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/entities/user.entity';

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  generateJwt(user: User) {
    const payload = { user };
    return this.jwtService.sign(payload, {
      secret: this.configService.get('config').tokenSecret,
      expiresIn: this.configService.get('config').tokenExpire,
    });
  }
}

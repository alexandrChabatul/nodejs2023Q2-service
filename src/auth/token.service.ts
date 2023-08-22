import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { Token } from './entities/token.entity';

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    @InjectRepository(Token)
    private readonly tokenRepository: Repository<Token>,
  ) {}

  generateTokenPair(user: User) {
    return {
      accessToken: this.generateJwt(user),
      refreshToken: this.generateRefreshJwt(user),
    };
  }

  generateJwt(user: User) {
    const payload = { user };
    return this.jwtService.sign(payload, {
      secret: this.configService.get('config').tokenSecret,
      expiresIn: this.configService.get('config').tokenExpire,
    });
  }

  generateRefreshJwt(user: User) {
    const payload = { user };
    return this.jwtService.sign(payload, {
      secret: this.configService.get('config').refreshTokenSecret,
      expiresIn: this.configService.get('config').refreshTokenExpire,
    });
  }

  async saveToken(user: User, refreshToken: string) {
    const dbToken = await this.tokenRepository.findOne({ where: { user } });
    if (dbToken) {
      dbToken.token = refreshToken;
      return this.tokenRepository.save(dbToken);
    }
    const token = await this.tokenRepository.create({
      token: refreshToken,
      user,
    });
    return token;
  }

  async removeToken(refreshToken: string) {
    const dbToken = await this.tokenRepository.findOne({
      where: { token: refreshToken },
    });
    if (dbToken) return this.tokenRepository.delete(dbToken);
  }

  async findToken(refreshToken: string) {
    const token = await this.tokenRepository.findOne({
      where: { token: refreshToken },
    });
    return token;
  }

  validateRefreshToken<T>(token: string): T | null {
    try {
      const data = this.jwtService.verify(token, {
        ignoreExpiration: false,
        secret: this.configService.get('config').refreshTokenSecret,
      }) as T;
      return data;
    } catch (e) {
      return null;
    }
  }
}

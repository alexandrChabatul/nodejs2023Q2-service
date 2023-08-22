import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { TokenService } from './token.service';
import * as bcrypt from 'bcrypt';
import { User } from '../users/entities/user.entity';
import { RefreshTokenDto } from './dto/refrtesh-token.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly tokenService: TokenService,
  ) {}

  async signUp(createUserDto: CreateUserDto) {
    const potentialUser = await this.userService.findOneByLogin(
      createUserDto.login,
    );
    if (potentialUser)
      throw new BadRequestException('User with this login is already exists');
    return await this.userService.create(createUserDto);
  }

  async login(createUserDto: CreateUserDto) {
    const potentialUser = await this.userService.findOneByLogin(
      createUserDto.login,
    );
    if (!potentialUser)
      throw new ForbiddenException('User with this login does not exists');
    const validate = await bcrypt.compare(
      createUserDto.password,
      potentialUser.password,
    );
    if (!validate) throw new ForbiddenException('Wrong credentials');
    delete potentialUser.password;
    const data = await this.getAndSaveData(potentialUser);
    return data;
  }

  async refresh(refreshTokenDto: RefreshTokenDto) {
    const { refreshToken } = refreshTokenDto;
    if (!refreshToken) {
      throw new UnauthorizedException();
    }
    const tokenData =
      this.tokenService.validateRefreshToken<User>(refreshToken);
    const dbToken = await this.tokenService.findToken(refreshToken);
    if (!tokenData || !dbToken) {
      throw new UnauthorizedException();
    }
    const user = await this.userService.findOne(tokenData.id);
    let data;
    if (user) {
      data = await this.getAndSaveData(user);
    } else {
      data = await this.getAndSaveData({
        ...tokenData,
      });
    }
    return data;
  }

  private async getAndSaveData(user: User) {
    delete user.password;
    const tokens = this.tokenService.generateTokenPair(user);
    await this.tokenService.saveToken(user, tokens.refreshToken);
    return {
      ...tokens,
      ...user,
    };
  }
}

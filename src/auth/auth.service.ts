import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { TokenService } from './token.service';
import * as bcrypt from 'bcrypt';

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
    try {
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
      const token = await this.tokenService.generateJwt(potentialUser);
      return { ...potentialUser, accessToken: token };
    } catch(e) {
      console.log(e)
    }
  }
}

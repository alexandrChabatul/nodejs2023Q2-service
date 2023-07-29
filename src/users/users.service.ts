import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './types/user.interface';
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcrypt';
import { UpdatePasswordDto } from './dto/update-password.dto';

const users: User[] = [];

@Injectable()
export class UsersService {
  saltOrRounds = 7;

  async create(createUserDto: CreateUserDto) {
    const user = {
      id: uuidv4(),
      login: createUserDto.login,
      password: await bcrypt.hash(createUserDto.password, this.saltOrRounds),
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    users.push(user);
    return user;
  }

  findAll() {
    return users;
  }

  findOne(id: string) {
    const user = users.find((u) => u.id === String(id));
    if (!user) throw new NotFoundException();
    return user;
  }

  async updatePassword(id: string, updatePasswordDto: UpdatePasswordDto) {
    const user = users.find((u) => u.id === String(id));
    if (!user) throw new NotFoundException();
    if (!bcrypt.compare(updatePasswordDto.oldPassword, user.password))
      throw new HttpException('Old password is wrong', 403);

    user.password = await bcrypt.hash(
      updatePasswordDto.newPassword,
      this.saltOrRounds,
    );
    user.updatedAt = Date.now();
    user.version = user.version + 1;
    return user;
  }

  remove(id: string) {
    const index = users.findIndex((u) => u.id === id);
    if (index === -1) throw new NotFoundException();
    users.splice(index, 1);
  }
}

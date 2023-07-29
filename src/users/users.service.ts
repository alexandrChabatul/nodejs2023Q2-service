import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { User } from './entities/user.entity';
import { users } from 'src/data/storage';

@Injectable()
export class UsersService {
  saltOrRounds = 7;

  async create(createUserDto: CreateUserDto) {
    const user = new User(
      createUserDto.login,
      await bcrypt.hash(createUserDto.password, this.saltOrRounds),
    );
    users.push(user);
    return user;
  }

  findAll() {
    return users;
  }

  findOne(id: string) {
    const user = users.find((u) => u.id === id);
    if (!user) throw new NotFoundException();
    return user;
  }

  async updatePassword(id: string, updatePasswordDto: UpdatePasswordDto) {
    const user = users.find((u) => u.id === id);
    if (!user) throw new NotFoundException();
    if (!(await bcrypt.compare(updatePasswordDto.oldPassword, user.password)))
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

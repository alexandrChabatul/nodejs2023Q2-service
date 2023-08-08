import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  saltOrRounds = 7;

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const password = await bcrypt.hash(
      createUserDto.password,
      this.saltOrRounds,
    );
    const user = await this.userRepository.save({
      login: createUserDto.login,
      password,
    });
    return this.findOne(user.id);
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException();
    return user;
  }

  async updatePassword(id: string, updatePasswordDto: UpdatePasswordDto) {
    const user = await this.findOne(id);
    if (!user) throw new NotFoundException();
    if (!(await bcrypt.compare(updatePasswordDto.oldPassword, user.password)))
      throw new HttpException('Old password is wrong', 403);
    const newPassword = await bcrypt.hash(
      updatePasswordDto.newPassword,
      this.saltOrRounds,
    );
    await this.userRepository.update({ id }, { password: newPassword });
    return await this.findOne(id);
  }

  async remove(id: string) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException();
    return await this.userRepository.delete({ id });
  }
}

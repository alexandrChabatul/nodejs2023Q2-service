import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './types/user.interface';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';

const users: User[] = [];

@Injectable()
export class UsersService {

  saltOrRounds = 10;

  create(createUserDto: CreateUserDto) {
    const user = {
      id: uuidv4(); // uuid v4
      login: createUserDto.login;
      password: bcrypt.ha;
      version: number; // integer number, increments on update
      createdAt: number; // timestamp of creation
      updatedAt: number; // timestamp of last update
    }
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}

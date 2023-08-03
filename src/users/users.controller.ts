import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseUUIDPipe,
  HttpCode,
  Put,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { User } from './entities/user.entity';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  @HttpCode(201)
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.usersService.create(createUserDto);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  async findAll(): Promise<User[]> {
    return await this.usersService.findAll();
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  async findOne(@Param('id', new ParseUUIDPipe()) id: string): Promise<User> {
    return await this.usersService.findOne(id);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Put(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() upatePasswordDto: UpdatePasswordDto,
  ): Promise<User> {
    return await this.usersService.updatePassword(id, upatePasswordDto);
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.usersService.remove(id);
  }
}

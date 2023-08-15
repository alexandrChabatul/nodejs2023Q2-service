import { Exclude, Transform } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  login: string;
  @Column()
  @Exclude()
  password: string;
  @VersionColumn()
  version: number;
  @CreateDateColumn()
  @Transform(({ value }) => value.getTime())
  createdAt: Date;
  @UpdateDateColumn()
  @Transform(({ value }) => value.getTime())
  updatedAt: Date;
}

import { Exclude } from 'class-transformer';
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
  @PrimaryGeneratedColumn()
  id: string;
  @Column()
  login: string;
  @Exclude()
  @Column()
  password: string;
  @VersionColumn()
  version: number;
  @CreateDateColumn()
  createdAt: number;
  @UpdateDateColumn()
  updatedAt: number;
}

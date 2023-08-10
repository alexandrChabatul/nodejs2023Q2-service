import { Album } from '../../albums/entities/album.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('albums-favorites')
export class AlbumsFavorite {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  albumId: string;

  @OneToOne(() => Album, {
    onDelete: 'CASCADE',
    eager: true,
  })
  @JoinColumn()
  album: Album;
}

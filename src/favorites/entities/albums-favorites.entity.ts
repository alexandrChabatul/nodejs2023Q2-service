import { Album } from '../../albums/entities/album.entity';
import { Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('albums-favorites')
export class AlbumsFavorite {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => Album, (album) => album.favorite)
  @JoinColumn()
  album: Album;
}

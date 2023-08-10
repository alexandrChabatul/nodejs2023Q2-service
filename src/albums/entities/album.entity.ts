import { Artist } from 'src/artists/entities/artist.entity';
import { AlbumsFavorite } from 'src/favorites/entities/albums-favorites.entity';
import { Track } from 'src/tracks/entities/track.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('albums')
export class Album {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name: string;
  @Column()
  year: number;

  @Column({ nullable: true, default: null })
  artistId: string;

  @ManyToOne(() => Artist, (artist) => artist.albums, {
    nullable: false,
    onDelete: 'SET NULL',
  })
  artist: Artist;

  @OneToMany(() => Track, (track) => track.album, {
    onDelete: 'CASCADE',
  })
  tracks: Track[];
}

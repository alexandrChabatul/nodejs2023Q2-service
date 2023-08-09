import { Artist } from 'src/artists/entities/artist.entity';
import { TracksFavorite } from 'src/favorites/entities/tracks-favorites.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Album } from '../../albums/entities/album.entity';

@Entity('tracks')
export class Track {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name: string;
  @Column()
  duration: number;

  @Column({ nullable: true })
  artistId: string;

  @Column({ nullable: true, default: null })
  albumId: string;

  @ManyToOne(() => Artist, (artist) => artist.tracks, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'artistId' })
  artist: Artist;

  @ManyToOne(() => Album, (album) => album.tracks, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'albumId' })
  album: Album;

  @OneToOne(() => TracksFavorite, (favorite) => favorite.track)
  favorite: TracksFavorite;
}

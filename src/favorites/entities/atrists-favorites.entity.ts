import { Artist } from 'src/artists/entities/artist.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('artists-favorites')
export class ArtistsFavorite {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => Artist, (artist) => artist.favorite)
  @JoinColumn()
  artist: Artist;
}

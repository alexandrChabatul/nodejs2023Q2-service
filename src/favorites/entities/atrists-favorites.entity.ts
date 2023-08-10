import { Artist } from 'src/artists/entities/artist.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('artists-favorites')
export class ArtistsFavorite {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  artistId: string;

  @OneToOne(() => Artist, {
    onDelete: 'CASCADE',
    eager: true,
  })
  @JoinColumn({ name: 'artistId' })
  artist: Artist;
}

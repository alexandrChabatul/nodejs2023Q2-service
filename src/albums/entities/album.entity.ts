import { Artist } from 'src/artists/entities/artist.entity';
import { Track } from 'src/tracks/entities/track.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
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
  @ManyToOne(() => Artist, (artist) => artist.albums)
  artistId: string | null;
  @Column({ array: true, default: [] })
  @OneToMany(() => Track, (track) => track.artistId)
  tracks: string;
}

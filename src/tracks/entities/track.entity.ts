import { Album } from 'src/albums/entities/album.entity';
import { Artist } from 'src/artists/entities/artist.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity('tracks')
export class Track {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name: string;
  @ManyToOne(() => Artist, (artist) => artist.tracks)
  artistId: string | null;
  @ManyToOne(() => Album, (album) => album.tracks)
  albumId: string | null;
  @Column()
  duration: number;
}

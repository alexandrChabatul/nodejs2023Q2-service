import { Album } from 'src/albums/entities/album.entity';
import { Track } from 'src/tracks/entities/track.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('artists')
export class Artist {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name: string;
  @Column()
  grammy: boolean;
  @Column({ array: true, default: [] })
  @OneToMany(() => Album, (album) => album.artistId)
  albums: string;
  @Column({ array: true, default: [] })
  @OneToMany(() => Track, (track) => track.artistId)
  tracks: string;
}

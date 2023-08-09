import { Track } from 'src/tracks/entities/track.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('tracks-favorites')
export class TracksFavorite {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => Track, (track) => track.favorite)
  @JoinColumn()
  track: Track;
}

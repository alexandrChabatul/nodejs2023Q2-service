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

  @Column({ nullable: false })
  trackId: string;

  @OneToOne(() => Track, {
    onDelete: 'CASCADE',
    eager: true,
  })
  @JoinColumn()
  track: Track;
}

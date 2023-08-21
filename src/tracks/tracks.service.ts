import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { favorites, tracks } from '../data/storage';
import { Track } from './entities/track.entity';

@Injectable()
export class TracksService {
  create(createTrackDto: CreateTrackDto) {
    const track = new Track(
      createTrackDto.name,
      createTrackDto.duration,
      createTrackDto.artistId || null,
      createTrackDto.albumId || null,
    );
    tracks.push(track);
    return track;
  }

  findAll() {
    return tracks;
  }

  findOne(id: string) {
    const track = tracks.find((u) => u.id === id);
    if (!track) throw new NotFoundException();
    return track;
  }

  update(id: string, updateTrackDto: UpdateTrackDto) {
    const track = tracks.find((u) => u.id === id);
    console.log(tracks, id);
    if (!track) throw new NotFoundException();
    track.name = updateTrackDto.name;
    track.duration = updateTrackDto.duration;
    if (updateTrackDto.albumId) track.albumId = updateTrackDto.albumId;
    if (updateTrackDto.artistId) track.artistId = updateTrackDto.artistId;
    return track;
  }

  remove(id: string) {
    const index = tracks.findIndex((u) => u.id === id);
    if (index === -1) throw new NotFoundException();
    tracks.splice(index, 1);
    favorites.removeTrack(id);
  }
}

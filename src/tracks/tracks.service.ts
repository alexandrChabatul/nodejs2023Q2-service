import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TracksService {
  constructor(
    @InjectRepository(Track)
    private readonly tracksRepository: Repository<Track>,
  ) {}

  async create(createTrackDto: CreateTrackDto) {
    return await this.tracksRepository.save(createTrackDto);
  }

  async findAll() {
    return await this.tracksRepository.find();
  }

  async findOne(id: string) {
    const track = await this.tracksRepository.findOne({
      where: { id },
    });
    if (!track) throw new NotFoundException();
    return track;
  }

  async update(id: string, updateTrackDto: UpdateTrackDto) {
    const track = await this.findOne(id);
    track.albumId = updateTrackDto.albumId;
    track.artistId = updateTrackDto.artistId;
    track.name = updateTrackDto.name;
    track.duration = updateTrackDto.duration;
    await this.tracksRepository.save(track);
    return await this.findOne(id);
  }

  async remove(id: string) {
    await this.findOne(id);
    return await this.tracksRepository.delete({ id });
  }
}

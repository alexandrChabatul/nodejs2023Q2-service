import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';
import { albums, artists, favorites, tracks } from '../data/storage';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ArtistsService {
  constructor(
    @InjectRepository(Artist)
    private readonly artistRepository: Repository<Artist>,
  ) {}

  async create(createArtistDto: CreateArtistDto) {
    return await this.artistRepository.create(createArtistDto);
  }

  async findAll() {
    return await this.artistRepository.find();
  }

  async findOne(id: string) {
    const artist = await this.artistRepository.findOne({ where: { id } });
    if (!artist) throw new NotFoundException();
    return artist;
  }

  async update(id: string, updateArtistDto: UpdateArtistDto) {
    const artist = await this.findOne(id);
    if (!artist) throw new NotFoundException();
    await this.artistRepository.update({ id }, updateArtistDto);
    return await this.findOne(id);
  }

  async remove(id: string) {
    const artist = await this.artistRepository.findOne({ where: { id } });
    if (!artist) throw new NotFoundException();
    return await this.artistRepository.delete({ id });
    // favorites.removeArtist(id);
    // tracks.forEach((t) => {
    //   if (t.artistId === id) t.artistId = null;
    // });
    // albums.forEach((a) => {
    //   if (a.artistId === id) a.artistId = null;
    // });
  }
}

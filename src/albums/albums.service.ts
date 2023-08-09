import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Album } from './entities/album.entity';

@Injectable()
export class AlbumsService {
  constructor(
    @InjectRepository(Album)
    private readonly albumsRepository: Repository<Album>,
  ) {}

  async create(createAlbumDto: CreateAlbumDto) {
    return await this.albumsRepository.save(createAlbumDto);
  }

  async findAll() {
    return await this.albumsRepository.find();
  }

  async findOne(id: string) {
    const album = await this.albumsRepository.findOne({ where: { id } });
    if (!album) throw new NotFoundException();
    return album;
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const album = await this.findOne(id);
    album.artistId = updateAlbumDto.artistId;
    album.year = updateAlbumDto.year;
    await this.albumsRepository.update({ id }, album);
    return await this.findOne(id);
  }

  async remove(id: string) {
    await this.findOne(id);
    return await this.albumsRepository.delete({ id });
  }
}

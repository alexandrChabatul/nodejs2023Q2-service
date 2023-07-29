import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';
import { albums, favorites, tracks } from 'src/data/storage';

@Injectable()
export class AlbumsService {
  create(createAlbumDto: CreateAlbumDto) {
    const album = new Album(
      createAlbumDto.year,
      createAlbumDto.name,
      createAlbumDto.artistId || null,
    );
    albums.push(album);
    return album;
  }

  findAll() {
    return albums;
  }

  findOne(id: string) {
    const album = albums.find((u) => u.id === id);
    if (!album) throw new NotFoundException();
    return album;
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const album = albums.find((u) => u.id === id);
    if (!album) throw new NotFoundException();
    album.year = updateAlbumDto.year;
    if (updateAlbumDto.artistId) album.artistId = updateAlbumDto.artistId;
    return album;
  }

  remove(id: string) {
    const index = albums.findIndex((u) => u.id === id);
    if (index === -1) throw new NotFoundException();
    albums.splice(index, 1);
    favorites.removeAlbum(id);
    tracks.forEach((t) => {
      if (t.albumId === id) t.albumId = null;
    });
  }
}

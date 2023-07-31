import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';
import { albums, artists, favorites, tracks } from '../data/storage';

@Injectable()
export class ArtistsService {
  create(createArtistDto: CreateArtistDto) {
    const artist: Artist = new Artist(
      createArtistDto.name,
      createArtistDto.grammy,
    );
    artists.push(artist);
    return artist;
  }

  findAll() {
    return artists;
  }

  findOne(id: string) {
    const artist = artists.find((a) => a.id === id);
    if (!artist) throw new NotFoundException();
    return artist;
  }

  update(id: string, updateArtistDto: UpdateArtistDto) {
    const artist = artists.find((u) => u.id === id);
    if (!artist) throw new NotFoundException();
    artist.grammy = updateArtistDto.grammy;
    artist.name = updateArtistDto.name;
    return artist;
  }

  remove(id: string) {
    const index = artists.findIndex((u) => u.id === id);
    if (index === -1) throw new NotFoundException();
    artists.splice(index, 1);
    favorites.removeArtist(id);
    tracks.forEach((t) => {
      if (t.artistId === id) t.artistId = null;
    });
    albums.forEach((a) => {
      if (a.artistId === id) a.artistId = null;
    });
  }
}

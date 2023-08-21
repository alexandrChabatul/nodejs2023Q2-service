import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { albums, artists, favorites, tracks } from '../data/storage';

@Injectable()
export class FavoritesService {
  getFavorites() {
    return {
      artists: favorites.artists
        .map((id) => artists.find((a) => a.id === id))
        .filter(Boolean),
      albums: favorites.albums
        .map((id) => albums.find((a) => a.id === id))
        .filter(Boolean),
      tracks: favorites.tracks
        .map((id) => tracks.find((a) => a.id === id))
        .filter(Boolean),
    };
  }

  addTrack(id: string) {
    if (!tracks.some((t) => t.id === id))
      throw new UnprocessableEntityException();
    favorites.addTrack(id);
  }

  removeTrack(id: string) {
    const result = favorites.removeTrack(id);
    if (result === -1) throw new NotFoundException();
  }

  addAlbum(id: string) {
    if (!albums.some((t) => t.id === id))
      throw new UnprocessableEntityException();
    favorites.addAlbum(id);
  }

  removeAlbum(id: string) {
    const result = favorites.removeAlbum(id);
    if (result === -1) throw new NotFoundException();
  }
  addArtist(id: string) {
    if (!artists.some((t) => t.id === id))
      throw new UnprocessableEntityException();
    favorites.addArtist(id);
  }

  removeArtist(id: string) {
    const result = favorites.removeArtist(id);
    if (result === -1) throw new NotFoundException();
  }
}

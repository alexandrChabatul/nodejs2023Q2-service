import { Injectable } from '@nestjs/common';
import { favorites } from 'src/data/storage';

@Injectable()
export class FavoritesService {
  getFavorites() {
    return favorites;
  }

  addTrack(id: string) {
    favorites.addTrack(id);
  }

  removeTrack(id: string) {
    favorites.removeTrack(id);
  }

  addAlbum(id: string) {
    favorites.addAlbum(id);
  }

  removeAlbum(id: string) {
    favorites.removeAlbum(id);
  }
  addArtist(id: string) {
    favorites.addArtist(id);
  }

  removeArtist(id: string) {
    favorites.removeArtist(id);
  }
}

import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AlbumsService } from 'src/albums/albums.service';
import { ArtistsService } from 'src/artists/artists.service';
import { TracksService } from 'src/tracks/tracks.service';
import { Repository } from 'typeorm';
import { AlbumsFavorite } from './entities/albums-favorites.entity';
import { ArtistsFavorite } from './entities/atrists-favorites.entity';
import { TracksFavorite } from './entities/tracks-favorites.entity';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(ArtistsFavorite)
    private readonly artistsFavoriteRepository: Repository<ArtistsFavorite>,
    @InjectRepository(AlbumsFavorite)
    private readonly albumsFavoriteRepository: Repository<AlbumsFavorite>,
    @InjectRepository(TracksFavorite)
    private readonly tracksFavoriteRepository: Repository<TracksFavorite>,
    private readonly trackService: TracksService,
    private readonly albumsService: AlbumsService,
    private readonly artistsService: ArtistsService,
  ) {}

  async getFavorites() {
    const artists = await this.artistsFavoriteRepository.find();
    const albums = await this.albumsFavoriteRepository.find();
    const tracks = await this.tracksFavoriteRepository.find();
    const result = {
      artists: artists.map((e) => e.artist),
      albums: albums.map((e) => e.album),
      tracks: tracks.map((e) => e.track),
    };
    return result;
  }

  async addTrack(id: string) {
    const track = await this.trackService.findOne(id);
    if (!track) throw new UnprocessableEntityException();
    if (track.favorite) return;
    await this.tracksFavoriteRepository.save({ track });
  }

  async removeTrack(id: string) {
    const track = await this.trackService.findOne(id);
    if (!track) throw new NotFoundException();
    const fav = await this.tracksFavoriteRepository.findOne({
      where: { track },
    });
    if (!fav) throw new NotFoundException();
    await this.tracksFavoriteRepository.remove(fav);
  }

  async addAlbum(id: string) {
    const album = await this.albumsService.findOne(id);
    if (!album) throw new UnprocessableEntityException();
    if (album.favorite) return;
    await this.albumsFavoriteRepository.save({ album: album });
  }

  async removeAlbum(id: string) {
    const album = await this.albumsService.findOne(id);
    if (!album) throw new NotFoundException();
    const fav = await this.albumsFavoriteRepository.findOne({
      where: { album: album },
    });
    if (!fav) throw new NotFoundException();
    await this.albumsFavoriteRepository.remove(fav);
  }

  async addArtist(id: string) {
    const artist = await this.artistsService.findOne(id);
    if (!artist) throw new UnprocessableEntityException();
    if (artist.favorite) return;
    await this.artistsFavoriteRepository.save({ artist: artist });
  }

  async removeArtist(id: string) {
    const artist = await this.artistsService.findOne(id);
    if (!artist) throw new NotFoundException();
    const fav = await this.artistsFavoriteRepository.findOne({
      where: { artist: artist },
    });
    if (!fav) throw new NotFoundException();
    await this.artistsFavoriteRepository.remove(fav);
  }
}

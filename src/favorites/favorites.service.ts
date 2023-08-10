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
import { Album } from '../albums/entities/album.entity';
import { Artist } from '../artists/entities/artist.entity';
import { Track } from '../tracks/entities/track.entity';
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
    @InjectRepository(Track)
    private readonly tracksRepository: Repository<Track>,
    @InjectRepository(Album)
    private readonly albumsRepository: Repository<Album>,
    @InjectRepository(Artist)
    private readonly artistsRepository: Repository<Artist>,
  ) {}

  async findTrackFavById(id: string) {
    const track = await this.tracksFavoriteRepository.find({
      where: { trackId: id },
    });
    if (!track) throw new UnprocessableEntityException();
    return track;
  }

  async findAlbumFavById(id: string) {
    const album = await this.albumsFavoriteRepository.find({
      where: { albumId: id },
    });
    if (!album) throw new UnprocessableEntityException();
    return album;
  }
  async findArtistFavById(id: string) {
    const artist = await this.artistsFavoriteRepository.find({
      where: { artistId: id },
    });
    if (!artist) throw new UnprocessableEntityException();
    return artist;
  }

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
    const track = await this.tracksRepository.findOne({ where: { id } });
    if (!track) throw new UnprocessableEntityException();
    await this.findTrackFavById(id);
    await this.tracksFavoriteRepository.save({ track });
  }

  async removeTrack(id: string) {
    const track = await this.tracksRepository.findOne({ where: { id } });
    if (!track) throw new UnprocessableEntityException();
    const fav = await this.findTrackFavById(id);
    await this.tracksFavoriteRepository.remove(fav);
  }

  async addAlbum(id: string) {
    const album = await this.albumsRepository.findOne({ where: { id } });
    if (!album) throw new UnprocessableEntityException();
    await this.findAlbumFavById(id);
    await this.albumsFavoriteRepository.save({ album: album });
  }

  async removeAlbum(id: string) {
    const album = await this.albumsRepository.findOne({ where: { id } });
    if (!album) throw new UnprocessableEntityException();
    const fav = await this.findAlbumFavById(id);
    await this.albumsFavoriteRepository.remove(fav);
  }

  async addArtist(id: string) {
    const artist = await this.artistsRepository.findOne({
      where: { id },
    });
    if (!artist) throw new UnprocessableEntityException();
    await this.findArtistFavById(id);
    await this.artistsFavoriteRepository.save({ artistId: id });
  }

  async removeArtist(id: string) {
    const artist = await this.artistsRepository.findOne({
      where: { id },
    });
    if (!artist) throw new UnprocessableEntityException();
    const fav = await this.findArtistFavById(id);
    await this.artistsFavoriteRepository.remove(fav);
  }
}

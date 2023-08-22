import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArtistsFavorite } from './entities/atrists-favorites.entity';
import { AlbumsFavorite } from './entities/albums-favorites.entity';
import { TracksFavorite } from './entities/tracks-favorites.entity';
import { TracksModule } from 'src/tracks/tracks.module';
import { AlbumsModule } from 'src/albums/albums.module';
import { ArtistsModule } from 'src/artists/artists.module';
import { Track } from '../tracks/entities/track.entity';
import { Album } from '../albums/entities/album.entity';
import { Artist } from '../artists/entities/artist.entity';

@Module({
  controllers: [FavoritesController],
  providers: [FavoritesService],
  imports: [
    TypeOrmModule.forFeature([
      ArtistsFavorite,
      AlbumsFavorite,
      TracksFavorite,
      Track,
      Album,
      Artist,
    ]),
    TracksModule,
    AlbumsModule,
    ArtistsModule,
  ],
})
export class FavoritesModule {}

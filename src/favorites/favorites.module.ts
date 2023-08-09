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

@Module({
  controllers: [FavoritesController],
  providers: [FavoritesService],
  imports: [
    TypeOrmModule.forFeature([ArtistsFavorite, AlbumsFavorite, TracksFavorite]),
    TracksModule,
    AlbumsModule,
    ArtistsModule,
  ],
})
export class FavoritesModule {}

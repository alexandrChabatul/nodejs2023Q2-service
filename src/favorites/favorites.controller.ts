import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { UpdateFavoriteDto } from './dto/update-favorite.dto';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  getFavorites() {
    return this.favoritesService.getFavorites();
  }

  @Delete('track/:id')
  removeTrack(@Param('id') id: string) {
    return this.favoritesService.removeTrack(id);
  }

  @Post('album/:id')
  addAlbum(@Param('id') id: string) {
    return this.favoritesService.addAlbum(id);
  }

  @Delete('album/:id')
  removeAlbum(@Param('id') id: string) {
    return this.favoritesService.removeAlbum(id);
  }

  @Post('artist/:id')
  addArtist(@Param('id') id: string) {
    return this.favoritesService.addArtist(id);
  }

  @Delete('artist/:id')
  removeArtist(@Param('id') id: string) {
    return this.favoritesService.removeArtist(id);
  }
}

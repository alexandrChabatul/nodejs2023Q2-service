import { PartialType } from '@nestjs/mapped-types';
import { CreateAlbumDto } from './create-album.dto';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateAlbumDto extends PartialType(CreateAlbumDto) {
  @IsNumber()
  @IsNotEmpty()
  year: number;

  artistId: string | null;
}

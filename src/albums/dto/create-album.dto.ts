import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateAlbumDto {
  @IsNumber()
  @IsNotEmpty()
  year: number;

  @IsString()
  artistId: string;
}

import { v4 as uuidv4 } from 'uuid';

export class Album {
  id: string;
  year: number;
  artistId: string | null;

  constructor(year: number, artistId: string | null) {
    this.id = uuidv4();
    this.year = year;
    this.artistId = artistId;
  }
}

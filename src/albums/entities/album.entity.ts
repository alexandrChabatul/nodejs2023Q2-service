import { v4 as uuidv4 } from 'uuid';

export class Album {
  id: string;
  name: string;
  year: number;
  artistId: string | null;

  constructor(year: number, name: string, artistId: string | null) {
    this.id = uuidv4();
    this.year = year;
    this.name = name;
    this.artistId = artistId;
  }
}

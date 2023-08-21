import { Album } from '../albums/entities/album.entity';
import { Artist } from '../artists/entities/artist.entity';
import { Favorite } from '../favorites/entities/favorite.entity';
import { Track } from '../tracks/entities/track.entity';
import { User } from '../users/entities/user.entity';

export const users: User[] = [];
export const artists: Artist[] = [];
export const albums: Album[] = [];
export const tracks: Track[] = [];
export const favorites = new Favorite();

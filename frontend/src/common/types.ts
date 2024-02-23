//////////////////////////////////////INTERFACES

export interface Composer {
  category: string;
  name: string;
  birthname?: string;
  birth: string;
  birthPlace: string;
  countryFlag: string;
  death?: string;
  picture: string;
  pictureSource: string;
  musicalGenre?: string;
  bio: string;
  related: string[];
  hitSongs?: string[];
  famousSoundtracks?: string[];
}

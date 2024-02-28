import { Document, Model } from "mongoose";

export interface IUser extends Document {
  email: string;
  password: string;
  admin: boolean;
}

export interface IComposer extends Document {
  id: string;
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

export type UserDocument = IUser & Document;
export type UserModel = Model<UserDocument>;
export type ComposerDocument = IComposer & Document;
export type ComposerModel = Model<ComposerDocument>;

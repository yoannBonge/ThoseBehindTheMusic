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
  birthName?: string;
  birth: string;
  birthPlace: string;
  countryFlag: string;
  death?: string;
  picture: Buffer;
  pictureSource: string;
  musicalGenre?: string;
  bio: Buffer;
  related: string[];
  selectedWorks: string[];
}

export type UserDocument = IUser & Document;
export type UserModel = Model<UserDocument>;
export type ComposerDocument = IComposer & Document;
export type ComposerModel = Model<ComposerDocument>;

import mongoose, { Schema } from "mongoose";
import { ComposerDocument, ComposerModel } from "../common/types";
import uniqueValidator from "mongoose-unique-validator";

const composerSchema: Schema<ComposerDocument> = new Schema({
  id: { type: String, required: true, unique: true },
  category: { type: String, required: true },
  name: { type: String, required: true, unique: true },
  birthname: { type: String, required: false, unique: true },
  birth: { type: String, required: true },
  birthPlace: { type: String, required: true },
  countryFlag: { type: String, required: true },
  death: { type: String, required: false },
  picture: { type: String, required: true, unique: true },
  pictureSource: { type: String, required: true },
  musicalGenre: { type: String, required: false },
  bio: { type: String, required: true, unique: true },
  related: [{ type: String, required: true }],
  hitSongs: [{ type: String, required: false, unique: true }],
  famousSoundtracks: [{ type: String, required: false, unique: true }],
});

composerSchema.plugin(uniqueValidator);

const Composer: ComposerModel = mongoose.model<ComposerDocument>(
  "Composer",
  composerSchema
);

export default Composer;

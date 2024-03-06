import mongoose, { Schema } from "mongoose";
import { ComposerDocument, ComposerModel } from "../common/types";
import uniqueValidator from "mongoose-unique-validator";

const composerSchema: Schema<ComposerDocument> = new Schema({
  category: { type: String, required: true },
  name: { type: String, required: true, unique: true },
  birthName: { type: String, required: false, unique: true },
  birth: { type: String, required: true },
  birthPlace: { type: String, required: true },
  // countryFlag: { type: String, required: true },
  death: { type: String, required: false },
  picture: { type: Buffer, required: true, unique: true },
  pictureSource: { type: String, required: true },
  musicalGenre: { type: String, required: false },
  bio: { type: Buffer, required: true, unique: true },
  related: [{ type: String, required: true }],
  selectedWorks: [{ type: String, required: false, unique: true }],
});

composerSchema.plugin(uniqueValidator);

const Composer: ComposerModel = mongoose.model<ComposerDocument>(
  "Composer",
  composerSchema
);

export default Composer;

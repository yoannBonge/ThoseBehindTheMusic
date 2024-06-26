const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const composerSchema = new Schema({
  category: { type: String, required: true },
  name: { type: String, required: true },
  birthName: { type: String, required: false },
  birth: { type: String, required: false },
  birthPlace: { type: String, required: true },
  countryFlag: { type: String, required: true },
  death: { type: String, required: false },
  picture: { type: Buffer, required: true },
  pictureSource: { type: String, required: true },
  musicalGenre: { type: String, required: false },
  bio: { type: Buffer, required: false },
  related: [{ type: String, required: true }],
  selectedWorks: [{ type: String, required: false }],
});

composerSchema.plugin(uniqueValidator);

const Composer = mongoose.model("Composer", composerSchema);

module.exports = Composer;

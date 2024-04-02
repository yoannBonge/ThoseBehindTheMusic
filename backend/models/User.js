import mongoose, { Schema } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  admin: { type: Boolean, default: false, required: true },
});

userSchema.plugin(uniqueValidator);

const User = mongoose.model < UserDocument > ("User", userSchema);

export default User;

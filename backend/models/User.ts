import mongoose, { Schema } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";
import { UserDocument, UserModel } from "../common/types";

const userSchema: Schema<UserDocument> = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  admin: { type: Boolean, default: false, required: true },
});

userSchema.plugin(uniqueValidator);

const User: UserModel = mongoose.model<UserDocument>("User", userSchema);

export default User;

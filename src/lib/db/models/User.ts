import mongoose from "mongoose";

export interface userSchema {
  username: string;
  password: string;
  name: string;
  about?: string;
}

const userSchema = new mongoose.Schema<userSchema>({
  username: { type: String, required: true },
  password: { type: String, required: true },
  name: String,
  about: String,
});

const User =
  mongoose.models.User<userSchema> ||
  mongoose.model<userSchema>("User", userSchema);

export default User;

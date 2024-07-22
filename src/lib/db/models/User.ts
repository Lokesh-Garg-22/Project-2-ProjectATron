import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  name: String,
  about: String,
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;

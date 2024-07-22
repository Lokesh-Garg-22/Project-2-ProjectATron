import mongoose from "mongoose";

const followedUserSchema = new mongoose.Schema({
  userID: String,
  followedIDs: [String],
});

const FollowedUser =
  mongoose.models.FollowedUser ||
  mongoose.model("FollowedUser", followedUserSchema);

export default FollowedUser;

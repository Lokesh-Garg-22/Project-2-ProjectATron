import mongoose from "mongoose";

export interface followedUserSchema {
  userId: String;
  followedIDs: String[];
}

const followedUserSchema = new mongoose.Schema<followedUserSchema>({
  userId: String,
  followedIDs: [String],
});

const FollowedUser =
  mongoose.models.FollowedUser<followedUserSchema> ||
  mongoose.model<followedUserSchema>("FollowedUser", followedUserSchema);

export default FollowedUser;

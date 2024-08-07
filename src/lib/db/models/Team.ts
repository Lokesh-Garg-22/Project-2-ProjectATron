import mongoose from "mongoose";

export interface teamSchema {
  name: String;
  hostID: String;
  userIDs: String[];
}

const teamSchema = new mongoose.Schema<teamSchema>({
  name: String,
  hostID: String,
  userIDs: [String],
});

const Team =
  mongoose.models.Team<teamSchema> ||
  mongoose.model<teamSchema>("Team", teamSchema);

export default Team;

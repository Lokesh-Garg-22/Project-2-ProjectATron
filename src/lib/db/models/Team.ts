import mongoose from "mongoose";

const teamSchema = new mongoose.Schema({
  name: String,
  hostID: String,
  userIDs: [String],
});

const Team = mongoose.models.Team || mongoose.model("Team", teamSchema);

export default Team;

import mongoose from "mongoose";

const teamSchema = new mongoose.Schema({
  hostID: String,
  userIDs: [String],
});

const Team = mongoose.models.Team || mongoose.model("Team", teamSchema);

export default Team;

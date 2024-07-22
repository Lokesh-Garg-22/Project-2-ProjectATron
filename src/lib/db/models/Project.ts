import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  name: String,
  tags: [String],
  discription: String,
  url: { type: String, required: false },
  teamID: String,
  userID: String,
});

const Project =
  mongoose.models.Project || mongoose.model("Project", projectSchema);

export default Project;

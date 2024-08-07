import mongoose from "mongoose";

export interface projectSchema {
  name: String;
  tags: String[];
  discription?: String;
  url?: String;
  teamID?: String;
  userID: String;
}

const projectSchema = new mongoose.Schema<projectSchema>({
  name: String,
  tags: [String],
  discription: String,
  url: { type: String, required: false },
  teamID: String,
  userID: String,
});

const Project =
  mongoose.models.Project<projectSchema> ||
  mongoose.model<projectSchema>("Project", projectSchema);

export default Project;

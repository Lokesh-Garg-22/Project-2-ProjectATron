import mongoose from "mongoose";

export interface projectSchema {
  name: String;
  tags: String[];
  description?: String;
  url?: String;
  teamID?: String;
  userID: String;
  pinned?: Boolean;
}

const projectSchema = new mongoose.Schema<projectSchema>({
  name: String,
  tags: [String],
  description: String,
  url: { type: String, required: false },
  teamID: String,
  userID: String,
  pinned: { type: Boolean, default: false },
});

const Project =
  mongoose.models.Project<projectSchema> ||
  mongoose.model<projectSchema>("Project", projectSchema);

export default Project;

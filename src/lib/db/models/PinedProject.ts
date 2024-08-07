import mongoose from "mongoose";

export interface pinedProjectSchema {
  projectID: String;
  userID: String;
}

const pinedProjectSchema = new mongoose.Schema<pinedProjectSchema>({
  projectID: String,
  userID: String,
});

const PinedProject =
  mongoose.models.PinedProject<pinedProjectSchema> ||
  mongoose.model<pinedProjectSchema>("PinedProject", pinedProjectSchema);

export default PinedProject;

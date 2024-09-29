import mongoose from "mongoose";

export interface pinnedProjectSchema {
  userId: String;
  projectIDs: String[];
}

const pinnedProjectSchema = new mongoose.Schema<pinnedProjectSchema>({
  userId: String,
  projectIDs: [String],
});

const PinnedProject =
  mongoose.models.PinedProject<pinnedProjectSchema> ||
  mongoose.model<pinnedProjectSchema>("PinedProject", pinnedProjectSchema);

export default PinnedProject;

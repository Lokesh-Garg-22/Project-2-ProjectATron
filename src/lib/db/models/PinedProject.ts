import mongoose from "mongoose";

const pinedProjectSchema = new mongoose.Schema({
  projectID: String,
  userID: String,
});

const PinedProject =
  mongoose.models.PinedProject ||
  mongoose.model("PinedProject", pinedProjectSchema);

export default PinedProject;

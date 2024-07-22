import mongoose from "mongoose";

const connection: { isConnected: mongoose.ConnectionStates } = {
  isConnected: 0,
};

export default async function dbConnect() {
  if (connection.isConnected) {
    return;
  }
  const db = await mongoose.connect(process.env.MONGODB_URI || "");
  connection.isConnected = db.connections[0].readyState;
}

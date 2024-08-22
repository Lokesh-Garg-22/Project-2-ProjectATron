import { HydratedDocument } from "mongoose";
import { DataRequest } from "./interface";
import User, { userSchema } from "./models/User";

export default async function userAuthentication(req: DataRequest) {
  const { username, password }: { username: string; password: string } =
    req.data;
  if (!username) throw new Error("Username not Provided");
  if (!password) throw new Error("Password not Provided");
  const users: HydratedDocument<userSchema>[] = await User.find({
    username: username,
  });
  if (users.length == 0) throw new Error("User Not Found");
  if (users[0].password != password) throw new Error("Unauthorized");
  req.data.userId = users[0].id;
}

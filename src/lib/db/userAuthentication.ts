import { HydratedDocument } from "mongoose";
import { DateRequest } from "./interface";
import User, { userSchema } from "./models/User";

export default async function userAuthentication(req: DateRequest) {
  const { username, password }: { username: string; password: string } =
    req.data;
  const users: HydratedDocument<userSchema>[] = await User.find({
    username: username,
  });
  if (users.length == 0) throw new Error("User Not Found");
  if (users[0].password != password) throw new Error("Unauthorized");
  req.data.userId = users[0].id;
}

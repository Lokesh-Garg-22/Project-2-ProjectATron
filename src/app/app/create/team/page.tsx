import { hostURL } from "@/lib/data";
import CreateTeam from "@/Views/Teams/CreateTeam";

export default async function Page() {
  const userList = await fetch(`${hostURL}/api/user/list`, {
    method: "GET",
    headers: { "Content-type": "application/json" },
  }).then((res) => res.json());

  return <CreateTeam UserList={userList} />;
}

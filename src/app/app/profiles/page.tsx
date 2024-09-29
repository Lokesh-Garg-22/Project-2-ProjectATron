import { hostURL } from "@/lib/data";
import { ProfileInterface } from "@/lib/interface/profile/interface";
import { urlParse } from "@/lib/utils";
import Profiles from "@/Views/Profiles/Profiles";

export const dynamic = "force-dynamic";

export default async function Page(
  props: unknown & { searchParams: { search?: string } }
) {
  const profiles = (await fetch(
    `${urlParse(hostURL)}/api/user/list${
      props.searchParams.search ? `?search=${props.searchParams.search}` : ""
    }`,
    {
      method: "GET",
      cache: "no-cache",
    }
  )
    .then((res) => res.json())
    .then((res) => {
      if (res.users)
        return res.users.map((user: any) => {
          return { ...user, id: user._id };
        });
    })) as ProfileInterface[];

  return <Profiles profiles={profiles} search={props.searchParams.search} />;
}

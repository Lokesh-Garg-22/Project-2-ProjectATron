import FollowedProfiles from "@/Views/Profiles/FollowedProfiles";

export default function Page(
  props: unknown & { searchParams: { search?: string } }
) {
  return <FollowedProfiles searchParams={props.searchParams} />;
}

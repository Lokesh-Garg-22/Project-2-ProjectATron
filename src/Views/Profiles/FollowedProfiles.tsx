import MainContainer from "@/components/global/MainContainer";
import ListRenderer from "@/components/Wrapper/ListRenderer";
import { ProfileInterface } from "@/components/Profile/interface";
import ProfileCard from "@/components/Profile/ProfileCard";
import SearchBar from "@/components/search/SearchBar";

export default function FollowedProfiles() {
  const profiles: Array<ProfileInterface> = [
    { name: "Profile 1", about: "About You", projects: 1, id: "awd234" },
    { name: "Profile 2", about: "About You", projects: 1, id: "a46tdi" },
    { name: "Profile 3", about: "About You", projects: 1, id: "aw456d" },
    { name: "Profile 4", about: "About You", projects: 1, id: "awd5yh" },
    { name: "Profile 5", about: "About You", projects: 1, id: "awd223" },
  ];

  return (
    <MainContainer className="items-center">
      <SearchBar />
      <ListRenderer
        list={profiles}
        ItemComponent={(data, id) => <ProfileCard key={id} profile={data} />}
      />
    </MainContainer>
  );
}

import MainContainer from "@/components/global/MainContainer";
import ListRenderer from "@/components/Wrapper/ListRenderer";
import { ProfileInterface } from "@/lib/interface/profile/interface";
import ProfileCard from "@/components/Profile/ProfileCard";
import SearchBar from "@/components/search/SearchBar";

export default function Profiles({
  profiles,
}: {
  profiles: ProfileInterface[];
}) {
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

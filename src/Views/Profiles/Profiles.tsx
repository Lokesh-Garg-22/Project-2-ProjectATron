import MainContainer from "@/components/global/MainContainer";
import ListRenderer from "@/components/Wrapper/ListRenderer";
import { ProfileInterface } from "@/lib/interface/profile/interface";
import ProfileCard from "@/components/Profile/ProfileCard";
import SearchBar from "@/components/search/SearchBar";

export default function Profiles({
  profiles,
  search,
}: {
  profiles: ProfileInterface[];
  search?: string;
}) {
  return (
    <MainContainer className="items-center">
      <SearchBar defaultValue={search} />
      <ListRenderer
        list={profiles}
        ItemComponent={(data, id) => <ProfileCard key={id} profile={data} />}
        placeholder="No Profile Found!!"
      />
    </MainContainer>
  );
}

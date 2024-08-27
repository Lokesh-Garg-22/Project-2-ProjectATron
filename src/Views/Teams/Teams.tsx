"use client";

import MainContainer from "@/components/global/MainContainer";
import ListRenderer from "@/components/Wrapper/ListRenderer";
import SearchBar from "@/components/search/SearchBar";
import { TeamInterface } from "@/lib/interface/team/interface";
import TeamCard from "@/components/Team/TeamCard";
import { hostURL } from "@/lib/data";
import { urlParse } from "@/lib/utils";
import { HydratedDocument } from "mongoose";
import { teamSchema } from "@/lib/db/models/Team";
import { useEffect, useState } from "react";

export default function Teams(
  props: unknown & { searchParams: { search?: string } }
) {
  const [teams, setTeams] = useState<TeamInterface[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      if (window) {
        setLoading(true);
        setTeams([
          ...((await fetch(`/api/teams`, {
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify({
              username: window.localStorage.getItem("username"),
              password: window.localStorage.getItem("password"),
              search: props.searchParams.search,
            }),
          })
            .then((res) => res.json())
            .then((res: HydratedDocument<teamSchema>[]) =>
              res.map((ele) => {
                return { ...ele, id: ele._id };
              })
            )) as TeamInterface[]),
        ]);
        setLoading(false);
      }
    })();
  }, []);

  return (
    <MainContainer className="my-4 items-center space-y-4">
      <SearchBar />
      <ListRenderer
        list={teams}
        ItemComponent={(data, id) => <TeamCard team={data} key={id} />}
        placeholder="No Team Found!!"
        loading={loading}
      />
    </MainContainer>
  );
}

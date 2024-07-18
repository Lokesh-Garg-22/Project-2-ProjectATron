import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function SideNav() {
  const list: Array<{
    title: string;
    list: Array<{ text: string; url: string }>;
  }> = [
    {
      title: "Project",
      list: [
        { text: "Projects", url: "app/project" },
        { text: "Create Project", url: "app/create/project" },
      ],
    },
    {
      title: "Team",
      list: [
        { text: "Teams", url: "app/teams" },
        { text: "Create Team", url: "app/create/team" },
      ],
    },
  ];

  return (
    <>
      <div className="w-48 ml-1 shrink-0" />
      <section
        id="SideNav"
        className="fixed w-48 h-[calc(100vh-4.75rem)] my-1 ml-1 border-2 rounded-lg bg-background"
      >
        <div className="h-full flex flex-col py-2 bg-muted/50">
          {list.map((ele, id) => (
            <div key={id} className="flex flex-col [&:not(:last-child)]:mb-3">
              {ele.list.map((ele, id) => (
                <Button
                  key={id}
                  asChild
                  variant={"link"}
                  className="justify-start rounded-none hover:no-underline hover:bg-slate-50/10"
                >
                  <Link href={ele.url}>{ele.text}</Link>
                </Button>
              ))}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

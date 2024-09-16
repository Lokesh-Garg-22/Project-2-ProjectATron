import Projects from "@/Views/Projects/Projects";

export default function Page(props: {
  searchParams: { search?: string };
  params: { id: string };
}) {
  return (
    <Projects search={props.searchParams.search} userId={props.params.id} />
  );
}

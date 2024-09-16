import Projects from "@/Views/Projects/Projects";

export default function Page(props: { searchParams: { search?: string } }) {
  return <Projects search={props.searchParams.search} />;
}

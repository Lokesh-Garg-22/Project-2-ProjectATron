import Projects from "@/Views/Projects/Projects";

export default function Page(
  props: unknown & { searchParams: { search?: string } }
) {
  console.log(props);
  return <Projects {...props} />;
}

import Projects from "@/Views/Projects/Projects";

export default function Page(
  props: unknown & { searchParams: { search?: string } }
) {
  return <Projects {...props} />;
}

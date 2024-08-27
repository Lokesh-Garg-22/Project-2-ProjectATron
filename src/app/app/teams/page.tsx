import Teams from "@/Views/Teams/Teams";

export default function Page(
  props: unknown & { searchParams: { search?: string } }
) {
  return <Teams {...props} />;
}

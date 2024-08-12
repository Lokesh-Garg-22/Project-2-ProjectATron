export default async function GetData(req: Request & { data: any }) {
  req.data = await req.json();
}

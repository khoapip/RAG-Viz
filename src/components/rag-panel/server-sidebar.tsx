import { getDocuments } from "@/server/queries";
import { Sidebar } from "./sidebar";

export const dynamic = "force-dynamic";

export default async function ServerSideBar() {
  const files = await getDocuments();

  return <Sidebar files={files} />;
}

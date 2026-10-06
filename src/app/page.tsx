import { HomePage } from "@/components/home-page";
import { getHomeContent } from "@/lib/content-repository";
export default async function Page() {
  const content = await getHomeContent();
  return <HomePage content={content} />;
}

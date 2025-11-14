import { SliceZone } from "@prismicio/react";
import { createClient } from "@/prismicio";
import { components } from "@/slices";

export default async function SupportPage2() {
  const client = createClient();
  const page = await client.getSingle("support2");

  return (
    <main className="min-h-screen">
      <SliceZone slices={page.data.slices} components={components} />
    </main>
  );
}

// app/page.tsx
import { SliceZone } from "@prismicio/react";
import { createClient } from "@/prismicio";
import { components } from "@/slices";

export default async function Page() {
  const client = createClient();
  const page = await client.getSingle("homepage");

  

  return (
    <main className="min-h-screen">
      <SliceZone slices={page.data.slices} components={components} />
    </main>
  );
}

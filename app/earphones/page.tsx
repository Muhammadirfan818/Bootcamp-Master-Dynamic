// app/earphones/page.tsx
import { SliceZone } from "@prismicio/react";
import { createClient } from "@/prismicio";
import { components } from "@/slices"; 

export default async function Earphones() {
  const client = createClient();
  const page = await client.getSingle("earphones");

  return (

      <main className="min-h-screen">
        <SliceZone slices={page.data.slices} components={components} />
      </main>
  );
}

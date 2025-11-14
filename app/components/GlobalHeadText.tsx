"use client";

import { usePathname } from "next/navigation";
import { PrismicRichText } from "@prismicio/react";

export default function GlobalHeadtext({ field }: { field: any }) {
  const pathname = usePathname();

  // Pages where this component should NOT render
  const excludedPages = ["/checkout", "/support", "/support2"];
  if (!field || excludedPages.includes(pathname)) return null;

  return (
    <div className="text-center bg-black py-3 text-white text-sm">
      <PrismicRichText
        field={field}
        components={{
          heading1: ({ children }) => <>{children}</>,
          heading2: ({ children }) => <>{children}</>,
          heading3: ({ children }) => <>{children}</>,
          heading4: ({ children }) => <>{children}</>,
          heading5: ({ children }) => <>{children}</>,
          heading6: ({ children }) => <>{children}</>,
        }}
      />
    </div>
  );
}

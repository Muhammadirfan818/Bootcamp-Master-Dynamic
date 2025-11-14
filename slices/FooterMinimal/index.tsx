"use client";

import { FC } from "react";

export type FooterMinimalProps = {
  slice: any;
};

const SimpleRichText: FC<{ field: any[] }> = ({ field }) => {
  if (!Array.isArray(field)) return null;

  return (
    <>
      {field.map((block, index) => {
        if (block.type === "paragraph" && block.text) {
          return <p key={index}>{block.text}</p>;
        }
        return null;
      })}
    </>
  );
};

const FooterMinimal: FC<FooterMinimalProps> = ({ slice }) => {
  const primary = slice.primary || {};
  const links = Array.isArray(primary.links) ? primary.links : [];

  // Helper to get link URL (web link or document)
  const getLinkUrl = (link: any): string => {
    if (!link) return "#";
    if (link.url) return link.url; // web link
    if (link.type && link.uid) return `/${link.uid}`; // document link
    return "#";
  };

  // Helper to get link text
  const getLinkText = (link: any): string => {
    if (!link) return "Link";
    // Try multiple possible keys
    return link.label || link.text || link.link_text || "Link";
  };

  return (
    <footer
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="bg-black text-gray-300 py-8"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center gap-4">
        {/* Links */}
        <div className="flex flex-wrap gap-x-6 gap-y-2 justify-center">
          {links.map((link: any, index: number) => {
            const url = getLinkUrl(link);
            const text = getLinkText(link);
            return (
              <a
                key={index}
                href={url}
                className="text-gray-300 hover:text-white text-sm transition-colors"
              >
                {text}
              </a>
            );
          })}
        </div>

        {/* Note */}
        {primary.note && (
          <div className="mt-4 text-center text-gray-400 text-sm">
            <SimpleRichText field={primary.note} />
          </div>
        )}
      </div>
    </footer>
  );
};

export default FooterMinimal;

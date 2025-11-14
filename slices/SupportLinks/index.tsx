"use client";

import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps, PrismicRichText } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";

/**
 * Props for `SupportLinks`.
 */
export type SupportLinksProps = SliceComponentProps<Content.SupportLinksSlice>;

/**
 * Component for "SupportLinks" Slices.
 */
const SupportLinks: FC<SupportLinksProps> = ({ slice }) => {
  const links = slice.primary.links || [];

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="px-6 sm:px-10 lg:px-16 py-12 bg-white grid grid-cols-1 lg:grid-cols-4 gap-8"
    >
      {/* Headline (Left Column) */}
      {slice.primary.headline && (
        <div className="lg:col-span-1 mb-6 lg:mb-0">
          <PrismicRichText
            field={slice.primary.headline}
            components={{
              heading1: ({ children }) => (
                <h1 className="text-3xl md:text-4xl font-bold">{children}</h1>
              ),
              heading2: ({ children }) => (
                <h2 className="text-2xl md:text-3xl font-semibold">{children}</h2>
              ),
              paragraph: ({ children }) => (
                <p className="text-lg text-gray-700">{children}</p>
              ),
            }}
          />
        </div>
      )}

      {/* Links (Right Column) */}
      <div className="lg:col-span-3 flex flex-col">
        {links.map((item: any, index: number) => (
          <div
            key={index}
            className="flex items-center py-5 border-b border-gray-200"
          >
            {/* Icon */}
            {item.icon?.url && (
              <PrismicNextImage
                field={item.icon}
                alt={item.icon.alt || "Icon"}
                className="w-6 h-6 mr-4 object-contain flex-shrink-0"
                fallbackAlt=""
              />
            )}

            {/* Rich Text */}
            {item.text && (
              <PrismicRichText
                field={item.text}
                components={{
                  paragraph: ({ children }) => (
                    <p className="text-lg text-gray-800">{children}</p>
                  ),
                }}
              />
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default SupportLinks;

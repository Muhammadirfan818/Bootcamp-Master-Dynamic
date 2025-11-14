"use client";

import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps, PrismicRichText } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";

/**
 * Props for `FeaturedColumns`.
 */
export type FeaturedColumnsProps =
  SliceComponentProps<Content.FeaturedColumnsSlice>;

/**
 * Component for "FeaturedColumns" Slices.
 *
 * This component has been updated to match the Figma design:
 * - Dark background with white text.
 * - Left-aligned headline.
 * - Full-width column images.
 * - Left-aligned column text.
 */
const FeaturedColumns: FC<FeaturedColumnsProps> = ({ slice }) => {
  const items = slice.primary.items || [];

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="px-6 sm:px-10 lg:px-16 py-12 bg-black text-white"
    >
      {/* Headline */}
      {slice.primary.headline && (
        <div className="text-4xl text-left mb-10 ">
          <PrismicRichText
            field={slice.primary.headline}
            components={{
              heading1: ({ children }) => (
                // **THE FIX:** Made the title even bigger
                <h1 className="text-6xl md:text-7xl font-bold text-white">
                  {children}
                </h1>
              ),
              paragraph: ({ children }) => (
                <p className="text-lg text-gray-300 mt-4">{children}</p>
              ),
            }}
          />
        </div>
      )}

      {/* Columns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {items.map((item: any, index: number) => (
          <div key={index}>
            {/* Image */}
            {item.image?.url && (
              <PrismicNextImage
                field={item.image}
                alt={item.image.alt || "Feature Image"}
                className="w-full aspect-video object-cover mb-6"
                fallbackAlt=""
              />
            )}

            {/* Title */}
            {item.title && (
              <h3 className="text-sm font-semibold text-white mb-2 uppercase tracking-wider">
                {item.title}
              </h3>
            )}

            {/* Description */}
            {item.description && (
              <PrismicRichText
                field={item.description}
                components={{
                  paragraph: ({ children }) => (
                    <p className="text-white text-base">{children}</p>
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

export default FeaturedColumns;
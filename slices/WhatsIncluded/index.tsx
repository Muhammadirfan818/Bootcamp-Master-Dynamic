"use client";

import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps, PrismicRichText } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";

/**
 * Props for `WhatsIncluded`.
 */
export type WhatsIncludedProps =
  SliceComponentProps<Content.WhatsIncludedSlice>;

/**
 * Component for "WhatsIncluded" Slices.
 *
 * This component has been updated to use a two-column layout
 * matching the Figma design.
 */
const WhatsIncluded: FC<WhatsIncludedProps> = ({ slice }) => {
  const items = slice.primary.items || [];

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      // **THE LAYOUT FIX:**
      // 1. Use `grid`
      // 2. Default to 1 column on mobile
      // 3. Use 4 columns on desktop (lg:)
      // 4. Add a gap
      className="px-6 sm:px-10 lg:px-16 py-12 grid grid-cols-1 lg:grid-cols-4 gap-8"
    >
      {/* Headline (Left Column) */}
      {slice.primary.headline && (
        // Title takes 1 column on desktop
        <div className="lg:col-span-1">
          <PrismicRichText
            field={slice.primary.headline}
            components={{
              // Removed `text-center`
              heading1: ({ children }) => (
                <h1 className="text-3xl md:text-4xl font-bold">{children}</h1>
              ),
              heading2: ({ children }) => (
                <h2 className="text-2xl md:text-3xl font-semibold">{children}</h2>
              ),
            }}
          />
        </div>
      )}

      {/* Items (Right Column) */}
      {/* Items take 3 columns on desktop */}
      <div className="lg:col-span-3">
        {/* This is the nested grid for the items themselves */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-12">
          {items.map((item, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              {item.icon?.url && (
                <PrismicNextImage
                  field={item.icon}
                  // **THE SIZING FIX:**
                  // Use a consistent height and `w-auto` to respect aspect ratio
                  className="h-20 w-auto object-contain mb-4"
                  fallbackAlt=""
                />
              )}
              {item.label && (
                // Adjusted text size to match Figma
                <p className="text-base font-medium text-gray-800">
                  {item.label}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatsIncluded;
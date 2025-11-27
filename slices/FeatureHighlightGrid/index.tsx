"use client";

import { FC } from "react";
import { Content } from "@prismicio/client";
import {
  SliceComponentProps,
  PrismicRichText,
  JSXMapSerializer,
} from "@prismicio/react";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";

/**
 * Props for `FeatureHighlightGrid`.
 */
export type FeatureHighlightGridProps =
  SliceComponentProps<Content.FeatureHighlightGridSlice>;

/**
 * Custom serializer to control heading levels and paragraph styles for the main content.
 */
const richTextComponents: JSXMapSerializer = {
  // Main Title (The Finest Sound and Craftsmanship)
  heading1: ({ children }) => (
    // UPDATED: Responsive font size
    <h2 className="text-3xl md:text-5xl font-semibold leading-tight">{children}</h2>
  ),
  heading2: ({ children }) => (
    <h2 className="text-3xl md:text-5xl font-semibold leading-tight">{children}</h2>
  ),
  // Introduction text (Introduce yourself to a world...)
  paragraph: ({ children }) => (
    // UPDATED: Responsive font size
    <p className="text-white text-base md:text-lg">{children}</p>
  ),
};

/**
 * Custom serializer for the bottom description.
 */
const descriptionComponents: JSXMapSerializer = {
  paragraph: ({ children }) => <p className="text-white text-base">{children}</p>,
};

const FeatureHighlightGrid: FC<FeatureHighlightGridProps> = ({ slice }) => {
  // Using bracket notation for all primary fields to avoid TS errors
  const features = slice.primary?.['features'] || [];
  const title = slice.primary?.['title'];
  const introduction = slice.primary?.['introduction'];
  const description = slice.primary?.['description'];
  const cta = slice.primary?.['cta'];

  return (
    <section
      // UPDATED: Responsive vertical padding
      className="w-full bg-[#212121] text-white py-12 md:py-16 px-6 md:px-12"
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <div className="max-w-screen-xl mx-auto">
        {/* Top Section: Title and Introduction */}
        {/* UPDATED: Reduced bottom margin */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Main Title */}
          <div className="md:col-span-1">
            {title && (
              <PrismicRichText
                field={title}
                components={richTextComponents}
              />
            )}
          </div>

          {/* Introduction */}
          <div className="md:col-span-1 flex items-start justify-end">
            {introduction && (
              <div className="max-w-md"> {/* Constrain width for intro text */}
                <PrismicRichText
                  field={introduction}
                  components={richTextComponents}
                />
              </div>
            )}
          </div>
        </div>

        {/* Feature grid */}
        {/* UPDATED: Reduced bottom margin */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-12">
          {features.map((item: any, index: number) => (
            <div
              key={index}
              // UPDATED: Replaced fixed height with aspect-video for responsive height
              className="relative w-full aspect-video overflow-hidden"
            >
              {/* Image */}
              {item.image && (
                <PrismicNextImage
                  field={item.image}
                  alt=""
                  className="object-cover w-full h-full absolute inset-0 z-0"
                  fallbackAlt=""
                />
              )}
              {/* Overlay to ensure text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent z-10"></div>

              {/* Content Overlay */}
              {/* UPDATED: Responsive padding */}
              <div className="absolute bottom-4 right-4 md:bottom-8 md:right-8 z-20">
                {/* Title (e.g., SOUND, MATERIALS, DESIGN) */}
                {item.title && (
                  // UPDATED: Responsive font size
                  <h3 className="text-xl text-left md:text-2xl font-semibold uppercase text-white tracking-wide [text-shadow:_0_1px_3px_rgb(0_0_0_/_0.7)]">
                    {item.title}
                  </h3>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Section: Description and CTA */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center py-4">
          {/* Description */}
          {description && (
            <div className="max-w-md mb-6 md:mb-0">
              <PrismicRichText
                field={description}
                components={descriptionComponents}
              />
            </div>
          )}

          {/* CTA Link */}
          {cta && (
            <PrismicNextLink
              field={cta}
              // UPDATED: Made button responsive and styled
              className="inline-block bg-white text-gray-900 px-7 py-3  text-sm font-semibold hover:bg-gray-200 transition"
            >
              {cta.text || "Learn More"}
            </PrismicNextLink>
          )}
        </div>
      </div>
    </section>
  );
};

export default FeatureHighlightGrid;
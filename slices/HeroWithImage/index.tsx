"use client";

import { FC } from "react";
import { Content } from "@prismicio/client";
import {
  PrismicRichText,
  SliceComponentProps,
} from "@prismicio/react";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";

/**
 * Props for `HeroWithImage`.
 */
export type HeroWithImageProps =
  SliceComponentProps<Content.HeroWithImageSlice>;

/**
 * Component for "HeroWithImage" Slice.
 */
const HeroWithImage: FC<HeroWithImageProps> = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="relative w-full flex items-center justify-center text-center min-h-screen px-6 my-5"
    >
      {/* Background Image */}
      {slice.primary.background_image && (
        <div className="absolute inset-0 z-0">
          <PrismicNextImage
            field={slice.primary.background_image}
            alt=""
            loading="eager"
            className="object-cover w-full h-full"
            fallbackAlt=""
          />
          {/* Dark overlay */}
          <div className="absolute inset-0 z-10 bg-black/40"></div>
        </div>
      )}

      {/* Content Layer */}
      <div className="relative z-20 max-w-2xl">
        {/* Label (fixed: changed <p> to <div> to prevent nested <p> tags) */}
        {slice.primary.label && (
          <div className="text-md md:text-base mb-3 font-family-inter font-semibold text-white uppercase tracking-wider  decoration-white decoration-2 underline-offset-4">
            <PrismicRichText field={slice.primary.label} />
          </div>
        )}

        {/* Heading */}
        {slice.primary.heading && (
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight text-white">
            <PrismicRichText
              field={slice.primary.heading}
              components={{
                heading1: ({ children }) => <>{children}</>,
                heading2: ({ children }) => <>{children}</>,
              }}
            />
          </h1>
        )}

        {/* Button */}
        {slice.primary.button && (
          <PrismicNextLink
            field={slice.primary.button}
            className="inline-block bg-white hover:bg-gray-200 text-black px-7 py-3 text-sm  font-semibold transition"
          >
            {slice.primary.button.text || ""}
          </PrismicNextLink>
        )}
      </div>
    </section>
  );
};

export default HeroWithImage;

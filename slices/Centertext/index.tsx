"use client";

import { FC } from "react";
import { Content, isFilled } from "@prismicio/client";
import { SliceComponentProps, PrismicRichText } from "@prismicio/react";
import { PrismicNextLink } from "@prismicio/next";

/**
 * Props for `Centertext`.
 */
export type CentertextProps = SliceComponentProps<Content.CentertextSlice>;

/**
 * Component for "Centertext" Slices.
 */
const Centertext: FC<CentertextProps> = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="text-center px-6 py-12 bg-gray-100"
    >
      {/* Centered Text */}
      {slice.primary.centertext && (
        <PrismicRichText
          field={slice.primary.centertext}
          components={{
            paragraph: ({ children }) => (
              <p className="text-black font-bold text-xl md:text-2xl">{children}</p>
            ),
            heading1: ({ children }) => (
              <h1 className="text-black font-bold text-4xl md:text-6xl">{children}</h1>
            ),
            heading2: ({ children }) => (
              <h2 className="text-black font-bold text-2xl md:text-4xl">{children}</h2>
            ),
          }}
        />
      )}

      {/* Button */}
      {isFilled.link(slice.primary.button) && (
        <div className="mt-6">
          <PrismicNextLink
            field={slice.primary.button}
            className="inline-block px-6 py-3 bg-black text-white rounded hover:bg-blue-700 transition"
          />
        </div>
      )}
    </section>
  );
};

export default Centertext;

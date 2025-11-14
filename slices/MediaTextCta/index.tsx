"use client";

import { FC } from "react";
import { Content } from "@prismicio/client";
import {
  PrismicRichText,
  SliceComponentProps,
} from "@prismicio/react";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";

/**
 * Props for `MediaTextCta`.
 */
export type MediaTextCtaProps = SliceComponentProps<Content.MediaTextCtaSlice>;

/**
 * Component for "MediaTextCta" Slice.
 */
const MediaTextCta: FC<MediaTextCtaProps> = ({ slice }) => {
  const media = slice.primary?.["media"];
  const heading = slice.primary?.["heading"];
  const description = slice.primary?.["description"];
  const cta_link = slice.primary?.["cta_link"];

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      // UPDATED: Added light gray background and vertical padding for the section
      className="w-full bg-gray-100 py-16"
    >
      {/* UPDATED: Outer container to center the content and apply horizontal padding */}
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Inner flex container with rounded corners and shadow */}
        {/* UPDATED: Added rounded-lg and shadow-lg here */}
        <div className="flex flex-col md:flex-row items-stretch bg-white rounded-lg shadow-lg overflow-hidden">
          
          {/* Media / Image */}
          {media && (
            <div className="w-full md:w-1/2">
              <PrismicNextImage
                field={media}
                alt=""
                loading="eager"
                // UPDATED: Adjusted height to h-[500px] and removed min-h
                className="object-cover w-full h-[500px] md:h-auto"
                fallbackAlt=""
              />
            </div>
          )}

          {/* Text Content */}
          <div className="w-full md:w-1/2 flex flex-col justify-center p-12 md:p-16">
            
            {/* Heading */}
            {heading && (
              // UPDATED: Reduced text size
              <h2 className="text-3xl lg:text-4xl font-semibold mb-4 text-gray-900">
                <PrismicRichText
                  field={heading}
                  components={{
                    heading1: ({ children }) => <>{children}</>,
                    heading2: ({ children }) => <>{children}</>,
                  }}
                />
              </h2>
            )}

            {/* Description */}
            {description && (
              // UPDATED: Reduced text size
              <div className="text-base text-gray-600 mb-8 leading-relaxed">
                <PrismicRichText
                  field={description}
                  components={{
                    paragraph: ({ children }) => <p>{children}</p>,
                  }}
                />
              </div>
            )}

            {/* CTA Link */}
            {cta_link && (
              <div>
                <PrismicNextLink
                  field={cta_link}
                  className="inline-flex items-center gap-2 bg-gray-700 hover:bg-gray-800 text-white px-8 py-3 rounded font-semibold transition"
                >
                  {cta_link.text || "Learn More"}
                  <span aria-hidden="true">&#x29C9;</span>
                </PrismicNextLink>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MediaTextCta;
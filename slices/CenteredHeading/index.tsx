"use client";

import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps, PrismicRichText } from "@prismicio/react";

/**
 * Props for `CenteredHeading`.
 */
export type CenteredHeadingProps =
  SliceComponentProps<Content.CenteredHeadingSlice>;

/**
 * Component for "CenteredHeading" Slice.
 */
const CenteredHeading: FC<CenteredHeadingProps> = ({ slice }) => {
  const title = slice.primary?.title;

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="w-full py-16 px-6 md:px-12 bg-white text-center"
    >
      {title && (
        <div className="max-w-3xl mx-auto">
          <PrismicRichText
            field={title}
            components={{
              heading1: ({ children }) => (
                <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 leading-tight">
                  {children}
                </h2>
              ),
              heading2: ({ children }) => (
                <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 leading-tight">
                  {children}
                </h2>
              ),
              paragraph: ({ children }) => (
                <p className="text-xl text-gray-700 leading-relaxed">{children}</p>
              ),
            }}
          />
        </div>
      )}
    </section>
  );
};

export default CenteredHeading;

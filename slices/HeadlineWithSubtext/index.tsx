"use client";

import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps, PrismicRichText } from "@prismicio/react";

/**
 * Props for `HeadlineWithSubtext`.
 */
export type HeadlineWithSubtextProps =
  SliceComponentProps<Content.HeadlineWithSubtextSlice>;

/**
 * Component for "HeadlineWithSubtext" Slices.
 */
const HeadlineWithSubtext: FC<HeadlineWithSubtextProps> = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="py-12 md:py-16" // Removed text-center, adjusted padding
    >
      {/* Container to create the flex layout */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:items-center gap-6 md:gap-10">
        
        {/* Left Column (Title) */}
        {slice.primary.title && (
          <div className="md:w-1/3"> {/* Column wrapper */}
            {/* Style wrapper: Updated font size, removed margin */}
            <div className="text-4xl lg:text-5xl font-bold text-gray-900">
              <PrismicRichText
                field={slice.primary.title}
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
          </div>
        )}

        {/* Right Column (Description) */}
        {slice.primary.description && (
          <div className="md:w-2/3"> {/* Column wrapper */}
            {/* Style wrapper: Updated font size, removed centering and max-width */}
            <div className="text-base lg:text-lg text-gray-600">
              <PrismicRichText
                field={slice.primary.description}
                components={{
                  // These components just strip heading tags,
                  // the text will render in a default <p> tag
                  heading1: ({ children }) => <>{children}</>,
                  heading2: ({ children }) => <>{children}</>,
                  heading3: ({ children }) => <>{children}</>,
                  heading4: ({ children }) => <>{children}</>,
                  heading5: ({ children }) => <>{children}</>,
                  heading6: ({ children }) => <>{children}</>,
                }}
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default HeadlineWithSubtext;
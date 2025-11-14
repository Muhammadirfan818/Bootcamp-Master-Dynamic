"use client";

import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";

/**
 * Props for `HorizontalTextFeatures`.
 */
export type HorizontalTextFeaturesProps =
  SliceComponentProps<Content.HorizontalTextFeaturesSlice>;

/**
 * Component for "HorizontalTextFeatures" Slice.
 */
const HorizontalTextFeatures: FC<HorizontalTextFeaturesProps> = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="py-16 px-6 md:px-12 bg-gray-50 text-gray-900"
    >
      <div className="max-w-7xl mx-auto">
        {/* --- Horizontal Features --- */}
        {Array.isArray(slice.primary.features) && slice.primary.features.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-3">
            {slice.primary.features.map((item, i) => (
              <div
                key={i}
                className="flex flex-col items-start md:items-center text-left md:text-center p-4"
              >
                {/* --- Title --- */}
                {item.title && (
                  <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                )}

                {/* --- Description --- */}
                {item.description && (
                  <div className="text-sm text-gray-600 leading-relaxed">
                    <PrismicRichText
                      field={item.description}
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
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No features available.</p>
        )}
      </div>
    </section>
  );
};

export default HorizontalTextFeatures;

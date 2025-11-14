import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps, PrismicRichText } from "@prismicio/react";

/**
 * Props for `FactHighlight`.
 */
export type FactHighlightProps =
  SliceComponentProps<Content.FactHighlightSlice>;

/**
 * Component for "FactHighlight" Slices.
 */
const FactHighlight: FC<FactHighlightProps> = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="w-full bg-white text-center py-16 px-4 md:px-8 lg:px-16"
    >
      <div className="max-w-4xl mx-auto flex flex-col items-center space-y-6">
        {/* Top Row: Headline + Value + Unit */}
        <div className="flex flex-col md:flex-row items-center font-medium justify-center space-y-2 md:space-y-0 md:space-x-3">
          {/* Headline (left side of value on desktop) */}
          <PrismicRichText
            field={slice.primary.headline}
            components={{
              heading2: ({ children }) => (
                <h2 className="text-lg md:text-xl font-medium text-gray-700">
                  {children}
                </h2>
              ),
            }}
          />

          {/* Value + Unit */}
          <div className="flex items-baseline space-x-2">
            <span className="text-5xl md:text-6xl font-semibold text-gray-900">
              {slice.primary.highlighted_value}
            </span>
            <span className="text-2xl md:text-3xl font-medium text-gray-900">
              {slice.primary.highlighted_unit}
            </span>
          </div>
        </div>

        {/* Context Text */}
        <PrismicRichText
          field={slice.primary.context_text}
          components={{
            paragraph: ({ children }) => (
              <p className="text-lg md:text-xl text-gray-800 font-medium">
                {children}
              </p>
            ),
          }}
        />

        {/* Description */}
        <PrismicRichText
          field={slice.primary.description}
          components={{
            paragraph: ({ children }) => (
              <p className="text-sm md:text-base text-gray-600 leading-relaxed max-w-2xl mx-auto">
                {children}
              </p>
            ),
          }}
        />
      </div>
    </section>
  );
};

export default FactHighlight;

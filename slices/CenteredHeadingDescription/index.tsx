import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps, PrismicRichText } from "@prismicio/react";

/**
 * Props for `CenteredHeadingDescription`.
 */
export type CenteredHeadingDescriptionProps =
  SliceComponentProps<Content.CenteredHeadingDescriptionSlice>;

/**
 * Component for "CenteredHeadingDescription" Slices.
 */
const CenteredHeadingDescription: FC<CenteredHeadingDescriptionProps> = ({
  slice,
}) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="px-6 sm:px-10 lg:px-16 py-12"
    >
      {/* Render the title */}
      {slice.primary.title && (
        <PrismicRichText
          field={slice.primary.title}
          components={{
            heading1: ({ children }) => (
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-center">
                {children}
              </h1>
            ),
            heading2: ({ children }) => (
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-6 text-center">
                {children}
              </h2>
            ),
          }}
        />
      )}

      {/* Render the description justified and centered */}
      {slice.primary.description && (
        <div className="mx-auto max-w-3xl">
          <PrismicRichText
            field={slice.primary.description}
            components={{
              paragraph: ({ children }) => (
                <p className="text-base sm:text-lg md:text-xl text-gray-700 text-justify">
                  {children}
                </p>
              ),
            }}
          />
        </div>
      )}
    </section>
  );
};

export default CenteredHeadingDescription;

import { FC, Fragment } from "react";
import { SliceComponentProps, PrismicRichText } from "@prismicio/react";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { Content } from "@prismicio/client";

/**
 * Props for `FeatureSplitGrid`.
 */
export type FeatureSplitGridProps =
  SliceComponentProps<Content.FeatureSplitGridSlice>;

/**
 * Component for "FeatureSplitGrid" Slices.
 */
const FeatureSplitGrid: FC<FeatureSplitGridProps> = ({ slice }) => {
  const items = slice.primary?.items || slice.items || [];

  if (!items.length) {
    return (
      <section className="py-16 text-center text-gray-500">
        No features found in Prismic.
      </section>
    );
  }

  return (
    <section
      className="w-full bg-white text-black py-16 md:py-20"
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <div className="grid grid-cols-1 md:grid-cols-2">
        {items.map((item: any, index: number) => {
          const isReversed = index % 2 !== 0;
          const isLastItem = index === items.length - 1;

          /** --- MEDIA CELL --- */
          const mediaCell = (
            <div
              key={`${index}-media`}
              className="relative aspect-square overflow-hidden bg-gray-50 flex justify-center items-center p-6 md:p-10"
            >
              {item.media?.url && (
                <div className="w-4/5 h-4/5">
                  <PrismicNextImage
                    field={item.media}
                    alt={item.media?.alt || ""}
                    className="w-full h-full object-contain"
                    fallbackAlt=""
                  />
                </div>
              )}
            </div>
          );

          /** --- TEXT CELL --- */
          const textCell = (
            <div
              key={`${index}-text`}
              className="relative aspect-square flex flex-col justify-center items-start bg-white text-black p-10 md:p-16 lg:p-20"
            >
              {item.title && (
                <h3 className="text-2xl md:text-3xl mb-4 font-semibold">
                  <PrismicRichText
                    field={item.title}
                    components={{
                      heading1: ({ children }) => <>{children}</>,
                      heading2: ({ children }) => <>{children}</>,
                      heading3: ({ children }) => <>{children}</>,
                      heading4: ({ children }) => <>{children}</>,
                      heading5: ({ children }) => <>{children}</>,
                      heading6: ({ children }) => <>{children}</>,
                    }}
                  />
                </h3>
              )}

              {item.description && (
                <div className="text-base md:text-lg text-gray-700 opacity-90 leading-relaxed mb-6">
                  <PrismicRichText
                    field={item.description}
                    components={{
                      paragraph: ({ children }) => (
                        <p className="mb-4 last:mb-0">{children}</p>
                      ),
                    }}
                  />
                </div>
              )}

              {/* Only show button on the last text block */}
              {isLastItem && item.button?.url && (
                <PrismicNextLink
                  field={item.button}
                  className="inline-block mt-4 bg-black text-white text-sm md:text-base px-6 py-3 rounded-full hover:bg-gray-800 transition-all duration-200"
                >
                  {item.button_text || "Learn More"}
                </PrismicNextLink>
              )}
            </div>
          );

          /** --- RENDER --- */
          return (
            <Fragment key={index}>
              {isReversed ? (
                <>
                  {textCell}
                  {mediaCell}
                </>
              ) : (
                <>
                  {mediaCell}
                  {textCell}
                </>
              )}
            </Fragment>
          );
        })}
      </div>
    </section>
  );
};

export default FeatureSplitGrid;

"use client";

import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";

/**
 * Props for `FeaturedProductsGrid`.
 */
export type FeaturedProductsGridProps =
  SliceComponentProps<Content.FeaturedProductsGridSlice>;

/**
 * Component for "FeaturedProductsGrid" Slice.
 */
const FeaturedProductsGrid: FC<FeaturedProductsGridProps> = ({ slice }) => {
  const cards = slice.primary?.cards || [];

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="py-2"
    >
      <div className="max-w-screen-2xl mx-auto px-6">
        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: "24px" }}>
          {cards.map((item: any, index: number) => {
            const isBottomCard = index === 2;
            const layoutClass = isBottomCard ? "md:col-span-2" : "md:col-span-1";
            const heightClass = isBottomCard
              ? "h-[567px]" // bottom image height
              : "h-[615px]"; // top image height
            const buttonClass = isBottomCard
              ? "bg-black text-white hover:bg-gray-800"
              : "bg-white text-black hover:bg-gray-200";

            // Heading color: first two cards black, third card white
            const headingColor = index === 2 ? "text-white" : "text-black";

            // Description color: first two cards black, third card white
            const descriptionColor = index === 2 ? "text-white" : "text-black";

            return (
              <div
                key={index}
                className={`relative w-full overflow-hidden ${layoutClass} ${heightClass}`}
              >
                {/* Product Image */}
                {item.media && (
                  <PrismicNextImage
                    field={item.media}
                    alt=""
                    className="w-full h-full object-cover absolute inset-0 z-0"
                    fallbackAlt=""
                  />
                )}

                {/* Text & CTA Content */}
                <div className="relative z-20 flex flex-col items-start justify-end h-full p-8">
                  {/* Title */}
                  {item.heading && (
                    <h2
                      className={`drop-shadow-sm underline ${headingColor}`}
                      style={{
                        fontFamily: "Inter",
                        fontWeight: 500,
                        fontSize: "15.9px",
                        lineHeight: "20px",
                        letterSpacing: "-0.4px",
                        textDecorationLine: "underline",
                        textDecorationStyle: "solid",
                        textDecorationSkipInk: "auto",
                      }}
                    >
                      <PrismicRichText field={item.heading} />
                    </h2>
                  )}

                  {/* Description */}
                  {item.description && (
                    <div
                      className={`drop-shadow-sm ${descriptionColor}`}
                      style={{
                        marginTop: "29px",
                        fontFamily: "Inter",
                        fontWeight: 500,
                        fontStyle: "Medium",
                        fontSize: "21.1px",
                        lineHeight: "26px",
                        letterSpacing: "-0.52px",
                        wordWrap: "break-word",
                        overflowWrap: "break-word",
                        whiteSpace: "normal",
                        maxWidth: "75%",
                      }}
                    >
                      <PrismicRichText field={item.description} />
                    </div>
                  )}

                  {/* CTA Button */}
                  {item.cta_link && (
                    <PrismicNextLink
                      field={item.cta_link}
                      className={`inline-block px-6 py-3 text-sm font-semibold transition mt-6 ${buttonClass}`}
                    >
                      {item.cta_link.text || "Learn More"}
                    </PrismicNextLink>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProductsGrid;

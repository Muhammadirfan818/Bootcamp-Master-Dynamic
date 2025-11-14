"use client";

import { FC } from "react";
import { Content } from "@prismicio/client";
import {
  PrismicNextImage,
  PrismicNextLink,
} from "@prismicio/next";
import {
  PrismicRichText,
  SliceComponentProps,
} from "@prismicio/react";

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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {cards.map((item: any, index: number) => {
            const isBottomCard = index === 2;
            const layoutClass = isBottomCard ? "md:col-span-2" : "md:col-span-1";
            const heightClass = isBottomCard
              ? "h-[567px]" // bottom image height
              : "h-[615px]"; // top image height
            const buttonClass = isBottomCard
              ? "bg-black text-white hover:bg-gray-800"
              : "bg-white text-black hover:bg-gray-200";

            return (
              <div
                key={index}
                className={`relative w-full overflow-hidden ${layoutClass} ${heightClass}`}
              >
                {/* ✅ Product Image (no overlay now) */}
                {item.media && (
                  <PrismicNextImage
                    field={item.media}
                    alt=""
                    className="w-full h-full object-cover absolute inset-0 z-0"
                    fallbackAlt=""
                  />
                )}

                {/* ✅ Removed dark overlay */}
                {/* <div className="absolute inset-0 bg-black/40 z-10"></div> */}

                {/* Text & CTA Content */}
                <div className="relative z-20 flex flex-col items-start justify-end h-full p-8 text-black">
                  {/* Title */}
                  {item.title && (
                    <h2 className="text-2xl md:text-3xl font-bold drop-shadow-sm">
                      <PrismicRichText
                        field={item.title}
                        components={{
                          heading1: ({ children }) => <>{children}</>,
                          heading2: ({ children }) => <>{children}</>,
                          paragraph: ({ children }) => <>{children}</>,
                        }}
                      />
                    </h2>
                  )}

                  {/* Description */}
                  {item.description && (
                    <div className="text-3xl md:text-4xl font-semibold mt-2 drop-shadow-sm">
                      <PrismicRichText
                        field={item.description}
                        components={{
                          paragraph: ({ children }) => <p>{children}</p>,
                        }}
                      />
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

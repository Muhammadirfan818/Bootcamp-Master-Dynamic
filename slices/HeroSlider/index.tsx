"use client";

import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps, PrismicRichText } from "@prismicio/react";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";

export type HeroSliderProps = SliceComponentProps<Content.HeroSliderSlice>;

const HeroSlider: FC<HeroSliderProps> = ({ slice }) => {
  const slides = slice.primary?.slides || [];

  return (
    <section
      className="relative w-full overflow-hidden"
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      {slides.map((slide, index) => (
        <div
          key={index}
          className="relative w-full flex items-center justify-center min-h-[400px] md:min-h-[500px] lg:min-h-[600px]"
        >
          {/* Background Image */}
          {slide.image && (
            <div className="absolute inset-0 z-0">
              <PrismicNextImage
                field={slide.image}
                alt=""
                loading={index === 0 ? "eager" : "lazy"}
                className="object-cover w-full h-full"
                fallbackAlt=""
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent z-0"></div>
            </div>
          )}

          {/* Content — Positioned to match Figma */}
          {/* UPDATED: Reduced max-width to max-w-xl to make description wrap sooner */}
          <div className="absolute left-0 bottom-0 z-10 p-6 md:p-12 lg:p-16 max-w-xl text-left">
            {/* Title */}
            {slide.title && (
              // UPDATED: Changed font-extrabold to font-bold and added whitespace-nowrap
              <h1 className="text-4xl md:text-5xl lg:text-6xl  mb-6 text-white leading-tight whitespace-nowrap">
                <PrismicRichText
                  field={slide.title}
                  components={{
                    heading1: ({ children }) => <>{children}</>,
                    heading2: ({ children }) => <>{children}</>,
                    heading3: ({ children }) => <>{children}</>,
                    heading4: ({ children }) => <>{children}</>,
                    heading5: ({ children }) => <>{children}</>,
                    heading6: ({ children }) => <>{children}</>,
                  }}
                />
              </h1>
            )}

            {/* Description */}
            {slide.description && (
              <p className="text-base md:text-md mb-7  py-2 text-white leading-relaxed">
                <PrismicRichText
                  field={slide.description}
                  components={{
                    paragraph: ({ children }) => <>{children}</>,
                  }}
                />
              </p>
            )}

            {/* CTA Button */}
            {slide.primary_cta && (
              <PrismicNextLink
                field={slide.primary_cta}
                // UPDATED: Reduced padding (py-3 px-6) and text size (text-base)
                className="inline-block bg-white text-gray-800 px-6 py-3 border border-gray-800 rounded-md font-semibold text-base hover:bg-gray-100 transition-colors duration-200"
              >
                {slide.primary_cta.text || "Shop Now"}
              </PrismicNextLink>
            )}
          </div>
        </div>
      ))}
    </section>
  );
};

export default HeroSlider;
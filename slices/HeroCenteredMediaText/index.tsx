"use client";

import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps, PrismicRichText } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";

export type HeroCenteredMediaTextProps =
  SliceComponentProps<Content.HeroCenteredMediaTextSlice>;

const HeroCenteredMediaText: FC<HeroCenteredMediaTextProps> = ({ slice }) => {
  const { title, description, background_media, playicon } = slice.primary;

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="relative w-full flex items-center justify-center text-center overflow-hidden bg-black text-white"
    >
      {/* Background Image */}
      {background_media?.url && (
        <div className="absolute inset-0 z-0">
          <PrismicNextImage
            field={background_media}
            className="w-full h-full object-cover"
            priority
            fallbackAlt=""
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 py-24 sm:py-32 flex flex-col items-center justify-center">
        {/* Title */}
        {title && (
          <PrismicRichText
            field={title}
            components={{
              heading1: ({ children }) => (
                <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
                  {children}
                </h1>
              ),
              heading2: ({ children }) => (
                <h2 className="text-3xl md:text-4xl font-semibold mb-3">
                  {children}
                </h2>
              ),
              paragraph: ({ children }) => (
                <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto mb-10">
                  {children}
                </p>
              ),
            }}
          />
        )}

        {/* Description */}
        {description && (
          <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto mb-10">
            {description}
          </p>
        )}

        {/* Play Icon */}
        {playicon?.url && (
          <div className="w-24 h-24 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition">
            <PrismicNextImage
              field={playicon}
              className="w-10 h-10 object-contain"
              fallbackAlt=""
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default HeroCenteredMediaText;

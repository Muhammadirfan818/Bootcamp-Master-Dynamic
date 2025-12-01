"use client";

import { FC, useEffect, useState } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps, PrismicRichText } from "@prismicio/react";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { Pause, Play } from "lucide-react";
import { Inter } from "next/font/google";

// Load Inter font
const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

export type HeroSliderProps = SliceComponentProps<Content.HeroSliderSlice>;

const HeroSlider: FC<HeroSliderProps> = ({ slice }) => {
  const slides = slice.primary?.slides || [];

  // Flatten all images
  const allImages = slides
    .flatMap((slide) => [slide.image, slide.image2, slide.image3, slide.image4])
    .filter(Boolean);

  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  // Auto slide
  useEffect(() => {
    if (paused) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % allImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [paused, allImages.length]);

  if (!allImages.length) return null;

  // Content for current slide
  const contentIndex = Math.floor(current / 4); // every 4 images = 1 original slide
  const currentContent = slides[contentIndex];

  return (
    // Changed min-h-screen to h-[100dvh] for better mobile browser support
    <section className="relative w-full overflow-hidden h-[100dvh]">
      {/* Slide Wrapper */}
      <div
        className="flex transition-transform duration-700 ease-in-out h-full"
        style={{ transform: `translateX(-${current * 100}%)` }}
        role="region"
        aria-live="polite"
        aria-label="Image carousel"
      >
        {allImages.map((img, index) => (
          <div key={index} className="w-full flex-shrink-0 h-full relative">
            <PrismicNextImage
              field={img}
              fallbackAlt=""
              // Added object-center to ensure image stays centered on mobile portrait mode
              className="w-full h-full object-cover object-center"
              // critical for responsiveness: tells browser this image takes up full width
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent"></div>
          </div>
        ))}
      </div>

      {/* Content Block */}
      {currentContent && (
        <div
          className={`absolute left-0 bottom-0 z-20 p-6 md:p-12 lg:p-16 w-full max-w-4xl text-left ${inter.className}`}
        >
          {currentContent.title && (
            <div className="text-white w-full md:max-w-[535px] h-auto font-normal text-3xl md:text-[42.3px] leading-tight md:leading-[52px] tracking-[-1.04px] opacity-92 break-words">
              <PrismicRichText field={currentContent.title} />
            </div>
          )}
          {currentContent.description && (
            <div className="text-white mt-3 w-full md:max-w-[758.78px] h-auto font-normal text-base md:text-[16.3px] leading-normal md:leading-[25px] tracking-normal opacity-92 break-words">
              <PrismicRichText field={currentContent.description} />
            </div>
          )}
          {currentContent.primary_cta && (
            <div className="mt-5">
              <PrismicNextLink
                field={currentContent.primary_cta}
                className="flex items-center justify-center text-gray-900 bg-white border border-gray-300 w-[133.21px] h-[52.79px] font-medium text-base opacity-92 hover:bg-gray-50 transition-colors"
              >
                {currentContent.primary_cta.text || "Shop Now"}
              </PrismicNextLink>
            </div>
          )}
        </div>
      )}

      {/* Dots + Pause Button */}
      <div className="absolute bottom-5 right-5 z-30 flex items-center gap-4">
        {/* Dots */}
        <div className="flex gap-2" role="tablist" aria-label="Slide navigation">
          {allImages.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-3 h-3 rounded-full transition-all ${current === i ? "bg-white scale-110" : "bg-white/40"
                }`}
              role="tab"
              aria-selected={current === i}
              aria-label={`Go to slide ${i + 1}`}
            ></button>
          ))}
        </div>

        {/* Pause / Play Button */}
        <button
          onClick={() => setPaused((prev) => !prev)}
          className="text-white bg-black/40 hover:bg-black/60 px-3 py-1 rounded-full border border-white/40 transition-colors"
          aria-label={paused ? "Play slideshow" : "Pause slideshow"}
        >
          {paused ? (
            <Play size={20} aria-hidden="true" />
          ) : (
            <Pause size={20} aria-hidden="true" />
          )}
        </button>
      </div>
    </section>
  );
};

export default HeroSlider;
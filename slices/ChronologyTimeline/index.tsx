"use client";

import { FC, useState } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps, PrismicRichText } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";

// Navigation icons
const ChevronLeftIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
    strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
  </svg>
);

const ChevronRightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
    strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
  </svg>
);

export type ChronologyTimelineProps =
  SliceComponentProps<Content.ChronologyTimelineSlice>;

const ChronologyTimeline: FC<ChronologyTimelineProps> = ({ slice }) => {
  const milestones = slice.primary.milestones || [];
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % milestones.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + milestones.length) % milestones.length);

  const currentMilestone = milestones[currentIndex] as any;

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="relative w-full py-16 px-6 md:px-20 bg-white text-black"
    >
      {/* === Title on left === */}
      {slice.primary.title && (
        <div className="mb-12 text-4xl font-bold text-left  md:text-left max-w-4xl">
          <PrismicRichText
            field={slice.primary.title}
            components={{
              heading1: ({ children }) => (
                <h1 className="text-4xl md:text-5xl font-bold text-black">
                  {children}
                </h1>
              ),
            }}
          />
        </div>
      )}

      {/* === Image + Navigation Arrows === */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-16">
        {/* Image */}
        {currentMilestone?.years?.url && (
          <div className="flex justify-center md:justify-start w-full md:w-3/4">
            <PrismicNextImage
              field={currentMilestone.years}
              alt={currentMilestone.years.alt || "Year image"}
              className="object-contain w-full max-w-[700px] h-auto rounded-lg"
              fallbackAlt=""
            />
          </div>
        )}

        {/* Navigation Arrows in one line */}
        <div className="flex gap-4 mt-4 md:mt-0">
          <button
            onClick={prevSlide}
            className="p-3 bg-gray-100 hover:bg-gray-200 rounded-full transition"
            aria-label="Previous"
          >
            <ChevronLeftIcon />
          </button>
          <button
            onClick={nextSlide}
            className="p-3 bg-gray-100 hover:bg-gray-200 rounded-full transition"
            aria-label="Next"
          >
            <ChevronRightIcon />
          </button>
        </div>
      </div>

      {/* === Descriptions in 2-column grid === */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10 max-w-5xl mx-auto">
        {currentMilestone?.description && (
          <PrismicRichText
            field={currentMilestone.description}
            components={{
              paragraph: ({ children }) => (
                <p className="text-lg  text-black">{children}</p>
              ),
            }}
          />
        )}
        {currentMilestone?.discription2 && (
          <PrismicRichText
            field={currentMilestone.discription2}
            components={{
              paragraph: ({ children }) => (
                <p className="text-base text-black">{children}</p>
              ),
            }}
          />
        )}
        {currentMilestone?.discription3 && (
          <PrismicRichText
            field={currentMilestone.discription3}
            components={{
              paragraph: ({ children }) => (
                <p className="text-base text-black">{children}</p>
              ),
            }}
          />
        )}
        {currentMilestone?.discription4 && (
          <PrismicRichText
            field={currentMilestone.discription4}
            components={{
              paragraph: ({ children }) => (
                <p className="text-base text-black">{children}</p>
              ),
            }}
          />
        )}
      </div>
    </section>
  );
};

export default ChronologyTimeline;

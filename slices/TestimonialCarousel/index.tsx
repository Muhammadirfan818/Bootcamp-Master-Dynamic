"use client";

import { FC, useState } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps, PrismicRichText } from "@prismicio/react";

export type TestimonialCarouselProps =
  SliceComponentProps<Content.TestimonialCarouselSlice>;

const TestimonialCarousel: FC<TestimonialCarouselProps> = ({ slice }) => {
  const testimonials = slice.primary.testimonials || [];
  const [currentIndex] = useState(0);

  if (!testimonials.length) {
    return (
      <section className="px-6 py-12 text-center text-gray-500">
        No testimonials available.
      </section>
    );
  }

  const current = testimonials[currentIndex];
  if (!current) {
    return null;
  }

  return (
    <section className="px-6 sm:px-10 lg:px-16 py-12  font-semibold flex flex-col items-center text-center">
      {/* Section Heading */}
      {slice.primary.section_heading && (
        <div className="mb-8">
          <p className="text-lg sm:text-xl md:text-2xl">
            {slice.primary.section_heading}
          </p>
        </div>
      )}

      {/* Current Testimonial */}
      <div className="max-w-2xl w-full">
        {current.quote && (
          <PrismicRichText
            field={current.quote}
            components={{
              paragraph: ({ children }) => (
                <p className="text-lg sm:text-xl md:text-2xl mb-4">{children}</p>
              ),
            }}
          />
        )}
        {current.attribution && (
          <p className="text-gray-600 font-semibold">{current.attribution}</p>
        )}
      </div>
    </section>
  );
};

export default TestimonialCarousel;

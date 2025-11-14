"use client";

import { FC } from "react";
import { Content, isFilled } from "@prismicio/client";
import { SliceComponentProps, PrismicRichText } from "@prismicio/react";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next"; // Re-added PrismicNextLink

/**
 * Helper component for the Pause icon
 */
const PauseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-8 h-8"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M14.25 9v6m-4.5 0V9M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
    />
  </svg>
);

/**
 * Props for `MediaIntroBanner`.
 */
export type MediaIntroBannerProps =
  SliceComponentProps<Content.MediaIntroBannerSlice>;

/**
 * Component for "MediaIntroBanner" Slices.
 *
 * This component has been updated to show a button on the bottom-right.
 */
const MediaIntroBanner: FC<MediaIntroBannerProps> = ({ slice }) => {
  const bgImage = slice.primary.background_image;

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      // **THE LAYOUT FIX:**
      // Changed `justify-start` to `justify-between` to create two "corners"
      className="relative w-full min-h-screen flex items-end justify-between text-white"
    >
      {/* Background Image */}
      {bgImage?.url && (
        <PrismicNextImage
          field={bgImage}
          className="w-full h-full object-cover absolute inset-0 z-0"
          priority
          fallbackAlt=""
        />
      )}

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60 z-10" />

      {/* Content (Bottom-Left) */}
      <div className="relative z-20 p-6 sm:p-10 lg:p-16">
        {/* Text */}
        {slice.primary.text && (
          <div className="max-w-lg mb-4">
            <PrismicRichText
              field={slice.primary.text}
              components={{
                heading2: ({ children }) => (
                  <h2 className="text-2xl md:text-3xl font-semibold leading-snug">
                    {children}
                  </h2>
                ),
                paragraph: ({ children }) => (
                  <p className="text-2xl md:text-3xl font-semibold leading-snug">
                    {children}
                  </p>
                ),
              }}
            />
          </div>
        )}

        {/* Pause Icon */}
        <button
          aria-label="Pause media"
          className="text-white opacity-80 hover:opacity-100 transition"
        >
          <PauseIcon />
        </button>
      </div>

      {/* Button (Bottom-Right) */}
      {isFilled.link(slice.primary.button) && (
        <div className="relative z-20 p-6 sm:p-10 lg:p-16">
          <PrismicNextLink
            field={slice.primary.button}
            // Styled as a white-outline button to match the theme
            className="inline-block px-6 py-3 border border-white text-white rounded font-semibold hover:bg-white hover:text-black transition-colors"
          >
            {/* The text will come from your Prismic link field. 
                If it's empty, you can add fallback text here, e.g.: "Sign Up" */}
          </PrismicNextLink>
        </div>
      )}
    </section>
  );
};

export default MediaIntroBanner;
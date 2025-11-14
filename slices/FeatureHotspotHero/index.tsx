"use client";

import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps, PrismicRichText } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";

/** "+" icon helper */
const PlusIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2.5}
    stroke="currentColor"
    className="w-5 h-5"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 4.5v15m7.5-7.5h-15"
    />
  </svg>
);

/** Props for `FeatureHotspotHero` */
export type FeatureHotspotHeroProps =
  SliceComponentProps<Content.FeatureHotspotHeroSlice>;

/** FeatureHotspotHero Slice Component */
const FeatureHotspotHero: FC<FeatureHotspotHeroProps> = ({ slice }) => {
  const { headline, main_image, hotspots } = slice.primary;

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="relative w-full flex items-center overflow-hidden bg-black text-white min-h-[70vh] md:min-h-screen"
    >
      {/* ✅ Background Image (zoomed out, fits nicely) */}
      {main_image?.url && (
        <div className="absolute inset-0 z-0">
          <PrismicNextImage
            field={main_image}
            fill
            sizes="100vw"
            className="object-contain md:object-cover object-center scale-95 md:scale-100"
            priority
            fallbackAlt=""
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
      )}

      {/* ✅ Left-aligned Text Content */}
      <div className="relative z-10 w-full max-w-md md:max-w-lg px-6 sm:px-10 lg:px-16 flex flex-col justify-center py-16 md:py-24">
        {headline && (
          <div className="text-left">
            <PrismicRichText
              field={headline}
              components={{
                heading1: ({ children }) => (
                  <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-snug tracking-tight text-balance drop-shadow-lg">
                    {children}
                  </h1>
                ),
                heading2: ({ children }) => (
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-snug tracking-tight text-balance drop-shadow-lg">
                    {children}
                  </h2>
                ),
                heading3: ({ children }) => (
                  <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-snug tracking-tight text-balance drop-shadow-lg">
                    {children}
                  </h3>
                ),
              }}
            />
          </div>
        )}
      </div>

      {/* ✅ Hotspots */}
      {Array.isArray(hotspots) && hotspots.length > 0 && (
        <div className="absolute inset-0 z-20">
          {hotspots.map((item: any, index: number) => {
            const x = item.position_x_percent || 50;
            const y = item.position_y_percent || 50;
            const label = item.label || "";

            return (
              <div
                key={index}
                className="absolute flex flex-col items-center"
                style={{
                  left: `${x}%`,
                  top: `${y}%`,
                  transform: "translate(-50%, -50%)",
                }}
              >
                <button
                  type="button"
                  aria-label={label || "Hotspot"}
                  className="w-8 h-8 rounded-full bg-white/30 hover:bg-white/50 flex items-center justify-center text-white backdrop-blur-sm shadow-md transition-colors"
                >
                  <PlusIcon />
                </button>
                {label && (
                  <span className="mt-2 text-xs bg-white/70 text-black px-2 py-0.5 rounded-md backdrop-blur-md">
                    {label}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default FeatureHotspotHero;

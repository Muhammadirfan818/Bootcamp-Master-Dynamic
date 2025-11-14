"use client";

// We need 'useState' to manage which item is open
import { FC, useState } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps, PrismicRichText } from "@prismicio/react";

/**
 * Helper component for the dropdown icon
 */
const ChevronDownIcon = ({ className = "" }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="currentColor"
    className={`w-6 h-6 ${className}`} // Icon size
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
  </svg>
);


/**
 * Props for `Accordion`.
 */
export type AccordionProps = SliceComponentProps<Content.AccordionSlice>;

/**
 * Component for "Accordion" Slices.
 *
 * This component has been modified to be a fully interactive accordion
 * with a two-column layout matching the Figma design.
 */
const Accordion: FC<AccordionProps> = ({ slice }) => {
  const items = slice.primary.items || [];
  
  // State to track the *index* of the currently open item
  // `null` means all are closed.
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // Function to toggle an item
  const handleToggle = (index: number) => {
    // If the clicked item is already open, close it (set to null).
    // Otherwise, set it as the new open item.
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      // **THE LAYOUT FIX:**
      // 1. Use `grid`
      // 2. Default to 1 column on mobile
      // 3. Use 4 columns on desktop (md:)
      // 4. Add a gap
      className="px-6 sm:px-10 lg:px-16 py-12 grid grid-cols-1 md:grid-cols-4 gap-8"
    >
      {/* Section Title (Left Column) */}
      {slice.primary.section_title && (
        // Title takes 1 column on desktop
        <div className="md:col-span-1">
          <PrismicRichText
            field={slice.primary.section_title}
            components={{
              // Removed `text-center` to align left
              heading1: ({ children }) => (
                <h1 className="text-3xl md:text-4xl ">{children}</h1>
              ),
              heading2: ({ children }) => (
                <h2 className="text-2xl md:text-3xl ">{children}</h2>
              ),
            }}
          />
        </div>
      )}

      {/* Accordion Items (Right Column) */}
      {/* Items take 3 columns on desktop */}
      <div className="md:col-span-3">
        {items.map((item, index) => {
          // Check if this specific item is the one that's open
          const isOpen = openIndex === index;

          return (
            <div key={index} className="border-b border-gray-300">
              {/* Item Title is now a button for accessibility and functionality */}
              <button
                onClick={() => handleToggle(index)}
                className="w-full flex justify-between items-center py-6 text-left"
                aria-expanded={isOpen}
                aria-controls={`accordion-content-${index}`}
              >
                {item.item_title && (
                  <h3 className="text-xl md:text-2xl "> {/* Adjusted font weight */}
                    {item.item_title}
                  </h3>
                )}
                <ChevronDownIcon
                  className={`transition-transform duration-300 ${
                    isOpen ? "rotate-180" : "" // Rotate icon when open
                  }`}
                />
              </button>
              
              {/* Item Content (Collapsible Area) */}
              <div
                id={`accordion-content-${index}`}
                // **THE ANIMATION:**
                // Use `max-h` to animate the opening/closing
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  isOpen ? "max-h-[1000px]" : "max-h-0" // Use a large max-h
                }`}
              >
                {/* Add padding to the *inner* content */}
                <div className="pb-6 text-gray-700">
                  <PrismicRichText field={item.item_content} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Accordion;
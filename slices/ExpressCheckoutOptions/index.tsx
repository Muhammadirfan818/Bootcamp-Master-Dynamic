"use client";

import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps, PrismicRichText } from "@prismicio/react";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";

/**
 * Props for `ExpressCheckoutOptions` Slices.
 */
export type ExpressCheckoutOptionsProps =
  SliceComponentProps<Content.ExpressCheckoutOptionsSlice>;

/**
 * Component for "ExpressCheckoutOptions" Slices.
 */
const ExpressCheckoutOptions: FC<ExpressCheckoutOptionsProps> = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="w-full bg-gray-50 py-12 px-6 flex flex-col items-center text-center"
    >
      {/* 💳 Starting Logos on the right */}
      {slice.primary?.startinglogo?.length > 0 && (
        <div className="w-full flex justify-end items-center gap-4 mb-10">
          {slice.primary.startinglogo.map((item, index) => (
            <PrismicNextLink key={index} field={item.logolink}>
              <PrismicNextImage
                field={item.logoimage}
                width={25.7}
                height={25.7}
                className="object-contain opacity-90 hover:opacity-100 transition-all duration-300"
                fallbackAlt=""
              />
            </PrismicNextLink>
          ))}
        </div>
      )}

      {/* 🏷️ Section Title */}
      {slice.primary?.title && (
        <div className="text-3xl font-semibold text-gray-900 mb-6">
          <PrismicRichText field={slice.primary.title} />
        </div>
      )}

      {/* 🧾 Payment / Checkout Methods - all logos in one line */}
      {slice.primary?.checkout_methods?.length > 0 && (
        <div className="w-full flex flex-row justify-center items-center gap-6 mt-4 flex-wrap">
          {slice.primary.checkout_methods.map((item, index) => (
            <PrismicNextImage
              key={index}
              field={item.provider_logo}
              width={115.25}
              height={48}
              className="object-contain"
              fallbackAlt=""
            />
          ))}
        </div>
      )}

      {/* ➖ Divider Text */}
      {slice.primary?.divider_text && (
        <div className="relative flex items-center justify-center w-full max-w-xl my-10">
          <div className="h-px bg-gray-300 flex-grow"></div>
          <span className="px-4 bg-gray-50 text-gray-500 text-sm">
            <PrismicRichText field={slice.primary.divider_text} />
          </span>
          <div className="h-px bg-gray-300 flex-grow"></div>
        </div>
      )}

      {/* 📩 Contact + 🔐 Sign-in */}
      {(slice.primary?.contact_section_title || slice.primary?.signin?.length > 0) && (
        <div className="flex justify-between items-center w-full max-w-md mx-auto mt-6 gap-4">
          {slice.primary?.contact_section_title && (
            <div className="text-xl font-semibold text-gray-900 mb-0">
              <PrismicRichText field={slice.primary.contact_section_title} />
            </div>
          )}

          {slice.primary?.signin?.length > 0 && (
            <div className="flex items-center gap-2">
              {slice.primary.signin.map((item, index) => (
                <PrismicNextLink
                  key={index}
                  field={item.signinlink}
                  className="text-black underline text-md font-medium"
                >
                  <PrismicRichText field={item.signintext} />
                </PrismicNextLink>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 📧 Email Field */}
      {slice.primary?.email_placeholder && (
        <div className="mt-4 w-full max-w-sm mx-auto">
          <input
            type="email"
            placeholder={slice.primary.email_placeholder}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
      )}

      {/* 📰 Newsletter Checkbox */}
      {slice.primary?.show_newsletter_checkbox && (
        <label className="flex items-center justify-center gap-2 mt-3 text-gray-700 text-sm cursor-pointer select-none">
          <input type="checkbox" className="accent-blue-600 w-4 h-4" />
          {slice.primary.newsletter_checkbox_label ?? "Subscribe to our newsletter"}
        </label>
      )}
    </section>
  );
};

export default ExpressCheckoutOptions;

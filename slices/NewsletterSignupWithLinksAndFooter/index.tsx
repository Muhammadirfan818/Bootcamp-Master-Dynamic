"use client";

import { FC } from "react";
import { Content } from "@prismicio/client";
import {
  PrismicRichText,
  SliceComponentProps,
} from "@prismicio/react";
import { PrismicNextLink } from "@prismicio/next";
import {
  FaInstagram,
  FaFacebookF,
  FaYoutube,
  FaSpotify,
  FaTwitter,
} from "react-icons/fa";

/**
 * Props for `NewsletterSignupWithLinksAndFooter`.
 */
export type NewsletterSignupWithLinksAndFooterProps =
  SliceComponentProps<Content.NewsletterSignupWithLinksAndFooterSlice>;

/**
 * Component for "NewsletterSignupWithLinksAndFooter" Slice.
 */
const NewsletterSignupWithLinksAndFooter: FC<
  NewsletterSignupWithLinksAndFooterProps
> = ({ slice }) => {
  const {
    title,
    email_placeholder,
    show_checkbox,
    checkbox_label,
    button_label,
    nav_columns,
    footer_links,
    cookie_settings_label,
    company_info,
  } = slice.primary || {};

  return (
    <footer
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="bg-black text-white px-6 md:px-12 py-16"
    >
      <div className="max-w-7xl mx-auto">
        {/* --- TOP SECTION: Newsletter + Navigation --- */}
        <div className="flex flex-col md:flex-row md:justify-between gap-12 md:gap-20">
          {/* Left: Newsletter */}
          <div className="flex-1 max-w-lg">
            {title && (
              <div className="text-[22px] md:text-[24px] font-normal leading-snug mb-6">
                <PrismicRichText
                  field={title}
                  components={{
                    heading1: ({ children }) => <>{children}</>,
                    heading2: ({ children }) => <>{children}</>,
                    paragraph: ({ children }) => <p>{children}</p>,
                  }}
                />
              </div>
            )}

            {/* Email form */}
            <form className="flex flex-col gap-5">
              <input
                type="email"
                placeholder={email_placeholder || "Your email"}
                className="w-full p-3 border border-white bg-transparent text-white text-[15px] placeholder-gray-400 focus:outline-none"
              />

              {/* Checkbox */}
              {show_checkbox && (
                <label className="flex items-start gap-2 text-[12px] text-gray-300 leading-snug">
                  <input
                    type="checkbox"
                    className="mt-[3px] accent-white border-gray-500"
                  />
                  <span>{checkbox_label}</span>
                </label>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                className="bg-white text-black text-[13px] font-semibold py-3 uppercase tracking-wide transition hover:bg-gray-200"
              >
                {button_label || "Submit"}
              </button>
            </form>
          </div>

          {/* Right: Navigation Columns */}
          <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 gap-12 md:gap-20">
            {Array.isArray(nav_columns) &&
              nav_columns.map((col, i) => (
                <div key={i}>
                  {col.column_title && (
                    <h3 className="text-[15px] font-semibold mb-4">
                      {col.column_title}
                    </h3>
                  )}
                  {Array.isArray(col.column_links) && (
                    <ul className="space-y-3">
                      {col.column_links.map((link, j) => (
                        <li key={j}>
                          <PrismicNextLink
                            field={link}
                            className="text-gray-300 hover:text-white text-[15px] transition"
                          />
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
          </div>
        </div>

        {/* --- MIDDLE SECTION: Footer Links + Social Icons --- */}
        <div className="mt-16 border-t border-gray-800 pt-8 flex flex-col md:flex-row md:justify-between md:items-center gap-8">
          {/* Footer Links */}
          {Array.isArray(footer_links) && footer_links.length > 0 && (
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-400 justify-center md:justify-start">
              {footer_links.map((item, i) => (
                <PrismicNextLink
                  key={i}
                  field={item.link}
                  className="hover:text-white transition"
                />
              ))}
            </div>
          )}

          {/* Social Icons */}
          <div className="flex justify-center md:justify-end gap-6">
            <a href="#" aria-label="Instagram" className="hover:opacity-80">
              <FaInstagram size={26} />
            </a>
            <a href="#" aria-label="Facebook" className="hover:opacity-80">
              <FaFacebookF size={26} />
            </a>
            <a href="#" aria-label="YouTube" className="hover:opacity-80">
              <FaYoutube size={26} />
            </a>
            <a href="#" aria-label="Spotify" className="hover:opacity-80">
              <FaSpotify size={26} />
            </a>
            <a href="#" aria-label="Twitter" className="hover:opacity-80">
              <FaTwitter size={26} />
            </a>
          </div>
        </div>

        {/* --- BOTTOM SECTION: Cookie & Company Info --- */}
        <div className="mt-10">
          {cookie_settings_label && (
            <div className="text-gray-400 text-sm mb-4 hover:text-white cursor-pointer">
              {cookie_settings_label}
            </div>
          )}

          {company_info && (
            <div className="text-xs text-gray-500 leading-relaxed max-w-3xl">
              <PrismicRichText
                field={company_info}
                components={{
                  heading1: ({ children }) => <>{children}</>,
                  heading2: ({ children }) => <>{children}</>,
                  heading3: ({ children }) => <>{children}</>,
                  heading4: ({ children }) => <>{children}</>,
                  heading5: ({ children }) => <>{children}</>,
                  heading6: ({ children }) => <>{children}</>,
                }}
              />
            </div>
          )}
        </div>
      </div>
    </footer>
  );
};

export default NewsletterSignupWithLinksAndFooter;

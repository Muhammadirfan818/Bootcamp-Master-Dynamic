"use client";

import { FC } from "react";
import { Content } from "@prismicio/client";
import {
  PrismicRichText,
  SliceComponentProps,
} from "@prismicio/react";
import { PrismicNextLink } from "@prismicio/next";
import Image from "next/image";

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
      className="bg-black text-white px-6 md:px-12 lg:px-16 py-16"
    >
      <div className="max-w-[1440px] mx-auto">

        {/* --- TOP SECTION: Newsletter + Navigation --- */}
        <div className="flex flex-col lg:flex-row justify-between gap-16 xl:gap-24">

          {/* Left: Newsletter */}
          <div className="w-full lg:max-w-xl">
            {title && (
              <div className="text-[28px] md:text-[34px] leading-tight font-normal mb-8">
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
            <form className="flex flex-col gap-5 w-full">
              <input
                type="email"
                placeholder={email_placeholder || "Your email"}
                className="w-full h-12 px-4 border border-white bg-black text-white text-[15px] placeholder-gray-400 focus:outline-none focus:border-gray-200 transition-colors"
              />

              {show_checkbox && (
                <label className="flex items-start gap-3 text-[13px] text-gray-300 leading-snug cursor-pointer group">
                  <input
                    type="checkbox"
                    className="appearance-none mt-1 h-5 w-5 shrink-0 border border-white bg-transparent checked:bg-white checked:border-white transition-colors relative cursor-pointer"
                  />
                  <span className="group-hover:text-white transition-colors">{checkbox_label}</span>
                </label>
              )}

              <button
                type="submit"
                className="w-full h-12 bg-white text-black text-[13px] font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors mt-2"
              >
                {button_label || "Submit"}
              </button>
            </form>
          </div>

          {/* Right: Navigation Columns */}
          {/* Updated to text-center to match the Figma image */}
          <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 gap-y-10 gap-x-8 lg:justify-items-end">
            {Array.isArray(nav_columns) &&
              nav_columns.map((col, i) => (
                <div key={i} className="flex flex-col items-center text-center w-full">
                  {col.column_title && (
                    <h3 className="text-[15px] font-bold mb-6 text-white">
                      {col.column_title}
                    </h3>
                  )}
                  {Array.isArray(col.column_links) && (
                    <ul className="space-y-4">
                      {col.column_links.map((link, j) => (
                        <li key={j}>
                          <PrismicNextLink
                            field={link}
                            className="text-gray-300 hover:text-white text-[15px] font-normal transition-colors block"
                          />
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
          </div>
        </div>


        {/* --- BOTTOM SECTION --- */}
        <div className="mt-24 flex flex-col lg:flex-row items-end gap-12 lg:gap-24">

          {/* Left Column: Links, Divider, Copyright */}
          {/* Changed width to 70% to shorten the divider and bring icons closer */}
          <div className="w-full lg:w-[70%] flex flex-col gap-6">

            {/* 1. Legal Links Row */}
            <div className="flex flex-wrap gap-x-8 gap-y-3">
              {Array.isArray(footer_links) && footer_links.map((item, i) => (
                <PrismicNextLink
                  key={i}
                  field={item.link}
                  className="text-[13px] text-white hover:text-gray-300 transition-colors whitespace-nowrap font-normal"
                />
              ))}
            </div>

            {/* 2. Cookie Settings */}
            {cookie_settings_label && (
              <div className="text-[13px] text-white hover:text-gray-300 cursor-pointer w-fit transition-colors font-normal">
                {cookie_settings_label}
              </div>
            )}

            {/* 3. Divider Line - Stretches only within this left block */}
            <div className="w-full h-px bg-gray-800 my-2" />

            {/* 4. Company Info */}
            {company_info && (
              <div className="text-[13px] text-white hover:text-gray-300 cursor-pointer w-fit transition-colors font-normal">
                <PrismicRichText
                  field={company_info}
                  components={{
                    heading1: ({ children }) => <>{children}</>,
                    heading2: ({ children }) => <>{children}</>,
                    paragraph: ({ children }) => <p>{children}</p>,
                  }}
                />
              </div>
            )}
          </div>

          {/* Right Column: Social Icons */}
          {/* max-w-[160px] forces the 4-up, 1-down layout seen in Figma */}
          <div className="shrink-0">
            {/* Changed from flex-row + wrap to flex-col to ensure Twitter is on a new line */}
            <div className="flex flex-col gap-5 items-center lg:items-start">
              {/* Top row: First 4 icons */}
              <div className="flex gap-5">
                <a href="#" aria-label="Instagram" className="hover:opacity-70 transition-opacity">
                  <img src="/instagram.jpg" alt="Instagram" width={32} height={32} className="invert" />
                </a>
                <a href="#" aria-label="Facebook" className="hover:opacity-70 transition-opacity">
                  <img src="/facebook.jpg" alt="Facebook" width={32} height={32} className="invert" />
                </a>
                <a href="#" aria-label="YouTube" className="hover:opacity-70 transition-opacity">
                  <img src="/youtube.jpg" alt="YouTube" width={32} height={32} className="invert" />
                </a>
                <a href="#" aria-label="Spotify" className="hover:opacity-70 transition-opacity">
                  <img src="/spotify.jpg" alt="Spotify" width={32} height={32} className="invert" />
                </a>
              </div>
              {/* Bottom row: Twitter only */}
              <a href="#" aria-label="Twitter" className="hover:opacity-70 transition-opacity">
                <img src="/twitter.jpg" alt="Twitter" width={32} height={32} className="invert" />
              </a>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default NewsletterSignupWithLinksAndFooter;
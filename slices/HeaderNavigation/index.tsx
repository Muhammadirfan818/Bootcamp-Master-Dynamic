"use client";

import { FC } from "react";
import { PrismicNextLink } from "@prismicio/next";

export type HeaderNavigationProps = {
  slice: any;
};

const HeaderNavigation: FC<HeaderNavigationProps> = ({ slice }) => {
  const primary = slice.primary || {};

  const logo = primary.logo ?? null;
  const navLink = primary.nav_link ?? null;
  const navLinkText = primary.nav_link_text ?? "Return to Site";

  // PrismicNextLink for Submit Request
  const submitRequest = primary.submit_request ?? null;
  const submitRequestText = primary.submit_request_text ?? "Submit a Request";
  const submitRequestVariant =
    submitRequest?.variant ?? "bg-yellow-500 text-black hover:bg-yellow-600";

  return (
    <nav
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="flex items-center justify-between p-4 bg-white max-w-7xl mx-auto sm:px-2 lg:px-4 relative"
      // Removed py-6 to eliminate bottom margin
    >
      {/* Logo */}
      <div className="flex-shrink-0">
        {logo?.url ? (
          <img src={logo.url} alt={logo.alt ?? ""} className="h-4 w-auto" />
        ) : (
          <span className="font-bold text-lg uppercase">Master & Dynamic</span>
        )}
      </div>

      {/* Right-side Links */}
      <div className="flex items-center gap-6">
        {navLink?.url && (
          <a
            href={navLink.url}
            className="text-xs font-semibold text-gray-900 hover:text-gray-600 uppercase tracking-wider transition-colors"
          >
            {navLinkText}
          </a>
        )}

        {/* Submit Request Button using PrismicNextLink */}
        {submitRequest?.url && (
          <PrismicNextLink
            field={submitRequest}
            className={`px-5 py-3 rounded-sm text-xs font-semibold uppercase tracking-wider transition-colors ${submitRequestVariant}`}
          >
            {submitRequestText}
          </PrismicNextLink>
        )}
      </div>
    </nav>
  );
};

export default HeaderNavigation;

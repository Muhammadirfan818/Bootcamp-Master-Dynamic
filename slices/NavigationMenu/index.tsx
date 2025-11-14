"use client";

import React, { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { PrismicNextLink } from "@prismicio/next";

/**
 * Props for `NavigationMenu`.
 */
export type NavigationMenuProps =
  SliceComponentProps<Content.NavigationMenuSlice>;

/**
 * Helper functions to safely get link + label.
 */
function resolveMenuItemLink(item: any): { field?: any; href?: string } {
  if (!item) return {};
  if (item.link) return { field: item.link };
  if (item.menu_link) return { field: item.menu_link };
  if (typeof item === "object" && (item.link_type || item.url)) return { field: item };
  if (typeof item === "string" && item.length > 0) return { href: item };
  return {};
}

function resolveMenuItemLabel(item: any): string {
  if (!item) return "";
  return (
    item.label ||
    item.text ||
    item.menu_label ||
    item.title ||
    (item.link && (item.link.label || item.link.title)) ||
    "Menu Item"
  );
}

/**
 * Component for "NavigationMenu" Slice.
 */
const NavigationMenu: FC<NavigationMenuProps> = ({ slice }) => {
  // Handle both primary.menu_links and slice.items arrays
  const menuLinks: any[] = Array.isArray(slice.primary?.menu_links)
    ? slice.primary.menu_links
    : Array.isArray((slice as any).items)
    ? (slice as any).items
    : [];

  return (
    <nav
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="w-full bg-white shadow-sm border-b border-gray-200"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-center px-8 py-6">
        {/* Navigation Links */}
        <div className="flex flex-wrap justify-center gap-x-16 gap-y-4 text-center">
          {menuLinks.length > 0 ? (
            menuLinks.map((item: any, index: number) => {
              const { field, href } = resolveMenuItemLink(item);
              const label = resolveMenuItemLabel(item);

              if (field && typeof field === "object") {
                return (
                  <PrismicNextLink
                    key={index}
                    field={field}
                    className="text-gray-800 font-semibold hover:text-gray-900 transition text-base tracking-wide"
                  >
                    {label}
                  </PrismicNextLink>
                );
              }

              if (href && typeof href === "string") {
                return (
                  <a
                    key={index}
                    href={href}
                    className="text-gray-800 font-semibold hover:text-gray-900 transition text-base tracking-wide"
                  >
                    {label}
                  </a>
                );
              }

              return (
                <span
                  key={index}
                  className="text-gray-400 text-base font-semibold cursor-not-allowed"
                >
                  {label}
                </span>
              );
            })
          ) : (
            <p className="text-sm text-gray-400">No menu links found</p>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavigationMenu;

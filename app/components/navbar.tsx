"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/prismicio";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import Link from "next/link";
import {
  FiSearch,
  FiUser,
  FiShoppingBag,
  FiMenu,
  FiX,
  FiChevronDown,
  FiHelpCircle,
} from "react-icons/fi";

export default function Navbar() {
  const [navbar, setNavbar] = useState<any>(null);
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [countryOpen, setCountryOpen] = useState<boolean>(false);

  useEffect(() => {
    const fetchNavbar = async () => {
      try {
        const client = createClient();
        const data = await client.getSingle("navbar");
        setNavbar(data?.data || null);
      } catch (err) {
        console.error("Error fetching navbar:", err);
      }
    };
    fetchNavbar();
  }, []);

  if (!navbar) return null;

  return (
    <header className="w-full bg-white shadow-sm top-0 left-0 z-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2 flex items-center justify-between">
        {/* LEFT: Logo */}
        <div className="flex-shrink-0 flex items-center">
          {Array.isArray(navbar.logo) && navbar.logo.length > 0 ? (
            navbar.logo.map((item: any, index: number) =>
              item.mainlogo && item.homelink ? (
                <PrismicNextLink key={index} field={item.homelink}>
                  <PrismicNextImage
                    field={item.mainlogo}
                    alt={item.mainlogo?.alt || "Logo"}
                    className="h-8 w-auto object-contain max-w-[140px] sm:max-w-[200px]"
                    fallbackAlt=""
                  />
                </PrismicNextLink>
              ) : (
                <span key={index} className="text-gray-400 text-sm">
                  Logo Missing
                </span>
              )
            )
          ) : (
            <span className="text-gray-400 text-sm">Logo Missing</span>
          )}
        </div>

        {/* CENTER: Nav Links */}
        <nav className="hidden md:flex items-center">
          <Link
            href="/headphones"
            className="flex items-center text-sm tracking-wider text-gray-900 uppercase hover:text-gray-600 transition mr-2"
          >
            Headphones <FiChevronDown size={14} className="ml-1" />
          </Link>

          <Link
            href="/earphones"
            className="flex items-center text-sm tracking-wider text-gray-900 uppercase hover:text-gray-600 transition mr-16"
          >
            Earphones <FiChevronDown size={14} className="ml-1" />
          </Link>

          <Link
            href="/allproduct"
            className="text-sm tracking-wider text-gray-900 uppercase hover:text-gray-600 transition ml-8"
          >
            All Products
          </Link>
        </nav>

        {/* RIGHT: Icons */}
        <div className="flex items-center gap-3 sm:gap-4 relative">
          {/* Search Icon */}
          <button
            onClick={() => setShowSearch(!showSearch)}
            className="text-gray-600 hover:text-gray-900"
            aria-label="Toggle search"
            aria-expanded={showSearch}
          >
            <FiSearch size={20} aria-hidden="true" />
          </button>

          {/* User Icon */}
          <Link
            href="/account"
            className="hidden md:block text-gray-600 hover:text-gray-900"
            aria-label="Account"
          >
            <FiUser size={20} aria-hidden="true" />
          </Link>

          {/* Cart Icon */}
          <Link
            href="/cartpage"
            className="text-gray-600 hover:text-gray-900"
            aria-label="Shopping cart"
          >
            <FiShoppingBag size={20} aria-hidden="true" />
          </Link>

          {/* Country Selector */}
          <div className="relative hidden md:block">
            <button
              onClick={() => setCountryOpen(!countryOpen)}
              className="text-sm text-gray-900 flex items-center cursor-pointer whitespace-nowrap"
              aria-label="Select country"
              aria-expanded={countryOpen}
            >
              <>
                <span>US</span>
                <span className="ml-1 inline-flex">
                  <FiChevronDown size={14} aria-hidden="true" />
                </span>
              </>
            </button>
            {countryOpen && (
              <div className="absolute right-0 mt-2 w-24 bg-white border border-gray-200 shadow-lg rounded-md z-50">
                <ul>
                  {["US", "CA", "UK"].map((c) => (
                    <li
                      key={c}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    >
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Sign Up Button */}
          <Link
            href="/signup"
            className="hidden md:block bg-white text-black px-5 py-3 text-sm rounded-sm font-normal hover:bg-black-700 transition whitespace-nowrap"
          >
            SIGN UP
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-gray-900"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <FiX size={22} aria-hidden="true" /> : <FiMenu size={22} aria-hidden="true" />}
          </button>
        </div>
      </div>

      {/* Search Input */}
      {showSearch && (
        <div className="absolute top-full left-4 right-4 md:left-auto md:w-64 mt-2 z-50">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-lg focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>
      )}

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white w-full absolute top-full left-0 shadow-md z-40 flex flex-col items-start p-5 space-y-4 border-t border-gray-100">
          <Link
            href="/headphones"
            className="text-gray-900 font-medium tracking-wider hover:text-gray-600 transition w-full"
          >
            Headphones
          </Link>
          <Link
            href="/earphones"
            className="text-gray-900 font-medium tracking-wider hover:text-gray-600 transition w-full"
          >
            Earphones
          </Link>
          <Link
            href="/allproduct"
            className="text-gray-900 font-medium tracking-wider hover:text-gray-600 transition w-full"
          >
            All Products
          </Link>
          <hr className="w-full border-t border-gray-200 my-2" />

          <Link
            href="/account"
            className="text-gray-900 font-medium hover:text-gray-600 transition w-full flex items-center gap-2"
          >
            <FiUser size={18} /> Account
          </Link>
          <Link
            href="/support"
            className="text-gray-900 font-medium hover:text-gray-600 transition w-full flex items-center gap-2"
          >
            <FiHelpCircle size={18} /> Support
          </Link>

          <div className="w-full pt-2">
            <label
              htmlFor="mobile-region"
              className="text-sm text-gray-500 mb-1 block"
            >
              Region
            </label>
            <select
              id="mobile-region"
              className="w-full p-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-black"
            >
              <option value="us">US</option>
              <option value="ca">CA</option>
              <option value="uk">UK</option>
            </select>
          </div>
        </div>
      )}
    </header>
  );
}

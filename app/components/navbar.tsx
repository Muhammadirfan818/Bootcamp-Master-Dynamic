"use client";

import { useState } from "react";
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

export default function Navbar({ data }: { data?: any }) {
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [countryOpen, setCountryOpen] = useState(false);

  if (!data) return null;

  return (
    <header className="w-full bg-white shadow-sm top-0 left-0 z-50 relative">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2 
        flex items-center justify-between 
        flex-nowrap min-w-0">

        {/* LEFT: Logo */}
        <div className="flex-shrink-0 min-w-0">
          {Array.isArray(data.logo) && data.logo.length > 0 ? (
            data.logo.map((item: any, index: number) =>
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
                <span key={index} className="text-gray-400 text-sm">Logo Missing</span>
              )
            )
          ) : (
            <span className="text-gray-400 text-sm">Logo Missing</span>
          )}
        </div>

        {/* CENTER NAV */}
        <nav className="hidden md:flex items-center flex-nowrap shrink-0">
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

        {/* RIGHT ICONS */}
        <div className="flex items-center gap-3 sm:gap-4 relative flex-nowrap shrink-0">

          <button
            onClick={() => setShowSearch(!showSearch)}
            className="text-gray-600 hover:text-gray-900"
          >
            <FiSearch size={20} />
          </button>

          <Link
            href="/account"
            className="hidden md:block text-gray-600 hover:text-gray-900"
          >
            <FiUser size={20} />
          </Link>

          <Link
            href="/cartpage"
            className="text-gray-600 hover:text-gray-900"
          >
            <FiShoppingBag size={20} />
          </Link>

          <div className="relative hidden md:block">
            <button
              onClick={() => setCountryOpen(!countryOpen)}
              className="text-sm text-gray-900 flex items-center whitespace-nowrap"
            >
              US <FiChevronDown size={14} className="ml-1" />
            </button>

            {countryOpen && (
              <div className="absolute right-0 mt-2 w-24 bg-white border shadow-lg rounded-md z-50">
                <ul>
                  {["US", "CA", "UK"].map((c) => (
                    <li key={c} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* SIGN UP BUTTON (unchanged visual) */}
          <Link
            href="/signup"
            className="
              hidden md:flex items-center justify-center
              bg-white text-black
              font-[Arial_Narrow] !font-normal font-[400]
              text-[18px] leading-[18px]
              tracking-[0]
              h-[20px] w-[75px]
            "
          >
            SIGN UP
          </Link>

          {/* MOBILE MENU */}
          <button
            className="md:hidden text-gray-900"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </div>
      </div>

      {/* SEARCH FIELD */}
      {showSearch && (
        <div className="absolute top-full left-0 px-4 right-0 md:left-auto md:w-64 mt-2 z-50">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 border rounded-md shadow-lg focus:ring-2 focus:ring-black"
          />
        </div>
      )}

      {/* MOBILE MENU */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white w-full absolute top-full left-0 shadow-md z-40 flex flex-col items-start p-5 space-y-4 border-t">

          <Link href="/headphones" className="text-gray-900 font-medium w-full">
            Headphones
          </Link>

          <Link href="/earphones" className="text-gray-900 font-medium w-full">
            Earphones
          </Link>

          <Link href="/allproduct" className="text-gray-900 font-medium w-full">
            All Products
          </Link>

          <hr className="w-full border-gray-200" />

          <Link href="/account" className="flex items-center gap-2 text-gray-900 w-full">
            <FiUser size={18} /> Account
          </Link>

          <Link href="/support" className="flex items-center gap-2 text-gray-900 w-full">
            <FiHelpCircle size={18} /> Support
          </Link>

          <div className="w-full">
            <label className="text-sm text-gray-500">Region</label>
            <select className="w-full p-2 border rounded-md mt-1">
              <option>US</option>
              <option>CA</option>
              <option>UK</option>
            </select>
          </div>
        </div>
      )}
    </header>
  );
}

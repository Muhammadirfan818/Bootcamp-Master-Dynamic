"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/prismicio";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText } from "@prismicio/react";
import Link from "next/link";
import {
  FiSearch,
  FiUser,
  FiShoppingBag,
  FiChevronDown,
  FiMenu,
  FiX,
  FiHelpCircle,
} from "react-icons/fi";

const toArray = (field: any) =>
  field ? (Array.isArray(field) ? field : [field]) : [];

export default function Navbar2() {
  const [navbar2, setNavbar2] = useState<any>(null);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [countryOpen, setCountryOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const client = createClient();
      const data = await client.getSingle("navbar2").catch(() => null);
      setNavbar2(data?.data || null);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (showSearch) setMobileMenuOpen(false);
  }, [showSearch]);

  useEffect(() => {
    if (mobileMenuOpen) setShowSearch(false);
  }, [mobileMenuOpen]);

  if (!navbar2) return null;

  return (
    <header className="w-full bg-white shadow-sm relative z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        
        {/* LEFT: Logo */}
        <div className="flex-shrink-0 flex items-center">
          {toArray(navbar2.logo).map((item: any, i: number) =>
            item.logoimage ? (
              <Link key={i} href={item.link?.url || "/"}>
                <PrismicNextImage
                  field={item.logoimage}
                  alt={item.logoimage?.alt || "Logo"}
                  className="h-8 w-auto object-contain max-w-[140px] sm:max-w-[160px]"
                  fallbackAlt=""
                />
              </Link>
            ) : (
              <span key={i} className="text-gray-400">
                Logo Missing
              </span>
            )
          )}
        </div>

        {/* CENTER NAV LINKS */}
        <nav className="hidden md:flex items-center gap-6">

          {/* Headphone */}
          {toArray(navbar2.headphone).map((item: any, i: number) => (
            <Link
              key={`headphone-${i}`}
              href={item.headphonelink?.url || "#"}
              className="text-sm font-medium tracking-wider text-gray-900 uppercase hover:text-gray-600 transition flex items-center gap-1"
            >
              <PrismicRichText field={item.text} />
              <span className="opacity-70 inline-flex">
                <FiChevronDown size={14} />
              </span>
            </Link>
          ))}

          {/* Earphones */}
          {toArray(navbar2.earphones).map((item: any, i: number) => (
            <Link
              key={`earphones-${i}`}
              href={item.earphonelink?.url || "#"}
              className="text-sm font-medium tracking-wider text-gray-900 uppercase hover:text-gray-600 transition flex items-center gap-1"
            >
              <PrismicRichText field={item.text} />
              <span className="opacity-70 inline-flex">
                <FiChevronDown size={14} />
              </span>
            </Link>
          ))}

          {/* Accessories */}
          {toArray(navbar2.accessories).map((item: any, i: number) => (
            <Link
              key={`accessories-${i}`}
              href={item.accessorieslink?.url || "#"}
              className="text-sm font-medium tracking-wider text-gray-900 uppercase hover:text-gray-600 transition flex items-center gap-1"
            >
              <PrismicRichText field={item.text} />
              <span className="opacity-70 inline-flex">
                <FiChevronDown size={14} />
              </span>
            </Link>
          ))}

          {/* Collaborations */}
          {toArray(navbar2.collaborations).map((item: any, i: number) => (
            <Link
              key={`collab-${i}`}
              href={item.collaborationslink?.url || "#"}
              className="text-sm font-medium tracking-wider text-gray-900 uppercase hover:text-gray-600 transition"
            >
              <PrismicRichText field={item.text} />
            </Link>
          ))}

          {/* Blog */}
          {toArray(navbar2.blog).map((item: any, i: number) => (
            <Link
              key={`blog-${i}`}
              href={item.bloglink?.url || "#"}
              className="text-sm font-medium tracking-wider text-gray-900 uppercase hover:text-gray-600 transition"
            >
              <PrismicRichText field={item.text} />
            </Link>
          ))}

        </nav>

        {/* RIGHT ICONS */}
        <div className="flex items-center gap-3 sm:gap-4 relative">
          <button
            onClick={() => setShowSearch(!showSearch)}
            className="text-gray-900 hover:text-gray-600"
          >
            <FiSearch size={20} />
          </button>

          <Link 
            href="/support" 
            className="hidden md:block text-gray-900 hover:text-gray-600"
          >
            <FiUser size={20} />
          </Link>

          <Link 
            href="/cartpage"
            className="text-gray-900 hover:text-gray-600"
          >
            <FiShoppingBag size={20} />
          </Link>

          {/* Country Selector */}
          <div className="relative hidden md:block">
            <button
              onClick={() => setCountryOpen(!countryOpen)}
              className="text-sm text-gray-900 flex items-center cursor-pointer whitespace-nowrap"
            >
              <span className="flex items-center">
                <span>US</span>
                <span className="ml-1 inline-flex">
                  <FiChevronDown size={14} />
                </span>
              </span>
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

          <Link
            href="/support"
            className="hidden md:block bg-gray-900 text-white px-4 py-2 text-sm rounded font-normal hover:bg-gray-700 transition whitespace-nowrap"
          >
            Support
          </Link>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-900"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </div>
      </div>

      {/* SEARCH INPUT */}
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

      {/* MOBILE MENU */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white w-full absolute top-full left-0 shadow-md z-40 flex flex-col items-start p-5 space-y-4 border-t border-gray-100">
          
          {/* Headphone */}
          {toArray(navbar2.headphone).map((item: any, i: number) => (
            <Link
              key={`m-headphone-${i}`}
              href={item.headphonelink?.url || "#"}
              className="text-gray-900 font-medium tracking-wider hover:text-gray-600 transition w-full"
            >
              <PrismicRichText field={item.text} />
            </Link>
          ))}

          {/* Earphones */}
          {toArray(navbar2.earphones).map((item: any, i: number) => (
            <Link
              key={`m-earphones-${i}`}
              href={item.earphonelink?.url || "#"}
              className="text-gray-900 font-medium tracking-wider hover:text-gray-600 transition w-full"
            >
              <PrismicRichText field={item.text} />
            </Link>
          ))}

          {/* Accessories */}
          {toArray(navbar2.accessories).map((item: any, i: number) => (
            <Link
              key={`m-accessories-${i}`}
              href={item.accessorieslink?.url || "#"}
              className="text-gray-900 font-medium tracking-wider hover:text-gray-600 transition w-full"
            >
              <PrismicRichText field={item.text} />
            </Link>
          ))}

          {/* Collaborations */}
          {toArray(navbar2.collaborations).map((item: any, i: number) => (
            <Link
              key={`m-collab-${i}`}
              href={item.collaborationslink?.url || "#"}
              className="text-gray-900 font-medium tracking-wider hover:text-gray-600 transition w-full"
            >
              <PrismicRichText field={item.text} />
            </Link>
          ))}

          {/* Blog */}
          {toArray(navbar2.blog).map((item: any, i: number) => (
            <Link
              key={`m-blog-${i}`}
              href={item.bloglink?.url || "#"}
              className="text-gray-900 font-medium tracking-wider hover:text-gray-600 transition w-full"
            >
              <PrismicRichText field={item.text} />
            </Link>
          ))}

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

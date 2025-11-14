"use client";

import { FC, useEffect, useState } from "react";
import { PrismicRichText } from "@prismicio/react";
import Link from "next/link";

export type SupportGridProps = {
  slice?: any;
};

interface Product {
  id: number;
  title: string;
  image: string;
}

const SupportGrid: FC<SupportGridProps> = ({ slice }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const primary = slice?.primary || {};
  const items = slice?.items || [];

  // Fetch products from Fake Store API
  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data: Product[]) => {
        setProducts(data.slice(0, 5)); // Take first 5 products
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setLoading(false);
      });
  }, []);

  return (
    <section
      data-slice-type={slice?.slice_type}
      data-slice-variation={slice?.variation}
      className="py-16 bg-gray-50"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading from Prismic */}
        {primary.heading && (
          <div className="text-center mb-10 text-4xl font-bold text-gray-900">
            <PrismicRichText field={primary.heading} />
          </div>
        )}

        {/* Search placeholder from Prismic */}
        {primary.search_placeholder && (
          <div className="mb-12 max-w-lg mx-auto relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5 text-gray-500"
              >
                <path
                  fillRule="evenodd"
                  d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <input
              type="text"
              placeholder={primary.search_placeholder}
              className="w-full border border-gray-300 rounded-md pl-12 pr-4 py-3 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
          </div>
        )}

        {/* Display API products */}
        {loading ? (
          <p className="text-center text-gray-700">Loading products...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {products.map((product) => (
              <Link
                key={product.id}
                href={`/productdetail?id=${product.id}`}
                className="flex flex-col items-center text-center bg-white rounded-lg p-4 shadow hover:shadow-lg transition"
              >
                <div className="w-full h-48 flex items-center justify-center bg-gray-100 mb-4">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="object-contain w-full h-full"
                  />
                </div>
                <h3 className="text-base text-gray-900 font-medium">{product.title}</h3>
              </Link>
            ))}
          </div>
        )}

        {/* Display static Prismic items if any */}
        {items.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-12">
            {items.map((item: any, index: number) => (
              <a
                key={index}
                href={item.link?.url || "#"}
                className="group flex flex-col items-center text-center transition-transform transform hover:scale-105"
              >
                {item.image?.url && (
                  <img
                    src={item.image.url}
                    alt={item.image.alt ?? item.label ?? "Support Item"}
                    className="w-full max-h-48 object-contain mb-4"
                  />
                )}
                {item.label && (
                  <h3 className="text-base text-gray-900 group-hover:text-blue-600 font-medium">
                    {item.label}
                  </h3>
                )}
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default SupportGrid;

"use client";

import { FC, useEffect, useState } from "react";
import Link from "next/link";
import { Inter } from "next/font/google";
import { useCart } from "@/app/context/cartcontext";

// Load Inter font to match Figma
const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "700"] });

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  description: string;
  category: string;
  // Visual flags to match Figma
  sold_out?: boolean;
  new_in?: boolean;
  has_engrave?: boolean;
  price_prefix?: string; // For "From $..."
}

const ProductFeatureGrid: FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products/category/electronics")
      .then((res) => res.json())
      .then((data: Product[]) => {
        const firstFour = data.slice(0, 4);

        // MAP DATA TO MATCH FIGMA EXACTLY
        const updatedProducts = firstFour.map((product, index) => ({
          ...product,
          // Item 2 (index 1) is Sold Out & "From" price
          sold_out: index === 1,
          price_prefix: index === 1 ? "From " : "",

          // Item 4 (index 3) is New In
          new_in: index === 3,

          // Item 1 & 3 have Engrave option
          has_engrave: index === 0 || index === 2,
        }));

        setProducts(updatedProducts);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-center py-20">Loading products...</div>;

  // Helper to get swatch gradients to match the metallic/split looks in the image
  const getSwatchStyle = (productIndex: number, swatchIndex: number) => {
    // Default base styles
    let style = "bg-gray-400";

    // Simulate specific colors from the image
    if (productIndex === 0) { // MW75 Styles
      const colors = ["bg-[#222]", "bg-[#8B5E3C]", "bg-gray-400", "bg-blue-900", "bg-black", "bg-gray-600"];
      style = colors[swatchIndex] || "bg-gray-300";
    } else if (productIndex === 1) { // MW09 Carbon/Split styles
      if (swatchIndex === 0) return "bg-gradient-to-br from-blue-900 to-black"; // Split blue/black
      const colors = ["", "bg-gray-800", "bg-green-900", "bg-blue-300", "bg-black", "bg-gray-400"];
      style = colors[swatchIndex] || "bg-gray-300";
    } else if (productIndex === 2) { // MH40 Leather styles
      if (swatchIndex === 0) return "bg-[#D2B48C]"; // Tan
      const colors = ["", "bg-black", "bg-[#333]", "bg-gray-300", "bg-blue-800", "bg-blue-600", "bg-gray-700"];
      style = colors[swatchIndex] || "bg-gray-300";
    } else { // ME05
      if (swatchIndex === 0) return "bg-gradient-to-r from-black via-gray-400 to-black"; // Silver/Black
      style = ["", "bg-white border-gray-300", "bg-[#CD7F32]", "bg-black"][swatchIndex] || "bg-black";
    }

    return style;
  };

  return (
    <section className={`w-full py-16 bg-white ${inter.className}`}>
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        {/* Section Header */}
        <h2 className="text-[32px] md:text-[40px] font-normal text-[#1a1a1a] mb-12 text-left tracking-tight">
          Featured Products
        </h2>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
          {products.map((item, index) => (
            <div key={item.id} className="group flex flex-col relative">

              {/* Image Area */}
              <Link href={`/productdetail?id=${item.id}`} className="block relative w-full mb-4">
                {/* BADGES */}
                {item.sold_out && (
                  <span className="absolute top-0 left-0 z-10 bg-[#444444] text-white text-[11px] font-medium px-2 py-1 rounded-md tracking-wide">
                    Sold out
                  </span>
                )}
                {item.new_in && (
                  <span className="absolute top-0 left-0 z-10 bg-[#EBC80C] text-black text-[11px] font-medium px-2 py-1 rounded-md tracking-wide">
                    New In
                  </span>
                )}

                {/* Product Image */}
                <div className="w-full h-[300px] flex items-center justify-center bg-transparent">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="object-contain max-h-full max-w-[85%] transition-transform duration-500 group-hover:scale-105 mix-blend-multiply"
                  />
                </div>
              </Link>

              {/* Product Info - Row 1: Title & Price */}
              <div className="flex justify-between items-baseline w-full mb-1">
                <Link href={`/productdetail?id=${item.id}`} className="max-w-[65%]">
                  <h3 className="text-[19px] font-bold text-[#1a1a1a] leading-tight hover:opacity-70">
                    {/* Truncate title to simulate short product names like "MW75" */}
                    {item.title.split(' ').slice(0, 1).join(' ')} {index === 2 ? "Wireless" : ""}
                  </h3>
                </Link>
                <p className="text-[17px] font-normal text-[#1a1a1a] whitespace-nowrap">
                  {item.price_prefix}${item.price.toFixed(2)}
                </p>
              </div>

              {/* Product Info - Row 2: Category/Description */}
              <p className="text-[16px] text-[#4a4a4a] mb-5 leading-snug">
                {item.category === "electronics"
                  ? (index === 1 ? "Active Noise-Cancelling True" : index === 3 ? "Wired Earphones" : "Active Noise-Cancelling Wireless")
                  : item.category}
                <br className="hidden md:block" />
                {index === 1 ? "Wireless Earphones" : index === 0 ? "Headphones" : ""}
              </p>

              {/* Interactive Elements (Swatches & Engrave) */}
              <div className="mt-auto">
                {/* Color Swatches */}
                <div className="flex items-center gap-2 mb-3">
                  {/* Item 4 has fewer swatches in design */}
                  {[...Array(index === 3 ? 4 : 6)].map((_, i) => (
                    <div
                      key={i}
                      className={`
                        w-[22px] h-[22px] rounded-full cursor-pointer relative
                        ${i === 0 ? 'ring-1 ring-offset-2 ring-gray-400' : ''}
                        ${getSwatchStyle(index, i)}
                        ${i === 1 && index === 3 ? 'border border-gray-300' : ''} 
                      `}
                    >
                      {/* Overlay for "split" swatch simulation if needed */}
                      {index === 1 && i === 0 && (
                        <div className="absolute inset-0 bg-white/20 rounded-full clip-path-polygon"></div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Engrave Badge */}
                <div className="h-6">
                  {item.has_engrave && (
                    <span className="text-[10px] uppercase font-medium tracking-wider bg-[#595959] text-white px-2 py-[3px] rounded-[3px]">
                      Engrave
                    </span>
                  )}
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductFeatureGrid;
"use client";

import { FC, useEffect, useState } from "react";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
  category: string;
}

const RecentlyViewedProductsAPI: FC = () => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products/1")
      .then((response) => response.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching product:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="text-center py-10">Loading product...</div>;
  }

  if (!product) {
    return <div className="text-center py-10">No product found.</div>;
  }

  return (
    <section className="px-6 sm:px-10 lg:px-16 py-12 bg-white">
      {/* Section Title */}
      <div className="mb-8 text-center">
        <h2 className="text-3xl md:text-4xl font-semibold">Recently Viewed</h2>
      </div>

      {/* Single Product Card */}
      <div className="flex flex-col sm:flex-row items-start gap-8 max-w-4xl mx-auto border rounded-md p-4">
        {/* Product Image */}
        <div className="w-full sm:w-1/3">
          <img
            src={product.image}
            alt={product.title}
            className="w-full aspect-square object-contain mb-4"
          />
        </div>

        {/* Product Info */}
        <div className="flex flex-col flex-grow gap-2">
          <h3 className="text-lg font-semibold text-black">{product.title}</h3>
          <p className="text-sm text-gray-600">{product.description}</p>
          <p className="text-base text-gray-800 font-medium">${product.price}</p>

          {/* Swatches / Engrave Placeholder */}
          <div className="flex items-center gap-2 mt-2">
            {/* Placeholder color swatch */}
            <span className="w-5 h-5 bg-gray-300 rounded-full"></span>

            {/* Placeholder Engrave button */}
            <span className="border border-gray-400 text-gray-600 text-xs font-medium px-2 py-0.5 rounded-sm">
              Engrave
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RecentlyViewedProductsAPI;

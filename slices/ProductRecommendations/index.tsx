"use client";

import { FC, useEffect, useState } from "react";
import Link from "next/link";
import { useCart } from "@/app/context/cartcontext";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
  category: string;
}

const ProductRecommendationsAPI: FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<string | null>(null);

  const { addToCart } = useCart();

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.slice(0, 4));
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const showToast = (message: string) => {
    setToast(message);
    setTimeout(() => setToast(null), 2000);
  };

  const handleAddToCart = (product: Product) => {
    addToCart({ ...product, quantity: 1 });
    showToast("Product added to cart!");
  };

  if (loading) return <div className="text-center py-10">Loading products...</div>;

  return (
    <>
      {/* Toast */}
      {toast && (
        <div className="fixed bottom-5 left-1/2 -translate-x-1/2 bg-black text-white px-4 py-2 rounded shadow-lg animate-fadeIn z-50">
          {toast}
        </div>
      )}

      <section className="px-6 sm:px-10 lg:px-16 py-12 bg-white">
        <div className="mb-4">
          <h2 className="text-3xl md:text-5xl font-bold">Recommended Products</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {products.map((item) => {
            const isSoldOut = item.price < 20;

            return (
              <div key={item.id} className="relative flex flex-col group">
                {/* Product Image */}
                <Link href={`/productdetail?id=${item.id}`}>
                  <div className="relative mb-4 w-full aspect-square bg-gray-50 flex items-center justify-center overflow-hidden rounded-md cursor-pointer group-hover:shadow-lg transition-shadow">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="object-contain w-full h-full transition-transform duration-300 hover:scale-105"
                    />
                    {isSoldOut && (
                      <span className="absolute top-2 left-2 bg-black text-white text-xs font-semibold px-2 py-1 rounded">
                        Sold Out
                      </span>
                    )}
                  </div>
                </Link>

                {/* Product Title */}
                <Link href={`/productdetail?id=${item.id}`}>
                  <h3 className="text-lg font-bold mb-1 cursor-pointer hover:text-gray-700 transition">
                    {item.title}
                  </h3>
                </Link>

                {/* Price */}
                <p className="text-gray-700 text-sm mb-2">${item.price}</p>

                {/* Add to Cart Button */}
                <button
                  disabled={isSoldOut}
                  onClick={() => !isSoldOut && handleAddToCart(item)}
                  className={`w-full text-sm font-medium py-2 rounded-md transition ${
                    isSoldOut
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-black text-white hover:bg-gray-800"
                  }`}
                >
                  {isSoldOut ? "Sold Out" : "+ Add to Cart"}
                </button>
              </div>
            );
          })}
        </div>
      </section>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translate(-50%, 20px); }
          to { opacity: 1; transform: translate(-50%, 0px); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </>
  );
};

export default ProductRecommendationsAPI;

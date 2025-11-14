"use client";

import { FC, useEffect, useState } from "react";
import Link from "next/link";
import { useCart } from "@/app/context/cartcontext";

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  description: string;
  category: string;
  sold_out?: boolean;
}

const ProductFeatureGrid: FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showToast, setShowToast] = useState(false);

  const { addToCart } = useCart(); // Get cart context

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data: Product[]) => {
        const firstFour = data.slice(0, 4);

        // Manually mark only index 2 (3rd product) as sold out
        const updatedProducts = firstFour.map((product, index) => ({
          ...product,
          sold_out: index === 2,
        }));

        setProducts(updatedProducts);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-center py-10">Loading products...</div>;

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      quantity: 1, // default quantity
    });

    // Show toast
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  return (
    <section className="w-full py-12 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-medium text-gray-800 mb-8">Products</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((item) => (
            <div
              key={item.id}
              className="border rounded-md p-4 flex flex-col relative bg-gray-50"
            >
              {/* Product Image */}
              <Link href={`/productdetail?id=${item.id}`}>
                <div className="w-full mb-4 relative cursor-pointer">
                  {item.sold_out && (
                    <span className="absolute top-2 left-2 z-10 bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded">
                      Sold Out
                    </span>
                  )}
                  <img
                    src={item.image}
                    alt={item.title}
                    className="object-contain w-full h-56 mx-auto transition-transform duration-300 hover:scale-105"
                  />
                </div>
              </Link>

              {/* Product Info */}
              <h3 className="text-lg font-semibold text-gray-900 mb-1">{item.title}</h3>
              <p className="text-base font-medium text-gray-800 mb-2">${item.price}</p>
              <p className="text-sm text-gray-600 mb-4">
                {item.description.length > 60
                  ? item.description.slice(0, 60) + "..."
                  : item.description}
              </p>

              {/* Add to Cart Button */}
              <button
                disabled={item.sold_out}
                onClick={() => handleAddToCart(item)}
                className={`mt-auto py-2 px-4 rounded-lg text-sm font-medium transition ${
                  item.sold_out
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gray-900 text-white hover:bg-gray-800"
                }`}
              >
                {item.sold_out ? "Sold Out" : "Add to Cart"}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-6 right-6 bg-green-600 text-white px-6 py-3 rounded shadow-lg animate-slide-in z-50">
          Product added to cart
        </div>
      )}
    </section>
  );
};

export default ProductFeatureGrid;

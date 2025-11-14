"use client";

import { FC, useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useCart } from "@/app/context/cartcontext";

interface ProductAPI {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  sold_out?: boolean;
}

const ProductDetailContent: FC = () => {
  const searchParams = useSearchParams();
  const productId = searchParams.get("id");
  const [product, setProduct] = useState<ProductAPI | null>(null);
  const [loading, setLoading] = useState(true);
  const [showToast, setShowToast] = useState(false);

  const { addToCart } = useCart(); // Cart context

  useEffect(() => {
    let idToFetch: number;

    if (!productId || productId.trim() === "" || isNaN(Number(productId)) || Number(productId) < 1) {
      idToFetch = 1; // fallback to product 1
    } else {
      idToFetch = Number(productId);
    }

    fetch(`https://fakestoreapi.com/products/${idToFetch}`)
      .then((res) => {
        if (!res.ok) throw new Error("Product not found");
        return res.json();
      })
      .then((data: ProductAPI) => {
        const soldOutIndices = [2, 5, 7, 14, 17]; // example sold out
        const isSoldOut = soldOutIndices.includes(idToFetch - 1);
        setProduct({ ...data, sold_out: isSoldOut });
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading product:", err);
        setProduct(null);
        setLoading(false);
      });
  }, [productId]);

  const handleAddToCart = () => {
    if (!product || product.sold_out) return;

    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      quantity: 1,
    });

    setShowToast(true);

    setTimeout(() => setShowToast(false), 2000);
  };

  if (loading) return <div className="text-center py-10">Loading product...</div>;
  if (!product) return <div className="text-center py-10">Product not found.</div>;

  return (
    <section className="w-full bg-gray-50 py-16 px-4">
      <div className="flex flex-col lg:flex-row gap-8 items-start max-w-7xl mx-auto">
        {/* Product Image */}
        <div className="flex-[2] flex justify-center items-center relative">
          <div className="w-full lg:w-auto max-w-3xl aspect-square bg-gray-100 rounded-lg overflow-hidden">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-full object-contain"
            />
          </div>

          {product.sold_out && (
            <span className="absolute top-4 left-4 z-10 bg-black text-white text-xs font-semibold px-3 py-1 rounded">
              Sold Out
            </span>
          )}
        </div>

        {/* Product Details */}
        <div className="flex-1 max-w-md bg-white shadow-md rounded-lg p-8">
          <p className="text-sm text-gray-500 mb-4">
            All Products &gt; <span className="text-gray-800 font-medium">{product.title}</span>
          </p>
          <h1 className="text-3xl font-semibold text-gray-900 mb-4">{product.title}</h1>
          <p className="text-gray-600 mb-6">{product.description}</p>
          <p className="text-3xl font-medium text-gray-900 mb-6">${product.price}</p>

          <button
            disabled={product.sold_out}
            onClick={handleAddToCart}
            className={`w-full py-3 px-6 rounded-lg font-medium text-sm uppercase tracking-wider transition ${
              product.sold_out
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gray-900 text-white hover:bg-gray-800"
            }`}
          >
            {product.sold_out ? "Sold Out" : "Add to Cart"}
          </button>
        </div>
      </div>

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-6 right-6 bg-green-600 text-white px-6 py-3 rounded shadow-lg animate-slide-in">
          Product added to cart
        </div>
      )}
    </section>
  );
};

const ProductDetailAPI: FC = () => {
  return (
    <Suspense fallback={<div className="text-center py-10">Loading product...</div>}>
      <ProductDetailContent />
    </Suspense>
  );
};

export default ProductDetailAPI;

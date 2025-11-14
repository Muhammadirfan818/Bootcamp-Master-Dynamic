"use client";

import { FC, useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { useCart } from "@/app/context/cartcontext";

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  description: string;
  sold_out?: boolean;
}

// ✅ Simple Bottom Toast Component
const Toast = ({ message, show }: { message: string; show: boolean }) => {
  return (
    <div
      className={`fixed bottom-5 left-1/2 -translate-x-1/2 z-50
      bg-black text-white px-4 py-2 rounded-lg shadow-lg text-sm
      transition-all duration-300
      ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
    >
      {message}
    </div>
  );
};

const ProductGridAPI: FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [addingToCart, setAddingToCart] = useState<number[]>([]);
  const [sortOption, setSortOption] = useState("default");
  const [currentPage, setCurrentPage] = useState(1);

  const { addToCart } = useCart();
  const itemsPerPage = 9; // 9 products per page

  // ✅ Toast State
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data: Product[]) => {
        const soldOutIndices = [2, 5, 7, 14, 17];
        setProducts(
          data.map((p, i) => ({ ...p, sold_out: soldOutIndices.includes(i) }))
        );
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const sortedProducts = useMemo(() => {
    return [...products].sort((a, b) => {
      if (sortOption === "price-asc") return a.price - b.price;
      if (sortOption === "price-desc") return b.price - a.price;
      return 0;
    });
  }, [products, sortOption]);

  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  const currentItems = sortedProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleAddToCartHandler = (product: Product) => {
    if (product.sold_out) return;

    setAddingToCart((prev) => [...prev, product.id]);
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      quantity: 1,
    });

    // ✅ Show Toast
    setToastMessage(`${product.title} added to cart`);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);

    setTimeout(
      () => setAddingToCart((prev) => prev.filter((id) => id !== product.id)),
      500
    );
  };

  if (loading)
    return <div className="text-center py-10">Loading products...</div>;

  return (
    <section className="py-16 bg-white text-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
          <div>
            Showing <strong>{products.length}</strong> products
          </div>
          <div className="flex items-center gap-2">
            <label htmlFor="sort" className="text-sm font-medium">
              Sort by:
            </label>
            <select
              id="sort"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="border border-gray-300 rounded px-2 py-1 text-sm"
            >
              <option value="default">Default</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentItems.map((product) => (
            <div
              key={product.id}
              className="border p-4 rounded flex flex-col items-center bg-gray-50"
            >
              <Link href={`/productdetail?id=${product.id}`}>
                <div className="w-full h-64 flex items-center justify-center bg-gray-100 mb-4 relative cursor-pointer">
                  {product.sold_out && (
                    <span className="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 text-xs rounded">
                      Sold Out
                    </span>
                  )}
                  <img
                    src={product.image}
                    alt={product.title}
                    className="object-contain w-full h-full"
                  />
                </div>
              </Link>
              <h3 className="font-semibold">{product.title}</h3>
              <p className="font-medium mb-2">${product.price}</p>
              <p className="text-sm text-gray-600 mb-3">
                {product.description.slice(0, 60)}...
              </p>
              <button
                onClick={() => handleAddToCartHandler(product)}
                disabled={
                  product.sold_out || addingToCart.includes(product.id)
                }
                className={`px-4 py-2 rounded text-white font-medium ${
                  product.sold_out
                    ? "bg-gray-400"
                    : addingToCart.includes(product.id)
                    ? "bg-gray-700 cursor-not-allowed"
                    : "bg-gray-900 hover:bg-gray-800"
                }`}
              >
                {product.sold_out
                  ? "Sold Out"
                  : addingToCart.includes(product.id)
                  ? "Adding..."
                  : "Add to Cart"}
              </button>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center gap-2 mt-8">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 border rounded hover:bg-gray-200 disabled:opacity-50"
          >
            Prev
          </button>

          {/* Show 3 page numbers max at a time */}
          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .filter(
              (page) =>
                page === 1 ||
                page === totalPages ||
                (page >= currentPage - 1 && page <= currentPage + 1)
            )
            .map((page, idx, arr) => (
              <span key={page} className="flex items-center">
                {idx > 0 &&
                  arr[idx] - arr[idx - 1] > 1 && <span className="mx-1">...</span>}
                <button
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-1 border rounded ${
                    currentPage === page
                      ? "bg-gray-900 text-white"
                      : "hover:bg-gray-200"
                  }`}
                >
                  {page}
                </button>
              </span>
            ))}

          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 border rounded hover:bg-gray-200 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>

      {/* ✅ Toast Component */}
      <Toast message={toastMessage} show={showToast} />
    </section>
  );
};

export default ProductGridAPI;

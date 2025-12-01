"use client";

import { FC, useState, useEffect } from "react";
import Link from "next/link";
import { useCart } from "@/app/context/cartcontext";
import { ShoppingBag } from "lucide-react";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
  colors: string[];
  has_engrave: boolean;
  sold_out?: boolean;
  new_in?: boolean;
}

// Toast Notification
const Toast = ({ message, show }: { message: string; show: boolean }) => (
  <div
    className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-50
      bg-[#1a1a1a] text-white px-6 py-3 rounded shadow-xl text-sm font-medium tracking-wide
      transition-all duration-300 transform
      ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
  >
    {message}
  </div>
);

const ProductFeatureGrid: FC = () => {
  const { addToCart } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  // Toast
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  // Mock colors
  const colorPalettes = [
    ["bg-[#1a1a1a]", "bg-gray-400", "bg-[#1e3a8a]"],
    ["bg-[#C5A98E]", "bg-[#f3f4f6] border", "bg-black"],
    ["bg-black", "bg-white border", "bg-gray-500"],
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("https://fakestoreapi.com/products?limit=20");
        const data: any[] = await res.json();

        const enhancedProducts: Product[] = data.map((p, index) => ({
          id: p.id,
          title: p.title,
          price: p.price,
          image: p.image,
          category: p.category,
          colors: colorPalettes[index % 3],
          has_engrave: index % 3 === 0 || index % 4 === 0,
          sold_out: index === 2 || index === 5 || index === 11,
          new_in: index === 3 || index === 8,
        }));

        setProducts(enhancedProducts);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Pagination Logic
  const totalPages = Math.ceil(products.length / itemsPerPage);
  const paginatedProducts = products.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleAddToCart = (e: React.MouseEvent, product: Product) => {
    e.preventDefault();
    if (product.sold_out) return;

    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      quantity: 1,
    });

    setToastMessage(`Added to cart: ${product.title.substring(0, 15)}...`);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  if (loading) return <div className="text-center py-20">Loading products...</div>;

  return (
    <section className={`w-full py-16 bg-white text-[#1a1a1a] ${inter.className}`}>
      <div className="max-w-[1440px] mx-auto px-6 md:px-8">

        {/* Header */}
        <div className="flex justify-between items-end mb-10">
          <p className="text-sm font-medium text-gray-500">
            Showing {paginatedProducts.length} of {products.length} Products
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
          {paginatedProducts.map((item) => (
            <div
              key={item.id}
              className="group relative flex flex-col bg-white shadow-sm rounded-[7px]"
              style={{ width: 336, height: 480, overflow: "hidden" }}
            >
              {/* Image */}
              <Link href={`/productdetail?id=${item.id}`} className="block relative w-full h-[65%]">
                <div className="w-full h-full flex items-center justify-center bg-[#fff] p-4">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="object-contain w-full h-full hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Top Badges */}
                <div className="absolute top-0 left-0 flex flex-col gap-2 z-10 p-3">
                  {item.sold_out && (
                    <span className="bg-[#2d2d2d] text-white text-[11px] font-medium px-3 py-[4px] uppercase tracking-wider rounded-sm w-fit">
                      Sold out
                    </span>
                  )}
                  {item.new_in && (
                    <span className="bg-[#EBC80C] text-black text-[11px] font-medium px-3 py-[4px] uppercase tracking-wider rounded-sm w-fit">
                      New In
                    </span>
                  )}
                </div>

                {/* Add to Cart */}
                <button
                  onClick={(e) => handleAddToCart(e, item)}
                  disabled={item.sold_out}
                  className={`absolute bottom-4 right-4 w-10 h-10 bg-white border border-gray-200 flex items-center justify-center transition-colors z-20 shadow-sm
                    ${item.sold_out ? "opacity-50 cursor-not-allowed" : "hover:bg-black hover:text-white hover:border-black"}`}
                >
                  <ShoppingBag size={18} strokeWidth={1.5} />
                </button>
              </Link>

              {/* Product Info */}
              <div className="flex flex-col gap-2 p-4 h-[35%]">
                <div className="flex justify-between items-baseline">
                  <Link href={`/productdetail?id=${item.id}`} className="max-w-[75%]">
                    <h3 className="text-[17px] font-bold text-[#1a1a1a] leading-tight group-hover:underline decoration-1 underline-offset-4 truncate">
                      {item.title}
                    </h3>
                  </Link>
                  <span className="text-[16px] text-[#1a1a1a] font-normal whitespace-nowrap">
                    ${item.price.toFixed(2)}
                  </span>
                </div>

                {/* Swatches & Engrave */}
                <div className="flex items-center gap-3 mt-2">
                  <div className="flex gap-2">
                    {item.colors.map((colorClass, i) => (
                      <div
                        key={i}
                        className={`w-[20px] h-[20px] rounded-full cursor-pointer border border-transparent hover:border-gray-300 relative flex items-center justify-center
                          ${i === 0 ? "ring-1 ring-offset-2 ring-gray-300" : ""}`}
                      >
                        <div className={`w-full h-full rounded-full border border-black/5 ${colorClass}`}></div>
                      </div>
                    ))}
                  </div>

                  {item.has_engrave && (
                    <span className="bg-[#4a4a4a] text-white text-[10px] font-medium px-2 py-[2px] rounded-[2px] uppercase tracking-wider ml-1">
                      Engrave
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-16 gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 border rounded-sm text-sm font-medium hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>

            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`w-10 h-10 border rounded-sm text-sm font-medium transition-colors
                  ${currentPage === i + 1
                    ? "bg-[#1a1a1a] text-white border-[#1a1a1a]"
                    : "bg-white text-[#1a1a1a] border-gray-200 hover:bg-gray-50"}`}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 border rounded-sm text-sm font-medium hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        )}
      </div>

      <Toast message={toastMessage} show={showToast} />
    </section>
  );
};

export default ProductFeatureGrid;

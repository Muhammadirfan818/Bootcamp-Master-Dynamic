"use client";

import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";

export type CartSummaryProps = SliceComponentProps<Content.CartSummarySlice>;

const CartSummary: FC<CartSummaryProps> = ({ slice }) => {
  const primary = slice.primary || {};
  const items = primary.items || [];

  const {
    discount_placeholder,
    discount_button_label,
    subtotal,
    shipping_label,
    shipping_instruction,
    total,
    currency_label,
  } = primary;

  // Helper to format prices
  const formatPrice = (price?: number | null) => {
    const symbol = currency_label || "$";
    if (!price) return `${symbol}0.00`;
    return `${symbol}${price.toFixed(2)}`;
  };

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="max-w-3xl mx-auto p-6 bg-white shadow rounded-md"
    >
      {/* Cart Items */}
      <div className="flex flex-col gap-6 mb-6">
        {items.length > 0 ? (
          items.map((item: any, index: number) => (
            <div key={index} className="flex items-center gap-4">
              {/* Product Image & Quantity */}
              <div className="relative flex-shrink-0">
                <PrismicNextImage
                  field={item.product_image}
                  alt={item.product_name || "Product"}
                  className="w-16 h-16 rounded-md bg-gray-100 object-cover"
                  fallbackAlt=""
                />
                {item.quantity && (
                  <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center bg-black text-white text-xs font-semibold">
                    {item.quantity}
                  </span>
                )}
              </div>

              {/* Product Details */}
              <div className="flex-1 min-w-0">
                <h3 className="text-base font-semibold truncate">{item.product_name}</h3>
                <p className="text-sm text-gray-500">{item.product_option}</p>
              </div>

              {/* Item Price */}
              <div className="flex-shrink-0">
                <p className="text-base font-semibold">{formatPrice(item.item_price)}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center">No items in the cart.</p>
        )}
      </div>

      {/* Discount Section */}
      <div className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder={discount_placeholder || "Discount code or gift card"}
          className="flex-1 w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
        />
        <button className="px-6 py-3 bg-gray-100 text-gray-500 rounded-md font-medium hover:bg-gray-200">
          {discount_button_label || "Apply"}
        </button>
      </div>

      {/* Totals */}
      <div className="border-t border-gray-200 pt-6 space-y-3">
        <div className="flex justify-between">
          <span className="text-gray-700">{subtotal || "Subtotal"}</span>
          <span className="font-semibold">
            {formatPrice(
              items.reduce(
                (sum, item: any) => sum + (item.item_price || 0) * (item.quantity || 0),
                0
              )
            )}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-700">{shipping_label || "Shipping"}</span>
          <span className="text-gray-600">{shipping_instruction || "Enter shipping address"}</span>
        </div>

        <div className="flex justify-between items-center font-bold text-lg pt-2">
          <span>{total || "Total"}</span>
          <span>
            <span className="text-sm font-medium text-gray-500 pr-2">{currency_label || ""}</span>
            {formatPrice(
              items.reduce(
                (sum, item: any) => sum + (item.item_price || 0) * (item.quantity || 0),
                0
              )
            )}
          </span>
        </div>
      </div>
    </section>
  );
};

export default CartSummary;

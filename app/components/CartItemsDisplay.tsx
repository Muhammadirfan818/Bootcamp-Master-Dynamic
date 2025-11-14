"use client";

import { FC } from "react";
import { useCart, CartItem } from "@/app/context/cartcontext";
import Link from "next/link";
import { FiShoppingBag } from "react-icons/fi";

const CartItemsDisplay: FC = () => {
  const { cart, addToCart, removeFromCart, clearCart } = useCart();

  const handleAddQuantity = (item: CartItem) => {
    addToCart({ ...item, quantity: 1 });
  };

  const handleRemoveQuantity = (item: CartItem) => {
    if (item.quantity > 1) {
      removeFromCart(item.id);
      addToCart({ ...item, quantity: item.quantity - 1 });
    } else {
      removeFromCart(item.id);
    }
  };

  if (!cart || cart.length === 0)
    return (
      <div className="text-center py-20">
        <div className="text-6xl mb-6 text-gray-400 flex justify-center animate-bounce">
          <FiShoppingBag />
        </div>
        <div className="mb-6 font-semibold text-2xl text-gray-700">
          Your cart is empty
        </div>
        <Link href="/allproduct" passHref>
          <button className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition text-sm font-medium shadow-lg">
            Continue Shopping
          </button>
        </Link>
      </div>
    );

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h2 className="text-4xl font-bold mb-8 text-gray-900 border-b pb-4">Your Cart</h2>

      <div className="flex flex-col gap-6">
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex flex-col sm:flex-row items-center justify-between p-4 border rounded-xl bg-white shadow-md hover:shadow-xl transition duration-300"
          >
            {/* Product Info */}
            <div className="flex items-center gap-6 w-full sm:w-2/3">
              <img
                src={item.image}
                alt={item.title}
                className="w-24 h-24 object-contain rounded-lg bg-gray-50 p-2"
              />
              <div className="flex flex-col">
                <h3 className="font-semibold text-lg text-gray-900">{item.title}</h3>
                <p className="text-gray-500 text-sm mt-1">${item.price.toFixed(2)}</p>
              </div>
            </div>

            {/* Quantity Controls & Price */}
            <div className="flex items-center gap-4 mt-4 sm:mt-0">
              <button
                onClick={() => handleRemoveQuantity(item)}
                className="w-9 h-9 flex items-center justify-center bg-gray-200 rounded-full hover:bg-gray-300 transition font-bold text-lg"
              >
                -
              </button>
              <span className="font-medium text-lg text-gray-800">{item.quantity}</span>
              <button
                onClick={() => handleAddQuantity(item)}
                className="w-9 h-9 flex items-center justify-center bg-gray-200 rounded-full hover:bg-gray-300 transition font-bold text-lg"
              >
                +
              </button>
              <span className="ml-4 font-semibold text-lg text-gray-900">
                ${(item.price * item.quantity).toFixed(2)}
              </span>
              <button
                onClick={() => removeFromCart(item.id)}
                className="ml-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-medium shadow-sm"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Total & Actions */}
      <div className="mt-10 flex flex-col sm:flex-row justify-between items-center gap-4 bg-gray-50 p-6 rounded-xl shadow-md">
        <div className="text-3xl font-bold text-gray-900">Total: ${total.toFixed(2)}</div>
        <div className="flex gap-4 flex-wrap">
          <button
            onClick={clearCart}
            className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition font-medium shadow-md"
          >
            Clear All
          </button>
          <Link href="/checkout" passHref>
            <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition font-medium shadow-md">
              Pay Now
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartItemsDisplay;

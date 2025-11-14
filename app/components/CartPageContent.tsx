"use client";

import { FC } from "react";
import { SliceZone } from "@prismicio/react";
import { components } from "@/slices";
import CartItemsDisplay from "./CartItemsDisplay";

interface Props {
  sliceAfterCart: any[];
}

const CartPageContent: FC<Props> = ({ sliceAfterCart }) => {
  return (
    <main className="min-h-screen flex flex-col">
      {/* Cart Items */}
      <CartItemsDisplay />

      {/* Slice after cart */}
      {sliceAfterCart.length > 0 && (
        <SliceZone slices={sliceAfterCart} components={components} />
      )}
    </main>
  );
};

export default CartPageContent;

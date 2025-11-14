import { SliceZone } from "@prismicio/react";
import { createClient } from "@/prismicio";
import { components } from "@/slices";
import CartItemsDisplay from "../components/CartItemsDisplay";

export default async function CartPage() {
  const client = createClient();

  // Fetch the cart page document
  const page = await client.getSingle("cartpage").catch(() => null);

  // Filter the slice after cart items (since you said only one slice is in the page)
  const sliceAfterCart = page?.data?.slices || [];

  return (
    <main className="min-h-screen flex flex-col">
      {/* Cart items */}
      <CartItemsDisplay />

      {/* Render slice after cart items */}
      {sliceAfterCart.length > 0 && (
        <SliceZone slices={sliceAfterCart} components={components} />
      )}
    </main>
  );
}

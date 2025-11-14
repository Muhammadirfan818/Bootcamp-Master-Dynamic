// app/checkout/page.tsx
import { SliceZone } from "@prismicio/react";
import { createClient } from "@/prismicio";
import { components } from "@/slices";


export default async function Checkout() {
  const client = createClient();
  const page = await client.getSingle("checkout");

  const slices = page.data.slices;

  // First section slices
  const firstSectionSlices = slices.filter(
    (slice: any) =>
      [
        "express_checkout_options",
        "checkout_delivery_form",
        "payment_method_form",
        "payment_method_selector",
        "user_account_optin",
      ].includes(slice.slice_type)
  );

  // Second section slice
  const secondSectionSlices = slices.filter(
    (slice: any) => slice.slice_type === "cart_summary"
  );

  return (
      <main className="min-h-screen bg-gray-100 flex justify-center p-4">
        <div className="flex flex-col lg:flex-row w-full max-w-[1440px] gap-6">
          {/* Left Column - First Section */}
          <div className="bg-white w-full lg:w-[60%] h-auto">
            <SliceZone slices={firstSectionSlices} components={components} />
          </div>

          {/* Right Column - Second Section */}
          <div className="bg-gray-200 p-6 rounded-md shadow-md w-full lg:w-[40%] h-auto">
            <SliceZone slices={secondSectionSlices} components={components} />
          </div>
        </div>
      </main>
  );
}

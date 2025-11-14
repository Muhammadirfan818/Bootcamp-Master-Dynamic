import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";

/**
 * Props for `PaymentMethodSelector`.
 */
export type PaymentMethodSelectorProps =
  SliceComponentProps<Content.PaymentMethodSelectorSlice>;

/**
 * Component for "PaymentMethodSelector" Slices.
 */
const PaymentMethodSelector: FC<PaymentMethodSelectorProps> = ({ slice }) => {
  const isSelected = slice.primary.selected || false;

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="w-full max-w-xl mx-auto py-4"
    >
      {slice.primary?.label && (
        <div className="flex items-center justify-between p-4 border border-gray-300 rounded-md">
          {/* Left Side: Radio + Label */}
          <div className="flex items-center gap-3">
            {/* Custom Radio Button */}
            <div
              className={`h-5 w-5 rounded-full border flex items-center justify-center ${
                isSelected ? "border-black bg-black" : "border-gray-400"
              }`}
            >
              {isSelected && <div className="h-2 w-2 rounded-full bg-white" />}
            </div>

            {/* Label */}
            <span className="text-sm font-medium text-gray-900">
              {slice.primary.label || ""}
            </span>
          </div>

          {/* Right Side: Logo */}
          {slice.primary?.logo?.url && (
            <PrismicNextImage
              field={slice.primary.logo}
              className="h-5 w-auto object-contain"
              fallbackAlt=""
            />
          )}
        </div>
      )}
    </section>
  );
};

export default PaymentMethodSelector;

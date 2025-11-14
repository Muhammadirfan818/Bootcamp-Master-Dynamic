"use client";

import { FC, useState } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps, PrismicRichText } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";

export type PaymentMethodFormProps =
  SliceComponentProps<Content.PaymentMethodFormSlice>;

const PaymentMethodForm: FC<PaymentMethodFormProps> = ({ slice }) => {
  const [selected, setSelected] = useState<string>(""); // selected payment option
  const [useShipping, setUseShipping] = useState<boolean>(true);

  const primary = slice.primary as any;

  const getText = (field: any) => {
    if (!field) return "";
    if (typeof field === "string") return field;
    if (Array.isArray(field) && field[0]?.type) return field.map(f => f.text).join(" ");
    if (typeof field === "object" && "text" in field) return field.text;
    return "";
  };

  return (
    <section className="w-full max-w-xl mx-auto py-10 font-md">
      {/* Heading */}
      {primary.heading && (
        <PrismicRichText
          field={primary.heading}
          components={{
            heading2: ({ children }) => (
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">{children}</h2>
            ),
          }}
        />
      )}

      {/* Description */}
      {primary.headingdescription && (
        <PrismicRichText
          field={primary.headingdescription}
          components={{
            paragraph: ({ children }) => (
              <p className="text-gray-600 text-sm mb-4">{children}</p>
            ),
          }}
        />
      )}

      {/* Light Grey Container for Entire Payment Section */}
      <div className="bg-gray-100 rounded-md p-6 flex flex-col gap-4">
        {/* Cart Check + Title + Payment Method Icons */}
        <div className="flex items-center justify-between">
          {/* Left: Radio Select + Title */}
          <div className="flex items-center gap-3">
            <input
              type="radio"
              name="paymentMethod"
              checked={selected === "paymentOption"}
              onChange={() => setSelected("paymentOption")}
              className="h-5 w-5 rounded-full border-gray-400 text-black focus:ring-black"
            />
            {primary.title && (
              <div className="text-sm font-medium text-gray-900">
                <PrismicRichText field={primary.title} />
              </div>
            )}
          </div>

          {/* Right: Payment Method Icons */}
          <div className="flex items-center gap-2">
            {primary.payment_methods?.map((item: any, index: number) => (
              item.icon?.url && (
                <PrismicNextImage
                  key={index}
                  field={item.icon}
                  className="h-6 w-auto"
                  fallbackAlt=""
                />
              )
            ))}
          </div>
        </div>

        {/* Credit Card Form */}
        {selected === "paymentOption" && (
          <div className="flex flex-col gap-3 mt-3">
            <input
              type="text"
              placeholder={getText(primary.card_number_placeholder) || "Card number"}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-black focus:border-black"
            />
            <div className="grid grid-cols-2 gap-3">
              <input
                type="text"
                placeholder={getText(primary.expiration_placeholder) || "Expiration date (MM/YY)"}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-black focus:border-black"
              />
              <input
                type="text"
                placeholder={getText(primary.security_code_placeholder) || "Security code"}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-black focus:border-black"
              />
            </div>
            <input
              type="text"
              placeholder={getText(primary.name_on_card_placeholder) || "Name on card"}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-black focus:border-black"
            />
          </div>
        )}

        {/* Billing Checkbox + Shipping Text (After Form) */}
        {primary.use_shipping_address_as_billing && primary.shipping_text && (
          <label className="flex items-center gap-3 mt-4 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={useShipping}
              onChange={() => setUseShipping(!useShipping)}
              className="h-5 w-5 rounded border-gray-400 text-black focus:ring-black"
            />
            <PrismicRichText
              field={primary.shipping_text}
              components={{
                paragraph: ({ children }) => (
                  <span className="text-sm font-medium text-gray-800">{children}</span>
                ),
              }}
            />
          </label>
        )}
      </div>
    </section>
  );
};

export default PaymentMethodForm;

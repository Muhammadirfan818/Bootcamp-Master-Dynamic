"use client"; // ✅ Make component interactive

import { FC, useState, useEffect } from "react"; // ✅ Import React hooks
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { PrismicRichText } from "@prismicio/react";

// Helper component for form icons
const InputIcon = ({ children }: { children: React.ReactNode }) => (
  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
    {children}
  </div>
);

// ✅ Define types for API data
interface Country {
  country: string;
}
interface State {
  name: string;
}

/**
 * Props for `CheckoutDeliveryForm`.
 */
export type CheckoutDeliveryFormProps =
  SliceComponentProps<Content.CheckoutDeliveryFormSlice>;

/**
 * Component for "CheckoutDeliveryForm" Slices.
 */
const CheckoutDeliveryForm: FC<CheckoutDeliveryFormProps> = ({ slice }) => {

  // ✅ State for API data
  const [countries, setCountries] = useState<Country[]>([]);
  const [states, setStates] = useState<State[]>([]);
  
  // ✅ State for form inputs
  const [selectedCountry, setSelectedCountry] = useState("United States");
  const [selectedState, setSelectedState] = useState(slice.primary.state || "");

  // ✅ Fetch all countries on component load
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await fetch("https://countriesnow.space/api/v0.1/countries");
        const json = await res.json();
        if (!json.error) {
          setCountries(json.data);
        }
      } catch (error) {
        console.error("Failed to fetch countries:", error);
      }
    };
    fetchCountries();
  }, []);

  // ✅ Fetch states whenever the selectedCountry changes
  useEffect(() => {
    if (!selectedCountry) {
      setStates([]);
      return;
    }

    const fetchStates = async () => {
      try {
        const res = await fetch(
          "https://countriesnow.space/api/v0.1/countries/states",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ country: selectedCountry }),
          }
        );
        const json = await res.json();
        if (!json.error) {
          setStates(json.data.states);
          // Set default state from Prismic if it's the first load for this country
          if(slice.primary.state && json.data.states.some((s: State) => s.name === slice.primary.state)) {
            setSelectedState(slice.primary.state);
          } else {
            setSelectedState(""); // Clear state if country changes
          }
        } else {
          setStates([]); // No states found for this country
        }
      } catch (error) {
        console.error("Failed to fetch states:", error);
        setStates([]);
      }
    };
    fetchStates();
  }, [selectedCountry, slice.primary.state]);

  // Tailwind class for all form inputs to match Figma
  const inputClass = "block w-full rounded-md border-0 py-3 px-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6";
  const selectClass = inputClass + " appearance-none";

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="w-full max-w-lg mx-auto py-8"
    >
      {/* Head Text */}
      {slice.primary?.headtext && (
        <div className="text-xl font-semibold mb-6">
          <PrismicRichText field={slice.primary.headtext} />
        </div>
      )}

      {/* Responsive grid layout */}
      <form className="grid grid-cols-6 gap-x-4 gap-y-5">
        
        {/* Country */}
        <div className="col-span-6 relative">
          <label htmlFor="country" className="absolute -top-2 left-3 px-1 bg-white text-xs text-gray-500">Country/Region</label>
          <select
            id="country"
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
            className={selectClass}
          >
            {countries.map((c) => (
              <option key={c.country} value={c.country}>
                {c.country}
              </option>
            ))}
          </select>
          <InputIcon>
            <span className="text-gray-400 text-xl">&#9660;</span>
          </InputIcon>
        </div>

        {/* First Name */}
        <div className="col-span-3">
          <input
            type="text"
            placeholder="First name"
            defaultValue={slice.primary.first_name || ""}
            className={inputClass}
          />
        </div>

        {/* Last Name */}
        <div className="col-span-3">
          <input
            type="text"
            placeholder="Last name"
            defaultValue={slice.primary.last_name || ""}
            className={inputClass}
          />
        </div>

        {/* Company */}
        <div className="col-span-6">
          <input
            type="text"
            placeholder="Company (optional)"
            defaultValue={slice.primary.company || ""}
            className={inputClass}
          />
        </div>

        {/* Address */}
        <div className="col-span-6 relative">
          <input
            type="text"
            placeholder="Address"
            defaultValue={slice.primary.address || ""}
            className={inputClass}
          />
          <InputIcon>
            <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
          </InputIcon>
        </div>

        {/* Apartment/Suite */}
        <div className="col-span-6">
          <input
            type="text"
            placeholder="Apartment, suite, etc. (optional)"
            defaultValue={slice.primary.apartment_suite || ""}
            className={inputClass}
          />
        </div>

        {/* ✅ City, State, ZIP in 3-column layout */}
        <div className="col-span-2">
          <input
            type="text"
            placeholder="City"
            defaultValue={slice.primary.city || ""}
            className={inputClass}
          />
        </div>

        <div className="col-span-2 relative">
           <label htmlFor="state" className="absolute -top-2 left-3 px-1 bg-white text-xs text-gray-500">State</label>
          <select
            id="state"
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            className={selectClass}
            disabled={states.length === 0}
          >
            <option value="">{states.length === 0 ? "---" : "Select state"}</option>
            {states.map((s) => (
              <option key={s.name} value={s.name}>
                {s.name}
              </option>
            ))}
          </select>
          <InputIcon>
            <span className="text-gray-400 text-xl">&#9660;</span>
          </InputIcon>
        </div>

        <div className="col-span-2">
          <input
            type="text"
            placeholder="ZIP code"
            defaultValue={slice.primary.zip_code || ""}
            className={inputClass}
          />
        </div>

        {/* Phone */}
        <div className="col-span-6 relative">
          <input
            type="tel"
            placeholder="Phone"
            defaultValue={slice.primary.phone || ""}
            className={inputClass}
          />
          <InputIcon>
            <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
            </svg>
          </InputIcon>
        </div>

        {/* Subscribe News Offers */}
        {slice.primary?.subscribe_news_offers && (
          <div className="col-span-6">
            <label className="flex items-center gap-3 text-sm text-gray-800">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-gray-400 text-black focus:ring-black"
              />
              {slice.primary?.text_with_news_offer ? (
                <PrismicRichText field={slice.primary.text_with_news_offer} />
              ) : (
                "Text me with news and offers"
              )}
            </label>
          </div>
        )}

        {/* Shipping Methods Title */}
        <div className="col-span-6 mt-8">
          <h2 className="text-xl font-semibold mb-4">Shipping method</h2>
          {slice.primary?.shipping_method?.length > 0 ? (
            slice.primary.shipping_method.map((item, index) => (
              <div key={index} className="flex flex-col gap-2 border p-3 rounded">
                {item.shippingtitle && (
                  <div className="text-gray-800 font-medium">
                    <PrismicRichText field={item.shippingtitle} />
                  </div>
                )}
                {item.shipping_method_placeholder && (
                  <div className="text-gray-600 text-sm">
                    <PrismicRichText field={item.shipping_method_placeholder} />
                  </div>
                )}
              </div>
            ))
          ) : (
            // Placeholder if shipping methods are not available
            <p className="text-sm text-gray-600">
              Enter your shipping address to view available shipping methods.
            </p>
          )}
        </div>
      </form>

      {/* Shipping Notices */}
      {slice.primary?.shipping_notice?.length > 0 && (
        <div className="flex flex-col gap-4 mt-8">
          {slice.primary.shipping_notice.map((item, index) => (
            <div key={index} className="bg-gray-50 p-4 rounded-md flex items-start gap-3">
              {item.logo && (
                <PrismicNextImage
                  field={item.logo}
                  alt=""
                  className="h-5 w-5 object-contain mt-0.5 flex-shrink-0"
                  fallbackAlt=""
                />
              )}
              <div className="flex flex-col">
                {item.shipping_noitce_title && (
                  <div className="text-gray-900 font-semibold text-sm">
                    <PrismicRichText field={item.shipping_noitce_title} />
                  </div>
                )}
                {item.shipping_notice_description && (
                  <div className="text-gray-600 text-sm">
                    <PrismicRichText field={item.shipping_notice_description} />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default CheckoutDeliveryForm;
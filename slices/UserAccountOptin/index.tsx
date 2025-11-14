"use client";

import { FC, useState } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps, PrismicRichText } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import toast, { Toaster } from "react-hot-toast";

/**
 * Props for `UserAccountOptin`.
 */
export type UserAccountOptinProps =
  SliceComponentProps<Content.UserAccountOptinSlice>;

/**
 * Component for "UserAccountOptin" Slice.
 */
const UserAccountOptin: FC<UserAccountOptinProps> = ({ slice }) => {
  const [optedIn, setOptedIn] = useState(slice.primary?.opt_in_checked || false);

  // Handler for Pay Now button
  const handlePayNow = () => {
    toast.success("Payment Succeed!", {
      position: "bottom-center",
      duration: 3000,
    });
  };

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="w-full max-w-xl mx-auto py-4"
    >
      {/* Toaster container */}
      <Toaster />

      <div className="flex flex-col gap-4">
        {/* Heading */}
        {slice.primary?.heading && (
          <PrismicRichText
            field={slice.primary.heading}
            components={{
              heading2: ({ children }) => (
                <h2 className="text-base font-semibold text-gray-900">{children}</h2>
              ),
            }}
          />
        )}

        {/* Opt-in Checkbox */}
        {slice.primary?.opt_in_text && (
          <div className="flex flex-col border border-gray-200 rounded-md">
            <label className="flex items-center gap-3 cursor-pointer select-none p-4">
              <input
                type="checkbox"
                checked={optedIn}
                onChange={() => setOptedIn(!optedIn)}
                className="h-5 w-5 rounded border-gray-400 text-black focus:ring-black"
              />
              <PrismicRichText
                field={slice.primary.opt_in_text}
                components={{
                  paragraph: ({ children }) => (
                    <span className="text-sm font-medium text-gray-900">{children}</span>
                  ),
                }}
              />
            </label>

            {/* Conditional Input Fields */}
            {optedIn && slice.primary.input_fields?.length > 0 && (
              <div className="border-t border-gray-200 p-4 space-y-3">
                {slice.primary.input_fields.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 rounded-md border border-gray-300 px-3 py-3.5"
                  >
                    {item.icon?.url && (
                      <PrismicNextImage
                        field={item.icon}
                        alt=""
                        className="h-5 w-5 flex-shrink-0 text-gray-500"
                        fallbackAlt=""
                      />
                    )}
                    <div className="flex flex-col">
                      {item.label && (
                        <PrismicRichText
                          field={item.label}
                          components={{
                            paragraph: ({ children }) => (
                              <span className="text-sm text-gray-500 leading-tight">{children}</span>
                            ),
                          }}
                        />
                      )}
                      {item.placeholder && (
                        <span className="text-sm font-medium text-gray-900 leading-tight">
                          {item.placeholder}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Icons / Secure / Shop Logo Section */}
        {slice.primary?.icon?.length > 0 && (
          <div className="flex items-center justify-between mt-4">
            {slice.primary.icon[0]?.icon && (
              <div className="flex items-center gap-1.5">
                <PrismicNextImage
                  field={slice.primary.icon[0].icon}
                  alt=""
                  className="h-4 w-4 text-gray-600"
                  fallbackAlt=""
                />
                {slice.primary.icon[0]?.icon_text && (
                  <PrismicRichText
                    field={slice.primary.icon[0].icon_text}
                    components={{
                      paragraph: ({ children }) => (
                        <span className="text-xs text-gray-600">{children}</span>
                      ),
                    }}
                  />
                )}
              </div>
            )}
            {slice.primary.icon[0]?.icon_image && (
              <PrismicNextImage
                field={slice.primary.icon[0].icon_image}
                alt=""
                className="h-5 w-auto"
                fallbackAlt=""
              />
            )}
          </div>
        )}

        {/* Pay Now Buttons */}
        {slice.primary?.button?.map((item, index) => (
          <button
            key={index}
            onClick={handlePayNow}
            className="block w-full rounded-md bg-gray-900 px-6 py-3.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-gray-800 mt-3"
          >
            <PrismicRichText
              field={item.button_text}
              components={{
                paragraph: ({ children }) => <>{children}</>,
              }}
            />
          </button>
        ))}

        {/* Disclaimer / Footer Text */}
        {slice.primary?.last_text && (
          <PrismicRichText
            field={slice.primary.last_text}
            components={{
              paragraph: ({ children }) => (
                <p className="text-xs text-gray-600 mt-2">{children}</p>
              ),
              hyperlink: ({ children, node }) => (
                <a href={node.data.url} className="font-medium text-gray-700 underline">
                  {children}
                </a>
              ),
            }}
          />
        )}

        {/* Footer Links */}
        {slice.primary?.footer?.length > 0 && (
          <div className="flex items-center gap-4 border-t border-gray-200 pt-4">
            {slice.primary.footer.map((item, index) => (
              <PrismicRichText
                key={index}
                field={item.text}
                components={{
                  paragraph: ({ children }) => (
                    <span className="text-xs font-medium text-gray-700 underline">{children}</span>
                  ),
                  hyperlink: ({ children, node }) => (
                    <a href={node.data.url} className="text-xs font-medium text-gray-700 underline">
                      {children}
                    </a>
                  ),
                }}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default UserAccountOptin;

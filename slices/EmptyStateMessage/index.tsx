import { FC } from "react";
import { SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { PrismicRichText } from "@prismicio/react";
import { Content } from "@prismicio/client";

export type EmptyStateMessageProps =
  SliceComponentProps<Content.EmptyStateMessageSlice>;

const EmptyStateMessage: FC<EmptyStateMessageProps> = ({ slice }) => {
  const primary = slice?.primary || {};
  const icon = primary.icon as any;
  const message = Array.isArray(primary.message) ? primary.message : [];
  const links = Array.isArray(primary.link) ? primary.link : [];

  return (
    <section className="flex flex-col items-center justify-center text-center gap-6 p-6 min-h-screen">
      {/* Icon */}
      {icon?.url && (
        <PrismicNextImage
          field={icon}
          alt={icon.alt ?? "Icon"}
          className="w-20 h-20 sm:w-24 sm:h-24 object-contain"
          fallbackAlt=""
        />
      )}

      {/* Message */}
      {message.length > 0 && (
        <PrismicRichText
          field={message as any} // ✅ cast to any to remove TS error
          components={{
            paragraph: ({ children }) => (
              <p className="text-gray-700 text-3xl lg:text-4xl font-bold">
                {children}
              </p>
            ),
          }}
        />
      )}

      {/* Links */}
      {links.length > 0 &&
        links.map((item: any, index: number) => {
          const linkField = item?.links || item?.button_link || null;
          const linkText = item?.label || "Continue Shopping";

          if (!linkField) return null;

          return (
            <PrismicNextLink
              key={index}
              field={linkField as any} // ✅ cast to any
              className="mt-1 inline-block bg-black text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              {linkText}
            </PrismicNextLink>
          );
        })}
    </section>
  );
};

export default EmptyStateMessage;

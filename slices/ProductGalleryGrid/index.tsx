"use client";

import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";

type GalleryItem =
  Content.ProductGalleryGridSliceDefaultPrimaryGalleryItemsItem;

const GalleryImage: FC<{ item: GalleryItem; className?: string }> = ({
  item,
  className = "",
}) => {
  if (!item.image?.url) return null;

  return (
    <div className={`relative w-full overflow-hidden rounded-2xl ${className}`}>
      <PrismicNextImage
        field={item.image}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover transition-transform duration-500 hover:scale-105"
        fallbackAlt=""
      />
    </div>
  );
};

export type ProductGalleryGridProps =
  SliceComponentProps<Content.ProductGalleryGridSlice>;

const ProductGalleryGrid: FC<ProductGalleryGridProps> = ({ slice }) => {
  const galleryItems = (slice.primary.gallery_items || []) as GalleryItem[];

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="px-4 sm:px-8 lg:px-16 py-12"
    >
      {galleryItems.length >= 5 ? (
        (() => {
          const [item1, item2, item3, item4, item5] = galleryItems as [
            GalleryItem,
            GalleryItem,
            GalleryItem,
            GalleryItem,
            GalleryItem,
            ...GalleryItem[]
          ];

          return (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
              <div className="flex flex-col gap-6">
                <GalleryImage item={item1} className="aspect-[4/4]" />
                <GalleryImage item={item3} className="aspect-[4/5]" />
              </div>

              <div className="flex flex-col gap-6">
                <GalleryImage item={item2} className="aspect-[4/3]" />
                <GalleryImage item={item4} className="aspect-[4/3]" />
                <GalleryImage item={item5} className="aspect-[4/3]" />
              </div>
            </div>
          );
        })()
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {galleryItems.map((item, i) => (
            <GalleryImage key={i} item={item} className="aspect-[4/3]" />
          ))}
          {galleryItems.length === 0 && (
            <p className="text-center text-gray-500 col-span-full">
              No gallery items available.
            </p>
          )}
        </div>
      )}
    </section>
  );
};

export default ProductGalleryGrid;

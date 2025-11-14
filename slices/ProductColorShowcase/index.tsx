import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";

/**
 * Props for `ProductColorShowcase`.
 */
export type ProductColorShowcaseProps =
  SliceComponentProps<Content.ProductColorShowcaseSlice>;

/**
 * Component for "ProductColorShowcase" Slices.
 */
const ProductColorShowcase: FC<ProductColorShowcaseProps> = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="w-full bg-white"
    >
      {slice?.primary?.product_image ? (
        <PrismicNextImage
          field={slice.primary.product_image}
          className="w-full h-auto object-cover"
          imgixParams={{ fit: "crop", w: 1920, h: 1080 }}
          fallbackAlt=""
        />
      ) : (
        <p className="text-center text-gray-500 italic py-10">
          No product image found in this slice.
        </p>
      )}
    </section>
  );
};

export default ProductColorShowcase;

import type { ImgHTMLAttributes } from "react";
import { srcSetFor } from "../lib/images";

/** <img> that uses the bundled srcset (when the file is a known photo) + native lazy loading */
export function ResponsiveImg({
  src,
  sizes = "100vw",
  eager = false,
  ...rest
}: Omit<ImgHTMLAttributes<HTMLImageElement>, "srcSet"> & { src: string; sizes?: string; eager?: boolean }) {
  const srcSet = srcSetFor(src);
  return (
    <img
      src={src}
      srcSet={srcSet}
      sizes={srcSet ? sizes : undefined}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      {...rest}
    />
  );
}

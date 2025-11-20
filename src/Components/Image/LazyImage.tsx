import { useEffect, useRef, useState } from "react";

/**
 * A more advanced lazy image component using IntersectionObserver.
 * Provides fade-in transition and optional blurred placeholder.
 */
export function LazyImage({
  src,
  alt,
  className,
  placeholder,
  onClick,
  width,
  height,
}: {
  src: string;
  alt: string;
  className?: string;
  placeholder?: string; // optionally supply a tiny blurred data URL
  onClick?: () => void;
  width?: number | string;
  height?: number | string;
}) {
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!("IntersectionObserver" in window)) {
      // Fallback: load immediately on next tick to avoid synchronous state in effect
      setTimeout(() => setInView(true), 0);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            observer.disconnect();
          }
        });
      },
      { rootMargin: "200px 0px" }
    );

    // Use a ref element for observation
    const wrapperNode = document.querySelector(`[data-lazy-src="${src}"]`);
    if (wrapperNode) {
      observer.observe(wrapperNode);
    }

    return () => observer.disconnect();
  }, [src]);

  return (
    <div
      className={
        "lazy-image-wrapper" +
        (className ? ` ${className}` : "") +
        (loaded ? " loaded" : "")
      }
      style={{ position: "relative", overflow: "hidden" }}
      onClick={onClick}
      data-lazy-src={src}
    >
      {!loaded && placeholder && (
        <img
          src={placeholder}
          aria-hidden
          className="lazy-image-placeholder"
          width={width}
          height={height}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "blur(12px)",
            transform: "scale(1.05)",
            transition: "opacity 0.4s",
          }}
        />
      )}
      {inView && (
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          loading="lazy"
          width={width}
          height={height}
          onLoad={() => setLoaded(true)}
          style={{
            display: "block",
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: loaded ? 1 : 0,
            transition: "opacity 0.5s ease",
          }}
        />
      )}
    </div>
  );
}

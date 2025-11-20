/**
 * Generate a tiny blurred placeholder using canvas
 * This runs client-side to create LQIP (Low Quality Image Placeholder) data URLs
 */
export function generatePlaceholder(
  imgSrc: string,
  callback: (dataUrl: string) => void
): void {
  const img = new Image();
  img.crossOrigin = "Anonymous";

  img.onload = () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    // Use tiny dimensions for placeholder (e.g., 20x20)
    const size = 20;
    canvas.width = size;
    canvas.height = size;

    if (ctx) {
      ctx.drawImage(img, 0, 0, size, size);
      callback(canvas.toDataURL("image/jpeg", 0.1));
    }
  };

  img.onerror = () => {
    // Fallback: use a solid color placeholder
    callback(
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'%3E%3Crect width='1' height='1' fill='%23e5e7eb'/%3E%3C/svg%3E"
    );
  };

  img.src = imgSrc;
}

/**
 * Simple solid color placeholder (no network request needed)
 * Use this for instant placeholder without loading the actual image first
 */
export function getSolidPlaceholder(color = "#e5e7eb"): string {
  return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'%3E%3Crect width='1' height='1' fill='${encodeURIComponent(
    color
  )}'/%3E%3C/svg%3E`;
}

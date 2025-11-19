// Image groupings loaded via Vite's import.meta.glob
// Each key is the folder name, and values are arrays of asset URLs
import janeDoe from "../assets/agents/jane-doe.jpg";
import johnSmith from "../assets/agents/john-smith.jpg";
type ImageRecord = Record<string, string[]>;

const toSortedArray = (rec: Record<string, string>): string[] =>
  Object.keys(rec)
    .sort()
    .map((k) => rec[k]);

const apartmentOne = toSortedArray(
  import.meta.glob("../assets/apartment-one/*.{png,jpg,jpeg,webp,avif,svg}", {
    eager: true,
    import: "default",
  }) as Record<string, string>
);

const blueHouse = toSortedArray(
  import.meta.glob("../assets/blue-house/*.{png,jpg,jpeg,webp,avif,svg}", {
    eager: true,
    import: "default",
  }) as Record<string, string>
);

const brickHouse = toSortedArray(
  import.meta.glob("../assets/brick-house/*.{png,jpg,jpeg,webp,avif,svg}", {
    eager: true,
    import: "default",
  }) as Record<string, string>
);

const grayHouse = toSortedArray(
  import.meta.glob("../assets/gray-house/*.{png,jpg,jpeg,webp,avif,svg}", {
    eager: true,
    import: "default",
  }) as Record<string, string>
);

const stock = toSortedArray(
  import.meta.glob("../assets/stock/*.{png,jpg,jpeg,webp,avif,svg}", {
    eager: true,
    import: "default",
  }) as Record<string, string>
);

const whiteHouse = toSortedArray(
  import.meta.glob("../assets/white-house/*.{png,jpg,jpeg,webp,avif,svg}", {
    eager: true,
    import: "default",
  }) as Record<string, string>
);

export const images: ImageRecord = {
  "apartment-one": apartmentOne,
  "blue-house": blueHouse,
  "brick-house": brickHouse,
  "gray-house": grayHouse,
  stock,
  "white-house": whiteHouse,
};

export const agentImages: Record<string, string> = {
  "jane-doe": janeDoe,
  "john-smith": johnSmith,
};

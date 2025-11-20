import type { TPropertyListing } from "../../types";
import { LazyImage } from "../Image/LazyImage";
import { getSolidPlaceholder } from "../../utils/imagePlaceholder";
import "./listing.css";

type TListingCardProps = TPropertyListing & {
  setCurrentListing: (id: string) => void;
};
export function ListingCard({
  title,
  description,
  price,
  location,
  bedrooms,
  bathrooms,
  areaSqFt,
  images,
  listingStatus,
  setCurrentListing,
  id,
}: TListingCardProps) {
  return (
    <div className="listing-card" onClick={() => setCurrentListing(id)}>
      <div className="listing-thumbnail">
        <LazyImage
          src={images[0]}
          alt={title}
          width={140}
          height={140}
          placeholder={getSolidPlaceholder("#d1d5db")}
        />
        <span className={`status ${listingStatus}`}>{listingStatus}</span>
      </div>
      <div className="listing-info">
        <div className="listing-card-header">
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
        <div className="listing-details">
          <p>Price: ${price.toLocaleString()}</p>
          <p>Location: {location}</p>
          <p>Bedrooms: {bedrooms}</p>
          <p>Bathrooms: {bathrooms}</p>
          <p>Area: {areaSqFt} sq ft</p>
        </div>
      </div>
    </div>
  );
}

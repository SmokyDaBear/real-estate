import { propertyListings } from "../data/property-listings";
import { ListingCard } from "../Components/Listing/ListingCard";
import { useEffect, useState } from "react";
import { ListingFull } from "../Components/Listing/ListingFull";
import { NotFound } from "./NotFound";
import { navigateToListing } from "../utils/navigation";

export function ListingsPage() {
  const [currentListing, setCurrentListing] = useState<string | null>(null);
  const currentListingData = propertyListings.find(
    (listing) => listing.id === currentListing
  );

  // Sync listing with hash: #/listings/:id
  useEffect(() => {
    const applyFromHash = () => {
      const raw = window.location.hash.replace(/^#\/?/, "");
      const [page, id] = raw.split("/");
      if (page === "listings") {
        setCurrentListing(id || null);
      }
    };
    applyFromHash();
    window.addEventListener("hashchange", applyFromHash);
    return () => window.removeEventListener("hashchange", applyFromHash);
  }, []);

  const openListing = (id: string) => {
    navigateToListing(id);
    setCurrentListing(id);
  };
  const backToList = () => {
    window.history.pushState({}, "", `#/listings`);
    setCurrentListing(null);
  };
  return (
    <>
      {currentListing == null && (
        <div>
          <h1>Property Listings</h1>
          <p>Browse through our available properties.</p>
          <div className="flex-col container">
            {propertyListings.map((listing) => (
              <ListingCard
                key={listing.id}
                {...listing}
                setCurrentListing={openListing}
              />
            ))}
          </div>
        </div>
      )}
      {currentListingData != null && (
        <div>
          <ListingFull {...currentListingData} backToListings={backToList} />
        </div>
      )}
      {currentListing !== null && currentListingData == null && (
        <NotFound
          title="Listing Not Found"
          message="We couldn’t find that listing. It may have been removed."
          homeLabel="Back to Home"
        />
      )}
    </>
  );
}

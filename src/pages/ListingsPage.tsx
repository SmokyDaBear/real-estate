import { propertyListings } from "../data/property-listings";
import { ListingCard } from "../Components/Listing/ListingCard";
import { useEffect, useState, useMemo } from "react";
import { ListingFull } from "../Components/Listing/ListingFull";
import { NotFound } from "./NotFound";
import { navigateToListing } from "../utils/navigation";

export function ListingsPage() {
  const [currentListing, setCurrentListing] = useState<string | null>(null);
  const [searchParams, setSearchParams] = useState<URLSearchParams>(
    new URLSearchParams(window.location.search)
  );

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

  // Sync search params with URL (uses real search part, not hash fragment)
  useEffect(() => {
    const syncSearch = () => {
      setSearchParams(new URLSearchParams(window.location.search));
    };
    window.addEventListener("popstate", syncSearch);
    // Also listen to hashchange in case navigation triggers without popstate
    window.addEventListener("hashchange", syncSearch);
    syncSearch();
    return () => {
      window.removeEventListener("popstate", syncSearch);
      window.removeEventListener("hashchange", syncSearch);
    };
  }, []);

  // Filter listings based on search params
  const filteredListings = useMemo(() => {
    let results = [...propertyListings];

    const query = searchParams.get("q")?.toLowerCase();
    const priceMin = searchParams.get("priceMin");
    const priceMax = searchParams.get("priceMax");
    const bedrooms = searchParams.get("bedrooms");
    const bathrooms = searchParams.get("bathrooms");
    const hasPool = searchParams.get("pool");

    if (query) {
      results = results.filter(
        (listing) =>
          listing.title.toLowerCase().includes(query) ||
          listing.description.toLowerCase().includes(query) ||
          listing.location.toLowerCase().includes(query)
      );
    }

    if (priceMin) {
      const min = parseInt(priceMin);
      results = results.filter((listing) => listing.price >= min);
    }

    if (priceMax) {
      const max = parseInt(priceMax);
      results = results.filter((listing) => listing.price <= max);
    }

    if (bedrooms) {
      const beds = parseInt(bedrooms);
      results = results.filter((listing) => listing.bedrooms >= beds);
    }

    if (bathrooms) {
      const baths = parseInt(bathrooms);
      results = results.filter((listing) => listing.bathrooms >= baths);
    }

    if (hasPool === "true") {
      results = results.filter((listing) => listing.hasPool === true);
    } else if (hasPool === "false") {
      results = results.filter((listing) => listing.hasPool === false);
    }

    return results;
  }, [searchParams]);

  const openListing = (id: string) => {
    navigateToListing(id);
    setCurrentListing(id);
  };
  const backToList = () => {
    window.history.pushState({}, "", `#/listings`);
    setCurrentListing(null);
  };

  const hasActiveFilters = Array.from(searchParams.keys()).length > 0;

  return (
    <>
      {currentListing == null && (
        <div>
          <h1>Property Listings</h1>
          <p>
            {hasActiveFilters
              ? `Showing ${filteredListings.length} of ${propertyListings.length} properties`
              : "Browse through our available properties."}
          </p>
          <div className="flex-col container">
            {filteredListings.length > 0 ? (
              filteredListings.map((listing) => (
                <ListingCard
                  key={listing.id}
                  {...listing}
                  setCurrentListing={openListing}
                />
              ))
            ) : (
              <div className="no-results">
                <p>No properties match your search criteria.</p>
                <button
                  onClick={() => {
                    const basePath = window.location.pathname;
                    const hash = "#/listings";
                    window.history.pushState({}, "", `${basePath}${hash}`);
                    setSearchParams(new URLSearchParams());
                    window.dispatchEvent(new HashChangeEvent("hashchange"));
                  }}
                >
                  Clear Filters
                </button>
              </div>
            )}
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
          message="We couldn't find that listing. It may have been removed."
          homeLabel="Back to Home"
        />
      )}
    </>
  );
}

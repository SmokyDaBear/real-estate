import { propertyListings } from "../data/property-listings";
import { navigateTo, navigateToListing } from "../utils/navigation";
export function HomePage() {
  return (
    <>
      <section>
        <h1>Welcome to the Real Estate Listings</h1>
        <p>Find your dream home today!</p>
        <div className="grid-gallery">
          {propertyListings.slice(0, 6).map((listing) => (
            <div
              key={listing.id}
              className="grid-gallery-item"
              onClick={() => navigateToListing(listing.id)}
            >
              <img
                src={listing.images[0]}
                alt={listing.title}
                className="grid-gallery-image"
              />
              <div className="grid-gallery-info">
                <h3>{listing.title}</h3>
                <p>Price: ${listing.price.toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section>
        <h2>Looking to Sell your Home?</h2>
        <p>Contact an agent now to get started.</p>
        <button
          className="call-to-action-btn"
          onClick={() => navigateTo("contact")}
        >
          Contact an Agent
        </button>
        <br />
        <br />
      </section>
    </>
  );
}

import type { TPropertyListing, TAgent } from "../../types";
import { useState } from "react";
import { AgentCard } from "../Agents/AgentCard";
import { agents } from "../../data/agents";
import { navigateToAgent } from "../../utils/navigation";

type TListingFullProps = TPropertyListing & {
  backToListings: () => void;
};

export function ListingFull({
  title,
  agentId,
  description,
  price,
  location,
  bedrooms,
  bathrooms,
  areaSqFt,
  images,
  listingStatus,
  backToListings,
}: TListingFullProps) {
  const agent: TAgent = agents.find((a) => a.id === agentId)!;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  return (
    <div className="listing-full">
      <button onClick={backToListings} className="sticky-back-btn">
        Back to Listings
      </button>
      <div className="listing-full-info">
        <h2>{title}</h2>
        <p>{description}</p>
        <div className="listing-details">
          <p>Price: ${price.toLocaleString()}</p>
          <p>Location: {location}</p>
          <p>Bedrooms: {bedrooms}</p>
          <p>Bathrooms: {bathrooms}</p>
          <p>Area: {areaSqFt} sq ft</p>
          <span className={`status ${listingStatus}`}>{listingStatus}</span>
        </div>
        {agent && (
          <div className="agent-info">
            <AgentCard
              {...agent}
              showProfile={() => navigateToAgent(agent.id)}
            />
          </div>
        )}
      </div>

      <div className="full-listing-images-container">
        <div className="primary-image-container">
          <img src={images[currentImageIndex]} alt={title} />
        </div>
        <button
          onClick={() =>
            setCurrentImageIndex((prev) =>
              prev === 0 ? images.length - 1 : prev - 1
            )
          }
          className="nav-button"
        >
          &lt;
        </button>
        <button
          onClick={() =>
            setCurrentImageIndex((prev) =>
              prev === images.length - 1 ? 0 : prev + 1
            )
          }
          className="nav-button"
        >
          &gt;
        </button>
        <div className="thumbnail-navigation">
          {images.map((imgUrl, index) => (
            <div
              key={index}
              className={
                "listing-thumbnail" +
                (index === currentImageIndex ? " " : " faded ")
              }
            >
              <img
                src={imgUrl}
                alt={`${title} thumbnail ${index + 1}`}
                onClick={() => setCurrentImageIndex(index)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

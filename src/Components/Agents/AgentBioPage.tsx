import type { TAgent } from "../../types";
import { propertyListings } from "../../data/property-listings";
import { ListingCard } from "../Listing/ListingCard";
import "./agent.css";
import { Modal } from "../Layouts/Modal";
import { ContactForm } from "../Forms/ContactForm";
import { useState } from "react";
type TAgentBioPageProps = {
  agent: TAgent;
  onBack: () => void;
  openListing: (id: string) => void;
};
export function AgentBioPage({
  agent,
  onBack,
  openListing,
}: TAgentBioPageProps) {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <div className="agent-bio-page">
      <button onClick={onBack} className="sticky-back-btn">
        Back
      </button>
      <div className="agent-bio-details">
        <h2>{agent.name}</h2>
        <div className="agent-bio-photo">
          <img src={agent.profileImage} alt={agent.name} />
        </div>
        <p className="agent-full-bio">{agent.fullBio}</p>
        <div className="agent-contact-info">
          <h3>Contact Information</h3>
          <a href={`mailto:${agent.email}`}>Email: {agent.email}</a>
          <a href={`tel:${agent.phone}`}>Phone: {agent.phone}</a>
        </div>
        <p>Looking to sell your home, or want to buy a new one?</p>
        <p>Contact {agent.name} for expert assistance!</p>
        <button
          onClick={() => setModalOpen(true)}
          className="contact-agent-btn"
        >
          Contact {agent.name}
        </button>
      </div>

      <div className="agent-property-listings">
        <h2>{agent.name}'s Listings</h2>
        {propertyListings
          .filter((listing) => listing.agentId === agent.id)
          .map((listing) => (
            <ListingCard
              key={listing.id}
              {...listing}
              setCurrentListing={(id) => openListing(id)}
            />
          ))}
      </div>
      <br />
      {modalOpen && (
        <Modal closeModal={() => setModalOpen(false)}>
          <ContactForm />
        </Modal>
      )}
    </div>
  );
}

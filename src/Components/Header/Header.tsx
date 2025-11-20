import { SearchBar, type SearchFilters } from "../Search/SearchBar";
import { navigateTo } from "../../utils/navigation";
import "./header.css";
import { useState } from "react";

export function Header({
  currentPage,
}: {
  currentPage?: "home" | "listings" | "contact" | "agents";
}) {
  const handleSearch = (filters: SearchFilters) => {
    // Build URL search parameters from filters (use real search part, keep hash clean)
    const params = new URLSearchParams();

    if (filters.query) params.set("q", filters.query);
    if (filters.priceMin) params.set("priceMin", filters.priceMin.toString());
    if (filters.priceMax) params.set("priceMax", filters.priceMax.toString());
    if (filters.numBedrooms)
      params.set("bedrooms", filters.numBedrooms.toString());
    if (filters.numBathrooms)
      params.set("bathrooms", filters.numBathrooms.toString());
    if (filters.hasPool !== undefined && filters.hasPool !== null)
      params.set("pool", filters.hasPool.toString());

    const searchString = params.toString();
    const basePath = window.location.pathname;
    const hash = "#/listings"; // keep hash free of query params for router
    const url = `${basePath}${searchString ? `?${searchString}` : ""}${hash}`;
    window.history.pushState({}, "", url);
    // Manually dispatch hashchange because pushState doesn't trigger it
    window.dispatchEvent(new HashChangeEvent("hashchange"));
  };
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <header className="main-header">
        <div className="nav-bar">
          <h1>Real Estate Listings</h1>
          <nav className={`nav-menu ${isMenuOpen ? " active" : ""}`}>
            <button
              className="nav-link"
              aria-current={currentPage === "home"}
              onClick={() => {
                navigateTo("home");
                setIsMenuOpen(false);
              }}
            >
              Home
            </button>
            <button
              className="nav-link"
              aria-current={currentPage === "listings"}
              onClick={() => {
                navigateTo("listings");
                setIsMenuOpen(false);
              }}
            >
              Listings
            </button>
            <button
              className="nav-link"
              aria-current={currentPage === "contact"}
              onClick={() => {
                navigateTo("contact");
                setIsMenuOpen(false);
              }}
            >
              Contact
            </button>
            <button
              className="nav-link"
              aria-current={currentPage === "agents"}
              onClick={() => {
                navigateTo("agents");
                setIsMenuOpen(false);
              }}
            >
              Agents
            </button>
          </nav>
          <button
            className={`hamburger-btn ${isMenuOpen ? " active" : ""}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </button>
        </div>
        <section className="search-section">
          <SearchBar handleSearch={handleSearch} />
        </section>
      </header>
    </>
  );
}

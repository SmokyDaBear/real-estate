import { SearchBar } from "../Search/SearchBar";
import { navigateTo } from "../../utils/navigation";
import "./header.css";

export function Header({
  currentPage,
}: {
  currentPage?: "home" | "listings" | "contact" | "agents";
}) {
  const handleSearch = (query: string) => {
    // Implement search functionality here
    console.log("Searching for:", query);
  };

  return (
    <>
      <header className="main-header">
        <div className="nav-bar">
          <h1>Real Estate Listings</h1>
          <nav>
            <button
              className="nav-link"
              aria-current={currentPage === "home"}
              onClick={() => navigateTo("home")}
            >
              Home
            </button>
            <button
              className="nav-link"
              aria-current={currentPage === "listings"}
              onClick={() => navigateTo("listings")}
            >
              Listings
            </button>
            <button
              className="nav-link"
              aria-current={currentPage === "contact"}
              onClick={() => navigateTo("contact")}
            >
              Contact
            </button>
            <button
              className="nav-link"
              aria-current={currentPage === "agents"}
              onClick={() => navigateTo("agents")}
            >
              Agents
            </button>
          </nav>
        </div>
        <section className="search-section">
          <SearchBar handleSearch={handleSearch} />
        </section>
      </header>
    </>
  );
}

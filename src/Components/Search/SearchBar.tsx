import { useState } from "react";
import "./search.css";
export function SearchBar({
  handleSearch,
}: {
  handleSearch: (query: string) => void;
}) {
  const [query, setQuery] = useState("");
  return (
    <div className="search-container">
      <h2 className="title-sm">Search Properties</h2>
      <label htmlFor="search-input" className="hidden-label">
        Search:
      </label>
      <input
        type="text"
        placeholder="Search properties..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <label htmlFor="filter-property-type">Property Type:</label>
      <select id="filter-property-type">
        <option value="all">All Types</option>
        <option value="house">House</option>
        <option value="apartment">Apartment</option>
      </select>
      <button onClick={() => handleSearch(query)}>Search</button>
    </div>
  );
}

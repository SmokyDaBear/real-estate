import { useState } from "react";
import "./search.css";
import { SelectWithCustom } from "../Forms/SelectWithCustom";

export type SearchFilters = {
  query: string;
  priceMin: number | null;
  priceMax: number | null;
  numBedrooms: number | null;
  numBathrooms: number | null;
  hasPool: boolean | null;
};

export function SearchBar({
  handleSearch,
}: {
  handleSearch: (filters: SearchFilters) => void;
}) {
  const [query, setQuery] = useState("");
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [customBedrooms, setCustomBedrooms] = useState("");
  const [bathrooms, setBathrooms] = useState("");
  const [customBathrooms, setCustomBathrooms] = useState("");
  const [hasPool, setHasPool] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Parse price range or custom values
    let finalPriceMin: number | null = null;
    let finalPriceMax: number | null = null;

    if (priceRange === "custom") {
      finalPriceMin = priceMin ? parseInt(priceMin) : null;
      finalPriceMax = priceMax ? parseInt(priceMax) : null;
    } else if (priceRange && priceRange !== "" && priceRange !== "all") {
      const [min, max] = priceRange.split("-");
      finalPriceMin = min ? parseInt(min) : null;
      finalPriceMax = max ? parseInt(max) : null;
    }

    // Parse bedrooms
    let finalBedrooms: number | null = null;
    if (bedrooms === "custom") {
      finalBedrooms = customBedrooms ? parseInt(customBedrooms) : null;
    } else if (bedrooms && bedrooms !== "" && bedrooms !== "any") {
      finalBedrooms = parseInt(bedrooms);
    }

    // Parse bathrooms
    let finalBathrooms: number | null = null;
    if (bathrooms === "custom") {
      finalBathrooms = customBathrooms ? parseInt(customBathrooms) : null;
    } else if (bathrooms && bathrooms !== "" && bathrooms !== "any") {
      finalBathrooms = parseInt(bathrooms);
    }

    // Parse pool filter
    let finalHasPool: boolean | null = null;
    if (hasPool === "yes") finalHasPool = true;
    if (hasPool === "no") finalHasPool = false;

    const filters: SearchFilters = {
      query: query.trim(),
      priceMin: finalPriceMin,
      priceMax: finalPriceMax,
      numBedrooms: finalBedrooms,
      numBathrooms: finalBathrooms,
      hasPool: finalHasPool,
    };

    console.log("Search filters:", filters);
    handleSearch(filters);
  };

  return (
    <form className="search-container" onSubmit={handleSubmit}>
      <h2 className="title-sm">Search Properties</h2>

      <label htmlFor="search-input" className="search-input-label">
        Search
        <input
          id="search-input"
          type="text"
          placeholder="Enter location, keywords..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </label>

      <div className="search-grid">
        <SelectWithCustom
          label="Price Range"
          id="filter-price-range"
          options={[
            { label: "All Prices", value: "all" },
            { label: "$0 - $100,000", value: "0-100000" },
            { label: "$100,001 - $300,000", value: "100001-300000" },
            { label: "$300,001 - $500,000", value: "300001-500000" },
            { label: "$500,001+", value: "500001-999999999" },
          ]}
          value={priceRange}
          onChange={setPriceRange}
          allowCustom={true}
          customOption="custom"
          customLabel="Custom Range..."
        />

        {priceRange === "custom" && (
          <div className="price-custom-inputs">
            <label htmlFor="price-min">
              Min Price
              <input
                id="price-min"
                type="number"
                placeholder="Min"
                value={priceMin}
                onChange={(e) => setPriceMin(e.target.value)}
                min="0"
              />
            </label>
            <label htmlFor="price-max">
              Max Price
              <input
                id="price-max"
                type="number"
                placeholder="Max"
                value={priceMax}
                onChange={(e) => setPriceMax(e.target.value)}
                min="0"
              />
            </label>
          </div>
        )}

        <SelectWithCustom
          label="Bedrooms"
          id="filter-bedrooms"
          options={[
            { label: "Any", value: "any" },
            { label: "1+", value: "1" },
            { label: "2+", value: "2" },
            { label: "3+", value: "3" },
            { label: "4+", value: "4" },
            { label: "5+", value: "5" },
          ]}
          value={bedrooms}
          onChange={setBedrooms}
          allowCustom={true}
          customOption="custom"
          customLabel="Custom..."
          customValue={customBedrooms}
          onCustomChange={setCustomBedrooms}
        />

        <SelectWithCustom
          label="Bathrooms"
          id="filter-bathrooms"
          options={[
            { label: "Any", value: "any" },
            { label: "1+", value: "1" },
            { label: "2+", value: "2" },
            { label: "3+", value: "3" },
            { label: "4+", value: "4" },
          ]}
          value={bathrooms}
          onChange={setBathrooms}
          allowCustom={true}
          customOption="custom"
          customLabel="Custom..."
          customValue={customBathrooms}
          onCustomChange={setCustomBathrooms}
        />

        <label htmlFor="filter-pool" className="select-with-custom">
          Pool
          <select
            id="filter-pool"
            value={hasPool}
            onChange={(e) => setHasPool(e.target.value)}
          >
            <option value="">Any</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </label>
      </div>

      <button type="submit">Search</button>
    </form>
  );
}

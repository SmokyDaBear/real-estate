import { useState } from "react";

export function ListingInquiry({ listingId }: { listingId: string }) {
  const [showForm, setShowForm] = useState(false);
  return (
    <>
      <button
        className="call-to-action-btn"
        onClick={() => setShowForm(!showForm)}
      >
        {showForm ? "Hide Form" : "Inquire About This Listing"}
      </button>
      <br />
      <br />
      {showForm && (
        <div className="listing-inquiry-form">
          <h2>Get More Info</h2>
          <p>
            Interested in this listing? Fill out the form below to get more
            information.
          </p>
          <form>
            <input type="hidden" name="listingId" value={listingId} />
            <div className="form-grid">
              <label>
                First Name:
                <input
                  type="text"
                  name="first-name"
                  required
                  placeholder="First Name"
                />
              </label>
              <label>
                Last Name:
                <input
                  type="text"
                  name="last-name"
                  required
                  placeholder="Last Name"
                />
              </label>
              <label>
                Email:
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="email@example.com"
                />
              </label>
              <label>
                Phone:
                <input type="tel" name="phone" placeholder="Phone (optional)" />
              </label>
              <p>How long have you been searching for a home?</p>
              <label>
                <select name="length-of-search">
                  <option value="under-1-month">Less than a month.</option>
                  <option value="1-3-months">1 to 3 months.</option>
                  <option value="3-6-months">3 to 6 months.</option>
                  <option value="6-plus-months">More than 6 months.</option>
                </select>
              </label>
              <p>Will this be for a rental property?</p>
              <label>
                <select name="rental-property" defaultValue={"no"}>
                  <option value="yes">Yes, looking for a rental.</option>
                  <option value="no">No, looking to buy.</option>
                </select>
              </label>
              <p>
                Give us any additional information on your dream property. What
                are you looking for?
              </p>
              <label className="full-width">
                Message:
                <textarea name="message" required />
              </label>
            </div>
            <p>Would you like notifications for similar listings?</p>
            <label className="form-checkbox margin-auto">
              Subscribe <input type="checkbox" name="subscribe" />
            </label>
            <button type="submit">Submit Inquiry</button>
          </form>
        </div>
      )}
    </>
  );
}

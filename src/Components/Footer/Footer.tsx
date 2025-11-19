import "./footer.css";

export function Footer() {
  return (
    <footer className="footer">
      <p>
        &copy; {new Date().getFullYear()} Real Estate Listings. All rights
        reserved.
      </p>
    </footer>
  );
}

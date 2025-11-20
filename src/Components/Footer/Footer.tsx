import "./footer.css";

export function Footer() {
  return (
    <footer className="footer">
      <p>
        &copy; {new Date().getFullYear()} Real Estate Listings. All rights
        reserved.
      </p>
      <p>
        This site is for a mock real estate company, if you would like your own
        website or want to browse other examples, visit{" "}
        <a href="https://smokydabear.github.io">Verdant Webworks</a>.
      </p>
    </footer>
  );
}

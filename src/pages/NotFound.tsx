import "../App.css";

export function NotFound({
  title = "404: Page Not Found",
  message = "The page you are looking for doesn’t exist or may have been moved.",
  homeLabel = "Go to Home",
}: {
  title?: string;
  message?: string;
  homeLabel?: string;
}) {
  return (
    <div className="not-found">
      <div className="not-found-card">
        <h1>{title}</h1>
        <p>{message}</p>
        <a className="home-link" href="#/home">
          {homeLabel}
        </a>
      </div>
    </div>
  );
}
